/**
 * Mutable scroll-progress bridge from ScrollTrigger (React land) into the R3F
 * render loop (canvas land), without triggering React re-renders.
 *
 * The Hero's ScrollTrigger writes `heroScroll.progress` in its onUpdate; the
 * BookModel reads it inside useFrame. Never store this in React state — it
 * updates every frame.
 */
export const heroScroll = {
  /** 0 at hero top, 1 when the hero section has fully scrolled past. */
  progress: 0,
  /** Normalized pointer position (-1..1) for hero micro-parallax. */
  pointerX: 0,
  pointerY: 0,
};
