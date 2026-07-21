"use client";

import type { ReactNode } from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useLenis } from "@/hooks/useLenis";

const MotionLink = motion.create(NextLink);

type Variant = "solid" | "outline" | "ghost";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, { base: string; fill: string; label: string }> = {
  solid: {
    base: "bg-gold-400 text-ink-950 border border-gold-400",
    fill: "bg-gold-300",
    label: "group-hover:text-ink-950",
  },
  outline: {
    base: "bg-transparent text-parchment-100 border border-gold-500/50",
    fill: "bg-gold-400",
    label: "group-hover:text-ink-950",
  },
  ghost: {
    base: "bg-transparent text-parchment-100 border border-transparent",
    fill: "bg-transparent",
    label: "group-hover:text-gold-300",
  },
};

const SIZES: Record<Size, string> = {
  md: "px-7 py-3 text-[0.7rem]",
  lg: "px-9 py-4 text-xs",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  magnetic?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  children: ReactNode;
};

/**
 * Primary interactive control.
 *  - `magnetic` adds cursor-follow pull (auto-off on touch / reduced motion).
 *  - Gold "ink fill" sweeps from the left on hover, with letter-spacing bloom.
 *  - `href` renders a smooth-scroll anchor (#id) or a Next <Link>; otherwise a
 *    <button>. `loading` shows `loadingLabel` and blocks interaction.
 */
export function Button({
  variant = "solid",
  size = "md",
  href,
  magnetic = false,
  loading = false,
  loadingLabel = "One moment…",
  disabled = false,
  type = "button",
  onClick,
  className,
  children,
}: ButtonProps) {
  const { ref, x, y, onMouseMove, onMouseLeave, disabled: magneticOff } = useMagnetic();
  const { scrollTo } = useLenis();
  const v = VARIANTS[variant];
  const isAnchor = href?.startsWith("#");
  const inert = disabled || loading;

  const rootClass = cn(
    "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full",
    "font-mono uppercase tracking-[0.2em] leading-none select-none",
    "transition-[letter-spacing,color,border-color,opacity] duration-500 [transition-timing-function:var(--ease-gold)]",
    "hover:tracking-[0.3em]",
    v.base,
    SIZES[size],
    inert && "pointer-events-none opacity-60",
    className,
  );

  const motionStyle = magnetic && !magneticOff ? { x, y } : undefined;

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 z-0 origin-left scale-x-0 rounded-full transition-transform duration-500 [transition-timing-function:var(--ease-gold)] group-hover:scale-x-100",
          v.fill,
        )}
      />
      <span className={cn("relative z-10 inline-flex items-center gap-2 transition-colors duration-500", v.label)}>
        {loading ? (
          <>
            <LoadingDots />
            {loadingLabel}
          </>
        ) : (
          children
        )}
      </span>
    </>
  );

  const sharedProps = {
    className: rootClass,
    style: motionStyle,
    onMouseMove: magnetic ? onMouseMove : undefined,
    onMouseLeave: magnetic ? onMouseLeave : undefined,
    ref: ref as never,
  };

  if (isAnchor && href) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        onClick={(event) => {
          event.preventDefault();
          scrollTo(href, { offset: -80 });
          onClick?.();
        }}
      >
        {inner}
      </motion.a>
    );
  }

  if (href) {
    return (
      <MotionLink {...sharedProps} href={href} onClick={onClick}>
        {inner}
      </MotionLink>
    );
  }

  return (
    <motion.button {...sharedProps} type={type} disabled={inert} onClick={onClick}>
      {inner}
    </motion.button>
  );
}

function LoadingDots() {
  return (
    <span aria-hidden className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="bg-current inline-block h-1 w-1 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}
