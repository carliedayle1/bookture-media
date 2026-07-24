import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { awardsContent as c } from "@/lib/content";

/**
 * Awards & Recognition — a hairline-separated grid of honours, each with a
 * laurel motif, the year, the award, and the issuing body. No chapter numeral
 * (kept off the fixed spine); alternates against the surrounding sections.
 */
export function Awards() {
  return (
    <Section id="awards" theme="ink-900">
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

        <ul className="bg-foreground/10 border-foreground/10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3">
          {c.items.map((award) => (
            <li key={`${award.year}-${award.name}`} className="bg-surface group relative p-8 lg:p-10">
              <div className="flex items-center justify-between">
                <Laurel />
                <span className="font-display text-gold-600/70 group-hover:text-accent text-2xl leading-none font-light italic transition-colors duration-500">
                  {award.year}
                </span>
              </div>
              <h3 className="font-display text-parchment-100 mt-6 text-xl leading-snug font-light">
                {award.name}
              </h3>
              <p className="text-accent mt-2 font-mono text-xs tracking-[0.15em] uppercase">
                {award.issuer}
              </p>
              <p className="text-parchment-300 mt-4 text-sm leading-relaxed">{award.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Simple laurel-wreath mark in gold. */
function Laurel() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className="text-gold-500/80"
    >
      <path
        d="M16 4v24M16 28c-3 0-5-2-5-2M16 28c3 0 5-2 5-2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M11 8c-3 1-4 4-4 7s2 6 4 7c1-2 1-5 0-7 2 1 4 0 5-2-2-1-4-2-5-5Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M21 8c3 1 4 4 4 7s-2 6-4 7c-1-2-1-5 0-7-2 1-4 0-5-2 2-1 4-2 5-5Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
    </svg>
  );
}
