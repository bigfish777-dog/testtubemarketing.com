"use client";

import { useEffect } from "react";
import {
  registerRegion,
  unregisterRegion,
} from "./field-controller";

const FIELD_REGIONS = [
  ["homepage-hero", "#hero"],
  ["homepage-ladder", "#ladder"],
  ["homepage-footer", "footer.site.night"],
] as const;

export default function HomepageFieldRegions() {
  useEffect(() => {
    const registeredNames: string[] = [];

    FIELD_REGIONS.forEach(([name, selector]) => {
      const element = document.querySelector(selector);
      if (element) {
        registerRegion(name, element);
        registeredNames.push(name);
      }
    });

    return () => {
      registeredNames.forEach(unregisterRegion);
    };
  }, []);

  return null;
}
