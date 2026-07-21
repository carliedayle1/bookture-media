import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { processSteps } from "@/lib/content";

/**
 * The Craft — the 01–06 process ritual. Phase 1: a static responsive grid of
 * numbered cards. Phase 4 threads an animated gold SVG path (DrawSVG) between
 * the cards and adds per-card 3D tilt on hover.
 */
export function Process() {
  return (
    <Section id="craft" chapter={{ numeral: "II", label: "The Craft" }} theme="ink-900">
      <AtmosphereBackground variant="forest" vignette={false} />
      <Container size="wide">
        <RevealText
          as="h2"
          split="lines"
          className="font-display text-parchment-100 mb-16 max-w-2xl text-4xl leading-tight font-light sm:text-5xl"
        >
          Six unhurried steps from manuscript to object.
        </RevealText>

        <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <li key={step.numeral} className="bg-surface group relative p-8 lg:p-10">
              <span className="font-display text-gold-600/70 group-hover:text-accent block text-5xl leading-none font-light italic transition-colors duration-500">
                {step.numeral}
              </span>
              <h3 className="font-display text-parchment-100 mt-6 text-2xl font-light">
                {step.title}
              </h3>
              <p className="text-parchment-300 mt-4 text-sm leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
