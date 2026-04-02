'use client';

import { motion, useTransform, useSpring, MotionValue } from 'framer-motion';
import Image from 'next/image';

interface InteractivePhoneProps {
  scrollYProgress: MotionValue<number>;
}

export default function InteractivePhone({ scrollYProgress }: InteractivePhoneProps) {
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // ==========================================
  // FRONT PHONE (The Main Mover)
  // Starts Right side of Hero, Moves to Left side of Services
  // ==========================================
  const frontX = useTransform(smoothProgress, [0.1, 0.4], ["20vw", "-25vw"]); // Right to Left
  const frontY = useTransform(smoothProgress, [0.1, 0.4], ["8vh", "15vh"]);   // Down slightly
  const frontRotateY = useTransform(smoothProgress, [0.1, 0.4], [-15, 10]);   // Switch face direction
  const frontRotateX = useTransform(smoothProgress, [0, 0.5], [5, 2]);
  const frontScale = useTransform(smoothProgress, [0.1, 0.4], [1, 0.95]);

  const storeOpacity = useTransform(smoothProgress, [0.25, 0.35], [1, 0]);
  const aiOpacity = useTransform(smoothProgress, [0.25, 0.35], [0, 1]);

  // ==========================================
  // BACK PHONE (The Stand)
  // Starts Right side of Hero behind the front one. Fades out as user scrolls past Hero.
  // ==========================================
  const backX = useTransform(smoothProgress, [0.1, 0.4], ["28vw", "28vw"]);   // Stays on Right
  const backY = useTransform(smoothProgress, [0.1, 0.4], ["2vh", "-40vh"]);   // Scrolls up away
  // Ensure we see the back side! RotateY around 160-180 degrees.
  const backRotateY = useTransform(smoothProgress, [0.1, 0.4], [160, 160]); 
  const backRotateZ = useTransform(smoothProgress, [0.1, 0.4], [-5, -5]);
  const backScale = useTransform(smoothProgress, [0.1, 0.4], [0.9, 0.9]);
  const backOpacity = useTransform(smoothProgress, [0.1, 0.25], [1, 0]);      // Fade out

  return (
    <div className="sticky top-0 h-screen w-full pointer-events-none z-50 hidden lg:flex items-center justify-center overflow-hidden perspective-[2000px]">
      
      {/* 📱 BACK PHONE (The Stand showing its back) */}
      <motion.div
        style={{
          x: backX,
          y: backY,
          rotateY: backRotateY,
          rotateZ: backRotateZ,
          scale: backScale,
          opacity: backOpacity,
          transformStyle: 'preserve-3d',
        }}
        className="absolute w-[300px] will-change-transform transform-gpu"
      >
        <div className="relative rounded-[3.5rem] p-3 bg-gray-900 border-[6px] border-gray-600 shadow-2xl overflow-hidden aspect-[9/19]">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black z-0 rounded-[2.5rem]" />
          
          {/* Back Camera Module */}
          <div className="absolute top-8 left-8 w-[80px] h-[85px] bg-gray-900 rounded-[1.5rem] border border-gray-700 shadow-xl z-20 flex flex-col justify-between p-2">
            <div className="flex justify-between w-full">
              <div className="w-[30px] h-[30px] rounded-full bg-black border-2 border-gray-800 shadow-inner" />
              <div className="w-[12px] h-[12px] rounded-full bg-yellow-100/50 blur-[1px] shadow-[0_0_10px_rgba(255,255,255,0.8)] self-center" />
            </div>
            <div className="flex justify-between w-full">
              <div className="w-[30px] h-[30px] rounded-full bg-black border-2 border-gray-800 shadow-inner" />
              <div className="w-[30px] h-[30px] rounded-full bg-black border-2 border-gray-800 shadow-inner" />
            </div>
          </div>

          {/* Logo outline in center */}
          <div className="absolute inset-0 flex items-center justify-center z-10 opacity-20">
            <div className="w-16 h-16 rounded-full border-4 border-gray-400/50 mix-blend-screen" />
          </div>

          {/* Metallic Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-30 mix-blend-overlay" />
        </div>
      </motion.div>

      {/* 🚀 FRONT PHONE (The Main Mover showing its screen) */}
      <motion.div
        style={{
          x: frontX,
          y: frontY,
          rotateY: frontRotateY,
          rotateX: frontRotateX,
          scale: frontScale,
          transformStyle: 'preserve-3d',
        }}
        className="absolute w-[300px] will-change-transform transform-gpu"
      >
        <div className="relative rounded-[3.5rem] p-3 bg-gray-900 border-4 border-gray-700 shadow-[20px_20px_60px_rgba(0,0,0,0.5)] overflow-hidden aspect-[9/19]">
          
          {/* Hardware Details (Notch, Buttons) */}
          <div className="absolute top-0 inset-x-0 h-8 flex justify-center z-50">
             <div className="w-1/3 h-full bg-black rounded-b-[1.2rem]" />
          </div>
          <div className="absolute -left-[5px] top-24 w-[5px] h-12 bg-gray-600 rounded-l-md" />
          <div className="absolute -left-[5px] top-40 w-[5px] h-12 bg-gray-600 rounded-l-md" />
          <div className="absolute -right-[5px] top-32 w-[5px] h-16 bg-gray-600 rounded-r-md" />

          {/* Inner Screen Layer */}
          <motion.div 
            style={{ transformStyle: 'preserve-3d' }}
            className="relative rounded-[2.5rem] overflow-hidden bg-white w-full h-full shadow-inner"
          >
            {/* E-Commerce Flat UI */}
            <motion.div style={{ opacity: storeOpacity }} className="absolute inset-0 z-10 bg-white">
              <Image
                src="/flat-store.png"
                alt="Brand App Mockup"
                fill
                className="object-cover scale-[1.03]"
                priority
              />
            </motion.div>

            {/* AI Assistant Flat UI */}
            <motion.div style={{ opacity: aiOpacity }} className="absolute inset-0 z-20 bg-white">
              <Image
                src="/flat-ai.png"
                alt="AI Assistant Mockup"
                fill
                className="object-cover scale-[1.03]"
              />
            </motion.div>
          </motion.div>

          {/* Dynamic Light Reflection over screen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-30 mix-blend-overlay" />
        </div>

        {/* Floating Shadow beneath the phone */}
        <motion.div
           animate={{ opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 4, repeat: Infinity }}
           className="absolute -bottom-10 left-10 right-10 h-10 bg-black blur-2xl -z-10 rounded-full"
        />
      </motion.div>

    </div>
  );
}
