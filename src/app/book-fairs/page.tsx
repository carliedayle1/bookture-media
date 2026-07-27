import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { RevealText } from "@/components/ui/RevealText";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import { GoldParticles } from "@/components/ui/GoldParticles";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SubPageHeader } from "@/components/sections/SubPageHeader";
import { FairFeatures } from "@/components/sections/FairFeatures";
import { bookFairsPageContent as c } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book Fairs",
  description:
    "Where to find Bookture Media in person — the international book fairs we attend each year.",
};

export default function BookFairsPage() {
  return (
    <>
      <SubPageHeader />

      <main id="main">
        {/* Cinematic hero */}
        <section className="relative isolate flex min-h-[72vh] items-center overflow-hidden pt-[var(--header-height)]">
          {c.heroVideo ? (
            <AmbientVideo src={c.heroVideo} className="absolute inset-0 -z-10 h-full w-full object-cover" />
          ) : (
            <AtmosphereBackground variant="hall" kenBurns />
          )}
          <AmbientGlow />
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <GoldParticles density={28} />
          </div>

          <Container className="relative z-10 py-24">
            <p className="text-parchment-500 mb-6 font-mono text-xs tracking-[0.3em] uppercase">
              {c.eyebrow}
            </p>
            <RevealText
              as="h1"
              split="lines"
              trigger="mount"
              className="font-display text-parchment-100 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] font-light tracking-tight"
            >
              {c.headline}
            </RevealText>
            <p className="text-parchment-300 mt-8 max-w-xl text-lg leading-relaxed">{c.intro}</p>
          </Container>
        </section>

        {/* Fair-by-fair feature blocks */}
        <section className="relative isolate overflow-hidden py-20 lg:py-28">
          <AmbientGlow />
          <Container>
            <FairFeatures />

            {/* closing invitation */}
            <div className="mt-24 text-center lg:mt-32">
              <OrnamentDivider variant="fleuron" className="mb-10" />
              <p className="font-display text-parchment-100 text-2xl leading-snug font-light italic sm:text-3xl">
                Attending one of these?
              </p>
              <p className="text-parchment-300 mt-4">
                We&rsquo;d love to meet.{" "}
                <Link href="/contact" className="text-accent hover:text-gold-300 underline-offset-4 transition-colors hover:underline">
                  Say hello &rarr;
                </Link>
              </p>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
