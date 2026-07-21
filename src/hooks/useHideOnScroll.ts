"use client";

import { useEffect, useState } from "react";

/**
 * Shared scroll-direction state for the header and the docked logo, so they
 * hide/show in sync. Hides on downward scroll past a threshold; reveals on
 * upward scroll. `scrolled` toggles the header's glass background.
 */
export function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 160 && y > last + 4);
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { hidden, scrolled };
}
