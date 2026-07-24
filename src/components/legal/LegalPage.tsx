import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SubPageHeader } from "@/components/sections/SubPageHeader";

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
      <SubPageHeader />

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
