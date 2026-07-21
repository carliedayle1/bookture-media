import Image from "next/image";

import { cn } from "@/lib/utils";

type Scrim = "vignette" | "center" | "left" | "bottom" | "none";

type ThemedBackgroundProps = {
  /** Base filename in /public/images (without theme suffix), e.g. "reading-room". */
  name: string;
  /** Theme-aware legibility scrim (uses the page surface colour so it flips). */
  scrim?: Scrim;
  /** Slow Ken Burns drift (ambient; off under reduced motion). */
  kenBurns?: boolean;
  /** Prioritise loading (use for above-the-fold backgrounds only). */
  priority?: boolean;
  className?: string;
};

const SCRIMS: Record<Exclude<Scrim, "none">, string> = {
  vignette:
    "radial-gradient(120% 100% at 50% 45%, transparent 52%, rgb(var(--surface-rgb) / 0.72) 100%)",
  center:
    "radial-gradient(95% 95% at 50% 50%, rgb(var(--surface-rgb) / 0.5), rgb(var(--surface-rgb) / 0.85))",
  left: "linear-gradient(to right, rgb(var(--surface-rgb) / 0.88), rgb(var(--surface-rgb) / 0.35) 55%, transparent)",
  bottom: "linear-gradient(to top, rgb(var(--surface-rgb) / 0.92), transparent 42%)",
};

/**
 * Full-bleed background image that flips with the theme. Both the -dark and
 * -light variants are rendered; CSS shows the one matching the active theme.
 * A surface-coloured scrim keeps overlaid text legible in either theme.
 *
 * Expects /public/images/{name}-dark.png and {name}-light.png.
 */
export function ThemedBackground({
  name,
  scrim = "vignette",
  kenBurns = false,
  priority = false,
  className,
}: ThemedBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {(["dark", "light"] as const).map((theme) => (
        <div
          key={theme}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            theme === "dark" ? "themed-dark" : "themed-light",
            kenBurns && "ambient [animation:var(--animate-ken-burns)]",
          )}
        >
          <Image
            src={`/images/${name}-${theme}.png`}
            alt=""
            fill
            sizes="100vw"
            quality={80}
            priority={priority}
            className="object-cover"
          />
        </div>
      ))}
      {scrim !== "none" ? (
        <div className="absolute inset-0" style={{ backgroundImage: SCRIMS[scrim] }} />
      ) : null}
    </div>
  );
}
