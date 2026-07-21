import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
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

          {/* Reach panel (Phase 6: animated SVG map) */}
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  "radial-gradient(80% 60% at 30% 20%, rgba(214,174,92,0.08), transparent 55%)",
              }}
            />
            <ul className="grid grid-cols-2 gap-x-8 gap-y-5">
              {c.hubs.map((hub) => (
                <li key={hub.city} className="flex items-center gap-3">
                  <span className="ambient bg-accent h-2 w-2 shrink-0 rounded-full [animation:var(--animate-pulse-cue)]" />
                  <span className="text-parchment-100 text-sm">{hub.city}</span>
                  <span className="text-parchment-500 ml-auto font-mono text-[0.65rem] uppercase">
                    {hub.country}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
