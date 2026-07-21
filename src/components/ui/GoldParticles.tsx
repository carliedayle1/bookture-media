"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/components/providers/MotionProvider";

type GoldParticlesProps = {
  density?: number;
  className?: string;
};

/**
 * Drifting gold dust motes on a 2D canvas (not WebGL — keeps the single R3F
 * canvas the only GL context). Not mounted under reduced motion; the rAF loop
 * pauses whenever the canvas scrolls offscreen.
 */
export function GoldParticles({ density = 40, className }: GoldParticlesProps) {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    type Mote = { x: number; y: number; r: number; vy: number; vx: number; a: number };
    let motes: Mote[] = [];

    const seed = () => {
      motes = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        vy: -(Math.random() * 0.25 + 0.05),
        vx: (Math.random() - 0.5) * 0.15,
        a: Math.random() * 0.5 + 0.1,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let raf = 0;
    let running = true;
    const tick = () => {
      if (!running) {
        return;
      }
      ctx.clearRect(0, 0, width, height);
      for (const m of motes) {
        m.y += m.vy;
        m.x += m.vx;
        if (m.y < -4) {
          m.y = height + 4;
          m.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214,174,92,${m.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const wasRunning = running;
        running = entry.isIntersecting;
        if (running && !wasRunning) {
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.01 },
    );

    resize();
    window.addEventListener("resize", resize);
    io.observe(canvas);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [reducedMotion, density]);

  if (reducedMotion) {
    return null;
  }

  return <canvas ref={canvasRef} aria-hidden className={cn("h-full w-full", className)} />;
}
