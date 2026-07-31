"use client";

import { useEffect, useRef } from "react";
import FieldLoader from "../field/field-loader";
import {
  registerRegion,
  unregisterRegion,
} from "../field/field-controller";

// Temporary R2 proof route. Remove in a later Rock.
export default function FieldProbePage() {
  const probeRegion = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = probeRegion.current;
    if (!element) {
      return;
    }

    registerRegion("field-probe", element);
    return () => unregisterRegion("field-probe");
  }, []);

  return (
    <main ref={probeRegion} className="ttm-field-probe">
      <FieldLoader />
      <h1>[FISH: needs a line here]</h1>
    </main>
  );
}
