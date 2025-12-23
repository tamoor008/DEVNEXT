'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const splineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = splineContainerRef.current;
    if (!container) return;

    let ticking = false;

    const handleWheel = (e: WheelEvent) => {
      // Prevent Spline from handling the scroll event
      e.stopPropagation();
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Dispatch the event to the document for natural browser scrolling
          const scrollEvent = new WheelEvent('wheel', {
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            deltaZ: e.deltaZ,
            deltaMode: e.deltaMode,
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,
            cancelable: true,
          });
          
          document.dispatchEvent(scrollEvent);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use capture phase to intercept before Spline gets it
    container.addEventListener('wheel', handleWheel, { 
      passive: false, 
      capture: true 
    });
    
    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ contain: 'layout style paint' }}
    >
      {/* Spline Scene Background */}
      <div 
        className="absolute inset-0 w-full h-full z-0 overflow-hidden" 
        style={{ 
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      >
        <motion.div 
          ref={splineContainerRef}
          className="w-full h-full"
          style={{ 
            pointerEvents: 'auto',
            transform: 'translate3d(0,0,0) scale(1.3)',
            backfaceVisibility: 'hidden'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Spline
          scene="https://prod.spline.design/gt9G-TA-zKiASw73/scene.splinecode" 
          className="w-full h-full"
          />
        </motion.div>
      </div>
      
      {/* Subtle purple/pink gradient overlay */}
      <div 
        className="absolute inset-0 w-full h-full z-[5] bg-gradient-to-br from-indigo-950/20 via-purple-950/10 to-pink-950/20 pointer-events-none"
        style={{ transform: 'translate3d(0,0,0)' }}
      ></div>
      
      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0 w-full h-full z-10 bg-gradient-to-b from-dark-50/40 via-transparent to-dark-50/60 pointer-events-none"
        style={{ transform: 'translate3d(0,0,0)' }}
      ></div>

      {/* Content - Text is non-interactive, buttons pause animation */}
      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pointer-events-none"
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        <div 
          className="text-center max-w-5xl mx-auto pointer-events-none" 
          style={{ transform: 'translate3d(0,0,0)' }}
        >
          {/* Badge - non-interactive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ transform: 'translate3d(0,0,0)' }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-dark-300/90 border border-gray-700/50 mb-8 shadow-lg pointer-events-none"
          >
            <Sparkles className="w-4 h-4 text-accent-primary" />
            <span className="text-sm text-gray-200 font-medium">Transforming Ideas Into Digital Excellence</span>
          </motion.div>

          {/* Heading - non-interactive */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transform: 'translate3d(0,0,0)' }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight [text-shadow:_0_1px_10px_rgb(0_0_0_/_0.6)] pointer-events-none"
          >
            <span className="text-white">We Build</span>{' '}
            <span className="gradient-text [text-shadow:_0_2px_20px_rgb(99_102_241_/_0.5)]">Extraordinary</span>{' '}
            <span className="text-white">Digital</span>
            <br />
            <span className="gradient-text [text-shadow:_0_2px_20px_rgb(99_102_241_/_0.5)]">Experiences</span>
          </motion.h1>

          {/* Description - non-interactive */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ transform: 'translate3d(0,0,0)' }}
            className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto [text-shadow:_0_1px_8px_rgb(0_0_0_/_0.7)] font-medium pointer-events-none"
          >
            Premium development agency specializing in apps, websites, UI/UX design, and cutting-edge software solutions
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ transform: 'translate3d(0,0,0)' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-full bg-gradient-primary text-white font-semibold text-lg flex items-center space-x-2 pointer-events-auto"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 border-gray-700 text-white font-semibold text-lg hover:border-accent-primary transition-colors pointer-events-auto"
              >
                View Our Work
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

