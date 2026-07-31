import type { ContextCounts } from "./field-controller";

interface ContextRecord {
  canvas: HTMLCanvasElement;
  live: boolean;
}

interface ContextRegistryState {
  contexts: WeakMap<object, ContextRecord>;
  canvasRecords: WeakMap<HTMLCanvasElement, ContextRecord>;
  instrumentedCanvases: WeakSet<HTMLCanvasElement>;
  counts: ContextCounts;
  installed: boolean;
}

declare global {
  interface Window {
    __ttmContextRegistryState?: ContextRegistryState;
  }
}

const fallbackCounts: ContextCounts = { live: 0, everCreated: 0 };

function isWebGLContextName(name: unknown): boolean {
  return (
    name === "webgl" ||
    name === "webgl2" ||
    name === "experimental-webgl"
  );
}

function createState(): ContextRegistryState {
  return {
    contexts: new WeakMap(),
    canvasRecords: new WeakMap(),
    instrumentedCanvases: new WeakSet(),
    counts: { live: 0, everCreated: 0 },
    installed: false,
  };
}

export function installContextRegistry(): ContextCounts {
  if (typeof window === "undefined" || typeof HTMLCanvasElement === "undefined") {
    return fallbackCounts;
  }

  const state =
    window.__ttmContextRegistryState ??
    (window.__ttmContextRegistryState = createState());

  if (state.installed) {
    return state.counts;
  }

  const prototype = HTMLCanvasElement.prototype;
  const originalGetContext = prototype.getContext;

  const wrappedGetContext = function (
    this: HTMLCanvasElement,
    ...args: unknown[]
  ): RenderingContext | null {
    const context = Reflect.apply(originalGetContext, this, args) as
      | RenderingContext
      | null;

    if (
      context &&
      typeof context === "object" &&
      isWebGLContextName(args[0]) &&
      !state.contexts.has(context)
    ) {
      const record: ContextRecord = { canvas: this, live: true };
      state.contexts.set(context, record);
      state.canvasRecords.set(this, record);
      state.counts.live += 1;
      state.counts.everCreated += 1;

      if (!state.instrumentedCanvases.has(this)) {
        state.instrumentedCanvases.add(this);

        this.addEventListener("webglcontextlost", () => {
          const current = state.canvasRecords.get(this);
          if (current?.live) {
            current.live = false;
            state.counts.live = Math.max(0, state.counts.live - 1);
          }
        });

        this.addEventListener("webglcontextrestored", () => {
          const current = state.canvasRecords.get(this);
          if (current && !current.live) {
            current.live = true;
            state.counts.live += 1;
          }
        });
      }
    }

    return context;
  };

  prototype.getContext = wrappedGetContext as typeof prototype.getContext;
  state.installed = true;
  return state.counts;
}

export const contextCounts = installContextRegistry();
