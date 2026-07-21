import { createElement, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const SIZES = {
  narrow: "max-w-3xl", // long-form prose (manifesto, colophon)
  default: "max-w-6xl", // most sections
  wide: "max-w-[88rem]", // full-bleed-ish rows (works, reach)
} as const;

type ContainerProps = {
  size?: keyof typeof SIZES;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Horizontal max-width wrapper with consistent edge gutters. */
export function Container({
  size = "default",
  as = "div",
  className,
  children,
}: ContainerProps) {
  return createElement(
    as,
    { className: cn("mx-auto w-full px-[var(--edge-gutter)]", SIZES[size], className) },
    children,
  );
}
