"use client";

import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { TiltCard } from "@/components/ui/TiltCard";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { processSteps } from "@/lib/content";

/**
 * The Craft — the 01–06 ritual as a vertical timeline. A gold rail draws itself
 * downward as the section scrolls (scrubbed); each node lights and its card
 * reveals as it enters. Cards tilt on hover.
 *
 * Layout: each step is a flex row with a fixed-width rail cell (node centered)
 * + card. A single absolute rail line runs through the rail-cell centers, so
 * nodes and line stay aligned at every breakpoint.
 */
export function Process() {
  const scope = useRef<HTMLElement>(null);

  useAnimation(
    () => {
      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-track",
            start: "top 72%",
            end: "bottom 72%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        const node = step.querySelector(".process-node");
        const card = step.querySelector(".process-card");
        gsap.set(node, { autoAlpha: 0, scale: 0.2 });
        gsap.set(card, { autoAlpha: 0, y: 26 });
        ScrollTrigger.create({
          trigger: step,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap
              .timeline()
              .to(node, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "gold" })
              .to(card, { autoAlpha: 1, y: 0, duration: 0.7, ease: "outExpo" }, "<0.05");
          },
        });
      });
    },
    { scope },
  );

  return (
    <Section
      id="craft"
      ref={scope}
      chapter={{ numeral: "II", label: "The Craft" }}
      theme="ink-900"
    >
      <AtmosphereBackground variant="forest" vignette={false} />
      <Container size="default">
        <RevealText
          as="h2"
          split="lines"
          className="font-display text-parchment-100 mb-20 max-w-2xl text-4xl leading-tight font-light sm:text-5xl"
        >
          Six unhurried steps from manuscript to object.
        </RevealText>

        <div className="process-track relative">
          {/* rail: track + drawn line, centered on the rail-cell axis (left-6) */}
          <span aria-hidden className="absolute left-6 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
          <span
            aria-hidden
            className="process-line from-gold-300 via-gold-400 to-gold-600 absolute left-6 top-0 h-full w-px -translate-x-1/2 origin-top scale-y-0 bg-gradient-to-b"
          />

          <ol className="space-y-6">
            {processSteps.map((step) => (
              <li key={step.numeral} className="process-step flex items-stretch gap-4 sm:gap-8">
                {/* rail cell */}
                <div className="relative w-12 shrink-0">
                  <span
                    aria-hidden
                    className="process-node bg-accent ring-surface-alt absolute left-6 top-9 h-3 w-3 -translate-x-1/2 rounded-full ring-4"
                  />
                </div>
                {/* card */}
                <TiltCard className="process-card flex-1">
                  <div className="bg-surface/80 rounded-2xl border border-white/5 p-7 backdrop-blur-sm lg:p-9">
                    <div className="flex items-baseline gap-5">
                      <span className="font-display text-gold-600/80 text-4xl leading-none font-light italic">
                        {step.numeral}
                      </span>
                      <h3 className="font-display text-parchment-100 text-2xl font-light">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-parchment-300 mt-4 max-w-xl text-sm leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </TiltCard>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
