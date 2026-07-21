import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { BookCover } from "@/components/ui/BookCover";
import { featuredWorks } from "@/lib/content";

/**
 * Featured Works. Phase 1: a static responsive grid of procedural covers with
 * metadata. Phase 5 turns this into a draggable horizontal marquee with WebGL-
 * free hover distortion and a parallax detail modal.
 */
export function FeaturedWorks() {
  return (
    <Section id="works" chapter={{ numeral: "III", label: "Featured Works" }} theme="ink-950">
      <Container size="wide">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <RevealText
            as="h2"
            split="lines"
            className="font-display text-parchment-100 max-w-xl text-4xl leading-tight font-light sm:text-5xl"
          >
            Books we were proud to make.
          </RevealText>
          <p className="text-parchment-500 max-w-xs text-sm leading-relaxed">
            A few recent titles from the house. Every cover here was set, printed,
            and bound to our own specification.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
          {featuredWorks.map((work) => (
            <li key={work.title} className="group flex flex-col gap-4">
              <div className="relative transition-transform duration-500 [transition-timing-function:var(--ease-gold)] group-hover:-translate-y-2">
                {work.badge ? (
                  <span className="bg-accent text-ink-950 absolute -right-2 -top-2 z-10 rounded-full px-2.5 py-1 font-mono text-[0.55rem] tracking-wider uppercase">
                    {work.badge}
                  </span>
                ) : null}
                <BookCover title={work.title} author={work.author} />
              </div>
              <div>
                <p className="text-parchment-100 text-sm font-medium">{work.title}</p>
                <p className="text-parchment-500 text-xs">
                  {work.author} · {work.genre}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
