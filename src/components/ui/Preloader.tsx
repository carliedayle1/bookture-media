"use client";

import { useRef, useState } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

const SEEN_KEY = "bookture:intro-seen";

type PreloaderProps = {
  onComplete: () => void;
  minDurationMs?: number;
};

/**
 * Cinematic opener: the brand book+arrow monogram draws itself in gold stroke
 * (DrawSVG) while a counter ticks 0 → 100, then an ink curtain lifts to reveal
 * the hero.
 *
 *  - Skippable via any key/click/scroll.
 *  - Shown once per session (sessionStorage); repeat visits skip instantly.
 *  - Reduced motion is handled by the caller (PreloaderGate), which does not
 *    mount the Preloader at all in that case.
 */
export function Preloader({ onComplete, minDurationMs = 1900 }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [skippable, setSkippable] = useState(false);

  useGSAP(
    () => {
      // Repeat visits: skip instantly.
      if (sessionStorage.getItem(SEEN_KEY)) {
        onComplete();
        return;
      }

      const counter = { n: 0 };
      const writeCounter = () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counter.n)).padStart(2, "0");
        }
      };

      const finish = () => {
        sessionStorage.setItem(SEEN_KEY, "1");
        onComplete();
      };

      const tl = gsap.timeline({
        defaults: { ease: "inOutBook" },
        onComplete: finish,
      });

      tl.set(".mono-stroke", { visibility: "visible" })
        .fromTo(
          ".mono-stroke",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1.1, stagger: 0.06, ease: "outExpo" },
          0,
        )
        .to(counter, { n: 100, duration: minDurationMs / 1000, ease: "outExpo", onUpdate: writeCounter }, 0)
        .to(".preloader-progress", { scaleX: 1, duration: minDurationMs / 1000, ease: "outExpo" }, 0)
        // brief hold, then curtain lift
        .to(".preloader-content", { autoAlpha: 0, duration: 0.4 }, "+=0.15")
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "inOutBook" }, "<0.1");

      // Enable skipping after the first beat.
      const enable = gsap.delayedCall(0.4, () => setSkippable(true));

      const skip = () => {
        if (tl.progress() < 1) {
          tl.timeScale(3.5);
        }
      };
      window.addEventListener("keydown", skip);
      window.addEventListener("pointerdown", skip);
      window.addEventListener("wheel", skip, { passive: true });

      return () => {
        enable.kill();
        window.removeEventListener("keydown", skip);
        window.removeEventListener("pointerdown", skip);
        window.removeEventListener("wheel", skip);
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="bg-ink-950 fixed inset-0 z-[100] flex flex-col items-center justify-center"
      role="progressbar"
      aria-label="Loading"
    >
      <div className="preloader-content flex flex-col items-center">
        <svg
          width="150"
          height="150"
          viewBox="0 0 120 120"
          fill="none"
          className="text-gold-400 overflow-visible"
        >
          <g
            className="mono-stroke"
            style={{ visibility: "hidden" }}
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* open book */}
            <path d="M60 84 C 42 72 24 71 10 78" />
            <path d="M10 78 L 13 66 C 30 62 46 68 60 78" />
            <path d="M60 84 C 78 72 96 71 110 78" />
            <path d="M110 78 L 107 66 C 90 62 74 68 60 78" />
            <path d="M60 78 L 60 84" />
            {/* rising arrow */}
            <path d="M60 74 L 60 34" />
            <path d="M49 46 L 60 34 L 71 46" />
            {/* dissolving squares */}
            <path d="M74 30 h6 v6 h-6 Z" />
            <path d="M84 22 h5 v5 h-5 Z" />
            <path d="M92 15 h4 v4 h-4 Z" />
          </g>
        </svg>

        <div className="mt-10 flex flex-col items-center gap-4">
          <span className="text-parchment-100 font-mono text-sm tracking-[0.4em] tabular-nums">
            <span ref={counterRef}>00</span>
            <span className="text-gold-600"> / 100</span>
          </span>
          <span className="h-px w-40 overflow-hidden bg-white/10">
            <span className="preloader-progress bg-accent block h-full w-full origin-left scale-x-0" />
          </span>
          <span className="text-parchment-500 font-mono text-[0.6rem] tracking-[0.3em] uppercase">
            {skippable ? "Press any key to enter" : "Bookture Media"}
          </span>
        </div>
      </div>
    </div>
  );
}
