"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingOrb({ position, color, speed, distort, scale }: any) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 120;
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#F04E23" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function NotificationBell() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={group} position={[0, 0, 0]} scale={1.2}>
        {/* Bell body */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.3, 0.6, 0.8, 32]} />
          <meshStandardMaterial color="#F04E23" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Bell top */}
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#F04E23" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Bell clapper */}
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#FF6B42" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Percent badge */}
        <mesh position={[0.35, 0.55, 0.2]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff5f0" />
        <pointLight position={[-3, 2, 4]} intensity={0.8} color="#F04E23" />
        <pointLight position={[3, -2, 2]} intensity={0.4} color="#FF6B42" />

        {/* Main Bell */}
        <NotificationBell />

        {/* Floating orbs */}
        <FloatingOrb position={[-3.5, 1.5, -2]} color="#F04E23" speed={1.2} distort={0.4} scale={0.7} />
        <FloatingOrb position={[3.2, -1.2, -3]} color="#FF6B42" speed={0.8} distort={0.3} scale={0.5} />
        <FloatingOrb position={[-2, -2, -1.5]} color="#FFB299" speed={1.5} distort={0.5} scale={0.4} />
        <FloatingOrb position={[2.5, 2, -2.5]} color="#F04E23" speed={1} distort={0.35} scale={0.35} />

        <Particles />
      </Canvas>
    </div>
  );
}
