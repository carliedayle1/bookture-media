"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const LenisContext = createContext<Lenis | null>(null);

/**
 * Smooth scroll wiring for the App Router.
 *
 * Lenis and GSAP share ONE requestAnimationFrame loop: Lenis runs with
 * `autoRaf: false` and is driven by GSAP's ticker, and every Lenis scroll
 * event pushes ScrollTrigger.update(). This is the canonical integration and
 * avoids two competing rAF loops.
 *
 * Under reduced motion we do not instantiate Lenis at all — native scrolling is
 * used, and ScrollTrigger works fine on it.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Fonts change text metrics; re-measure all triggers once they load.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) {
        ScrollTrigger.refresh();
      }
    });

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reducedMotion]);

  // On route change, jump to top and re-measure triggers for the new document.
  useEffect(() => {
    const instance = lenisRef.current;
    if (instance) {
      instance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [pathname]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Access the live Lenis instance (null under reduced motion or pre-mount). */
export function useLenisInstance(): Lenis | null {
  return useContext(LenisContext);
}
