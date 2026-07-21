"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type MotionContextValue = {
  /** True when the user prefers reduced motion. Gates all bespoke motion. */
  reducedMotion: boolean;
};

const MotionContext = createContext<MotionContextValue>({ reducedMotion: false });

/**
 * The central reduced-motion gate for the whole app.
 *
 *  - Stamps `data-motion="full|reduced"` on <html> so CSS ambient loops can be
 *    switched off centrally (see globals.css).
 *  - Wraps children in Framer Motion's <MotionConfig reducedMotion="user">,
 *    which disables all FM transform/layout animation globally with no
 *    per-component work.
 *  - Exposes `useReducedMotion()` for GSAP-driven code (via useAnimation).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduced" : "full";
  }, [reducedMotion]);

  return (
    <MotionContext.Provider value={{ reducedMotion }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </MotionContext.Provider>
  );
}

export function useReducedMotion(): boolean {
  return useContext(MotionContext).reducedMotion;
}
