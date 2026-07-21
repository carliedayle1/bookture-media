/**
 * The single source of GSAP for the entire app.
 *
 * Every other module MUST import gsap / useGSAP / plugins from here — an ESLint
 * `no-restricted-imports` rule enforces it. This guarantees plugins are
 * registered exactly once and avoids duplicate-registration warnings.
 *
 * Deliberately NOT registered:
 *  - ScrollSmoother — conflicts with Lenis (Lenis is our single scroll authority).
 *  - MorphSVG — no section requires path morphing.
 */
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";

import { registerHouseEases } from "./easing";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase);

  // Register the house easing curves as CustomEases (see easing.ts).
  registerHouseEases();

  // Avoid ScrollTrigger re-measuring on mobile URL-bar show/hide, which
  // otherwise causes pinned sections to jump.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase };
