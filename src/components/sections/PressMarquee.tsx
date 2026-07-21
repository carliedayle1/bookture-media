import { Marquee } from "@/components/ui/Marquee";
import { pressQuotes } from "@/lib/content";

/**
 * Slim press-accolade ticker — an infinite marquee of short quotes. Sits as a
 * quiet band between larger sections to add movement without weight.
 */
export function PressMarquee() {
  return (
    <section aria-label="Press" className="bg-surface border-y border-white/5 py-6">
      <Marquee durationS={48}>
        {pressQuotes.map((p) => (
          <span key={p.source} className="flex items-center gap-4 px-8">
            <span className="font-display text-parchment-300 text-lg italic">
              &ldquo;{p.quote}&rdquo;
            </span>
            <span className="text-accent font-mono text-xs tracking-[0.2em] uppercase">
              {p.source}
            </span>
            <span aria-hidden className="text-gold-600/60 ml-4">
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
