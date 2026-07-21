"use client";

import { useEffect, useState } from "react";

import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/content";

/**
 * Fixed top navigation. Hides on scroll-down, reappears on scroll-up, and gains
 * a glass background once scrolled past the hero lip.
 */
export function SiteHeader() {
  const { scrollTo } = useLenis();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // only hide well past the top, and only on meaningful downward movement
      setHidden(y > 160 && y > last + 4);
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          scrolled ? "bg-ink-950/80 border-white/5 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      />
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
