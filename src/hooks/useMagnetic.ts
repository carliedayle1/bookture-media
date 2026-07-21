"use client";

import { useCallback, useRef } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

import { useCoarsePointer } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/components/providers/MotionProvider";

type MagneticResult = {
  ref: React.RefObject<HTMLElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
  /** True when the effect is disabled (touch / reduced motion) — render static. */
  disabled: boolean;
};

/**
 * Cursor-follow "magnetic" pull for buttons and links. The element eases toward
 * the pointer within `strength` px of travel. Disabled on coarse pointers and
 * under reduced motion (returns still motion values at 0,0).
 */
export function useMagnetic(strength = 0.35): MagneticResult {
  const ref = useRef<HTMLElement | null>(null);
  const coarse = useCoarsePointer();
  const reducedMotion = useReducedMotion();
  const disabled = coarse || reducedMotion;

  const springConfig = { stiffness: 260, damping: 20, mass: 0.6 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el || disabled) {
        return;
      }
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      x.set(relX * strength);
      y.set(relY * strength);
    },
    [disabled, strength, x, y],
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x, y, onMouseMove, onMouseLeave, disabled };
}
