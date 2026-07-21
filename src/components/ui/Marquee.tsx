import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. Larger = slower. */
  durationS?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

/**
 * Infinite horizontal ticker. The track holds two identical copies and
 * translates by -50%, so the loop is seamless. Pure CSS ambient loop — paused
 * offscreen/under reduced motion via the `.ambient` convention.
 */
export function Marquee({
  children,
  durationS = 42,
  reverse = false,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "ambient flex w-max shrink-0 [animation:var(--animate-marquee)]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animationDuration: `${durationS}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
      {/* edge fades */}
      <div className="from-surface pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r to-transparent" />
      <div className="from-surface pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l to-transparent" />
    </div>
  );
}
