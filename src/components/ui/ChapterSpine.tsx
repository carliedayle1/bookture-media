"use client";

import { useEffect, useState } from "react";

import { chapters } from "@/lib/content";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

/**
 * Fixed chapter-progress rail on the right edge (desktop only). Highlights the
 * chapter currently crossing the viewport middle and lets you jump between
 * them. A quiet, bookish orientation device.
 *
 * Uses an IntersectionObserver with a middle-band rootMargin (no GSAP), so it
 * behaves correctly under reduced motion too.
 */
export function ChapterSpine() {
  const [active, setActive] = useState<string | null>(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-4">
        {chapters.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => scrollTo(`#${c.id}`, { offset: -80 })}
                className="group flex items-center gap-3"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn(
                    "font-mono text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-300",
                    isActive
                      ? "text-accent opacity-100"
                      : "text-parchment-500 opacity-0 group-hover:opacity-100",
                  )}
                >
                  {c.label}
                </span>
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums transition-colors duration-300",
                    isActive ? "text-accent" : "text-parchment-500/60 group-hover:text-parchment-300",
                  )}
                >
                  {c.numeral}
                </span>
                <span
                  className={cn(
                    "h-px transition-all duration-300",
                    isActive ? "bg-accent w-7" : "bg-gold-600/40 w-3 group-hover:w-5",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
