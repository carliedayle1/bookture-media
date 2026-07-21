"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { BookCover } from "@/components/ui/BookCover";
import { Modal } from "@/components/ui/Modal";
import { useReducedMotion } from "@/components/providers/MotionProvider";
import { featuredWorks, type Work } from "@/lib/content";

/**
 * Featured Works — an auto-advancing, draggable cover carousel. The set is
 * duplicated so the auto-scroll loops seamlessly (wrapped by the exact card
 * period). Auto-scroll pauses on hover or while dragging, and is off under
 * reduced motion. Covers lift + catch a gold sheen on hover and open a detail
 * modal on click; a genuine drag never triggers the modal.
 */
export function FeaturedWorks() {
  const [active, setActive] = useState<Work | null>(null);
  const reducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });
  const hovering = useRef(false);

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

  // Seamless auto-scroll.
  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const track = trackRef.current;
    if (!track) {
      return;
    }
    let raf = 0;
    const period = () => {
      const kids = track.children;
      return kids.length > featuredWorks.length
        ? (kids[featuredWorks.length] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft
        : track.scrollWidth / 2;
    };
    const tick = () => {
      if (!hovering.current && !drag.current.down) {
        track.scrollLeft += 0.5;
        const p = period();
        if (p > 0 && track.scrollLeft >= p) {
          track.scrollLeft -= p;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    const enter = () => (hovering.current = true);
    const leave = () => (hovering.current = false);
    track.addEventListener("pointerenter", enter);
    track.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerenter", enter);
      track.removeEventListener("pointerleave", leave);
    };
  }, [reducedMotion]);

  const renderCover = (work: Work) => (
    <>
      <div className="relative transition-transform duration-500 [transition-timing-function:var(--ease-gold)] group-hover:-translate-y-2 group-hover:[transform:rotateY(-8deg)]">
        {work.badge ? (
          <span className="bg-accent text-ink-950 absolute -right-2 -top-2 z-20 rounded-full px-2.5 py-1 font-mono text-[0.55rem] tracking-wider uppercase">
            {work.badge}
          </span>
        ) : null}
        <BookCover title={work.title} author={work.author} />
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
    </>
  );

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
            Drag to browse, or let it drift. Every cover here was set, printed, and
            bound to our own specification.
          </p>
        </div>
      </Container>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex cursor-grab gap-8 overflow-x-auto px-[var(--edge-gutter)] pb-6 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* interactive set */}
        {featuredWorks.map((work) => (
          <div key={work.title} className="w-52 shrink-0 sm:w-60">
            <button
              type="button"
              onClick={() => {
                if (!drag.current.moved) setActive(work);
              }}
              className="group block w-full text-left [perspective:1200px]"
            >
              {renderCover(work)}
            </button>
          </div>
        ))}
        {/* duplicate set for seamless looping (non-interactive) */}
        {featuredWorks.map((work) => (
          <div key={`${work.title}-dup`} aria-hidden className="w-52 shrink-0 sm:w-60">
            <div className="group block w-full text-left [perspective:1200px]">{renderCover(work)}</div>
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
