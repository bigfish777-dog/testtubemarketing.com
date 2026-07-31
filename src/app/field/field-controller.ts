export type FieldStatus = "idle" | "loading" | "live" | "fallback" | "lost";
export type FieldTier = "desktop" | "tablet" | "fallback";

export interface MetricSummary {
  p50: number | null;
  p95: number | null;
  p99: number | null;
  max: number | null;
  samples: number;
}

export interface FieldStats extends MetricSummary {
  cpuMs: MetricSummary;
  gpuMs: MetricSummary | null;
}

export interface ContextCounts {
  live: number;
  everCreated: number;
}

export interface FieldDebugSurface {
  status: FieldStatus;
  tier: FieldTier;
  contexts: ContextCounts;
  setProgress: (progress: number) => void;
  clearOverride: () => void;
  stats: FieldStats;
}

declare global {
  interface Window {
    __ttmField?: FieldDebugSurface;
  }
}

const morphProgress = { current: 0 };
let manualOverride = false;
let engineStatus: FieldStatus = "idle";
let debugSurface: FieldDebugSurface | null = null;
const regions = new Map<string, Element>();
const regionListeners = new Set<() => void>();

function emptySummary(): MetricSummary {
  return {
    p50: null,
    p95: null,
    p99: null,
    max: null,
    samples: 0,
  };
}

export const fieldStats: FieldStats = {
  ...emptySummary(),
  cpuMs: emptySummary(),
  gpuMs: null,
};

function clampProgress(progress: number): number {
  if (!Number.isFinite(progress)) {
    return morphProgress.current;
  }

  return Math.min(3, Math.max(0, progress));
}

export function getProgress(): number {
  return morphProgress.current;
}

export function setProgress(progress: number): void {
  if (!manualOverride) {
    morphProgress.current = clampProgress(progress);
  }
}

export function setManualProgress(progress: number): void {
  manualOverride = true;
  morphProgress.current = clampProgress(progress);
}

export function clearManualOverride(): void {
  manualOverride = false;
}

export function registerRegion(name: string, element: Element): void {
  regions.set(name, element);
  regionListeners.forEach((listener) => listener());
}

export function unregisterRegion(name: string): void {
  if (regions.delete(name)) {
    regionListeners.forEach((listener) => listener());
  }
}

export function getRegisteredRegions(): ReadonlyMap<string, Element> {
  return regions;
}

export function subscribeToRegions(listener: () => void): () => void {
  regionListeners.add(listener);
  return () => regionListeners.delete(listener);
}

export function getEngineStatus(): FieldStatus {
  return engineStatus;
}

export function setEngineStatus(status: FieldStatus): void {
  engineStatus = status;
  if (debugSurface) {
    debugSurface.status = status;
  }
}

export function setDebugTier(tier: FieldTier): void {
  if (debugSurface) {
    debugSurface.tier = tier;
  }
}

export function resetFieldStats(gpuAvailable = false): void {
  Object.assign(fieldStats, emptySummary());
  fieldStats.cpuMs = emptySummary();
  fieldStats.gpuMs = gpuAvailable ? emptySummary() : null;
}

export function attachDebugSurface(
  tier: FieldTier,
  contexts: ContextCounts,
): () => void {
  const surface: FieldDebugSurface = {
    status: engineStatus,
    tier,
    contexts,
    setProgress: setManualProgress,
    clearOverride: clearManualOverride,
    stats: fieldStats,
  };

  debugSurface = surface;
  window.__ttmField = surface;

  return () => {
    if (debugSurface === surface) {
      debugSurface = null;
    }
    if (window.__ttmField === surface) {
      delete window.__ttmField;
    }
  };
}
