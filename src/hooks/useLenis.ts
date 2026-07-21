"use client";

import { useCallback } from "react";

import { useLenisInstance } from "@/components/providers/SmoothScrollProvider";

type ScrollTarget = string | number | HTMLElement;

/**
 * Programmatic scrolling for anchor nav, "skip intro", and back-to-top.
 * Falls back to native scrolling when Lenis is absent (reduced motion).
 */
export function useLenis() {
  const lenis = useLenisInstance();

  const scrollTo = useCallback(
    (target: ScrollTarget, options?: { offset?: number; immediate?: boolean }) => {
      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? 0,
          immediate: options?.immediate ?? false,
        });
        return;
      }

      // Native fallback (reduced motion / pre-mount).
      const el =
        typeof target === "string"
          ? document.querySelector(target)
          : typeof target === "number"
            ? null
            : target;
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: options?.immediate ? "auto" : "smooth" });
      } else if (el instanceof HTMLElement) {
        const top = el.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0);
        window.scrollTo({ top, behavior: options?.immediate ? "auto" : "smooth" });
      }
    },
    [lenis],
  );

  return { lenis, scrollTo };
}
