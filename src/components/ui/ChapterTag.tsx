import { cn } from "@/lib/utils";

type ChapterTagProps = {
  /** Roman numeral, e.g. "IV". */
  numeral: string;
  /** Short label, e.g. "The Craft". */
  label: string;
  className?: string;
};

/**
 * Ceremonial section marker — mono gold "IV — The Craft" with a short rule.
 * Echoes the numbered-chapter ritual that makes the reference site feel curated.
 */
export function ChapterTag({ numeral, label, className }: ChapterTagProps) {
  return (
    <span
      className={cn(
        "text-accent inline-flex items-center gap-3 font-mono text-xs tracking-[0.35em] uppercase",
        className,
      )}
    >
      <span className="tabular-nums">{numeral}</span>
      <span aria-hidden className="bg-gold-600/60 h-px w-8" />
      <span className="text-parchment-300">{label}</span>
    </span>
  );
}
