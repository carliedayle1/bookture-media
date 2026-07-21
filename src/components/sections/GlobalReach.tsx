import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { ReachMap } from "./ReachMap";
import { reachContent as c } from "@/lib/content";

/**
 * The Reach — global distribution. Phase 1: copy + a static hub list. Phase 6
 * replaces the panel with an animated SVG world map (pulsing hub dots + DrawSVG
 * distribution arcs).
 */
export function GlobalReach() {
  return (
    <Section id="reach" chapter={c.chapter} theme="ink-950">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <RevealText
              as="h2"
              split="words"
              className="font-display text-parchment-100 text-4xl leading-tight font-light sm:text-5xl"
            >
              {c.headline}
            </RevealText>
            <p className="text-accent mt-8 font-mono text-sm tracking-[0.2em] uppercase">{c.stat}</p>
            <p className="text-parchment-300 mt-6 max-w-md leading-relaxed">{c.copy}</p>
          </div>

          {/* Animated SVG reach map */}
          <div className="border-foreground/10 bg-foreground/[0.03] relative overflow-hidden rounded-2xl border p-6">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  "radial-gradient(80% 60% at 30% 20%, rgb(var(--atmo-accent) / 0.08), transparent 55%)",
              }}
            />
            <ReachMap />
          </div>
        </div>
      </Container>
    </Section>
  );
}
