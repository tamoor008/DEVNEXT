'use client';

import { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, ContactShadows, Center, OrbitControls, Float, useTexture } from '@react-three/drei';
import { MotionValue, useTransform } from 'framer-motion';
import * as THREE from 'three';

// Shaders for the sliding transition
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTex1;
  uniform sampler2D uTex2;
  uniform float uProgress;
  varying vec2 vUv;

  void main() {
    // 1. Flip X to fix mirroring (repeat -1, offset 1 logic)
    float x = 1.0 - vUv.x;
    
    // 2. Calculate sliding UVs
    vec2 uv1 = vec2(x + uProgress, vUv.y);
    vec2 uv2 = vec2(x - (1.0 - uProgress), vUv.y);
    
    vec4 col1 = texture2D(uTex1, uv1);
    vec4 col2 = texture2D(uTex2, uv2);
    
    // 3. Slide Boundary: As progress goes 0 -> 1, boundary moves across screen
    if (vUv.x > uProgress) {
      gl_FragColor = col1;
    } else {
      gl_FragColor = col2;
    }
  }
`;

function PhoneModel({
  rotY,
  rotX,
  rotZ,
  onLoad,
  isMobile,
  scrollProgress,
}: {
  rotY: MotionValue<number>;
  rotX: MotionValue<number>;
  rotZ: MotionValue<number>;
  onLoad?: () => void;
  isMobile: boolean;
  scrollProgress: MotionValue<number>;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  // ⚡ SPEED: Using the 800KB Draco-compressed model with a high-performance CDN decoder
  const { scene: originalScene } = useGLTF('/iphone14-compressed.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  const { gl, camera } = useThree();

  const scene = useMemo(() => {
    const clone = originalScene.clone(true);
    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      if (mats.some(m => m.name === 'LcWBQfBvCzxThpp')) {
        child.visible = false;
      }
    });
    return clone;
  }, [originalScene]);

  // ⚡ SPEED: Load only the FIRST texture immediately for instant render
  const texture0 = useTexture('/flat-store.jpg');
  // Secondary textures load in the background without blocking initial mount
  // Memoize the array literal to prevent infinite re-renders of the PhoneModel
  const textureFiles = useMemo(() => ['/flat-store.jpg', '/flat-store1.jpg', '/flat-store2.jpg'], []);
  const textures = useTexture(textureFiles);

  const [activeTextureIndex, setActiveTextureIndex] = useState(0);
  const [nextTextureIndex, setNextTextureIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const shaderMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const transitionStartTime = useRef<number>(0);
  const TRANSITION_DURATION = 800; // ms

  // Configure textures once for high-fidelity rendering and sliding wrapping
  useEffect(() => {
    if (!textures || textures.length === 0 || !gl) return;
    textures.forEach((texture) => {
      texture.flipY = true;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = isMobile ? 1 : Math.min(gl.capabilities.getMaxAnisotropy(), 4);
      texture.wrapS = THREE.RepeatWrapping; // Essential for the sliding UV math
      texture.wrapT = THREE.ClampToEdgeWrapping;
    });
  }, [textures, gl, isMobile]);

  // Initial Material Setup and UV Normalization
  useEffect(() => {
    if (!textures || textures.length === 0 || !scene) return;

    const shaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTex1: { value: textures[0] },
        uTex2: { value: textures[1] },
        uProgress: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
    });
    shaderMatRef.current = shaderMat;

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      if (mats.some(m => m.name === 'GFNYbWjyDVGUwJd')) {
        child.material = shaderMat;

        if (!child.userData.uvNormalized) {
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
            child.userData.uvNormalized = true;
          }
        }
      }
    });

    if (onLoad) onLoad();
  }, [scene, textures, onLoad]);

  // Transition timing logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        transitionStartTime.current = performance.now();
        setNextTextureIndex((activeTextureIndex + 1) % 3);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeTextureIndex, isTransitioning]);

  useFrame(() => {
    if (!groupRef.current) return;

    // 1. Smooth rotation tracking
    // For the very first frame or if the target is close, snap to avoid lerping jitter/upscale feel
    const targetY = rotY.get();
    const targetX = rotX.get();
    const targetZ = rotZ.get();

    // Snap if we're near the beginning of scroll to ensure perfect stillness
    if (Math.abs(groupRef.current.rotation.y - targetY) > 0.1 || scrollProgress.get() <= 0.01) {
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.15;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.15;
      groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.15;
    } else {
      groupRef.current.rotation.y = targetY;
      groupRef.current.rotation.x = targetX;
      groupRef.current.rotation.z = targetZ;
    }

    // 2. Animate sliding transition shader
    if (isTransitioning && shaderMatRef.current) {
      const now = performance.now();
      const progress = Math.min((now - transitionStartTime.current) / TRANSITION_DURATION, 1.0);

      shaderMatRef.current.uniforms.uTex1.value = textures[activeTextureIndex];
      shaderMatRef.current.uniforms.uTex2.value = textures[nextTextureIndex];
      shaderMatRef.current.uniforms.uProgress.value = progress;

      if (progress >= 1.0) {
        setIsTransitioning(false);
        setActiveTextureIndex(nextTextureIndex);
        shaderMatRef.current.uniforms.uProgress.value = 0.0;
        shaderMatRef.current.uniforms.uTex1.value = textures[nextTextureIndex];
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 
          Manual centering instead of <Center /> to eliminate bounding-box re-calculation jitter 
          during rotation which can cause a "pulse" or "upscale" effect.
      */}
      <primitive object={scene} scale={15} rotation={[0, Math.PI, 0]} position={[0, -1.4, 0]} />
    </group>
  );
}

interface IPhone3DProps {
  scrollProgress: MotionValue<number>;
  onLoad?: () => void;
}

// ⚡ PRELOAD: Force the browser to start downloading these heavy assets as soon as the script parses
useGLTF.preload('/iphone14-compressed.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useTexture.preload('/flat-store.jpg');
useTexture.preload('/flat-store1.jpg');
useTexture.preload('/flat-store2.jpg');

export default function IPhone3D({ scrollProgress, onLoad }: IPhone3DProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add a 5% dead-zone to match the Hero movement transforms and prevent initial jitters
  const rotY = useTransform(scrollProgress, [0, 0.05, 0.85], [Math.PI * 2, Math.PI * 2, Math.PI / 5]);
  const rotX = useTransform(scrollProgress, [0, 0.05, 0.85], [0.24, 0.24, 0.4]);
  const rotZ = useTransform(scrollProgress, [0, 0.05, 0.85], [-0.17, -0.17, -0.15]);

  return (
    <Canvas
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      // ⚡ SPEED: Capping DPR at 1.0 for mobile and 1.5 for desktop
      dpr={isMobile ? 1 : [1, 1.5]}
      gl={{
        antialias: !isMobile, // ⚡ Disable antialiasing on mobile for massive FPS boost
        alpha: true,
        powerPreference: "high-performance"
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.NoToneMapping;
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} makeDefault />

        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 8, 5]} intensity={1.6} />
        <directionalLight position={[-4, 2, -4]} intensity={0.5} color="#8899ff" />
        <pointLight position={[0, -3, 3]} intensity={0.8} />

        {/* ⚡ SPEED: Lower resolution shadows on mobile */}
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.5}
          scale={6}
          blur={2.5}
          far={4}
          resolution={isMobile ? 256 : 512}
        />

        <Float speed={isMobile ? 1.5 : 2} rotationIntensity={0.2} floatIntensity={0.5}>
          <PhoneModel 
            rotY={rotY} 
            rotX={rotX} 
            rotZ={rotZ} 
            onLoad={onLoad} 
            isMobile={isMobile} 
            scrollProgress={scrollProgress}
          />
        </Float>
      </Suspense>
    </Canvas>
  );
}