import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { ChapterTag } from "@/components/ui/ChapterTag";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";

/**
 * PHASE 0 REVIEW PAGE — temporary.
 * A typography + design-system proof: fonts, palette, buttons, reveals, and
 * smooth scroll. Phase 1 replaces this with the real section composition.
 */
export default function Home() {
  return (
    <main>
      {/* Opening ---------------------------------------------------------- */}
      <Section id="proof-hero" spacing="none" className="min-h-screen">
        <Container className="flex min-h-screen flex-col justify-center py-32">
          <ChapterTag numeral="0" label="Design System Proof" className="mb-10" />
          <RevealText
            as="h1"
            split="words"
            trigger="mount"
            className="font-display text-parchment-100 max-w-4xl text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] font-light tracking-tight"
          >
            Empowering stories for future generations.
          </RevealText>
          <RevealText
            as="p"
            split="lines"
            trigger="mount"
            delay={0.5}
            className="text-parchment-300 mt-10 max-w-xl text-lg leading-relaxed"
          >
            A boutique literary publisher. We shape manuscripts into books made
            to last — cinematic craft, editorial rigour, and a legacy worth
            keeping.
          </RevealText>
          <div className="mt-14 flex flex-wrap gap-5">
            <Button variant="solid" size="lg" magnetic href="#proof-palette">
              Begin your book
            </Button>
            <Button variant="outline" size="lg" magnetic href="#proof-type">
              See our authors
            </Button>
          </div>
        </Container>
      </Section>

      {/* Palette ---------------------------------------------------------- */}
      <Section id="proof-palette" theme="ink-900" chapter={{ numeral: "I", label: "Palette" }}>
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { name: "ink-950", cls: "bg-ink-950" },
              { name: "ink-900", cls: "bg-ink-900" },
              { name: "ink-800", cls: "bg-ink-800" },
              { name: "ink-700", cls: "bg-ink-700" },
              { name: "gold-300", cls: "bg-gold-300" },
              { name: "gold-400", cls: "bg-gold-400" },
              { name: "gold-500", cls: "bg-gold-500" },
              { name: "gold-600", cls: "bg-gold-600" },
              { name: "parchment-100", cls: "bg-parchment-100" },
              { name: "parchment-500", cls: "bg-parchment-500" },
            ].map((s) => (
              <div key={s.name} className="border-border overflow-hidden rounded-lg border">
                <div className={`h-24 ${s.cls}`} />
                <div className="text-parchment-500 p-3 font-mono text-xs">{s.name}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Type scale ------------------------------------------------------- */}
      <Section id="proof-type" chapter={{ numeral: "II", label: "Typography" }}>
        <Container size="narrow" className="space-y-10">
          <RevealText as="h2" split="lines" className="font-display text-parchment-100 text-5xl font-light">
            Serif for meaning, sans for utility.
          </RevealText>
          <p className="text-parchment-300 text-lg leading-relaxed">
            Body copy is set in Inter at a comfortable measure. Display
            headlines use Fraunces with its optical-size axis, so large sizes
            gain contrast and small sizes stay legible. Numerals and chapter
            tags use Space Mono for a tactile, editorial counterpoint.
          </p>
          <p className="font-mono text-parchment-500 text-sm tracking-wider">
            01 — 02 — 03 — 04 — 05 — 06
          </p>
          <OrnamentDivider variant="fleuron" />
          <blockquote className="font-display text-accent text-2xl italic">
            &ldquo;Printed on paper that remembers the ink.&rdquo;
          </blockquote>
        </Container>
      </Section>

      {/* Buttons ---------------------------------------------------------- */}
      <Section id="proof-buttons" theme="ink-900" chapter={{ numeral: "III", label: "Controls" }}>
        <Container className="flex flex-wrap items-center gap-6">
          <Button variant="solid" magnetic>Solid</Button>
          <Button variant="outline" magnetic>Outline</Button>
          <Button variant="ghost" magnetic>Ghost</Button>
          <Button variant="solid" loading loadingLabel="Reaching the editor&rsquo;s desk…">
            Loading
          </Button>
        </Container>
      </Section>

      {/* Scroll reveal proof --------------------------------------------- */}
      <Section id="proof-scroll" chapter={{ numeral: "IV", label: "Scroll Reveal" }}>
        <Container size="narrow" className="space-y-24">
          {[
            "Nothing on this page sits entirely still.",
            "Each line rises from behind its own baseline.",
            "Scroll is smoothed; motion respects your preferences.",
          ].map((line) => (
            <RevealText
              key={line}
              as="h3"
              split="words"
              className="font-display text-parchment-100 text-4xl font-light"
            >
              {line}
            </RevealText>
          ))}
          <OrnamentDivider />
          <p className="text-parchment-500 pb-24 text-center font-mono text-xs tracking-widest uppercase">
            End of Phase 0 proof
          </p>
        </Container>
      </Section>
    </main>
  );
}
