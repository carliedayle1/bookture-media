import { Container } from "@/components/ui/Container";
import { RevealText } from "@/components/ui/RevealText";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { studioContent as c } from "@/lib/content";

/**
 * The Studio — a full-viewport film moment. Phase 1: procedural press
 * atmosphere with a cinematic letterbox and overlay line. Phase 6 replaces the
 * backdrop with the <AmbientVideo> (intro.mp4), IntersectionObserver-gated and
 * poster-only under reduced motion.
 */
export function StudioFilm() {
  return (
    <section
      id="studio"
      className="relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden"
    >
      <AtmosphereBackground variant="press" kenBurns />
      {/* intro film as atmospheric b-roll — swap for real bindery footage later */}
      <AmbientVideo
        src={c.videoSrc}
        className="absolute inset-0 -z-[8] h-full w-full object-cover opacity-40"
      />
      {/* darkening scrim for text legibility over the video */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[7]"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 50% 50%, rgba(8,11,20,0.35), rgba(8,11,20,0.85) 100%)",
        }}
      />
      {/* cinematic letterbox */}
      <span aria-hidden className="bg-ink-950 absolute inset-x-0 top-0 z-10 h-[6vh]" />
      <span aria-hidden className="bg-ink-950 absolute inset-x-0 bottom-0 z-10 h-[6vh]" />

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
