/**
 * House easing curves — the single source of truth for motion feel.
 *
 * GSAP cannot parse `cubic-bezier(...)` strings, so each curve exists twice:
 *  1. As a named CustomEase (used by GSAP tweens: ease: "outExpo").
 *  2. As the raw bezier coordinates below (used by CSS via the --ease-* tokens
 *     in globals.css).
 *
 * KEEP IN SYNC with the --ease-* tokens in src/app/globals.css.
 */
import { CustomEase } from "gsap/CustomEase";

/** cubic-bezier control points, mirrored from globals.css --ease-* tokens. */
export const EASE = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutBook: [0.76, 0, 0.24, 1],
  gold: [0.33, 1, 0.68, 1],
} as const;

export type EaseName = keyof typeof EASE;

/** Convert cubic-bezier control points to a CustomEase SVG path string. */
function bezierToPath([x1, y1, x2, y2]: readonly number[]): string {
  return `M0,0 C${x1},${y1} ${x2},${y2} 1,1`;
}

let registered = false;

/**
 * Register every house curve as a named CustomEase. Idempotent and safe to call
 * on every import; only runs once. Invoked from src/lib/gsap.ts.
 */
export function registerHouseEases(): void {
  if (registered || typeof window === "undefined") {
    return;
  }
  for (const [name, points] of Object.entries(EASE)) {
    CustomEase.create(name, bezierToPath(points));
  }
  registered = true;
}
