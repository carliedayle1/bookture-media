import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { siteConfig, footerContent } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-surface-alt relative border-t border-foreground/10">
      <Container className="py-[clamp(4rem,8vw,7rem)]">
        <OrnamentDivider variant="fleuron" className="mb-16" />

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr_1.4fr]">
          {/* Brand + tagline */}
          <div className="flex flex-col items-start gap-6">
            <Logo variant="full" height={200} className="h-auto w-full max-w-[360px]" />
          </div>

          {/* Link columns */}
          {footerContent.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-4">
              <h3 className="text-parchment-500 font-mono text-xs tracking-[0.2em] uppercase">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-parchment-300 hover:text-accent text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter + socials */}
          <div className="flex flex-col gap-6">
            <h3 className="text-parchment-500 font-mono text-xs tracking-[0.2em] uppercase">
              The dispatch
            </h3>
            <p className="text-parchment-300 text-sm leading-relaxed">
              A few times a year: new titles, the occasional essay, nothing else.
            </p>
            <NewsletterSignup />
            <ul className="mt-2 flex flex-wrap gap-5">
              {siteConfig.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-parchment-500 hover:text-accent font-mono text-xs tracking-wider uppercase transition-colors duration-300"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-foreground/10 pt-8 sm:flex-row sm:items-center">
          <p className="font-display text-parchment-500 text-sm italic">{footerContent.colophon}</p>
          <p className="text-parchment-500 font-mono text-xs tracking-wider">
            © 2025 {siteConfig.name}. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
