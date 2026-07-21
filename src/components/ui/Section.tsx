import type { ReactNode, Ref } from "react";

import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { ChapterTag } from "./ChapterTag";

const THEMES = {
  "ink-950": "bg-surface",
  "ink-900": "bg-surface-alt",
  transparent: "bg-transparent",
} as const;

type SectionProps = {
  id: string;
  /** Optional chapter marker rendered at the top of the section. */
  chapter?: { numeral: string; label: string };
  theme?: keyof typeof THEMES;
  /** Vertical rhythm. "none" for sections that manage their own spacing. */
  spacing?: "default" | "compact" | "none";
  /** Ref to the section root — pass a section's animation scope here. */
  ref?: Ref<HTMLElement>;
  className?: string;
  children: ReactNode;
};

const SPACING = {
  default: "py-[var(--spacing-section)]",
  compact: "py-[clamp(3rem,7vw,6rem)]",
  none: "",
} as const;

/**
 * Section shell: stable id (for anchor nav), vertical rhythm, theme background,
 * `isolate` for local z-stacking, and an optional ChapterTag header. Forwards a
 * ref so sections can use it as their GSAP animation scope.
 */
export function Section({
  id,
  chapter,
  theme = "ink-950",
  spacing = "default",
  ref,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative isolate w-full overflow-hidden",
        THEMES[theme],
        SPACING[spacing],
        className,
      )}
    >
      {chapter ? (
        <Container className="mb-12">
          <ChapterTag numeral={chapter.numeral} label={chapter.label} />
        </Container>
      ) : null}
      {children}
    </section>
  );
}
