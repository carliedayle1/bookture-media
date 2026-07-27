"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/lib/content";

/**
 * Header for sub-pages (legal, contact). Logo → home, a Home link + CTA on
 * desktop; below md a hamburger opens a full-screen menu with the home sections,
 * Contact, and the CTA. Nav links route to /#section (home + anchor).
 */
export function SubPageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

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
              className="text-parchment-300 hover:text-accent hidden font-mono text-xs tracking-[0.15em] uppercase transition-colors md:block"
            >
              ← Home
            </Link>
            <ThemeToggle />
            <span className="hidden md:inline-flex">
              <Button variant="outline" size="md" href="/#begin">
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
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/${link.href}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-parchment-100 hover:text-accent text-4xl font-light tracking-tight transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
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
                <Button variant="solid" size="lg" href="/#begin" onClick={() => setMenuOpen(false)}>
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
