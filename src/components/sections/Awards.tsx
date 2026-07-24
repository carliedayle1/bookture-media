"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { Modal } from "@/components/ui/Modal";
import { awardsContent as c, type Award } from "@/lib/content";

/**
 * Awards & Recognition — an editorial "honours ledger": full-width rows, one per
 * award, with a large gold year, the award and issuing body on a shared
 * baseline, and a gold rule that slides in on hover. Each row opens a modal with
 * the full citation. No chapter numeral (kept off the fixed spine).
 */
export function Awards() {
  const [active, setActive] = useState<Award | null>(null);

  return (
    <Section id="awards" theme="ink-900">
      <Container>
        <div className="mb-14 max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <Laurel />
            <p className="text-parchment-500 font-mono text-xs tracking-[0.3em] uppercase">
              {c.eyebrow}
            </p>
          </div>
          <RevealText
            as="h2"
            split="lines"
            className="font-display text-parchment-100 text-4xl leading-tight font-light sm:text-5xl"
          >
            {c.headline}
          </RevealText>
          <p className="text-parchment-300 mt-6 leading-relaxed">{c.intro}</p>
        </div>

        <ul className="border-foreground/12 border-t">
          {c.items.map((award) => (
            <li key={`${award.year}-${award.name}`} className="group border-foreground/12 border-b">
              <button
                type="button"
                onClick={() => setActive(award)}
                aria-label={`${award.name}, ${award.issuer}, ${award.year} — read more`}
                className="w-full cursor-pointer border-l-2 border-transparent py-7 pl-0 text-left transition-all duration-500 [transition-timing-function:var(--ease-gold)] group-hover:border-gold-500/60 group-hover:pl-6 sm:flex sm:items-baseline sm:gap-10 lg:py-8"
              >
                <span className="font-display text-gold-600/70 group-hover:text-accent block w-20 shrink-0 text-3xl leading-none font-light italic transition-colors duration-500 sm:text-4xl">
                  {award.year}
                </span>
                <div className="mt-3 flex-1 sm:mt-0">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="font-display text-parchment-100 text-xl font-light sm:text-2xl">
                      {award.name}
                    </h3>
                    <span className="text-accent inline-flex shrink-0 items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase">
                      {award.issuer}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                        className="opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <p className="text-parchment-300 mt-2 max-w-2xl text-sm leading-relaxed">
                    {award.detail}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Container>

      <Modal open={active !== null} onClose={() => setActive(null)} label={active?.name ?? "Award"}>
        {active ? (
          <div className="p-8 sm:p-10">
            <span className="font-display text-gold-600/70 text-4xl leading-none font-light italic">
              {active.year}
            </span>
            <h3 className="font-display text-parchment-100 mt-3 text-3xl font-light">
              {active.name}
            </h3>
            <p className="text-accent mt-2 font-mono text-xs tracking-[0.2em] uppercase">
              {active.issuer}
            </p>
            <p className="text-parchment-300 mt-6 leading-relaxed">{active.description}</p>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}

/** Simple laurel-wreath mark in gold. */
function Laurel() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden className="text-gold-500/80">
      <path d="M16 4v24M16 28c-3 0-5-2-5-2M16 28c3 0 5-2 5-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M11 8c-3 1-4 4-4 7s2 6 4 7c1-2 1-5 0-7 2 1 4 0 5-2-2-1-4-2-5-5Z" fill="currentColor" fillOpacity="0.7" />
      <path d="M21 8c3 1 4 4 4 7s-2 6-4 7c-1-2-1-5 0-7-2 1-4 0-5-2 2-1 4-2 5-5Z" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}
