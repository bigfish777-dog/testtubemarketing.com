"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import {
  attachDebugSurface,
  setDebugTier,
  setEngineStatus,
  type FieldTier,
} from "./field-controller";
import { contextCounts, installContextRegistry } from "./context-registry";

interface SceneManagerProps {
  tier: Exclude<FieldTier, "fallback">;
}

type SceneManagerComponent = ComponentType<SceneManagerProps>;

interface FieldMode {
  enabled: boolean;
  tier: FieldTier;
}

installContextRegistry();

export default function FieldLoader() {
  const [mode, setMode] = useState<FieldMode>({
    enabled: false,
    tier: "fallback",
  });
  const [SceneManager, setSceneManager] =
    useState<SceneManagerComponent | null>(null);

  useEffect(() => {
    const detachDebugSurface = attachDebugSurface("fallback", contextCounts);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let resizeTimer: number | undefined;

    const evaluateMode = () => {
      const width = window.innerWidth;
      const enabled = width > 680 && !reducedMotion.matches;
      const tier: FieldTier = enabled
        ? width >= 1024
          ? "desktop"
          : "tablet"
        : "fallback";

      setDebugTier(tier);
      setMode((current) =>
        current.enabled === enabled && current.tier === tier
          ? current
          : { enabled, tier },
      );
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(evaluateMode, 150);
    };

    evaluateMode();
    window.addEventListener("resize", handleResize);
    reducedMotion.addEventListener("change", evaluateMode);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      reducedMotion.removeEventListener("change", evaluateMode);
      setEngineStatus("idle");
      detachDebugSurface();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!mode.enabled) {
      setEngineStatus("fallback");
      return;
    }

    if (SceneManager) {
      return;
    }

    setEngineStatus("loading");

    import("./scene-manager")
      .then((module) => {
        if (!cancelled) {
          setSceneManager(() => module.default);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setEngineStatus("fallback");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [mode.enabled, SceneManager]);

  const engineTier = mode.tier === "fallback" ? null : mode.tier;

  return (
    <div className="ttm-field-layer" aria-hidden="true">
      <div className="ttm-field-fallback" />
      {mode.enabled && SceneManager && engineTier ? (
        <SceneManager tier={engineTier} />
      ) : null}
    </div>
  );
}
