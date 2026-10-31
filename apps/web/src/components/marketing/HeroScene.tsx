"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function BodyRig() {
  const rigRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!rigRef.current) {
      return;
    }

    rigRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.45) * 0.18;
    rigRef.current.position.y = Math.sin(clock.elapsedTime * 0.9) * 0.04;
  });

  return (
    <group ref={rigRef}>
      <mesh position={[0, 0.95, 0]}>
        <capsuleGeometry args={[0.42, 1.18, 8, 18]} />
        <meshStandardMaterial color="#0f1b1a" metalness={0.45} roughness={0.28} />
      </mesh>
      <mesh position={[0, 1.05, 0.02]} scale={[1.05, 1.18, 1]}>
        <capsuleGeometry args={[0.45, 1.05, 8, 18]} />
        <meshStandardMaterial
          color="#b7ff3c"
          emissive="#234d0a"
          emissiveIntensity={0.38}
          transparent
          opacity={0.72}
        />
      </mesh>
      <mesh position={[0, 1.88, 0]}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color="#d9fff7" roughness={0.22} />
      </mesh>
      {[-0.62, 0.62].map((x) => (
        <mesh key={`arm-${x}`} position={[x, 1.04, 0]} rotation={[0, 0, x > 0 ? -0.22 : 0.22]}>
          <capsuleGeometry args={[0.12, 0.92, 8, 12]} />
          <meshStandardMaterial color="#48f4ff" emissive="#08343a" emissiveIntensity={0.2} />
        </mesh>
      ))}
      {[-0.24, 0.24].map((x) => (
        <mesh key={`leg-${x}`} position={[x, 0.04, 0]}>
          <capsuleGeometry args={[0.16, 1.08, 8, 12]} />
          <meshStandardMaterial color="#111f1e" metalness={0.35} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function ScanRings() {
  const ringRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) {
      return;
    }

    ringRef.current.rotation.y = clock.elapsedTime * 0.24;
  });

  return (
    <group ref={ringRef}>
      {[0.12, 0.8, 1.48].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.15, 0.006, 8, 96]} />
          <meshBasicMaterial color={y > 1 ? "#ffb13b" : "#48f4ff"} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
      <Canvas camera={{ position: [0, 1.2, 4.2], fov: 42 }}>
        <ambientLight intensity={0.95} />
        <directionalLight position={[3, 4, 3]} intensity={1.2} />
        <pointLight position={[-3, 2, 2]} color="#48f4ff" intensity={18} />
        <BodyRig />
        <ScanRings />
        <mesh position={[0, -0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5.5, 5.5, 20, 20]} />
          <meshStandardMaterial color="#07100f" wireframe transparent opacity={0.38} />
        </mesh>
      </Canvas>
    </div>
  );
}
