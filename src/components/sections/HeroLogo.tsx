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
      let end = { x: 24, y: 22, s: 1 };

      const layout = () => {
        const naturalW = el.offsetWidth;
        const naturalH = el.offsetHeight;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Dock target = the header's invisible logo spacer position, derived from
        // the real header element (avoids parsing rem/clamp CSS-var strings).
        const inner = document.querySelector<HTMLElement>("[data-header-inner]");
        let dockX = 24;
        let dockY = 22;
        if (inner) {
          const rect = inner.getBoundingClientRect();
          const padLeft = parseFloat(getComputedStyle(inner).paddingLeft) || 0;
          dockX = rect.left + padLeft; // unaffected by the header's vertical hide
          dockY = (inner.offsetHeight - naturalH) / 2;
        }

        const startS = Math.min(1.7, (vw * 0.72) / naturalW);
        start = { x: (vw - naturalW * startS) / 2, y: vh * 0.16, s: startS };
        end = { x: dockX, y: dockY, s: 1 };
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
        end: "+=45%",
        scrub: 0.6,
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
