"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import { useCoarsePointer } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/components/providers/MotionProvider";

type TiltCardProps = {
  maxTiltDeg?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Perspective tilt-on-hover using Framer Motion springs. Disabled on coarse
 * pointers and under reduced motion (renders as a plain container).
 */
export function TiltCard({ maxTiltDeg = 6, className, children }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const coarse = useCoarsePointer();
  const reducedMotion = useReducedMotion();
  const disabled = coarse || reducedMotion;

  const px = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const py = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const rotateX = useTransform(py, [-0.5, 0.5], [maxTiltDeg, -maxTiltDeg]);
  const rotateY = useTransform(px, [-0.5, 0.5], [-maxTiltDeg, maxTiltDeg]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ rotateX, rotateY }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width - 0.5);
        py.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
