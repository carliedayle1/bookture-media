"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { ctaContent as c } from "@/lib/content";

const inputClass =
  "border-border text-parchment-100 placeholder:text-parchment-500/50 focus:border-gold-500 w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition-colors";

/**
 * Begin Your Book — the conversion moment. Phase 1: a two-step form with an
 * optimistic success state (no network). Phase 6 wires it to a server action
 * with real validation and the extended loading state.
 */
export function BeginYourBook() {
  const [step, setStep] = useState<0 | 1>(0);
  const [done, setDone] = useState(false);

  return (
    <Section id="begin" chapter={c.chapter} theme="ink-900">
      <AtmosphereBackground variant="hall" />
      <Container size="narrow" className="relative">
        <h2 className="font-display text-parchment-100 text-center text-4xl leading-tight font-light text-balance sm:text-5xl md:text-6xl">
          {c.headline.map((run, i) =>
            run.emphasis ? (
              <em key={i} className="text-accent italic">
                {run.text}
              </em>
            ) : (
              <span key={i}>{run.text}</span>
            ),
          )}
        </h2>
        <p className="text-parchment-300 mx-auto mt-8 max-w-xl text-center leading-relaxed">
          {c.intro}
        </p>

        <OrnamentDivider className="my-12" />

        <div className="mx-auto max-w-lg">
          {done ? (
            <div className="text-center" role="status">
              <svg width="40" height="40" viewBox="0 0 14 14" className="text-accent mx-auto mb-6">
                <path d="M7 0 L9 5 L14 7 L9 9 L7 14 L5 9 L0 7 L5 5 Z" fill="currentColor" />
              </svg>
              <h3 className="font-display text-parchment-100 text-2xl font-light">
                {c.success.title}
              </h3>
              <p className="text-parchment-300 mx-auto mt-4 max-w-md text-sm leading-relaxed">
                {c.success.body}
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (step === 0) {
                  setStep(1);
                } else {
                  setDone(true);
                }
              }}
            >
              {step === 0 ? (
                <>
                  <input className={inputClass} placeholder="Your name" required autoComplete="name" />
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="Your email"
                    required
                    autoComplete="email"
                  />
                  <div className="mt-2 flex justify-center">
                    <Button variant="solid" size="lg" magnetic type="submit">
                      Continue
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <textarea
                    className={`${inputClass} min-h-40 resize-none`}
                    placeholder="Tell us about your book — genre, length, and what it's trying to become."
                    required
                  />
                  <div className="mt-2 flex items-center justify-center gap-4">
                    <Button variant="ghost" size="md" onClick={() => setStep(0)}>
                      Back
                    </Button>
                    <Button variant="solid" size="lg" magnetic type="submit">
                      Send to the editor
                    </Button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
