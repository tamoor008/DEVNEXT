'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Center, OrbitControls, Float } from '@react-three/drei';
import { MotionValue, useTransform } from 'framer-motion';
import * as THREE from 'three';

// ─── The actual 3D model ────────────────────────────────────────────────────
function PhoneModel({
  rotY,
  rotX,
  rotZ,
}: {
  rotY: number;
  rotX: number;
  rotZ: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/iphone14.glb');

  useFrame(() => {
    if (!groupRef.current) return;
    // Smoothly lerp toward target rotation each frame
    groupRef.current.rotation.y += (rotY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x += (rotX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.z += (rotZ - groupRef.current.rotation.z) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Math.PI rotates the root 180deg exactly so it shows the SCREEN by default */}
      <Center rotation={[0, Math.PI, 0]}>
        <primitive
          object={scene}
          scale={15}
        />
      </Center>
    </group>
  );
}

// ─── Public API ──────────────────────────────────────────────────────────────
interface IPhone3DProps {
  /** Framer Motion scroll progress 0→1 */
  scrollProgress: MotionValue<number>;
  /** Safely injected callback to inform Hero when to fade loader */
  onLoad?: () => void;
}

export default function IPhone3D({ scrollProgress, onLoad }: IPhone3DProps) {
  // Map scroll progress to rotation angles (radians)
  // Re-applied the strict 360 deg [-Math.PI * 2, 0] formula so it precisely ends facing the screen
  const rotY = useTransform(scrollProgress, [0, 0.85], [-Math.PI * 2, 0]);
  const rotX = useTransform(scrollProgress, [0, 0.85], [0.24, 0]);
  const rotZ = useTransform(scrollProgress, [0, 0.85], [-0.17, 0.05]);

  return (
    <Canvas
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      {/* Interactive controls: let the user grab and spin the complete model! */}
      <OrbitControls enableZoom={false} makeDefault />

      {/* Lighting — key + fill + rim for a cinematic look */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 8, 5]} intensity={1.6} castShadow />
      <directionalLight position={[-4, 2, -4]} intensity={0.5} color="#8899ff" />
      <pointLight position={[0, -3, 3]} intensity={0.8} color="#ffffff" />

      {/* HDRI environment for reflections on the glass / metal */}
      <Environment preset="city" />

      {/* Contact shadow underneath */}
      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.5}
        scale={6}
        blur={2.5}
        far={4}
      />

      <Suspense fallback={null}>
        {/* Floating animation to make it feel alive */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <AnimatedPhone rotY={rotY} rotX={rotX} rotZ={rotZ} onLoad={onLoad} />
        </Float>
      </Suspense>
    </Canvas>
  );
}

// ─── Bridge between MotionValue and Three.js ─────────────────────────────────
function AnimatedPhone({
  rotY,
  rotX,
  rotZ,
  onLoad,
}: {
  rotY: MotionValue<number>;
  rotX: MotionValue<number>;
  rotZ: MotionValue<number>;
  onLoad?: () => void;
}) {
  // Fires perfectly correctly after Suspense mounts the geometries
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  return (
    <PhoneModel
      rotY={rotY.get()}
      rotX={rotX.get()}
      rotZ={rotZ.get()}
    />
  );
}
