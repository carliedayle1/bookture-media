"use client";

import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { manifestoContent as c } from "@/lib/content";

const SCENE_VARIANTS = ["library", "desk", "press"] as const;

/**
 * The Belief — sticky-scroll manifesto. The media column pins (CSS sticky, so
 * it plays nicely with Lenis) while the movements scroll past; the background
 * scenes crossfade as the reader advances (scrubbed to scroll progress).
 */
export function Manifesto() {
  const scope = useRef<HTMLElement>(null);

  useAnimation(
    ({ root }) => {
      const scenes = gsap.utils.toArray<HTMLElement>(".manifesto-scene");
      if (scenes.length === 0) {
        return;
      }
      gsap.set(scenes, { autoAlpha: 0 });
      gsap.set(scenes[0], { autoAlpha: 1 });

      let last = 0;
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length));
          if (idx !== last) {
            gsap.to(scenes[last], { autoAlpha: 0, duration: 0.5, ease: "gold" });
            gsap.to(scenes[idx], { autoAlpha: 1, duration: 0.5, ease: "gold" });
            last = idx;
          }
        },
      });
    },
    { scope },
  );

  return (
    <Section id="belief" ref={scope} chapter={c.chapter} theme="ink-950">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Pinned media with crossfading scenes */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5">
              {c.scenes.map((scene, i) => (
                <div key={scene.id} className="manifesto-scene absolute inset-0">
                  <AtmosphereBackground variant={SCENE_VARIANTS[i]} vignette kenBurns />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-parchment-500 font-mono text-xs tracking-widest uppercase">
                      {scene.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Movements */}
          <div className="flex flex-col justify-center">
            <RevealText
              as="p"
              split="words"
              className="font-display text-accent mb-12 text-2xl leading-snug italic"
            >
              {c.lead}
            </RevealText>
            <div className="space-y-12">
              {c.movements.map((line) => (
                <RevealText
                  key={line}
                  as="p"
                  split="lines"
                  className="font-display text-parchment-100 text-2xl leading-snug font-light sm:text-3xl"
                >
                  {line}
                </RevealText>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
