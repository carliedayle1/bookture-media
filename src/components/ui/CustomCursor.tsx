"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useCoarsePointer } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/components/providers/MotionProvider";

/**
 * Augmenting cursor — a small gold dot with a trailing ring that grows over
 * interactive elements. The native cursor is intentionally left visible (we
 * never set `cursor: none`), so this only ever enhances. Not mounted on touch
 * or under reduced motion.
 */
export function CustomCursor() {
  const coarse = useCoarsePointer();
  const reducedMotion = useReducedMotion();
  const disabled = coarse || reducedMotion;

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 300, damping: 28, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 300, damping: 28, mass: 0.4 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (disabled) {
      return;
    }
    const move = (e: PointerEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, input, textarea, [data-cursor]")));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerleave", leave);
    };
  }, [disabled, dotX, dotY]);

  if (disabled) {
    return null;
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.span
        className="border-gold-400/60 absolute -ml-4 -mt-4 block h-8 w-8 rounded-full border"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="bg-accent absolute -ml-[3px] -mt-[3px] block h-1.5 w-1.5 rounded-full"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
