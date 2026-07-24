"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";

/*
 * Ambient ShaderGradient for the hero background (round 4c, Fish's direction
 * - replaces the pixelated beaker, which read as a feature not a background).
 *
 * Fish's exact ShaderGradient config (TTM palette: fushia -> amber -> a cool
 * accent), rendered as a SUPER SOFT wash - opacity is held low in globals.css
 * (.hero-gradient) so it whispers behind the headline rather than competing.
 *
 * SSR-safe: "use client" + the R3F/ShaderGradient modules are imported inside
 * an effect so nothing touches `window` on the server (same approach as the
 * old beaker). Reduced motion freezes the animation; <=680px skips WebGL and
 * lets the CSS mesh gradient carry mobile.
 */

// Fish-supplied config (his current gradient style). Kept verbatim except
// `animate`, which reduced-motion overrides at runtime.
const CONFIG = {
  animate: "on",
  axesHelper: "off",
  brightness: 1.3,
  cAzimuthAngle: 180,
  cDistance: 5.41,
  cPolarAngle: 90,
  cameraZoom: 1,
  color1: "#FF0D64",
  color2: "#FFA71A",
  color3: "#78fff6",
  destination: "onCanvas",
  embedMode: "off",
  envPreset: "lobby",
  format: "gif",
  fov: 45,
  frameRate: 10,
  gizmoHelper: "hide",
  grain: "on",
  lightType: "3d",
  pixelDensity: 1.4,
  positionX: -1.4,
  positionY: 0,
  positionZ: 0,
  range: "disabled",
  rangeEnd: 26.7,
  rangeStart: 0,
  reflection: 0.1,
  rotationX: 0,
  rotationY: 10,
  rotationZ: 50,
  shader: "defaults",
  type: "plane",
  uAmplitude: 1,
  uDensity: 0.9,
  uFrequency: 5.5,
  uStrength: 1.9,
  uTime: 0,
  wireframe: false,
} as const;

type SGModule = {
  ShaderGradientCanvas: ComponentType<Record<string, unknown>>;
  ShaderGradient: ComponentType<Record<string, unknown>>;
};

export function HeroGradient() {
  const [mod, setMod] = useState<SGModule | null>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Mobile / tiny viewports: skip WebGL, keep the CSS mesh gradient.
    if (window.matchMedia("(max-width: 680px)").matches) return;
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let alive = true;
    import("@shadergradient/react").then((m) => {
      if (alive) {
        setMod({
          ShaderGradientCanvas: m.ShaderGradientCanvas as ComponentType<
            Record<string, unknown>
          >,
          ShaderGradient: m.ShaderGradient as ComponentType<
            Record<string, unknown>
          >,
        });
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!mod) return null;
  const { ShaderGradientCanvas, ShaderGradient } = mod;

  return (
    <div className="hero-gradient" aria-hidden="true">
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <ShaderGradient {...CONFIG} animate={reduce ? "off" : "on"} />
      </ShaderGradientCanvas>
    </div>
  );
}
