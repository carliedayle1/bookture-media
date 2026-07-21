import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { GoldParticles } from "@/components/ui/GoldParticles";
import { heroContent, siteConfig } from "@/lib/content";
import { HeroPoster } from "./HeroPoster";
import { HeroVideo } from "./HeroVideo";

/**
 * Hero — the opening statement. A procedural atmosphere backs the headline, with
 * drifting gold dust on top. If `heroContent.backgroundVideo` is set, a muted
 * loop plays behind everything (reduced-motion falls back to the poster).
 *
 * The animated brand logo that starts here and docks to the navbar lives in
 * <HeroLogo /> (mounted at the page root so it can be position: fixed).
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-start overflow-hidden"
    >
      <HeroPoster />
      <HeroVideo />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[4]">
        <GoldParticles density={36} />
      </div>

      <Container className="relative z-10 w-full pt-[14rem] pb-28">
        <h1 className="font-display text-parchment-100 max-w-[16ch] text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.98] font-light tracking-tight">
          {heroContent.headline.map((run, i) =>
            run.emphasis ? (
              <em key={i} className="text-accent italic">
                {run.text}
              </em>
            ) : (
              <span key={i}>{run.text}</span>
            ),
          )}
        </h1>

        <p className="text-parchment-300 mt-10 max-w-xl text-lg leading-relaxed">
          {heroContent.lede}
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-5">
          <Button variant="solid" size="lg" magnetic href={heroContent.primaryCta.href}>
            {heroContent.primaryCta.label}
          </Button>
          <Button variant="outline" size="lg" magnetic href={heroContent.secondaryCta.href}>
            {heroContent.secondaryCta.label}
          </Button>
        </div>
      </Container>

      <ScrollCue className="absolute bottom-10 left-1/2 -translate-x-1/2" />
      <span className="sr-only">{siteConfig.legalName}</span>
    </section>
  );
}
