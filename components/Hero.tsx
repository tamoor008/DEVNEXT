'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Spline from '@splinetool/react-spline/next';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<any>(null);

  useEffect(() => {
    // Aggressively suppress Spline runtime errors before Next.js catches them
    const originalError = window.console.error;
    const originalOnError = window.onerror;
    
    // Intercept errors at the earliest possible point
    const errorHandler = (event: ErrorEvent | Event) => {
      const errorEvent = event as ErrorEvent;
      if (
        errorEvent.message?.includes('position') ||
        errorEvent.message?.includes('Cannot read properties of undefined') ||
        errorEvent.filename?.includes('spline') ||
        errorEvent.filename?.includes('runtime.js') ||
        errorEvent.error?.message?.includes('position')
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (errorEvent.stopImmediatePropagation) {
          errorEvent.stopImmediatePropagation();
        }
        return true; // Return true to prevent default error handling
      }
      return false;
    };

    // Override window.onerror
    window.onerror = (message, source, lineno, colno, error) => {
      if (
        typeof message === 'string' &&
        (message.includes('position') || message.includes('Cannot read properties of undefined')) &&
        (source?.includes('spline') || source?.includes('runtime.js'))
      ) {
        return true; // Suppress the error
      }
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
      return false;
    };

    // Override console.error to filter Spline errors
    window.console.error = (...args: any[]) => {
      const errorMessage = args.join(' ');
      if (
        (errorMessage.includes('position') || errorMessage.includes('Cannot read properties of undefined')) &&
        (errorMessage.includes('Spline') || errorMessage.includes('runtime.js') || errorMessage.includes('@splinetool'))
      ) {
        // Suppress Spline position errors
        return;
      }
      originalError.apply(console, args);
    };

    // Add multiple event listeners with capture phase
    window.addEventListener('error', errorHandler, true);
    window.addEventListener('error', errorHandler, false);
    
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      if (
        reason?.message?.includes('position') ||
        reason?.message?.includes('Cannot read properties of undefined') ||
        reason?.message?.includes('Spline')
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);

    // Prevent cursor changes on Spline canvas and ensure mouse tracking works
    const container = splineContainerRef.current;
    if (container) {
      const observer = new MutationObserver(() => {
        const canvas = container.querySelector('canvas');
        if (canvas) {
          canvas.style.cursor = 'default';
          canvas.style.pointerEvents = 'auto';
        }
      });

      // Initial check
      const canvas = container.querySelector('canvas');
      if (canvas) {
        canvas.style.cursor = 'default';
        canvas.style.pointerEvents = 'auto';
      }

      // Watch for canvas changes
      observer.observe(container, {
        childList: true,
        subtree: true
      });

      // Also check periodically in case canvas is added later
      const interval = setInterval(() => {
        const canvas = container.querySelector('canvas');
        if (canvas) {
          canvas.style.cursor = 'default';
        }
      }, 100);

      return () => {
        observer.disconnect();
        clearInterval(interval);
        window.removeEventListener('error', errorHandler, true);
        window.console.error = originalError;
      };
    }
  }, []);

  const handleSplineLoad = (spline: any) => {
    try {
      splineAppRef.current = spline;
    } catch (error) {
      console.error('Error loading Spline:', error);
    }
  };

  const pauseAnimation = () => {
    if (splineAppRef.current) {
      const canvas = splineContainerRef.current?.querySelector('canvas');
      if (canvas) {
        canvas.style.pointerEvents = 'none';
      }
    }
  };

  const resumeAnimation = () => {
    if (splineAppRef.current) {
      const canvas = splineContainerRef.current?.querySelector('canvas');
      if (canvas) {
        canvas.style.pointerEvents = 'auto';
      }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        #hero-spline-container canvas {
          cursor: default !important;
        }
      `}} />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Base Background - Purple Shaded */}
       
        {/* Spline 3D Background */}
        <div 
          id="hero-spline-container"
          ref={splineContainerRef}
          className="absolute inset-0 w-full h-full z-0"
        >
        <Spline
          scene="https://prod.spline.design/uMmGGTYtA9ZqgrTp/scene.splinecode" 
          onLoad={handleSplineLoad}
          style={{ 
            width: '100%', 
            height: '100%'
          }}
        />
      </div>

      {/* Content - Text is non-interactive, buttons pause animation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pointer-events-none">
        <div className="text-center max-w-5xl mx-auto pointer-events-none">
          {/* Badge - non-interactive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-dark-300/80 backdrop-blur-md border border-gray-700/50 mb-8 shadow-lg pointer-events-none"
          >
            <Sparkles className="w-4 h-4 text-accent-primary" />
            <span className="text-sm text-gray-200 font-medium">Transforming Ideas Into Digital Excellence</span>
          </motion.div>

          {/* Heading - non-interactive */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight [text-shadow:_0_2px_20px_rgb(0_0_0_/_0.8)] pointer-events-none"
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
            className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto [text-shadow:_0_2px_15px_rgb(0_0_0_/_0.9)] font-medium pointer-events-none"
          >
            Premium development agency specializing in apps, websites, UI/UX design, and cutting-edge software solutions
          </motion.p>

          {/* Buttons - interactive, pause animation on hover */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <Link href="/contact">
              <motion.button
                onMouseEnter={pauseAnimation}
                onMouseLeave={resumeAnimation}
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
                onMouseEnter={pauseAnimation}
                onMouseLeave={resumeAnimation}
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
    </>
  );
}

