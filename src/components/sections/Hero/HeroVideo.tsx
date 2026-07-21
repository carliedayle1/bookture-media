"use client";

import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Theme-aware hero loop. Plays hero-dark.mp4 / hero-light.mp4 depending on the
 * active theme (remounts on switch so the source swaps). AmbientVideo handles
 * IntersectionObserver play/pause and renders nothing under reduced motion, so
 * the procedural HeroPoster beneath it shows instead. A surface-coloured scrim
 * on the left keeps the headline legible in both themes.
 */
export function HeroVideo() {
  const { theme } = useTheme();
  const src = theme === "light" ? "/video/hero-light.mp4" : "/video/hero-dark.mp4";

  return (
    <>
      <AmbientVideo
        key={src}
        src={src}
        className="absolute inset-0 -z-[6] h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-[5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--surface-rgb) / 0.9), rgb(var(--surface-rgb) / 0.4) 55%, rgb(var(--surface-rgb) / 0.1))",
        }}
      />
    </>
  );
}
