import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { ThemedBackground } from "@/components/ui/ThemedBackground";
import { GoldParticles } from "@/components/ui/GoldParticles";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { authorSpotlightContent as c } from "@/lib/content";

/**
 * Author Spotlight — a featured author beside their Vimeo interview.
 */
export function AuthorSpotlight() {
  return (
    <Section id="spotlight" chapter={c.chapter} theme="ink-900">
      <AmbientGlow />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GoldParticles density={22} />
      </div>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* interview video */}
          <div className="border-foreground/10 relative isolate aspect-video overflow-hidden rounded-2xl border">
            <ThemedBackground name="spotlight" scrim="center" />
            <iframe
              src={c.videoEmbed}
              title={`${c.eyebrow}: ${c.name}`}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
            />
          </div>

          {/* author text */}
          <div>
            <p className="text-parchment-500 mb-6 font-mono text-xs tracking-[0.3em] uppercase">
              {c.eyebrow}
            </p>
            <RevealText
              as="h2"
              split="words"
              className="font-display text-parchment-100 text-4xl leading-tight font-light sm:text-5xl"
            >
              {c.name}
            </RevealText>
            <p className="text-accent mt-3 font-mono text-xs tracking-[0.2em] uppercase">{c.title}</p>
            <p className="text-parchment-300 mt-8 leading-relaxed">{c.bio}</p>
            <blockquote className="border-gold-600/40 font-display text-parchment-100 mt-8 border-l-2 pl-6 text-xl leading-snug italic">
              &ldquo;{c.pullQuote}&rdquo;
            </blockquote>
          </div>
        </div>
      </Container>
    </Section>
  );
}
