"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { heroContent, siteConfig } from "@/lib/content";
import { HeroPoster } from "./HeroPoster";

/**
 * Hero — the opening statement. Phase 1: procedural poster + typeset headline
 * and CTAs. Phase 3 mounts the R3F floating-book canvas over the poster and
 * animates the headline reveal.
 */
export function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-screen items-center overflow-hidden">
      <HeroPoster />

      {/* Phase 3: <HeroCanvas /> (dynamic, ssr:false) mounts here, over HeroPoster. */}

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
