"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
 *
 * Desktop (md+) shows the inline nav, Contact link, and CTA. Below md those are
 * replaced by a hamburger that opens a full-screen menu overlay.
 */
export function SiteHeader() {
  const { scrollTo } = useLenis();
  const { hidden, scrolled } = useHideOnScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock scroll + wire Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Close the menu, then scroll once the lock is released and the overlay unmounts.
  const goTo = (href: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => scrollTo(href, { offset: -80 })),
    );
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 [transition-timing-function:var(--ease-in-out-book)]",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
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

          <nav className="hidden items-center gap-7 md:flex">
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
            <Link
              href="/book-fairs"
              className="text-parchment-300 hover:text-accent font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Book Fairs
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="text-parchment-300 hover:text-accent hidden font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300 md:block"
            >
              Contact
            </Link>
            <ThemeToggle />
            {/* span controls visibility — Button's own `inline-flex` would beat a bare `hidden` */}
            <span className="hidden md:inline-flex">
              <Button variant="outline" size="md" href="#begin">
                Begin your book
              </Button>
            </span>

            {/* hamburger — mobile only */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="text-parchment-100 hover:text-accent -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-surface/95 absolute inset-0 backdrop-blur-xl" />

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="text-parchment-100 hover:text-accent absolute right-[var(--edge-gutter)] top-0 flex h-[var(--header-height)] w-10 items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            <nav
              aria-label="Mobile"
              className="relative flex h-full flex-col items-start justify-center gap-3 px-[var(--edge-gutter)]"
            >
              {siteConfig.nav.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(link.href);
                  }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-parchment-100 hover:text-accent text-4xl font-light tracking-tight transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * siteConfig.nav.length + 0.08, duration: 0.4 }}
                className="mt-8 flex flex-col items-start gap-6"
              >
                <div className="flex flex-col items-start gap-4">
                  <Link
                    href="/book-fairs"
                    onClick={() => setMenuOpen(false)}
                    className="text-parchment-300 hover:text-accent font-mono text-xs tracking-[0.2em] uppercase transition-colors"
                  >
                    Book Fairs
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="text-parchment-300 hover:text-accent font-mono text-xs tracking-[0.2em] uppercase transition-colors"
                  >
                    Contact
                  </Link>
                </div>
                <Button variant="solid" size="lg" onClick={() => goTo("#begin")}>
                  Begin your book
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
