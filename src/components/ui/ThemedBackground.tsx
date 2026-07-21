"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";

type Scrim = "vignette" | "center" | "left" | "bottom" | "none";

type ThemedBackgroundProps = {
  /** Base filename in /public/images (without theme suffix), e.g. "reading-room". */
  name: string;
  /** Theme-aware legibility scrim (uses the page surface colour so it flips). */
  scrim?: Scrim;
  /** Slow Ken Burns drift (ambient; off under reduced motion). */
  kenBurns?: boolean;
  /** Render a taller layer that a parent can scroll-parallax (class themed-parallax). */
  parallax?: boolean;
  /** Prioritise loading (above-the-fold only). */
  priority?: boolean;
  className?: string;
};

const SCRIMS: Record<Exclude<Scrim, "none">, string> = {
  vignette:
    "radial-gradient(120% 100% at 50% 45%, transparent 58%, rgb(var(--surface-rgb) / 0.6) 100%)",
  center:
    "radial-gradient(100% 100% at 50% 50%, rgb(var(--surface-rgb) / 0.22), rgb(var(--surface-rgb) / 0.6))",
  left: "linear-gradient(to right, rgb(var(--surface-rgb) / 0.88), rgb(var(--surface-rgb) / 0.35) 55%, transparent)",
  bottom: "linear-gradient(to top, rgb(var(--surface-rgb) / 0.85), transparent 38%)",
};

/**
 * Full-bleed background image that flips with the theme. Renders ONLY the
 * active theme's image (eager-loaded so backgrounds are ready — no lazy
 * pop-in), swapping on theme change. A surface-coloured scrim keeps overlaid
 * text legible in either theme.
 *
 * The parent that hosts this must establish a stacking context (isolate) so the
 * `-z-10` layer stays behind local content but doesn't escape the container.
 *
 * Expects /public/images/{name}-dark.png and {name}-light.png.
 */
export function ThemedBackground({
  name,
  scrim = "vignette",
  kenBurns = false,
  parallax = false,
  priority = false,
  className,
}: ThemedBackgroundProps) {
  const { theme } = useTheme();

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className={cn(
          parallax ? "themed-parallax absolute inset-x-0 -top-[15%] h-[130%]" : "absolute inset-0",
          kenBurns && "ambient [animation:var(--animate-ken-burns)]",
        )}
      >
        <Image
          key={theme}
          src={`/images/${name}-${theme}.png`}
          alt=""
          fill
          sizes="100vw"
          quality={85}
          priority={priority}
          className="object-cover"
        />
      </div>
      {scrim !== "none" ? (
        <div className="absolute inset-0" style={{ backgroundImage: SCRIMS[scrim] }} />
      ) : null}
    </div>
  );
}
