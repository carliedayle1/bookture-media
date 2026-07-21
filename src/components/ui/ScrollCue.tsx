import { cn } from "@/lib/utils";

/**
 * A slim vertical gold rule that pulses to invite scrolling. Pure CSS ambient
 * loop (paused under reduced motion via the `.ambient` convention).
 */
export function ScrollCue({ className, label = "Scroll" }: { className?: string; label?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <span className="text-parchment-500 font-mono text-[0.6rem] tracking-[0.3em] uppercase">
        {label}
      </span>
      <span className="relative h-14 w-px overflow-hidden bg-white/10">
        <span className="ambient bg-accent absolute inset-x-0 top-0 h-1/2 origin-top [animation:var(--animate-pulse-cue)]" />
      </span>
    </div>
  );
}
