"use client";

import { useRef } from "react";
import Image from "next/image";

import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { bookFairs } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The fair-by-fair feature blocks with motion (client): each article rises and
 * fades in as it enters view, and each fair image drifts with a scroll-scrubbed
 * parallax inside its frame. Motion-gated via useAnimation, so reduced-motion
 * users see the blocks fully visible and still.
 */
export function FairFeatures() {
  const scope = useRef<HTMLDivElement>(null);

  useAnimation(() => {
    // Reveal each article once as it enters.
    gsap.utils.toArray<HTMLElement>(".fair-article").forEach((el) => {
      gsap.set(el, { autoAlpha: 0, y: 34 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.9, ease: "outExpo" }),
      });
    });

    // Continuous parallax drift on each fair image.
    gsap.utils.toArray<HTMLElement>(".fair-parallax").forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
  }, { scope });

  return (
    <div ref={scope}>
      {bookFairs.map((fair, i) => (
        <div key={fair.name}>
          {i > 0 ? <OrnamentDivider variant="fleuron" className="my-20 lg:my-28" /> : null}
          <article className="fair-article grid items-center gap-10 will-change-transform lg:grid-cols-2 lg:gap-16">
            {/* media */}
            <div
              className={cn(
                "relative isolate aspect-[5/4] overflow-hidden rounded-2xl border border-foreground/10 shadow-2xl shadow-black/30",
                i % 2 === 1 ? "lg:order-2" : "lg:order-1",
              )}
            >
              {fair.video ? (
                <div className="fair-parallax absolute inset-x-0 -top-[8%] -bottom-[8%] will-change-transform">
                  <AmbientVideo src={fair.video} className="absolute inset-0 h-full w-full object-cover" />
                </div>
              ) : fair.image ? (
                <div className="fair-parallax absolute inset-x-0 -top-[8%] -bottom-[8%] will-change-transform">
                  <Image
                    src={fair.image}
                    alt={`${fair.name} — ${fair.city}`}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <AtmosphereBackground variant={fair.scene} kenBurns />
              )}
              {/* legibility scrim + city label */}
              <div aria-hidden className="from-ink-950/75 absolute inset-0 bg-gradient-to-t to-transparent" />
              <div className="absolute inset-0 flex items-end p-8 lg:p-10">
                <span className="font-display text-parchment-100 text-5xl leading-none font-light italic lg:text-6xl">
                  {fair.city}
                </span>
              </div>
            </div>

            {/* text */}
            <div className={cn(i % 2 === 1 ? "lg:order-1" : "lg:order-2")}>
              <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase">{fair.dates}</p>
              <h2 className="font-display text-parchment-100 mt-4 text-4xl leading-tight font-light sm:text-5xl">
                {fair.name}
              </h2>
              <p className="text-parchment-500 mt-3 font-mono text-xs tracking-[0.15em] uppercase">
                {fair.location}
              </p>
              <p className="text-parchment-300 mt-6 leading-relaxed">{fair.blurb}</p>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
