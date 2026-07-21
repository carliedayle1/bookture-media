"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { BookCover } from "@/components/ui/BookCover";
import { Modal } from "@/components/ui/Modal";
import { useReducedMotion } from "@/components/providers/MotionProvider";
import { featuredWorks, type Work } from "@/lib/content";

const N = featuredWorks.length;

/** Shortest wrapped offset of index `i` from the active center (infinite loop). */
function offsetOf(i: number, active: number) {
  let o = ((i - active) % N + N) % N; // 0..N-1
  if (o > N / 2) o -= N; // wrap the far side negative
  return o;
}

/**
 * Featured Works — a center-focused coverflow. The middle cover is enlarged and
 * face-on; neighbours recede, angle away, and dim. It advances slowly and loops
 * infinitely, and you can drag, use the arrows/dots, or click a side cover to
 * bring it to center. The centered cover opens a detail modal. Badges sit fully
 * inside their card (no clipping).
 */
export function FeaturedWorks() {
  const [active, setActive] = useState(0);
  const [modalWork, setModalWork] = useState<Work | null>(null);
  const reducedMotion = useReducedMotion();
  const paused = useRef(false);
  const drag = useRef({ down: false, startX: 0, moved: false });

  const go = (dir: number) => setActive((a) => ((a + dir) % N + N) % N);

  // Slow, infinite auto-advance (paused on hover/drag or under reduced motion).
  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const id = setInterval(() => {
      if (!paused.current && !drag.current.down) {
        setActive((a) => (a + 1) % N);
      }
    }, 3400);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const activeWork = featuredWorks[active];

  return (
    <Section id="works" chapter={{ numeral: "III", label: "Featured Works" }} theme="ink-950">
      <Container size="wide">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <RevealText
            as="h2"
            split="lines"
            className="font-display text-parchment-100 max-w-xl text-4xl leading-tight font-light sm:text-5xl"
          >
            Books we were proud to make.
          </RevealText>
          <p className="text-parchment-500 max-w-xs text-sm leading-relaxed">
            Every cover here was set, printed, and bound to our own specification.
          </p>
        </div>
      </Container>

      {/* coverflow stage */}
      <div
        className="relative grid h-[440px] w-full place-items-center [perspective:1800px] select-none sm:h-[480px]"
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={() => {
          paused.current = false;
          drag.current.down = false;
        }}
        onPointerDown={(e) => {
          drag.current = { down: true, startX: e.clientX, moved: false };
        }}
        onPointerUp={(e) => {
          if (!drag.current.down) return;
          drag.current.down = false;
          const dx = e.clientX - drag.current.startX;
          if (dx < -50) go(1);
          else if (dx > 50) go(-1);
        }}
      >
        {featuredWorks.map((work, i) => {
          const o = offsetOf(i, active);
          const far = Math.abs(o) > 2;
          const isCenter = o === 0;
          return (
            <motion.button
              key={work.title}
              type="button"
              className="[grid-area:1/1] w-44 cursor-pointer sm:w-52"
              style={{ zIndex: 20 - Math.abs(o), pointerEvents: far ? "none" : "auto" }}
              animate={{
                x: o * 210,
                rotateY: o * -16,
                scale: isCenter ? 1.14 : 0.82,
                opacity: far ? 0 : isCenter ? 1 : 0.45,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              onClick={() => {
                if (drag.current.moved) return;
                if (isCenter) setModalWork(work);
                else setActive(i);
              }}
              aria-label={isCenter ? `Open ${work.title}` : `Focus ${work.title}`}
              aria-hidden={far}
            >
              <div className="relative">
                {work.badge ? (
                  <span className="bg-accent text-ink-950 absolute right-3 top-3 z-20 rounded-full px-2.5 py-1 font-mono text-[0.55rem] tracking-wider uppercase shadow-lg shadow-black/40">
                    {work.badge}
                  </span>
                ) : null}
                <BookCover title={work.title} author={work.author} />
                {isCenter ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full rounded-[3px] bg-gradient-to-r from-transparent via-white/25 to-transparent motion-safe:animate-none"
                  />
                ) : null}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* active caption + controls */}
      <Container className="mt-10">
        <div className="flex flex-col items-center gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWork.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <p className="text-parchment-100 font-display text-xl">{activeWork.title}</p>
              <p className="text-parchment-500 mt-1 font-mono text-xs tracking-wide uppercase">
                {activeWork.author} · {activeWork.genre}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-6">
            <CarouselButton label="Previous" dir="left" onClick={() => go(-1)} />
            <div className="flex items-center gap-2">
              {featuredWorks.map((w, i) => (
                <button
                  key={w.title}
                  type="button"
                  aria-label={`Go to ${w.title}`}
                  onClick={() => setActive(i)}
                  className={
                    i === active
                      ? "bg-accent h-1.5 w-6 rounded-full transition-all duration-300"
                      : "bg-foreground/25 hover:bg-foreground/45 h-1.5 w-1.5 rounded-full transition-all duration-300"
                  }
                />
              ))}
            </div>
            <CarouselButton label="Next" dir="right" onClick={() => go(1)} />
          </div>
        </div>
      </Container>

      <Modal open={modalWork !== null} onClose={() => setModalWork(null)} label={modalWork?.title ?? "Work"}>
        {modalWork ? (
          <div className="grid gap-8 p-8 sm:grid-cols-[160px_1fr] sm:p-10">
            <div className="w-40">
              <BookCover title={modalWork.title} author={modalWork.author} />
            </div>
            <div>
              {modalWork.badge ? (
                <span className="text-accent font-mono text-xs tracking-[0.2em] uppercase">
                  {modalWork.badge}
                </span>
              ) : null}
              <h3 className="font-display text-parchment-100 mt-2 text-3xl font-light">
                {modalWork.title}
              </h3>
              <p className="text-parchment-500 mt-1 font-mono text-xs tracking-wide uppercase">
                {modalWork.author} · {modalWork.genre} · {modalWork.year}
              </p>
              <p className="text-parchment-300 mt-6 leading-relaxed">{modalWork.blurb}</p>
            </div>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}

function CarouselButton({
  label,
  dir,
  onClick,
}: {
  label: string;
  dir: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="text-parchment-300 hover:text-accent hover:border-gold-500/50 border-foreground/15 flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={dir === "left" ? "" : "rotate-180"}>
        <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
