"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { BookModel } from "./BookModel";

/**
 * The hero's WebGL layer. Mounts above HeroPoster and cross-fades in on the
 * first rendered frame. Rendering is paused (frameloop "never") whenever the
 * hero is scrolled out of view, so the GPU idles on the rest of the page.
 *
 * Default export so it can be `next/dynamic`-imported with ssr:false from the
 * client Hero component (all three.js stays in this chunk).
 */
export default function HeroCanvas() {
  const wrap = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [loop, setLoop] = useState<"always" | "never">("always");

  useEffect(() => {
    const el = wrap.current;
    if (!el) {
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setLoop(entry.isIntersecting ? "always" : "never"),
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className={`pointer-events-none absolute inset-0 -z-[5] transition-opacity duration-[1200ms] ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      aria-hidden
    >
      <Canvas
        frameloop={loop}
        camera={{ position: [0, 0, 7], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setReady(true)}
      >
        <ambientLight intensity={0.4} color="#fff3dd" />
        <directionalLight position={[4, 6, 5]} intensity={2.2} color="#ffe9c2" />
        <directionalLight position={[-4, 1, -5]} intensity={1.4} color="#d6ae5c" />
        <BookModel />
      </Canvas>
    </div>
  );
}
