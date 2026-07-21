"use client";

import dynamic from "next/dynamic";

import { useReducedMotion } from "@/components/providers/MotionProvider";
import { ReachMap } from "./ReachMap";

// three.js globe stays in its own lazy chunk; only mounts client-side.
const GlobeCanvas = dynamic(() => import("@/components/canvas/GlobeCanvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * Chooses the reach visual: the spinning 3D globe when motion is allowed, or
 * the static animated SVG map under reduced motion.
 */
export function ReachVisual() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <ReachMap />;
  }
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <GlobeCanvas />
    </div>
  );
}
