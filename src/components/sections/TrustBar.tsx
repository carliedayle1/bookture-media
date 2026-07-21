import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { trustMetrics } from "@/lib/content";

/**
 * Slim metrics bar. Phase 1: static figures. Phase 2 swaps the numbers for
 * <AnimatedCounter> that eases up when scrolled into view.
 */
export function TrustBar() {
  return (
    <section id="trust" className="bg-surface-alt border-y border-foreground/10">
      <Container className="py-14">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {trustMetrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex flex-col items-center gap-2 text-center ${
                i > 0 ? "lg:border-l lg:border-foreground/10" : ""
              }`}
            >
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-display text-accent text-5xl leading-none font-light">
                <AnimatedCounter value={m.value} suffix={m.suffix ?? ""} />
              </dd>
              <p className="text-parchment-500 max-w-[16ch] text-xs tracking-wide">{m.label}</p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
