import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const srcRoot = path.join(repoRoot, "src");
const baselinePath = path.join(repoRoot, "scripts", "copy-baseline.json");
const excludedCheckBPaths = new Set([
  "scripts/copy-guard.mjs",
  "scripts/copy-baseline.json",
]);
const checkBExtensions = new Set([".ts", ".tsx", ".css", ".mjs", ".js", ".json"]);
const allowedAddition = "[FISH: needs a line here]";

function compareStrings(left, right) {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}

function toRepoPath(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

function normaliseCopy(value) {
  return value.replace(/\s+/gu, " ").trim();
}

async function walkFiles(directory, includeFile) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkFiles(entryPath, includeFile)));
    } else if (entry.isFile() && includeFile(entryPath)) {
      files.push(entryPath);
    }
  }

  return files.sort((left, right) => compareStrings(toRepoPath(left), toRepoPath(right)));
}

function extractCopy(filePath, source) {
  const scriptKind = filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    {
      languageVersion: ts.ScriptTarget.Latest,
      jsx: ts.JsxEmit.Preserve,
    },
    true,
    scriptKind,
  );
  const strings = [];

  function add(value) {
    const normalised = normaliseCopy(value);
    if (normalised.length > 0) {
      strings.push(normalised);
    }
  }

  function visit(node, insideRenderedJsxExpression = false) {
    let isInsideRenderedJsxExpression = insideRenderedJsxExpression;
    if (ts.isJsxAttribute(node)) {
      isInsideRenderedJsxExpression = false;
    } else if (ts.isJsxExpression(node)) {
      isInsideRenderedJsxExpression = !ts.isJsxAttribute(node.parent);
    }

    if (ts.isJsxText(node)) {
      add(node.getText(sourceFile));
    } else if (
      isInsideRenderedJsxExpression &&
      (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    ) {
      add(node.text);
    } else if (
      ts.isJsxAttribute(node) &&
      node.initializer &&
      ts.isStringLiteral(node.initializer)
    ) {
      const attributeName = node.name.getText(sourceFile).toLowerCase();
      if (
        attributeName === "aria-label" ||
        attributeName === "alt" ||
        attributeName === "placeholder" ||
        attributeName === "title" ||
        attributeName === "aria-description"
      ) {
        add(node.initializer.text);
      }
    }

    ts.forEachChild(node, (child) => visit(child, isInsideRenderedJsxExpression));
  }

  visit(sourceFile);
  return strings.sort(compareStrings);
}

async function buildExtraction() {
  const sourceFiles = await walkFiles(
    srcRoot,
    (filePath) => filePath.endsWith(".ts") || filePath.endsWith(".tsx"),
  );
  const extraction = {};

  for (const filePath of sourceFiles) {
    const source = await fs.readFile(filePath, "utf8");
    extraction[toRepoPath(filePath)] = extractCopy(filePath, source);
  }

  return extraction;
}

function countValues(values) {
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

function expandCounts(counts) {
  const values = [];
  for (const [value, count] of [...counts].sort(([left], [right]) =>
    compareStrings(left, right),
  )) {
    for (let index = 0; index < count; index += 1) {
      values.push(value);
    }
  }
  return values;
}

function findDrift(baseline, current) {
  const drift = [];
  const filePaths = [...new Set([...Object.keys(baseline), ...Object.keys(current)])].sort(
    compareStrings,
  );

  for (const filePath of filePaths) {
    const baselineCounts = countValues(baseline[filePath] ?? []);
    const currentCounts = countValues(current[filePath] ?? []);
    const removedCounts = new Map();
    const addedCounts = new Map();
    const values = new Set([...baselineCounts.keys(), ...currentCounts.keys()]);

    for (const value of values) {
      const baselineCount = baselineCounts.get(value) ?? 0;
      const currentCount = currentCounts.get(value) ?? 0;
      if (baselineCount > currentCount) {
        removedCounts.set(value, baselineCount - currentCount);
      } else if (currentCount > baselineCount) {
        addedCounts.set(value, currentCount - baselineCount);
      }
    }

    const removed = expandCounts(removedCounts);
    const added = expandCounts(addedCounts);
    const changedCount = Math.min(removed.length, added.length);
    const changed = [];

    for (let index = 0; index < changedCount; index += 1) {
      changed.push({ from: removed[index], to: added[index] });
    }

    const unpairedRemoved = removed.slice(changedCount);
    const unpairedAdded = added.slice(changedCount);
    if (changed.length > 0 || unpairedRemoved.length > 0 || unpairedAdded.length > 0) {
      drift.push({
        filePath,
        changed,
        removed: unpairedRemoved,
        added: unpairedAdded,
      });
    }
  }

  return drift;
}

function validateBaseline(value) {
  if (value === null || Array.isArray(value) || typeof value !== "object") {
    return false;
  }

  return Object.values(value).every(
    (strings) => Array.isArray(strings) && strings.every((item) => typeof item === "string"),
  );
}

async function readBaseline() {
  try {
    const baseline = JSON.parse(await fs.readFile(baselinePath, "utf8"));
    if (!validateBaseline(baseline)) {
      throw new Error("expected an object whose values are arrays of strings");
    }
    return { baseline, error: null };
  } catch (error) {
    return {
      baseline: {},
      error: `Could not read ${toRepoPath(baselinePath)}: ${error.message}`,
    };
  }
}

function lineNumberAt(source, index) {
  let line = 1;
  for (let position = 0; position < index; position += 1) {
    if (source.charCodeAt(position) === 10) {
      line += 1;
    }
  }
  return line;
}

function findBannedMatches(filePath, source) {
  const patterns = [
    { name: "dash character", expression: /[\u2013\u2014]/gu },
    {
      name: "dash HTML entity",
      expression: /&(mdash|ndash|#8212|#8211|#x2014|#x2013);/giu,
    },
    { name: 'banned word "quietly"', expression: /\bquietly\b/giu },
    {
      name: "\"it's not X, it's Y\" construction",
      expression: /\bit(?:'|’)?s not\b[^.?!]{0,80}?,\s*it(?:'|’)?s\b/giu,
    },
    {
      name: "\"isn't X, it's Y\" construction",
      expression: /\bisn(?:'|’)?t\b[^.?!]{0,80}?,\s*it(?:'|’)?s\b/giu,
    },
  ];
  const hits = [];

  for (const { name, expression } of patterns) {
    for (const match of source.matchAll(expression)) {
      hits.push({
        filePath,
        line: lineNumberAt(source, match.index),
        match: match[0],
        name,
        index: match.index,
      });
    }
  }

  return hits.sort(
    (left, right) => left.index - right.index || compareStrings(left.name, right.name),
  );
}

async function runCheckB() {
  const files = await walkFiles(srcRoot, (filePath) => {
    const repoPath = toRepoPath(filePath);
    return !excludedCheckBPaths.has(repoPath) && checkBExtensions.has(path.extname(filePath));
  });
  const hits = [];

  for (const filePath of files) {
    const source = await fs.readFile(filePath, "utf8");
    hits.push(...findBannedMatches(toRepoPath(filePath), source));
  }

  return { filesScanned: files.length, hits };
}

function formatDrift(drift) {
  const lines = ["CHECK A failed: copy drift detected."];

  for (const file of drift) {
    lines.push(`  ${file.filePath}`);
    for (const change of file.changed) {
      lines.push(`    changed: ${JSON.stringify(change.from)} -> ${JSON.stringify(change.to)}`);
    }
    for (const value of file.removed) {
      lines.push(`    removed: ${JSON.stringify(value)}`);
    }
    for (const value of file.added) {
      const permitted = value === allowedAddition ? " (permitted)" : "";
      lines.push(`    added: ${JSON.stringify(value)}${permitted}`);
    }
  }

  return lines;
}

function formatCheckBHits(hits) {
  const lines = ["CHECK B failed: banned characters or phrases detected."];
  for (const hit of hits) {
    lines.push(
      `  ${hit.filePath}:${hit.line}: ${hit.name}: ${JSON.stringify(hit.match)}`,
    );
  }
  return lines;
}

async function writeBaseline(extraction) {
  await fs.writeFile(baselinePath, `${JSON.stringify(extraction, null, 2)}\n`, "utf8");
  const stringCount = Object.values(extraction).reduce(
    (total, strings) => total + strings.length,
    0,
  );
  console.log(
    `Copy baseline written: ${Object.keys(extraction).length} files, ${stringCount} strings.`,
  );
}

async function runProof(extraction) {
  const [{ baseline, error: baselineError }, checkB] = await Promise.all([
    readBaseline(),
    runCheckB(),
  ]);
  const failures = [];

  if (baselineError) {
    failures.push(`CHECK A failed: ${baselineError}`);
  } else {
    const drift = findDrift(baseline, extraction);
    const disallowedDrift = drift.filter(
      (file) =>
        file.changed.length > 0 ||
        file.removed.length > 0 ||
        file.added.some((value) => value !== allowedAddition),
    );
    if (disallowedDrift.length > 0) {
      failures.push(...formatDrift(drift));
    }
  }

  if (checkB.hits.length > 0) {
    failures.push(...formatCheckBHits(checkB.hits));
  }

  if (failures.length > 0) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
    return;
  }

  const stringCount = Object.values(baseline).reduce(
    (total, strings) => total + strings.length,
    0,
  );
  console.log(
    `Copy guard passed: ${checkB.filesScanned} files scanned, ${stringCount} strings baselined.`,
  );
}

async function main() {
  const argumentsList = process.argv.slice(2);
  const writeMode = argumentsList.length === 1 && argumentsList[0] === "--write";

  if (argumentsList.length > 0 && !writeMode) {
    console.error("Usage: node scripts/copy-guard.mjs [--write]");
    process.exitCode = 1;
    return;
  }

  const extraction = await buildExtraction();
  if (writeMode) {
    await writeBaseline(extraction);
  } else {
    await runProof(extraction);
  }
}

main().catch((error) => {
  console.error(`Copy guard failed unexpectedly: ${error.stack ?? error.message}`);
  process.exitCode = 1;
});
