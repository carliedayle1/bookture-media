"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { reachContent } from "@/lib/content";

const R = 2; // globe radius

/** Equirectangular lat/lng → point on the sphere. */
function latLngToVec3(lat: number, lng: number, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/**
 * A slowly rotating dotted globe. Destination hubs glow, distribution arcs bow
 * out from the home hub (London), and a packet of light travels each arc. Built
 * from primitives — no textures or models to fetch.
 */
export function Globe() {
  const group = useRef<THREE.Group>(null);
  const packets = useRef<THREE.Group>(null);

  // Fibonacci-distributed dots forming the globe surface.
  const dotGeo = useMemo(() => {
    const N = 1500;
    const positions = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * radius * R * 1.003;
      positions[i * 3 + 1] = y * R * 1.003;
      positions[i * 3 + 2] = Math.sin(theta) * radius * R * 1.003;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  const hubs = useMemo(
    () => reachContent.hubs.map((h) => ({ city: h.city, v: latLngToVec3(h.lat, h.lng) })),
    [],
  );
  const primary = useMemo(() => hubs.find((h) => h.city === "London") ?? hubs[0], [hubs]);

  const arcs = useMemo(() => {
    return hubs
      .filter((h) => h.city !== primary.city)
      .map((h) => {
        const start = primary.v;
        const end = h.v;
        const lift = 1 + 0.12 + 0.3 * (start.distanceTo(end) / (2 * R));
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(R * lift);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        return { curve, geo: new THREE.TubeGeometry(curve, 48, 0.008, 8, false) };
      });
  }, [hubs, primary]);

  const glowTexture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(239,220,168,0.95)");
    grad.addColorStop(0.4, "rgba(214,174,92,0.35)");
    grad.addColorStop(1, "rgba(214,174,92,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
    }
    if (packets.current) {
      const t = state.clock.elapsedTime;
      packets.current.children.forEach((mesh, i) => {
        const p = (t * 0.16 + i / Math.max(1, arcs.length)) % 1;
        mesh.position.copy(arcs[i].curve.getPoint(p));
      });
    }
  });

  return (
    <group ref={group} rotation={[0.32, 0, 0.08]}>
      {/* opaque core occludes back-facing dots/arcs */}
      <mesh>
        <sphereGeometry args={[R * 0.99, 48, 48]} />
        <meshStandardMaterial color="#101827" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* rim atmosphere */}
      <mesh>
        <sphereGeometry args={[R * 1.06, 48, 48]} />
        <meshBasicMaterial color="#d6ae5c" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      {/* dotted surface */}
      <points geometry={dotGeo}>
        <pointsMaterial color="#b6a684" size={0.024} sizeAttenuation transparent opacity={0.85} />
      </points>
      {/* hub markers */}
      {hubs.map((h) => (
        <group key={h.city} position={h.v.toArray()}>
          <mesh>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#efdca8" />
          </mesh>
          <sprite scale={[0.34, 0.34, 1]}>
            <spriteMaterial
              map={glowTexture}
              transparent
              opacity={0.75}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>
        </group>
      ))}
      {/* distribution arcs */}
      {arcs.map((a, i) => (
        <mesh key={i} geometry={a.geo}>
          <meshBasicMaterial color="#d6ae5c" transparent opacity={0.55} />
        </mesh>
      ))}
      {/* traveling packets */}
      <group ref={packets}>
        {arcs.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color="#fff3d0" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
