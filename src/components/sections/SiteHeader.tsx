"use client";

import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLenis } from "@/hooks/useLenis";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/content";

/**
 * Fixed top navigation. Hides on scroll-down, reappears on scroll-up, and gains
 * a glass background once scrolled past the hero lip. The docked HeroLogo uses
 * the same useHideOnScroll state, so they hide/reveal together.
 */
export function SiteHeader() {
  const { scrollTo } = useLenis();
  const { hidden, scrolled } = useHideOnScroll();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 [transition-timing-function:var(--ease-in-out-book)]",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 border-b transition-colors duration-500",
          scrolled ? "bg-surface/80 border-foreground/10 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      />
      <div
        data-header-inner
        className="mx-auto flex h-[var(--header-height)] w-full max-w-[88rem] items-center justify-between px-[var(--edge-gutter)]"
      >
        {/* Invisible spacer reserving the docking spot for the animated HeroLogo. */}
        <span aria-hidden className="pointer-events-none opacity-0">
          <Logo variant="mark" height={46} withWordmark />
        </span>

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

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="text-parchment-300 hover:text-accent hidden font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300 sm:block"
          >
            Contact
          </Link>
          <ThemeToggle />
          <Button variant="outline" size="md" href="#begin" className="hidden sm:inline-flex">
            Begin your book
          </Button>
        </div>
      </div>
    </header>
  );
}
