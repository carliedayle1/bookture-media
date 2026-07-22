import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { ThemedBackground } from "@/components/ui/ThemedBackground";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { GoldParticles } from "@/components/ui/GoldParticles";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { authorSpotlightContent as c } from "@/lib/content";

/**
 * Author Spotlight — a featured author with an interview video. Phase-1 style
 * placeholder frame (play button over an atmospheric backdrop) until a clip is
 * supplied via authorSpotlightContent.videoSrc.
 */
export function AuthorSpotlight() {
  const hasVideo = Boolean(c.videoSrc);

  return (
    <Section id="spotlight" chapter={c.chapter} theme="ink-900">
      <AmbientGlow />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GoldParticles density={22} />
      </div>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* video / placeholder frame */}
          <div className="border-foreground/10 relative isolate aspect-video overflow-hidden rounded-2xl border">
            <ThemedBackground name="spotlight" scrim="center" />
            {hasVideo ? (
              <AmbientVideo src={c.videoSrc} className="absolute inset-0 h-full w-full object-cover" />
            ) : null}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <span className="relative flex h-20 w-20 items-center justify-center">
                {/* radar-ping rings — a moving invite to play */}
                <span
                  aria-hidden
                  className="ambient border-gold-500/40 absolute inset-0 rounded-full border [animation:var(--animate-hub)]"
                />
                <span
                  aria-hidden
                  className="ambient border-gold-500/30 absolute inset-0 rounded-full border [animation:var(--animate-hub)] [animation-delay:-1.4s]"
                />
                <span className="border-gold-500/50 bg-ink-950/30 relative flex h-20 w-20 items-center justify-center rounded-full border backdrop-blur-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" className="text-accent ml-1" fill="currentColor">
                    <path d="M6 4l14 8-14 8z" />
                  </svg>
                </span>
              </span>
              <span className="text-parchment-300 font-mono text-xs tracking-[0.3em] uppercase">
                Watch the conversation
              </span>
            </div>
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
