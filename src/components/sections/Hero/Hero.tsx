"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { ScrollTrigger } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { useReducedMotion } from "@/components/providers/MotionProvider";
import { heroScroll } from "@/lib/scroll-state";
import { heroContent, siteConfig } from "@/lib/content";
import { HeroPoster } from "./HeroPoster";

// three.js stays in its own chunk; only mounts client-side over the poster.
const HeroCanvas = dynamic(() => import("@/components/canvas/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero — the opening statement. A procedural R3F book floats over the poster
 * (skipped under reduced motion, poster stays). Scroll progress and pointer
 * position feed the canvas via the heroScroll bridge (no React re-renders).
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  // Feed scroll progress into the canvas.
  useAnimation(
    ({ root }) => {
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          heroScroll.progress = self.progress;
        },
      });
    },
    { scope: sectionRef },
  );

  // Feed pointer position into the canvas (micro-parallax).
  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const onMove = (e: PointerEvent) => {
      heroScroll.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      heroScroll.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate flex min-h-screen items-center overflow-hidden"
    >
      <HeroPoster />
      {!reducedMotion ? <HeroCanvas /> : null}

      <Container className="relative z-10 py-32">
        <p className="text-parchment-500 mb-8 font-mono text-xs tracking-[0.3em] uppercase">
          {heroContent.eyebrow}
        </p>

        <h1 className="font-display text-parchment-100 max-w-[16ch] text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.98] font-light tracking-tight">
          {heroContent.headline.map((run, i) =>
            run.emphasis ? (
              <em key={i} className="text-accent italic">
                {run.text}
              </em>
            ) : (
              <span key={i}>{run.text}</span>
            ),
          )}
        </h1>

        <p className="text-parchment-300 mt-10 max-w-xl text-lg leading-relaxed">
          {heroContent.lede}
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-5">
          <Button variant="solid" size="lg" magnetic href={heroContent.primaryCta.href}>
            {heroContent.primaryCta.label}
          </Button>
          <Button variant="outline" size="lg" magnetic href={heroContent.secondaryCta.href}>
            {heroContent.secondaryCta.label}
          </Button>
        </div>
      </Container>

      <ScrollCue className="absolute bottom-10 left-1/2 -translate-x-1/2" />
      <span className="sr-only">{siteConfig.legalName}</span>
    </section>
  );
}
