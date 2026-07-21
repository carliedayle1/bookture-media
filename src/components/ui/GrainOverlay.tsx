/**
 * Full-viewport film-grain overlay — the cheapest, highest-impact "cinematic"
 * multiplier: one fixed element, no JS, no per-frame cost.
 *
 * Implementation note: a *small* SVG turbulence tile is rasterized once and
 * tiled by CSS. We deliberately avoid a full-viewport live <feTurbulence>,
 * which re-rasterizes ~1M+ pixels of fractal noise and can peg/stall the
 * renderer. Static by design (animated grain is expensive and battery-hostile).
 */

// 120×120 grayscale fractal-noise tile as a data URI.
const NOISE_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-soft-light"
      style={{
        backgroundImage: NOISE_TILE,
        backgroundRepeat: "repeat",
        backgroundSize: "120px 120px",
        contain: "strict",
      }}
    />
  );
}
