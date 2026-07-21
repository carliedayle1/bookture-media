"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { heroScroll } from "@/lib/scroll-state";

/**
 * A procedurally-built leather-bound book: two ink covers, a spine, and a page
 * block with gilt (gold) fore-edges, topped by an emissive gold emblem. Floats
 * and rotates gently, responds to pointer, and rises/recedes as the hero is
 * scrolled away.
 *
 * Built from primitives on purpose — no external glb to source, download, or
 * ship, and it stays comfortably under any 3D asset budget.
 */
export function BookModel() {
  const group = useRef<THREE.Group>(null);

  // Page block: gilt gold on the three exposed edges (right/top/bottom),
  // parchment on the hidden faces. Box face order: +x,-x,+y,-y,+z,-z.
  const pageMaterials = useMemo(() => {
    const gold = new THREE.MeshStandardMaterial({
      color: "#d6ae5c",
      metalness: 0.85,
      roughness: 0.3,
      emissive: "#4a3813",
      emissiveIntensity: 0.35,
    });
    const parchment = new THREE.MeshStandardMaterial({ color: "#e3d9c4", roughness: 0.95 });
    return [gold, parchment, gold, gold, parchment, parchment];
  }, []);

  // Four-point gold emblem (the brand fleuron), extruded.
  const emblemGeo = useMemo(() => {
    const shape = new THREE.Shape();
    const spikes = 4;
    const outer = 1;
    const inner = 0.42;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (Math.PI / spikes) * i - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSize: 0.05,
      bevelThickness: 0.04,
      bevelSegments: 2,
    });
    geo.center();
    return geo;
  }, []);

  // Radial-gradient glow sprite behind the book (fake bloom, no post-processing).
  const glowTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(214,174,92,0.9)");
    grad.addColorStop(0.4, "rgba(214,174,92,0.35)");
    grad.addColorStop(1, "rgba(214,174,92,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) {
      return;
    }
    const t = state.clock.elapsedTime;
    const p = heroScroll.progress;
    g.position.y = Math.sin(t * 0.8) * 0.08 + p * 3.2;
    g.rotation.y = 0.4 + Math.sin(t * 0.35) * 0.12 + heroScroll.pointerX * 0.3 + p * 1.4;
    g.rotation.x = -0.08 + Math.sin(t * 0.5) * 0.04 + heroScroll.pointerY * 0.15;
    g.scale.setScalar(1 - p * 0.25);
  });

  return (
    <group ref={group} rotation={[-0.08, 0.4, 0]}>
      {/* page block with gilt fore-edges */}
      <mesh material={pageMaterials}>
        <boxGeometry args={[2.5, 3.5, 0.42]} />
      </mesh>
      {/* front + back covers */}
      <mesh position={[0, 0, 0.25]}>
        <boxGeometry args={[2.66, 3.66, 0.08]} />
        <meshStandardMaterial color="#141b2e" roughness={0.55} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0, -0.25]}>
        <boxGeometry args={[2.66, 3.66, 0.08]} />
        <meshStandardMaterial color="#141b2e" roughness={0.55} metalness={0.15} />
      </mesh>
      {/* spine */}
      <mesh position={[-1.31, 0, 0]}>
        <boxGeometry args={[0.1, 3.68, 0.6]} />
        <meshStandardMaterial color="#101622" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* gold emblem */}
      <mesh geometry={emblemGeo} position={[0.05, 0.35, 0.31]} scale={0.42}>
        <meshStandardMaterial
          color="#d6ae5c"
          metalness={0.9}
          roughness={0.22}
          emissive="#5a4416"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* fake-bloom glow */}
      <sprite position={[0, 0, -1.2]} scale={[10, 10, 1]}>
        <spriteMaterial
          map={glowTexture}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  );
}
