import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { manifestoContent as c } from "@/lib/content";

/**
 * The Belief — a sticky-scroll manifesto. Phase 1: a two-column static layout
 * (pinned media placeholder + movements). Phase 4 pins the media column and
 * scrubs the movements + crossfades the scenes as the section is scrolled.
 */
export function Manifesto() {
  return (
    <Section id="belief" chapter={c.chapter} theme="ink-950">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Media column (Phase 4: this pins and crossfades scenes) */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 lg:sticky lg:top-28 lg:self-start">
            <AtmosphereBackground variant="library" vignette />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-parchment-500 font-mono text-xs tracking-widest uppercase">
                {c.scenes[0].caption}
              </p>
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
            <div className="space-y-10">
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
