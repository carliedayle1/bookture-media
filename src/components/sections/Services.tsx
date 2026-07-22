"use client";

import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useAnimation } from "@/hooks/useAnimation";
import { servicesContent as c } from "@/lib/content";

/**
 * What We Offer — the services beyond the book itself (campaigns, awards,
 * launches, web, rights, audio). A hairline-separated grid of numbered cards.
 *
 * Motion: the headline + intro rise (RevealText), then each card's contents
 * fade-and-rise in a stagger as the grid enters view. The card surfaces stay
 * put — only the text moves — so the hairline frame reads as solid throughout.
 */
export function Services() {
  const scope = useRef<HTMLElement>(null);

  useAnimation(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card-inner");
      gsap.set(cards, { autoAlpha: 0, y: 24 });

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
            stagger: 0.08,
          });
        },
      });
    },
    { scope },
  );

  return (
    <Section id="services" ref={scope} chapter={c.chapter} theme="ink-950">
      <Container>
        <div className="mb-14 max-w-3xl">
          <RevealText
            as="h2"
            split="lines"
            className="font-display text-parchment-100 text-4xl leading-tight font-light sm:text-5xl"
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

        <ul className="services-grid bg-foreground/10 border-foreground/10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3">
          {c.items.map((service, i) => (
            <li key={service.title} className="bg-surface group relative p-8 lg:p-10">
              <div className="service-card-inner will-change-transform">
                <span className="font-display text-gold-600/70 group-hover:text-accent block text-3xl leading-none font-light transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-parchment-100 mt-5 text-xl font-light">
                  {service.title}
                </h3>
                <p className="text-parchment-300 mt-3 text-sm leading-relaxed">{service.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
