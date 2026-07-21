"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/components/providers/MotionProvider";

type AmbientVideoProps = {
  src: string;
  /** Optional still shown under reduced motion (or before play). */
  poster?: string;
  className?: string;
};

/**
 * Background video that plays only while on screen (IntersectionObserver) and
 * never autoplays under reduced motion — in that case it renders the poster
 * still (or nothing, letting whatever sits behind it show through).
 *
 * SWAP POINT: point `src` at real bindery/studio b-roll when available.
 */
export function AmbientVideo({ src, poster, className }: AmbientVideoProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const video = ref.current;
    if (!video) {
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return poster ? (
      <div
        aria-hidden
        className={cn("bg-cover bg-center", className)}
        style={{ backgroundImage: `url(${poster})` }}
      />
    ) : null;
  }

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
    />
  );
}
