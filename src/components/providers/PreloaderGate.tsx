"use client";

import { useEffect, useState, type ReactNode } from "react";

import { Preloader } from "@/components/ui/Preloader";
import { useReducedMotion } from "./MotionProvider";
import { useLenis } from "@/hooks/useLenis";

/**
 * Renders children immediately (so content/LCP exist underneath) and overlays
 * the Preloader on first paint. Scroll is locked until the preloader completes.
 * Under reduced motion the preloader is skipped entirely.
 */
export function PreloaderGate({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [done, setDone] = useState(false);
  const { lenis } = useLenis();

  const active = !reducedMotion && !done;

  useEffect(() => {
    if (!active) {
      return;
    }
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [active, lenis]);

  return (
    <>
      {children}
      {active ? <Preloader onComplete={() => setDone(true)} /> : null}
    </>
  );
}
