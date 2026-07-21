"use client";

import { useRef } from "react";
import Image from "next/image";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { useLenis } from "@/hooks/useLenis";
import markSrc from "../../../public/brand/bookture-mark.png";

// Rendered LARGE and scaled DOWN — downscaling a transform stays crisp, upscaling
// never does (that was the pixelation). Hero shows it near full size; it docks to
// the navbar at DOCK_SCALE.
const MARK_H = 92;
const DOCK_SCALE = 0.5;

export function HeroLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();

  useAnimation(
    ({ root }) => {
      const el = root as HTMLElement;
      let start = { x: 0, y: 0, s: 1 };
      let end = { x: 24, y: 22, s: DOCK_SCALE };

      const layout = () => {
        const nW = el.offsetWidth;
        const nH = el.offsetHeight;
        const vw = window.innerWidth;

        const inner = document.querySelector<HTMLElement>("[data-header-inner]");
        let dockX = 24;
        let dockY = 22;
        if (inner) {
          const rect = inner.getBoundingClientRect();
          const padLeft = parseFloat(getComputedStyle(inner).paddingLeft) || 0;
          dockX = rect.left + padLeft;
          dockY = (inner.offsetHeight - nH * DOCK_SCALE) / 2;
        }

        // Full size on desktop; shrink to fit narrow screens. Never upscales.
        const startS = Math.min(1, (vw * 0.9) / nW);
        start = { x: (vw - nW * startS) / 2, y: 104, s: startS };
        end = { x: dockX, y: dockY, s: DOCK_SCALE };
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
      style={{ transform: `translate(var(--edge-gutter), 22px) scale(${DOCK_SCALE})` }}
    >
      <button
        type="button"
        onClick={() => scrollTo(0)}
        aria-label="Bookture Media — home"
        className="pointer-events-auto flex items-center gap-4"
        data-cursor
      >
        <Image
          src={markSrc}
          alt=""
          height={MARK_H}
          width={Math.round((MARK_H * markSrc.width) / markSrc.height)}
          priority
          unoptimized
        />
        <span className="font-display text-parchment-100 whitespace-nowrap text-[2.7rem] leading-none font-medium tracking-wide">
          Bookture <span className="text-accent italic">Media</span>
        </span>
      </button>
    </div>
  );
}
