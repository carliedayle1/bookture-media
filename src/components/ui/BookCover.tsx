import { cn } from "@/lib/utils";

/**
 * Procedural book jacket — a typographic placeholder standing in for real cover
 * artwork. Deterministic jacket tone per title so the shelf looks intentional.
 *
 * SWAP POINT: replace the inner jacket with a <next/image> of the real cover.
 */

const JACKETS = [
  "linear-gradient(160deg, #1b2a3a, #0c151f)",
  "linear-gradient(160deg, #2a2320, #14100d)",
  "linear-gradient(160deg, #22303a, #0f1a20)",
  "linear-gradient(160deg, #2b2536, #15111c)",
  "linear-gradient(160deg, #1e2b26, #0d1512)",
  "linear-gradient(160deg, #302722, #171009)",
];

function toneFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return JACKETS[h % JACKETS.length];
}

type BookCoverProps = {
  title: string;
  author: string;
  className?: string;
};

export function BookCover({ title, author, className }: BookCoverProps) {
  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full overflow-hidden rounded-[3px] shadow-2xl shadow-black/50",
        className,
      )}
      style={{ backgroundImage: toneFor(title) }}
    >
      {/* spine shading */}
      <span aria-hidden className="absolute inset-y-0 left-0 w-3 bg-black/30" />
      <span aria-hidden className="absolute inset-y-0 left-3 w-px bg-white/10" />
      {/* gold frame */}
      <span aria-hidden className="border-gold-600/40 absolute inset-3 rounded-[2px] border" />
      {/* type */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-7 text-center">
        <span className="text-gold-400/70 font-mono text-[0.55rem] tracking-[0.3em] uppercase">
          Bookture
        </span>
        <div className="flex flex-col items-center gap-3">
          <svg width="12" height="12" viewBox="0 0 14 14" className="text-gold-400/80">
            <path d="M7 0 L9 5 L14 7 L9 9 L7 14 L5 9 L0 7 L5 5 Z" fill="currentColor" />
          </svg>
          <h4 className="font-display text-parchment-100 text-xl leading-tight font-light text-balance">
            {title}
          </h4>
        </div>
        <span className="text-parchment-300/80 font-mono text-[0.6rem] tracking-[0.15em] uppercase">
          {author}
        </span>
      </div>
    </div>
  );
}
