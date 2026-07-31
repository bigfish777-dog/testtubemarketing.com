"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import {
  fieldStats,
  getProgress,
  getRegisteredRegions,
  resetFieldStats,
  setEngineStatus,
  subscribeToRegions,
  type FieldTier,
  type MetricSummary,
} from "./field-controller";
import { FIELD_LUMINANCE_CEILING } from "./visual-constants";

interface SceneManagerProps {
  tier: Exclude<FieldTier, "fallback">;
}

interface TimerExtension {
  TIME_ELAPSED_EXT: number;
  GPU_DISJOINT_EXT: number;
}

interface PendingGpuQuery {
  query: WebGLQuery;
  record: boolean;
}

interface GpuTimer {
  context: WebGL2RenderingContext;
  extension: TimerExtension;
  pending: PendingGpuQuery[];
}

interface BoundaryProps {
  children: ReactNode;
}

interface BoundaryState {
  failed: boolean;
}

class SceneBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  componentDidCatch(): void {
    setEngineStatus("fallback");
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const POINT_ALPHA_MAX = 0.44;
const ADDITIVE_ACCUMULATION_DECAY = 0.1;

const CAMERA_STATES = [
  {
    xAmplitude: 0.22,
    yAmplitude: 0.08,
    zAmplitude: 0.06,
    speed: 0.09,
    phase: 0,
    targetY: -0.12,
  },
  {
    xAmplitude: 0.3,
    yAmplitude: 0.12,
    zAmplitude: 0.05,
    speed: 0.075,
    phase: 1.2,
    targetY: 0,
  },
  {
    xAmplitude: 0.16,
    yAmplitude: 0.06,
    zAmplitude: 0.1,
    speed: 0.06,
    phase: 2.4,
    targetY: -0.34,
  },
  {
    xAmplitude: 0.28,
    yAmplitude: 0.16,
    zAmplitude: 0.08,
    speed: 0.08,
    phase: 3.4,
    targetY: -0.08,
  },
] as const;

const vertexShader = `
  attribute vec3 aSeed;
  uniform float uPointSize;
  uniform float uPixelRatio;
  uniform float uFieldScale;
  uniform float uProgress;
  uniform float uTime;

  const float PI = 3.141592653589793;
  const float TAU = 6.283185307179586;

  varying float vBrightness;
  varying float vColourMix;
  varying float vGrainSeed;
  varying float vDomeAlphaScale;

  float hashSeed(vec3 seed) {
    return fract(sin(dot(seed, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
  }

  vec4 domeState(vec3 seed, out float alphaScale) {
    float azimuth = seed.x * TAU;
    float shellHeight = seed.y * 2.0 - 1.0;
    float polarAngle = acos(clamp(shellHeight, -1.0, 1.0));
    float ringRadius = sqrt(max(0.0, 1.0 - shellHeight * shellHeight));
    float ripplePhase = polarAngle * 15.0 - uTime * 0.64;
    float rippleWave = sin(ripplePhase);
    float ripple =
      rippleWave * 0.085 +
      sin(polarAngle * 29.0 + uTime * 0.3) * 0.022;
    float shellRadius = 2.9 + ripple + (seed.z - 0.5) * 0.024;
    vec3 position = vec3(
      cos(azimuth) * ringRadius * shellRadius,
      shellHeight * shellRadius - 0.1,
      sin(azimuth) * ringRadius * shellRadius
    );

    vec3 shellNormal = normalize(vec3(
      cos(azimuth) * ringRadius,
      shellHeight,
      sin(azimuth) * ringRadius
    ));
    vec3 viewNormal = normalize(mat3(modelViewMatrix) * shellNormal);
    vec3 viewPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    float facing = abs(dot(viewNormal, normalize(-viewPosition)));
    float limb = smoothstep(0.08, 0.78, 1.0 - facing);
    float rippleCrest = smoothstep(-0.55, 0.85, rippleWave);

    alphaScale =
      mix(0.018, 1.0, pow(limb, 1.25)) *
      mix(0.32, 1.0, rippleCrest);
    float shellLight = max(limb, rippleCrest * 0.82);
    return vec4(position, 0.48 + shellLight * 0.52);
  }

  vec4 helixState(vec3 seed) {
    float strandY = mix(-3.2, 3.2, seed.y);
    float strandSide = step(0.5, seed.x);
    float strandAngle = strandY * 2.55 + strandSide * PI + uTime * 0.28;
    float strandJitterAngle = hashSeed(seed) * TAU;
    float strandThickness = (seed.z - 0.59) * 0.13;
    float strandRadius = 1.38 + cos(strandJitterAngle) * strandThickness;
    vec3 strand = vec3(
      cos(strandAngle) * strandRadius,
      strandY + sin(strandJitterAngle) * abs(strandThickness),
      sin(strandAngle) * strandRadius
    );

    float rungCount = 21.0;
    float rungIndex = floor(seed.y * rungCount);
    float rungY = mix(-3.08, 3.08, (rungIndex + 0.5) / rungCount);
    float rungAngle = rungY * 2.55 + uTime * 0.28;
    float acrossRung = seed.x * 2.0 - 1.0;
    vec3 rung = vec3(
      cos(rungAngle) * 1.38 * acrossRung,
      rungY + (hashSeed(seed.yzx) - 0.5) * 0.045,
      sin(rungAngle) * 1.38 * acrossRung
    );

    float isRung = 1.0 - step(0.18, seed.z);
    vec3 position = mix(strand, rung, isRung);
    return vec4(position, mix(1.0, 0.7, isRung));
  }

  vec4 terrainState(vec3 seed) {
    float x = mix(-5.8, 5.8, seed.x);
    float z = mix(-3.8, 3.7, seed.y);
    float ridgeCentre = sin(x * 0.48 + uTime * 0.08) * 0.62;
    float ridge = 1.0 - smoothstep(0.12, 0.95, abs(z - ridgeCentre));
    float broadWave =
      sin(x * 0.72 + uTime * 0.1) * 0.36 +
      cos(z * 0.68 - uTime * 0.075) * 0.28 +
      sin((x + z) * 1.24) * 0.13;
    float height = -1.62 + broadWave + ridge * 0.58;
    height += (seed.z - 0.5) * 0.045;
    return vec4(vec3(x, height, z), 0.72 + ridge * 0.28);
  }

  vec4 vortexState(vec3 seed) {
    float radialProgress = pow(seed.x, 0.31);
    float radius = mix(0.72, 4.35, radialProgress);
    float armCount = 7.0;
    float armCell = floor(seed.y * armCount);
    float armScatter = fract(seed.y * armCount) - 0.5;
    float angle =
      armCell * (TAU / armCount) +
      radius * 1.42 +
      armScatter * 0.68 +
      uTime * 0.16;
    float wellDepth = pow(1.0 - radialProgress, 1.45);
    vec3 position = vec3(
      cos(angle) * radius,
      sin(angle) * radius * 0.78 - 0.22,
      -wellDepth * 3.4 + sin(angle * 2.0) * 0.06
    );
    float rimLight = smoothstep(0.42, 0.92, radialProgress);
    return vec4(position, 0.68 + rimLight * 0.32);
  }

  void main() {
    float progress = clamp(uProgress, 0.0, 3.0);
    float segment = floor(min(progress, 2.99999));
    float segmentProgress = progress - segment;
    float morph = smoothstep(0.0, 1.0, segmentProgress);
    vec4 stateA;
    vec4 stateB;
    float domeAlphaScale = 1.0;

    if (segment < 0.5) {
      stateA = domeState(aSeed, domeAlphaScale);
      stateB = helixState(aSeed);
    } else if (segment < 1.5) {
      stateA = helixState(aSeed);
      stateB = terrainState(aSeed);
    } else {
      stateA = terrainState(aSeed);
      stateB = vortexState(aSeed);
    }

    vec4 fieldState = mix(stateA, stateB, morph);
    vDomeAlphaScale =
      segment < 0.5 ? mix(domeAlphaScale, 1.0, morph) : 1.0;
    vec3 fieldPosition = fieldState.xyz * uFieldScale;
    float lateralPole = smoothstep(-2.8, 2.8, fieldPosition.x);
    float depthPole = smoothstep(-3.4, 3.4, fieldPosition.z);
    float stablePole = smoothstep(0.08, 0.92, aSeed.z);
    vColourMix = smoothstep(
      0.08,
      0.92,
      lateralPole * 0.56 + stablePole * 0.26 + depthPole * 0.18
    );
    vBrightness = clamp(fieldState.w, 0.0, 1.0);
    vGrainSeed = hashSeed(aSeed.zxy);

    vec4 viewPosition = modelViewMatrix * vec4(fieldPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = clamp(
      uPointSize * uPixelRatio * (7.0 / -viewPosition.z),
      1.0,
      5.5
    );
  }
`;

const fragmentShader = `
  uniform vec3 uWarmColour;
  uniform vec3 uCoolColour;
  uniform float uTime;
  uniform float uPointAlphaMax;
  uniform float uAccumulationDecay;
  uniform float uLuminanceCeiling;

  varying float vBrightness;
  varying float vColourMix;
  varying float vGrainSeed;
  varying float vDomeAlphaScale;

  const vec3 LUMINANCE_WEIGHTS = vec3(0.2126, 0.7152, 0.0722);

  float grain(vec2 coordinate, float tick) {
    vec2 cell = floor(coordinate * 0.72);
    return fract(
      sin(dot(cell + vec2(tick, vGrainSeed * 97.0), vec2(12.9898, 78.233))) *
      43758.5453
    );
  }

  vec3 limitLuminance(vec3 colour, float ceiling) {
    float luminance = dot(colour, LUMINANCE_WEIGHTS);
    return colour * min(1.0, ceiling / max(luminance, 0.0001));
  }

  void main() {
    float distanceFromCentre = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.16, 0.5, distanceFromCentre);
    if (alpha <= 0.0) discard;

    float animatedGrain = grain(gl_FragCoord.xy, floor(uTime * 12.0));
    float grainEnergy = mix(0.93, 1.05, animatedGrain);
    vec3 colour = mix(uWarmColour, uCoolColour, vColourMix) * grainEnergy;

    // The blend recurrence is bounded by this per-source luminance limit:
    // L(next) = L(source) * alpha + L(previous) * (1.0 - decay).
    float sourceLuminanceLimit =
      uLuminanceCeiling * uAccumulationDecay / uPointAlphaMax;
    colour = limitLuminance(colour, sourceLuminanceLimit);
    alpha *=
      uPointAlphaMax *
      mix(0.72, 1.0, vBrightness) *
      vDomeAlphaScale;
    gl_FragColor = vec4(colour, alpha);
  }
`;

function summary(values: number[]): MetricSummary {
  if (values.length === 0) {
    return {
      p50: null,
      p95: null,
      p99: null,
      max: null,
      samples: 0,
    };
  }

  const ordered = [...values].sort((left, right) => left - right);
  const percentile = (value: number) =>
    ordered[
      Math.min(
        ordered.length - 1,
        Math.max(0, Math.ceil(value * ordered.length) - 1),
      )
    ];

  return {
    p50: percentile(0.5),
    p95: percentile(0.95),
    p99: percentile(0.99),
    max: ordered[ordered.length - 1],
    samples: ordered.length,
  };
}

function publishMetrics(
  frameGaps: number[],
  cpuTimes: number[],
  gpuTimes: number[] | null,
): void {
  const frameSummary = summary(frameGaps);
  Object.assign(fieldStats, frameSummary);
  fieldStats.cpuMs = summary(cpuTimes);
  fieldStats.gpuMs = gpuTimes ? summary(gpuTimes) : null;
}

function disposeMaterialTextures(material: THREE.ShaderMaterial): void {
  Object.values(material.uniforms).forEach(({ value }) => {
    if (value instanceof THREE.Texture) {
      value.dispose();
    }
  });
}

function ParticleField({
  count,
  gpuTimer,
}: {
  count: number;
  gpuTimer: React.MutableRefObject<GpuTimer | null>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const metrics = useRef({
    frames: 0,
    lastFrameAt: 0,
    frameGaps: [] as number[],
    cpuTimes: [] as number[],
    gpuTimes: null as number[] | null,
  });

  const geometry = useMemo(() => {
    const nextGeometry = new THREE.BufferGeometry();
    const seeds = new Float32Array(count * 3);
    const positions = new Float32Array(count * 3);
    let randomState = 0x2f6e2b1;

    for (let index = 0; index < seeds.length; index += 1) {
      randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
      seeds[index] = randomState / 4294967296;
    }

    nextGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    nextGeometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 3));
    return nextGeometry;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uPointSize: { value: 1.9 },
          uPixelRatio: { value: 1 },
          uFieldScale: { value: 1 },
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uWarmColour: { value: new THREE.Color("#FF0D64") },
          uCoolColour: { value: new THREE.Color("#326BFF") },
          uPointAlphaMax: { value: POINT_ALPHA_MAX },
          uAccumulationDecay: { value: ADDITIVE_ACCUMULATION_DECAY },
          uLuminanceCeiling: { value: FIELD_LUMINANCE_CEILING },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.CustomBlending,
        blendEquation: THREE.AddEquation,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneMinusConstantAlphaFactor,
        blendEquationAlpha: THREE.AddEquation,
        blendSrcAlpha: THREE.OneFactor,
        blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
        blendAlpha: ADDITIVE_ACCUMULATION_DECAY,
      }),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useEffect(() => {
    materialRef.current = material;
    return () => {
      materialRef.current = null;
      disposeMaterialTextures(material);
      material.dispose();
    };
  }, [material]);

  useFrame((state) => {
    const cpuStartedAt = performance.now();
    const now = cpuStartedAt;
    const currentMetrics = metrics.current;
    const timer = gpuTimer.current;

    currentMetrics.frames += 1;
    const shouldRecord = currentMetrics.frames > 30;

    if (shouldRecord && currentMetrics.lastFrameAt > 0) {
      currentMetrics.frameGaps.push(now - currentMetrics.lastFrameAt);
    }
    currentMetrics.lastFrameAt = now;

    if (materialRef.current) {
      const uniforms = materialRef.current.uniforms;
      const progress = getProgress();
      const elapsed = state.clock.getElapsedTime();
      const stateIndex = Math.min(2, Math.floor(progress));
      const stateProgress = progress - stateIndex;
      const easedProgress =
        stateProgress * stateProgress * (3 - 2 * stateProgress);
      const cameraA = CAMERA_STATES[stateIndex];
      const cameraB = CAMERA_STATES[stateIndex + 1];
      const cameraBlend = (left: number, right: number) =>
        THREE.MathUtils.lerp(left, right, easedProgress);
      const orbitA = elapsed * cameraA.speed + cameraA.phase;
      const orbitB = elapsed * cameraB.speed + cameraB.phase;

      uniforms.uPixelRatio.value = state.gl.getPixelRatio();
      uniforms.uProgress.value = progress;
      uniforms.uTime.value = elapsed;

      state.camera.position.set(
        cameraBlend(
          Math.sin(orbitA) * cameraA.xAmplitude,
          Math.sin(orbitB) * cameraB.xAmplitude,
        ),
        cameraBlend(
          Math.cos(orbitA * 0.73) * cameraA.yAmplitude,
          Math.cos(orbitB * 0.73) * cameraB.yAmplitude,
        ),
        8.5 +
          cameraBlend(
            Math.sin(orbitA * 0.61) * cameraA.zAmplitude,
            Math.sin(orbitB * 0.61) * cameraB.zAmplitude,
          ),
      );
      state.camera.lookAt(
        0,
        cameraBlend(cameraA.targetY, cameraB.targetY),
        0,
      );
    }

    if (timer) {
      if (currentMetrics.gpuTimes === null) {
        currentMetrics.gpuTimes = [];
      }

      const disjoint = timer.context.getParameter(
        timer.extension.GPU_DISJOINT_EXT,
      ) as boolean;

      while (timer.pending.length > 0) {
        const pending = timer.pending[0];
        const available = timer.context.getQueryParameter(
          pending.query,
          timer.context.QUERY_RESULT_AVAILABLE,
        ) as boolean;

        if (!available) {
          break;
        }

        timer.pending.shift();
        if (!disjoint && pending.record) {
          const nanoseconds = timer.context.getQueryParameter(
            pending.query,
            timer.context.QUERY_RESULT,
          ) as number;
          currentMetrics.gpuTimes.push(nanoseconds / 1_000_000);
        }
        timer.context.deleteQuery(pending.query);
      }
    }

    const query = timer?.context.createQuery() ?? null;
    if (timer && query) {
      timer.context.beginQuery(timer.extension.TIME_ELAPSED_EXT, query);
    }

    state.gl.render(state.scene, state.camera);

    if (timer && query) {
      timer.context.endQuery(timer.extension.TIME_ELAPSED_EXT);
      timer.pending.push({ query, record: shouldRecord });
    }

    if (shouldRecord) {
      currentMetrics.cpuTimes.push(performance.now() - cpuStartedAt);
      if (
        currentMetrics.frameGaps.length < 120 ||
        currentMetrics.frameGaps.length % 30 === 0
      ) {
        publishMetrics(
          currentMetrics.frameGaps,
          currentMetrics.cpuTimes,
          currentMetrics.gpuTimes,
        );
      }
    }
  }, 1);

  return (
    <points
      geometry={geometry}
      material={material}
      frustumCulled={false}
      dispose={null}
    />
  );
}

function useFieldPaused(): boolean {
  const [documentHidden, setDocumentHidden] = useState(
    () => document.visibilityState === "hidden",
  );
  const [hasVisibleRegion, setHasVisibleRegion] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      setDocumentHidden(document.visibilityState === "hidden");
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const intersectionByElement = new Map<Element, boolean>();
    const observed = new Set<Element>();

    const updateVisibleState = () => {
      setHasVisibleRegion(
        [...intersectionByElement.values()].some(Boolean),
      );
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        intersectionByElement.set(entry.target, entry.isIntersecting);
      });
      updateVisibleState();
    });

    const syncRegions = () => {
      const nextElements = new Set(getRegisteredRegions().values());

      observed.forEach((element) => {
        if (!nextElements.has(element)) {
          observer.unobserve(element);
          observed.delete(element);
          intersectionByElement.delete(element);
        }
      });

      nextElements.forEach((element) => {
        if (!observed.has(element)) {
          const bounds = element.getBoundingClientRect();
          const initiallyVisible =
            bounds.bottom > 0 &&
            bounds.right > 0 &&
            bounds.top < window.innerHeight &&
            bounds.left < window.innerWidth;

          observed.add(element);
          intersectionByElement.set(element, initiallyVisible);
          observer.observe(element);
        }
      });

      updateVisibleState();
    };

    syncRegions();
    const unsubscribe = subscribeToRegions(syncRegions);

    return () => {
      unsubscribe();
      observer.disconnect();
    };
  }, []);

  return documentHidden || !hasVisibleRegion;
}

function CanvasFallbackStatus() {
  useEffect(() => {
    setEngineStatus("fallback");
  }, []);
  return null;
}

export default function SceneManager({ tier }: SceneManagerProps) {
  const paused = useFieldPaused();
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const rendererCleanup = useRef<(() => void) | null>(null);
  const gpuTimer = useRef<GpuTimer | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const particleCount = tier === "desktop" ? 120_000 : 45_000;

  const handleCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      renderer.current = gl;
      const canvas = gl.domElement;

      const handleContextLost = (event: Event) => {
        event.preventDefault();
        setContextLost(true);
        setEngineStatus("lost");
      };

      const handleContextRestored = () => {
        setContextLost(false);
        setEngineStatus("live");
      };

      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);

      const context = gl.getContext();
      if (
        typeof WebGL2RenderingContext !== "undefined" &&
        context instanceof WebGL2RenderingContext
      ) {
        const extension = context.getExtension(
          "EXT_disjoint_timer_query_webgl2",
        ) as TimerExtension | null;
        if (extension) {
          gpuTimer.current = { context, extension, pending: [] };
        }
      }

      resetFieldStats(gpuTimer.current !== null);
      setEngineStatus("live");

      rendererCleanup.current = () => {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener(
          "webglcontextrestored",
          handleContextRestored,
        );
      };
    },
    [],
  );

  useEffect(
    () => () => {
      const gl = renderer.current;
      if (!gl) {
        return;
      }

      rendererCleanup.current?.();
      rendererCleanup.current = null;

      const timer = gpuTimer.current;
      if (timer) {
        timer.pending.forEach(({ query }) => {
          timer.context.deleteQuery(query);
        });
        timer.pending.length = 0;
        gpuTimer.current = null;
      }

      gl.renderLists.dispose();
      gl.dispose();
      gl.forceContextLoss();
      renderer.current = null;
    },
    [],
  );

  return (
    <div
      className={`ttm-field-engine${contextLost ? " is-lost" : ""}`}
    >
      <SceneBoundary>
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 54, near: 0.1, far: 30 }}
          dpr={[1, 1.75]}
          frameloop={paused || contextLost ? "never" : "always"}
          fallback={<CanvasFallbackStatus />}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
          }}
          onCreated={handleCreated}
        >
          <ParticleField count={particleCount} gpuTimer={gpuTimer} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
