import { Container } from "@/components/ui/Container";
import { RevealText } from "@/components/ui/RevealText";
import { ThemedBackground } from "@/components/ui/ThemedBackground";
import { studioContent as c } from "@/lib/content";

/**
 * The Studio — a full-viewport film moment: the bindery image behind a
 * cinematic letterbox and overlay line, with a theme-aware scrim for legibility.
 */
export function StudioFilm() {
  return (
    <section
      id="studio"
      className="relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden"
    >
      <ThemedBackground name="studio" scrim="center" kenBurns />
      {/* cinematic letterbox */}
      <span aria-hidden className="bg-surface absolute inset-x-0 top-0 z-10 h-[6vh]" />
      <span aria-hidden className="bg-surface absolute inset-x-0 bottom-0 z-10 h-[6vh]" />

      <Container size="narrow" className="relative z-20 text-center">
        <p className="text-parchment-500 mb-8 font-mono text-xs tracking-[0.3em] uppercase">
          {c.chapter.numeral} — {c.chapter.label}
        </p>
        <RevealText
          as="h2"
          split="words"
          className="font-display text-parchment-100 text-4xl leading-tight font-light text-balance sm:text-5xl md:text-6xl"
        >
          {c.overlay}
        </RevealText>
        <p className="text-parchment-300 mt-8 text-base italic">{c.subline}</p>
      </Container>
    </section>
  );
}
