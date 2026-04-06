'use client';

import { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Center, OrbitControls, Float } from '@react-three/drei';
import { MotionValue, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// Both screen-related materials from GLB inspection:
// GFNYbWjyDVGUwJd = OLED display panel (emissive black base)
// LcWBQfBvCzxThpp = front glass overlay (already carries a baked texture + emissive)
const SCREEN_MATERIAL_NAMES = new Set(['GFNYbWjyDVGUwJd', 'LcWBQfBvCzxThpp']);

function PhoneModel({
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
  const groupRef = useRef<THREE.Group>(null!);
  const { scene: originalScene } = useGLTF('/iphone14.glb');
  const { gl } = useThree();

  const scene = useMemo(() => {
    const clone = originalScene.clone(true);
    // Find the specific display components:
    // GFNYbWjyDVGUwJd = OLED display panel
    // LcWBQfBvCzxThpp = front glass overlay
    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      
      // 1. Hide the glass overlay entirely to prevent physical glare/reflections from blocking our digital texture
      if (mats.some(m => m.name === 'LcWBQfBvCzxThpp')) {
        child.visible = false;
      }
    });
    return clone;
  }, [originalScene]);

  // Using the native tall portrait UI asset
  const screenTexture = useLoader(TextureLoader, '/flat-store.png');

  useEffect(() => {
    if (!screenTexture || !scene) return;

    // ── Texture quality ───────────────────────────────────────────────────────
    screenTexture.flipY = true;
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;
    screenTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
    screenTexture.wrapS = THREE.ClampToEdgeWrapping;
    screenTexture.wrapT = THREE.ClampToEdgeWrapping;

    // ── Mapping Fix —─────────────────────────────────────────────────────────
    // repeat.x = -1 (flips X horizontally to fix mirroring)
    // offset.x = 1 (shifts it back into view)
    screenTexture.repeat.set(-1, 1);
    screenTexture.offset.set(1, 0);
    screenTexture.needsUpdate = true;

    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
      transparent: false,
    });

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];

      // 2. Target the OLED panel directly with our high-fidelity texture
      if (mats.some(m => m.name === 'GFNYbWjyDVGUwJd')) {
        child.material = screenMat;

        // 3. Normalize UVs for this specific mesh
        const uvAttr = child.geometry.getAttribute('uv') as THREE.BufferAttribute | undefined;
        if (uvAttr) {
          let minU = Infinity, maxU = -Infinity;
          let minV = Infinity, maxV = -Infinity;
          for (let i = 0; i < uvAttr.count; i++) {
            const u = uvAttr.getX(i), v = uvAttr.getY(i);
            if (u < minU) minU = u; if (u > maxU) maxU = u;
            if (v < minV) minV = v; if (v > maxV) maxV = v;
          }
          const uR = maxU - minU || 1;
          const vR = maxV - minV || 1;
          for (let i = 0; i < uvAttr.count; i++) {
            uvAttr.setXY(i, (uvAttr.getX(i) - minU) / uR, (uvAttr.getY(i) - minV) / vR);
          }
          uvAttr.needsUpdate = true;
        }
      }
    });

    if (onLoad) onLoad();
  }, [scene, screenTexture, gl, onLoad]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (rotY.get() - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x += (rotX.get() - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.z += (rotZ.get() - groupRef.current.rotation.z) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Center rotation={[0, Math.PI, 0]}>
        <primitive object={scene} scale={15} />
      </Center>
    </group>
  );
}

interface IPhone3DProps {
  scrollProgress: MotionValue<number>;
  onLoad?: () => void;
}

export default function IPhone3D({ scrollProgress, onLoad }: IPhone3DProps) {
  const rotY = useTransform(scrollProgress, [0, 0.85], [Math.PI * 2, Math.PI / 5]);
  const rotX = useTransform(scrollProgress, [0, 0.85], [0.24, 0.4]);
  const rotZ = useTransform(scrollProgress, [0, 0.85], [-0.17, -0.15]);

  return (
    <Canvas
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      dpr={[2, 4]} // 🔥 ultra sharp rendering
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.NoToneMapping; // 🔥 removes washout
      }}
    >
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} makeDefault />

      {/* Lighting (only for phone body) */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 8, 5]} intensity={1.6} />
      <directionalLight position={[-4, 2, -4]} intensity={0.5} color="#8899ff" />
      <pointLight position={[0, -3, 3]} intensity={0.8} />

      <Environment preset="city" />
      <ContactShadows position={[0, -2.1, 0]} opacity={0.5} scale={6} blur={2.5} far={4} />

      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <PhoneModel rotY={rotY} rotX={rotX} rotZ={rotZ} onLoad={onLoad} />
        </Float>
      </Suspense>
    </Canvas>
  );
}