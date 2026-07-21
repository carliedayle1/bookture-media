import { cn } from "@/lib/utils";

/**
 * Procedural atmospheric backdrop — layered radial gradients + vignette, in the
 * brand ink/gold palette. This is the deliberate placeholder for the cinematic
 * photography/AI imagery to come: each variant is a self-contained "scene" that
 * can be swapped for a <ParallaxImage> later without touching section layout.
 *
 * SWAP POINT: replace the gradient layers with real imagery in a later pass.
 */

type Variant = "library" | "desk" | "press" | "forest" | "hall";

const SCENES: Record<Variant, string> = {
  // Warm amber pendant pooling over deep navy — the reading room.
  library:
    "radial-gradient(120% 90% at 50% 8%, rgba(214,174,92,0.16), transparent 42%), radial-gradient(80% 70% at 78% 30%, rgba(196,154,74,0.10), transparent 55%), radial-gradient(140% 120% at 20% 100%, rgba(8,11,20,0.9), transparent 60%)",
  // A single desk lamp, tighter and lower.
  desk: "radial-gradient(90% 70% at 30% 20%, rgba(214,174,92,0.14), transparent 45%), radial-gradient(70% 60% at 70% 80%, rgba(19,18,32,0.6), transparent 60%)",
  // Cooler, machined light of the press floor.
  press: "radial-gradient(120% 90% at 70% 10%, rgba(150,150,170,0.08), transparent 45%), radial-gradient(90% 80% at 20% 60%, rgba(214,174,92,0.09), transparent 55%)",
  // Distant, dim — the forest/library depth.
  forest:
    "radial-gradient(140% 120% at 50% -10%, rgba(35,44,68,0.55), transparent 55%), radial-gradient(90% 90% at 50% 120%, rgba(214,174,92,0.06), transparent 60%)",
  // Grand hall, symmetric light from above.
  hall: "radial-gradient(100% 80% at 50% -5%, rgba(214,174,92,0.13), transparent 50%), radial-gradient(120% 120% at 50% 110%, rgba(8,11,20,0.85), transparent 55%)",
};

type AtmosphereBackgroundProps = {
  variant?: Variant;
  /** Darken the edges for a cinematic frame. */
  vignette?: boolean;
  /** Slow Ken Burns drift on the scene layer (ambient; off under reduced motion). */
  kenBurns?: boolean;
  className?: string;
};

export function AtmosphereBackground({
  variant = "library",
  vignette = true,
  kenBurns = false,
  className,
}: AtmosphereBackgroundProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className={cn("absolute inset-0", kenBurns && "ambient [animation:var(--animate-ken-burns)]")}
        style={{ backgroundImage: SCENES[variant] }}
      />
      {vignette ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 100% at 50% 45%, transparent 55%, rgba(4,6,12,0.85) 100%)",
          }}
        />
      ) : null}
    </div>
  );
}
