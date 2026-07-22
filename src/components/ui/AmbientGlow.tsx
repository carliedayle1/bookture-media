import { cn } from "@/lib/utils";

/**
 * Slow-drifting gold radial glows for otherwise-flat sections. Pure CSS ambient
 * loops (the `.ambient` class disables them under reduced motion). Sits behind
 * content at -z-10 within the section's isolate context; purely decorative.
 */
export function AmbientGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className="ambient absolute -left-[8%] top-[6%] h-[42vmax] w-[42vmax] rounded-full blur-3xl [animation:var(--animate-glow-drift)]"
        style={{ background: "radial-gradient(circle, rgb(var(--atmo-accent) / 0.14), transparent 65%)" }}
      />
      <div
        className="ambient absolute -right-[10%] bottom-[4%] h-[38vmax] w-[38vmax] rounded-full blur-3xl [animation:var(--animate-glow-drift)] [animation-delay:-11s] [animation-duration:26s]"
        style={{ background: "radial-gradient(circle, rgb(var(--atmo-accent) / 0.10), transparent 65%)" }}
      />
    </div>
  );
}
