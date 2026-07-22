"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { GoldParticles } from "@/components/ui/GoldParticles";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Voices — a CSS-3D testimonial carousel (no WebGL). The active card faces
 * front; neighbours recede, angle away, and dim. Advance by drag, prev/next
 * buttons, arrow keys, or clicking a neighbour.
 */
export function Voices() {
  const [active, setActive] = useState(0);
  const n = testimonials.length;
  const drag = useRef({ down: false, startX: 0 });

  const go = (dir: number) => setActive((a) => Math.min(n - 1, Math.max(0, a + dir)));

  return (
    <Section id="voices" chapter={{ numeral: "V", label: "Voices" }} theme="ink-900">
      <AmbientGlow />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GoldParticles density={26} />
      </div>
      <Container>
        <RevealText
          as="h2"
          split="lines"
          className="font-display text-parchment-100 mb-16 max-w-2xl text-4xl leading-tight font-light sm:text-5xl"
        >
          The writers, in their own words.
        </RevealText>

        <div
          className="relative grid h-[460px] place-items-center [perspective:1400px] outline-none select-none sm:h-[420px]"
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Author testimonials"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          onPointerDown={(e) => {
            drag.current = { down: true, startX: e.clientX };
          }}
          onPointerUp={(e) => {
            if (!drag.current.down) return;
            drag.current.down = false;
            const dx = e.clientX - drag.current.startX;
            if (dx < -60) go(1);
            else if (dx > 60) go(-1);
          }}
          onPointerCancel={() => {
            drag.current.down = false;
          }}
        >
          {testimonials.map((t, i) => {
            const o = i - active;
            const far = Math.abs(o) > 2;
            return (
              <motion.figure
                key={t.name}
                className="bg-surface [grid-area:1/1] flex h-full w-[min(88vw,540px)] cursor-pointer flex-col justify-between rounded-2xl border border-foreground/15 p-9 lg:p-11"
                style={{ zIndex: 10 - Math.abs(o), pointerEvents: far ? "none" : "auto" }}
                animate={{
                  x: `${o * 56}%`,
                  z: -Math.abs(o) * 180,
                  rotateY: o * -22,
                  scale: o === 0 ? 1 : 0.82,
                  opacity: far ? 0 : o === 0 ? 1 : 0.4,
                }}
                transition={{ type: "spring", stiffness: 130, damping: 20 }}
                onClick={() => setActive(i)}
                aria-hidden={o !== 0}
              >
                <span aria-hidden className="text-gold-600/50 font-display text-5xl leading-none">
                  &ldquo;
                </span>
                <blockquote className="font-display text-parchment-100 -mt-4 text-xl leading-snug font-light text-balance sm:text-2xl">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6">
                  <p className="text-accent font-display text-lg italic">{t.name}</p>
                  <p className="text-parchment-500 mt-1 font-mono text-xs tracking-wide uppercase">
                    {t.role}
                  </p>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        {/* controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <CarouselButton label="Previous" onClick={() => go(-1)} disabled={active === 0} dir="left" />
          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active ? "bg-accent w-6" : "bg-foreground/25 w-1.5 hover:bg-foreground/45",
                )}
              />
            ))}
          </div>
          <CarouselButton label="Next" onClick={() => go(1)} disabled={active === n - 1} dir="right" />
        </div>
      </Container>
    </Section>
  );
}

function CarouselButton({
  label,
  onClick,
  disabled,
  dir,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  dir: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="text-parchment-300 hover:text-accent hover:border-gold-500/50 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 transition-colors disabled:opacity-30"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={dir === "left" ? "" : "rotate-180"}>
        <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
