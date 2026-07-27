import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { bookFairs, contactContent } from "@/lib/content";

const c = contactContent.fairs;

/**
 * Book Fairs — where the house shows up in person each year. A hairline card
 * grid (date · fair · venue). No chapter numeral (kept off the fixed spine);
 * shares its copy and data with the Contact page.
 */
export function BookFairs() {
  return (
    <Section id="fairs" theme="ink-900">
      <Container>
        <div className="mb-14 max-w-3xl">
          <p className="text-parchment-500 mb-6 font-mono text-xs tracking-[0.3em] uppercase">
            {c.eyebrow}
          </p>
          <RevealText
            as="h2"
            split="lines"
            className="font-display text-parchment-100 text-4xl leading-tight font-light sm:text-5xl"
          >
            {c.headline}
          </RevealText>
          <p className="text-parchment-300 mt-6 leading-relaxed">{c.intro}</p>
        </div>

        <ul className="bg-foreground/10 border-foreground/10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
          {bookFairs.map((fair) => (
            <li key={fair.name} className="bg-surface group relative p-8 lg:p-10">
              <p className="text-gold-600/80 group-hover:text-accent font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-500">
                {fair.dates}
              </p>
              <h3 className="font-display text-parchment-100 mt-5 text-xl leading-snug font-light lg:text-2xl">
                {fair.name}
              </h3>
              <p className="text-parchment-300 mt-3 text-sm leading-relaxed">{fair.location}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
