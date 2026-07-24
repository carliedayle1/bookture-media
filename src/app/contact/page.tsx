import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { RevealText } from "@/components/ui/RevealText";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig, contactContent as c } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Bookture Media — our studio in Vancouver, Canada.",
};

const { lat, lng } = siteConfig.address;
const MAP_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.03}%2C${lat - 0.018}%2C${lng + 0.03}%2C${lat + 0.018}&layer=mapnik&marker=${lat}%2C${lng}`;
const MAP_LINK = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;

export default function ContactPage() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="bg-surface/85 border-foreground/10 absolute inset-0 -z-10 border-b backdrop-blur-md" />
        <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[88rem] items-center justify-between px-[var(--edge-gutter)]">
          <Link href="/" aria-label="Bookture Media — home" className="flex items-center">
            <Logo variant="mark" height={38} withWordmark />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-parchment-300 hover:text-accent hidden font-mono text-xs tracking-[0.15em] uppercase transition-colors sm:block"
            >
              ← Home
            </Link>
            <ThemeToggle />
            <Button variant="outline" size="md" href="/#begin" className="hidden sm:inline-flex">
              Begin your book
            </Button>
          </div>
        </div>
      </header>

      <main id="main" className="pt-[calc(var(--header-height)+3.5rem)] pb-24">
        <Container>
          <p className="text-parchment-500 mb-4 font-mono text-xs tracking-[0.3em] uppercase">
            {c.eyebrow}
          </p>
          <RevealText
            as="h1"
            split="lines"
            trigger="mount"
            className="font-display text-parchment-100 max-w-2xl text-4xl leading-tight font-light sm:text-5xl"
          >
            {c.headline}
          </RevealText>
          <p className="text-parchment-300 mt-6 max-w-xl leading-relaxed">{c.intro}</p>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* form */}
            <ContactForm />

            {/* details + map */}
            <div className="flex flex-col gap-8">
              <dl className="grid gap-6 sm:grid-cols-2">
                <ContactItem label="By phone">
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
                    {siteConfig.phone}
                  </a>
                </ContactItem>
                <ContactItem label="By email">
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-accent transition-colors">
                    {siteConfig.email}
                  </a>
                </ContactItem>
                <ContactItem label="The studio">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.country}
                </ContactItem>
                <ContactItem label={c.hoursLabel}>{c.hours}</ContactItem>
              </dl>

              <div>
                <div className="border-foreground/10 relative aspect-[4/3] overflow-hidden rounded-2xl border">
                  <iframe
                    title="Bookture Media studio location in Vancouver, Canada"
                    src={MAP_EMBED}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full"
                    style={{ border: 0 }}
                  />
                </div>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-parchment-500 hover:text-accent mt-3 inline-block font-mono text-xs tracking-[0.15em] uppercase transition-colors"
                >
                  View larger map →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}

function ContactItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-parchment-500 font-mono text-xs tracking-[0.2em] uppercase">{label}</dt>
      <dd className="text-parchment-200 mt-2 text-sm leading-relaxed">{children}</dd>
    </div>
  );
}
