"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { Globe } from "./Globe";

/**
 * WebGL globe layer for the reach section. Cross-fades in on the first frame and
 * pauses rendering (frameloop "never") whenever scrolled offscreen, so it never
 * competes with the hero canvas for the GPU. Default export for next/dynamic.
 */
export default function GlobeCanvas() {
  const wrap = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [loop, setLoop] = useState<"always" | "never">("never");

  useEffect(() => {
    const el = wrap.current;
    if (!el) {
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setLoop(entry.isIntersecting ? "always" : "never"),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className={`h-full w-full transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
    >
      <Canvas
        frameloop={loop}
        camera={{ position: [0, 0, 6], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setReady(true)}
      >
        <ambientLight intensity={0.7} color="#fff3dd" />
        <directionalLight position={[5, 3, 5]} intensity={1.1} color="#ffe9c2" />
        <Globe />
      </Canvas>
    </div>
  );
}
