import { cn } from "@/lib/utils";

type OrnamentDividerProps = {
  variant?: "rule" | "fleuron";
  className?: string;
};

/**
 * Gold ornamental divider — a chapter break between sections. "rule" is a thin
 * gradient hairline; "fleuron" centers a small diamond ornament in the rule.
 */
export function OrnamentDivider({ variant = "rule", className }: OrnamentDividerProps) {
  if (variant === "fleuron") {
    return (
      <div
        aria-hidden
        className={cn("flex items-center justify-center gap-4", className)}
      >
        <span className="via-gold-600/50 h-px w-full max-w-[10rem] bg-gradient-to-r from-transparent to-transparent" />
        <svg width="14" height="14" viewBox="0 0 14 14" className="text-accent shrink-0">
          <path
            d="M7 0 L9 5 L14 7 L9 9 L7 14 L5 9 L0 7 L5 5 Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
        <span className="via-gold-600/50 h-px w-full max-w-[10rem] bg-gradient-to-l from-transparent to-transparent" />
      </div>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "via-gold-600/40 block h-px w-full bg-gradient-to-r from-transparent to-transparent",
        className,
      )}
    />
  );
}
