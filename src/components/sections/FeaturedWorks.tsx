"use client";

import { useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { BookCover } from "@/components/ui/BookCover";
import { Modal } from "@/components/ui/Modal";
import { featuredWorks, type Work } from "@/lib/content";

/**
 * Featured Works — a draggable horizontal strip of covers. Each cover lifts and
 * catches a gold sheen on hover (CSS, no WebGL), and opens a detail modal on
 * click. Drag-to-scroll is distinguished from a click so dragging never opens
 * a modal.
 */
export function FeaturedWorks() {
  const [active, setActive] = useState<Work | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current = { down: true, startX: e.clientX, startLeft: track.scrollLeft, moved: false };
    track.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    track.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  return (
    <Section id="works" chapter={{ numeral: "III", label: "Featured Works" }} theme="ink-950">
      <Container size="wide">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <RevealText
            as="h2"
            split="lines"
            className="font-display text-parchment-100 max-w-xl text-4xl leading-tight font-light sm:text-5xl"
          >
            Books we were proud to make.
          </RevealText>
          <p className="text-parchment-500 max-w-xs text-sm leading-relaxed">
            Drag to browse. Every cover here was set, printed, and bound to our own
            specification.
          </p>
        </div>
      </Container>

      {/* full-bleed drag strip */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex cursor-grab snap-x snap-mandatory gap-8 overflow-x-auto px-[var(--edge-gutter)] pb-6 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {featuredWorks.map((work) => (
          <div key={work.title} className="w-52 shrink-0 snap-start sm:w-60">
            <button
              type="button"
              onClick={() => {
                if (!drag.current.moved) setActive(work);
              }}
              className="group block w-full text-left [perspective:1200px]"
            >
              <div className="relative transition-transform duration-500 [transition-timing-function:var(--ease-gold)] group-hover:-translate-y-2 group-hover:[transform:rotateY(-8deg)]">
                {work.badge ? (
                  <span className="bg-accent text-ink-950 absolute -right-2 -top-2 z-20 rounded-full px-2.5 py-1 font-mono text-[0.55rem] tracking-wider uppercase">
                    {work.badge}
                  </span>
                ) : null}
                <BookCover title={work.title} author={work.author} />
                {/* gold sheen sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full rounded-[3px] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
              </div>
              <div className="mt-4">
                <p className="text-parchment-100 group-hover:text-accent text-sm font-medium transition-colors">
                  {work.title}
                </p>
                <p className="text-parchment-500 text-xs">
                  {work.author} · {work.genre}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} label={active?.title ?? "Work"}>
        {active ? (
          <div className="grid gap-8 p-8 sm:grid-cols-[160px_1fr] sm:p-10">
            <div className="w-40">
              <BookCover title={active.title} author={active.author} />
            </div>
            <div>
              {active.badge ? (
                <span className="text-accent font-mono text-xs tracking-[0.2em] uppercase">
                  {active.badge}
                </span>
              ) : null}
              <h3 className="font-display text-parchment-100 mt-2 text-3xl font-light">
                {active.title}
              </h3>
              <p className="text-parchment-500 mt-1 font-mono text-xs tracking-wide uppercase">
                {active.author} · {active.genre} · {active.year}
              </p>
              <p className="text-parchment-300 mt-6 leading-relaxed">{active.blurb}</p>
            </div>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}
