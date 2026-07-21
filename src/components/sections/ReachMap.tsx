"use client";

import { useRef } from "react";

import { gsap } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { reachContent } from "@/lib/content";

const W = 1000;
const H = 500;

/** Equirectangular projection of lat/lng into the viewBox. */
function project(lat: number, lng: number) {
  return { x: ((lng + 180) / 360) * W, y: ((90 - lat) / 180) * H };
}

/**
 * Animated SVG reach map — a graticule field with pulsing hub dots and gold
 * distribution arcs that draw themselves (DrawSVG) when scrolled into view.
 * A stylized stand-in for a landmass map; reads as "global reach" without the
 * weight of a second 3D scene.
 */
export function ReachMap() {
  const scope = useRef<SVGSVGElement>(null);

  const hubs = reachContent.hubs.map((h) => ({ ...h, ...project(h.lat, h.lng) }));
  const primary = hubs.find((h) => h.city === "London") ?? hubs[0];
  const arcs = hubs
    .filter((h) => h.city !== primary.city)
    .map((h) => {
      const cx = (primary.x + h.x) / 2;
      const cy = Math.min(primary.y, h.y) - Math.abs(h.x - primary.x) * 0.22 - 30;
      return `M ${primary.x} ${primary.y} Q ${cx} ${cy} ${h.x} ${h.y}`;
    });

  const latLines = [100, 150, 200, 250, 300, 350, 400];
  const lngLines = [125, 250, 375, 500, 625, 750, 875];

  useAnimation(
    () => {
      const trigger = { trigger: scope.current, start: "top 78%", once: true } as const;
      gsap.set(".reach-arc", { drawSVG: "0%" });
      gsap.set(".reach-hub", { autoAlpha: 0, scale: 0, transformOrigin: "center" });
      gsap.to(".reach-arc", {
        drawSVG: "100%",
        duration: 1.5,
        stagger: 0.12,
        ease: "outExpo",
        scrollTrigger: trigger,
      });
      gsap.to(".reach-hub", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: "gold",
        scrollTrigger: trigger,
      });
    },
    { scope },
  );

  return (
    <svg
      ref={scope}
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Distribution across ${reachContent.stat}`}
    >
      {/* graticule */}
      <g stroke="currentColor" className="text-parchment-100/[0.06]" strokeWidth="1">
        {latLines.map((y) => (
          <line key={`lat-${y}`} x1="0" y1={y} x2={W} y2={y} />
        ))}
        {lngLines.map((x) => (
          <line key={`lng-${x}`} x1={x} y1="0" x2={x} y2={H} />
        ))}
      </g>

      {/* arcs */}
      <g className="text-gold-500" fill="none" stroke="currentColor" strokeWidth="1.5">
        {arcs.map((d, i) => (
          <path key={i} d={d} className="reach-arc" strokeLinecap="round" opacity="0.8" />
        ))}
      </g>

      {/* hubs */}
      <g>
        {hubs.map((h) => (
          <g key={h.city} className="reach-hub">
            <circle
              cx={h.x}
              cy={h.y}
              r="9"
              className="fill-gold-400/30 ambient [animation:var(--animate-hub)] [transform-box:fill-box] [transform-origin:center]"
            />
            <circle cx={h.x} cy={h.y} r="4" className="fill-gold-400" />
            <text
              x={h.x + 12}
              y={h.y + 4}
              className="fill-parchment-300 font-mono text-[13px] tracking-wide"
            >
              {h.city}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
