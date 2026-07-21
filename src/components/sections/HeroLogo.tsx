"use client";

import { useRef } from "react";

import { Logo } from "@/components/ui/Logo";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { useLenis } from "@/hooks/useLenis";

/**
 * The brand logo starts enlarged and centered in the upper hero, then scrubs
 * down to its navbar resting spot as the hero scrolls away. SiteHeader keeps an
 * invisible logo spacer at the exact docking coordinates so the landing is
 * pixel-aligned.
 *
 * Under reduced motion the animation is skipped and the logo simply rests at
 * the docked position (its default inline transform).
 */
export function HeroLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();

  useAnimation(
    ({ root }) => {
      const el = root as HTMLElement;
      let start = { x: 0, y: 0, s: 1 };
      let end = { x: 0, y: 0, s: 1 };

      const readVar = (name: string, fallback: number) => {
        const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
        return Number.isFinite(v) ? v : fallback;
      };

      const layout = () => {
        const naturalW = el.offsetWidth;
        const naturalH = el.offsetHeight;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const gutter = readVar("--edge-gutter", 24);
        const headerH = readVar("--header-height", 80);
        const contentLeft = Math.max(gutter, (vw - Math.min(vw, 1408)) / 2 + gutter);
        const startS = Math.min(2, (vw * 0.82) / naturalW);
        start = { x: (vw - naturalW * startS) / 2, y: vh * 0.14, s: startS };
        end = { x: contentLeft, y: (headerH - naturalH) / 2, s: 1 };
      };

      const apply = (p: number) => {
        gsap.set(el, {
          x: gsap.utils.interpolate(start.x, end.x, p),
          y: gsap.utils.interpolate(start.y, end.y, p),
          scale: gsap.utils.interpolate(start.s, end.s, p),
          transformOrigin: "0% 0%",
        });
      };

      layout();
      const st = ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=72%",
        scrub: true,
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => {
          layout();
          apply(self.progress);
        },
      });
      apply(0);

      return () => st.kill();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-50 origin-top-left will-change-transform"
      style={{ transform: "translate(var(--edge-gutter), 22px)" }}
    >
      <button
        type="button"
        onClick={() => scrollTo(0)}
        aria-label="Bookture Media — home"
        className="pointer-events-auto block"
        data-cursor
      >
        <Logo variant="mark" height={34} withWordmark priority />
      </button>
    </div>
  );
}
