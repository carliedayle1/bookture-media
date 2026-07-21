import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { testimonials } from "@/lib/content";

/**
 * Voices — author testimonials. Phase 1: a static staggered grid of quote
 * cards. Phase 5 becomes a draggable 3D card carousel (CSS 3D + FM springs).
 */
export function Voices() {
  return (
    <Section id="voices" chapter={{ numeral: "V", label: "Voices" }} theme="ink-900">
      <Container>
        <RevealText
          as="h2"
          split="lines"
          className="font-display text-parchment-100 mb-16 max-w-2xl text-4xl leading-tight font-light sm:text-5xl"
        >
          The writers, in their own words.
        </RevealText>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`bg-surface flex flex-col gap-6 rounded-2xl border border-white/5 p-8 lg:p-10 ${
                i % 2 === 1 ? "md:mt-10" : ""
              }`}
            >
              <span aria-hidden className="text-gold-600/50 font-display text-5xl leading-none">
                &ldquo;
              </span>
              <blockquote className="font-display text-parchment-100 -mt-6 text-xl leading-snug font-light text-balance">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto">
                <p className="text-accent font-display text-lg italic">{t.name}</p>
                <p className="text-parchment-500 mt-1 font-mono text-xs tracking-wide uppercase">
                  {t.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
