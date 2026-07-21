"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
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

/** Stylized glowing ocean planet — used when no Earth texture is configured
 *  (or as the Suspense fallback while textures load). */
function StylizedSurface() {
  return (
    <mesh>
      <sphereGeometry args={[R, 64, 64]} />
      <meshStandardMaterial
        color="#123a72"
        emissive="#0a1f42"
        emissiveIntensity={0.4}
        roughness={0.65}
        metalness={0.1}
      />
    </mesh>
  );
}

/** Photoreal Earth: day map + optional drifting cloud layer. Loaded
 *  declaratively via drei useTexture so the map reliably renders on load. */
function EarthSurface({ dayUrl, cloudsUrl }: { dayUrl: string; cloudsUrl?: string }) {
  const invalidate = useThree((s) => s.invalidate);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const urls = cloudsUrl ? [dayUrl, cloudsUrl] : [dayUrl];
  const textures = useTexture(urls);
  const day = textures[0];
  const clouds = cloudsUrl ? textures[1] : null;

  useEffect(() => {
    if (day) day.colorSpace = THREE.SRGBColorSpace;
    if (clouds) clouds.colorSpace = THREE.SRGBColorSpace;
    invalidate(); // force a frame once textures resolve
  }, [day, clouds, invalidate]);

  useFrame((_, d) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += d * 0.02;
    }
  });

  return (
    <>
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshStandardMaterial
          map={day}
          emissive="#0a1424"
          emissiveIntensity={0.12}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
      {clouds ? (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[R * 1.012, 64, 64]} />
          <meshStandardMaterial
            map={clouds}
            alphaMap={clouds}
            transparent
            opacity={0.45}
            depthWrite={false}
          />
        </mesh>
      ) : null}
    </>
  );
}

/**
 * A slowly rotating globe with glowing destination hubs, distribution arcs, and
 * light packets traveling each arc. Photoreal Earth when textures are set,
 * stylized planet otherwise.
 */
export function Globe() {
  const group = useRef<THREE.Group>(null);
  const packets = useRef<THREE.Group>(null);

  const hasTexture = Boolean(reachContent.earthTexture);

  const dotGeo = useMemo(() => {
    const N = 1400;
    const positions = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * radius * R * 1.004;
      positions[i * 3 + 1] = y * R * 1.004;
      positions[i * 3 + 2] = Math.sin(theta) * radius * R * 1.004;
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
        const lift = 1 + 0.14 + 0.32 * (start.distanceTo(end) / (2 * R));
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
      group.current.rotation.y += delta * 0.06;
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
    <group ref={group} rotation={[0.32, 0, 0.05]}>
      {hasTexture ? (
        <Suspense fallback={<StylizedSurface />}>
          <EarthSurface
            dayUrl={reachContent.earthTexture as string}
            cloudsUrl={reachContent.cloudsTexture || undefined}
          />
        </Suspense>
      ) : (
        <StylizedSurface />
      )}

      {/* atmosphere halo */}
      <mesh>
        <sphereGeometry args={[R * 1.12, 64, 64]} />
        <meshBasicMaterial color="#4a86d8" transparent opacity={0.14} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[R * 1.03, 64, 64]} />
        <meshBasicMaterial color="#8fbcf5" transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>

      {/* graticule dots only in stylized mode (real Earth doesn't need them) */}
      {!hasTexture ? (
        <points geometry={dotGeo}>
          <pointsMaterial color="#dcd0b4" size={0.024} sizeAttenuation transparent opacity={0.7} />
        </points>
      ) : null}

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
              opacity={0.85}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>
        </group>
      ))}

      {/* distribution arcs */}
      {arcs.map((a, i) => (
        <mesh key={i} geometry={a.geo}>
          <meshBasicMaterial color="#efdca8" transparent opacity={0.85} />
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
