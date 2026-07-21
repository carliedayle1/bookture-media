"use client";

import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useLenis } from "@/hooks/useLenis";
import { siteConfig } from "@/lib/content";

/**
 * Fixed top navigation. Phase 1: static translucent bar with anchor nav.
 * Phase 2 adds hide-on-scroll-down and a glass blur once scrolled.
 */
export function SiteHeader() {
  const { scrollTo } = useLenis();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="from-ink-950/80 absolute inset-0 -z-10 bg-gradient-to-b to-transparent backdrop-blur-[2px]" />
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[88rem] items-center justify-between px-[var(--edge-gutter)]">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo(0);
          }}
          className="flex items-center"
          aria-label={`${siteConfig.name} — home`}
        >
          <Logo variant="mark" height={34} withWordmark priority />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href, { offset: -80 });
              }}
              className="text-parchment-300 hover:text-accent font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center">
          <Button variant="outline" size="md" href="#begin">
            Begin your book
          </Button>
        </div>
      </div>
    </header>
  );
}
