"use client";

import { useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { Modal } from "@/components/ui/Modal";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { servicesContent as c, type Service } from "@/lib/content";

/**
 * What We Offer — the services beyond the book itself. Grand two-column cards
 * with a large watermark numeral and a gold hover glow; each opens a modal that
 * describes the service and walks through its process. Cards fade-and-rise in a
 * stagger as the grid enters view (motion-gated).
 */
export function Services() {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Service | null>(null);

  useAnimation(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      gsap.set(cards, { autoAlpha: 0, y: 28 });

      ScrollTrigger.create({
        trigger: ".services-grid",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "outExpo",
            stagger: 0.1,
          });
        },
      });
    },
    { scope },
  );

  return (
    <Section id="services" ref={scope} chapter={c.chapter} theme="ink-950">
      <AmbientGlow />
      <Container>
        <div className="mb-16 max-w-3xl">
          <RevealText
            as="h2"
            split="lines"
            className="font-display text-parchment-100 text-4xl leading-tight font-light sm:text-5xl md:text-6xl"
          >
            {c.headline}
          </RevealText>
          <RevealText
            as="p"
            split="lines"
            delay={0.1}
            className="text-parchment-300 mt-6 leading-relaxed"
          >
            {c.intro}
          </RevealText>
        </div>

        <ul className="services-grid grid gap-5 sm:grid-cols-2">
          {c.items.map((service, i) => (
            <li key={service.title}>
              <button
                type="button"
                onClick={() => setActive(service)}
                aria-label={`${service.title} — see the process`}
                className="service-card group relative flex h-full w-full cursor-pointer flex-col items-start overflow-hidden rounded-2xl border border-foreground/10 bg-surface p-8 text-left transition-all duration-500 [transition-timing-function:var(--ease-gold)] hover:border-gold-500/40 hover:bg-foreground/[0.04] lg:p-11"
              >
                {/* oversized watermark numeral */}
                <span
                  aria-hidden
                  className="font-display text-gold-600/10 group-hover:text-gold-600/20 pointer-events-none absolute -top-2 right-3 text-[7.5rem] leading-none font-light italic transition-colors duration-700"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-accent relative font-mono text-xs tracking-[0.25em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-parchment-100 relative mt-6 text-2xl font-light lg:text-3xl">
                  {service.title}
                </h3>
                <p className="text-parchment-300 relative mt-3 text-sm leading-relaxed">
                  {service.body}
                </p>
                <span className="text-accent relative mt-7 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase">
                  The process
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-500 group-hover:translate-x-1"
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
              </button>
            </li>
          ))}
        </ul>
      </Container>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        label={active?.title ?? "Service"}
        size="wide"
      >
        {active ? (
          <div className="p-8 sm:p-10">
            <span className="text-parchment-500 font-mono text-xs tracking-[0.3em] uppercase">
              What we offer
            </span>
            <h3 className="font-display text-parchment-100 mt-3 text-3xl font-light sm:text-4xl">
              {active.title}
            </h3>
            <p className="text-parchment-300 mt-5 leading-relaxed">{active.description}</p>

            <p className="text-parchment-500 mt-10 font-mono text-xs tracking-[0.2em] uppercase">
              How it works
            </p>
            <ol className="mt-6 space-y-6">
              {active.process.map((s, i) => (
                <li key={s.step} className="flex gap-5">
                  <span className="font-display text-gold-600/70 w-8 shrink-0 text-3xl leading-none font-light italic">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-parchment-100 text-lg font-light">{s.step}</p>
                    <p className="text-parchment-300 mt-1 text-sm leading-relaxed">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}
