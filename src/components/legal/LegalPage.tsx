import type { ReactNode } from "react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SiteFooter } from "@/components/sections/SiteFooter";

/**
 * Shell for legal/policy pages: a simple header (logo → home, theme toggle,
 * CTA), a readable themed article (`.legal-prose`), and the shared footer.
 */
export function LegalPage({
  title,
  lastUpdated,
  intro,
  children,
}: {
  title: string;
  lastUpdated?: string;
  intro?: string;
  children: ReactNode;
}) {
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
        <Container size="narrow">
          <p className="text-parchment-500 mb-4 font-mono text-xs tracking-[0.3em] uppercase">
            Bookture Media
          </p>
          <h1 className="font-display text-parchment-100 text-4xl leading-tight font-light sm:text-5xl">
            {title}
          </h1>
          {lastUpdated ? (
            <p className="text-parchment-500 mt-4 font-mono text-xs tracking-widest uppercase">
              Last updated: {lastUpdated}
            </p>
          ) : null}
          {intro ? <p className="text-parchment-300 mt-6 leading-relaxed">{intro}</p> : null}
          <div className="legal-prose mt-10">{children}</div>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
