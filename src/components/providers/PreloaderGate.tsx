"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Preloader } from "@/components/ui/Preloader";
import { useReducedMotion } from "./MotionProvider";
import { useLenis } from "@/hooks/useLenis";

/**
 * Renders children immediately (so content/LCP exist underneath) and overlays
 * the Preloader on first paint. Scroll is locked until the preloader completes.
 * Only runs on the home page (legal/policy pages skip the intro), and is
 * skipped entirely under reduced motion.
 */
export function PreloaderGate({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [done, setDone] = useState(false);
  const { lenis } = useLenis();

  const active = !reducedMotion && !done && pathname === "/";

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
