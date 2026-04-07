'use client';

import { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Center, OrbitControls, Float } from '@react-three/drei';
import { MotionValue, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { TextureLoader } from 'three';

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
}: {
  rotY: MotionValue<number>;
  rotX: MotionValue<number>;
  rotZ: MotionValue<number>;
  onLoad?: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene: originalScene } = useGLTF('/iphone14.glb');
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

  // Load textures: 0: flat-store, 1: flat-store1, 2: flat-store2
  const textures = useLoader(TextureLoader, ['/flat-store.jpg', '/flat-store1.jpg', '/flat-store2.jpg']);
  const [activeTextureIndex, setActiveTextureIndex] = useState(0);
  const [nextTextureIndex, setNextTextureIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const shaderMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const transitionStartTime = useRef<number>(0);
  const TRANSITION_DURATION = 800; // ms

  // Configure textures once for high-fidelity rendering and sliding wrapping
  useEffect(() => {
    if (!textures.length || !gl) return;
    textures.forEach((texture) => {
      texture.flipY = true;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = gl.capabilities.getMaxAnisotropy();
      texture.wrapS = THREE.RepeatWrapping; // Essential for the sliding UV math
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.repeat.set(1, 1);
      texture.offset.set(0, 0);
    });
  }, [textures, gl]);

  // Initial Material Setup and UV Normalization
  useEffect(() => {
    if (!textures.length || !scene) return;

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
              if (u < minU)minU = u; if (u > maxU)maxU = u;
              if (v < minV)minV = v; if (v > maxV)maxV = v;
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
    groupRef.current.rotation.y += (rotY.get() - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x += (rotX.get() - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.z += (rotZ.get() - groupRef.current.rotation.z) * 0.08;

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
      dpr={[1, 2]} 
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.NoToneMapping; 
      }}
    >
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} makeDefault />
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