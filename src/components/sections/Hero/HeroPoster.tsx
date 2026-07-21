import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";

/**
 * The hero's static background layer. It is the LCP-safe, JS-free foundation
 * that renders instantly and sits beneath the (Phase 3) R3F book canvas.
 *
 * For now it is fully procedural: a warm library atmosphere, a central glow
 * marking where the floating book will live, and a faint gold horizon line.
 */
export function HeroPoster() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <AtmosphereBackground variant="library" />
      {/* Central pedestal glow — the book's future resting place. */}
      <div
        className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 45%, rgba(214,174,92,0.22), rgba(214,174,92,0.05) 45%, transparent 70%)",
        }}
      />
      {/* Faint horizon line for depth. */}
      <div className="via-gold-600/20 absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent to-transparent" />
    </div>
  );
}
