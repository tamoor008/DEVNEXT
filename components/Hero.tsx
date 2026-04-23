'use client';

import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Sparkles, Smartphone, Zap, Bell, Rocket, BarChart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Next.js dynamic import to disable Server-Side Rendering (SSR) for the Three.js Canvas
// This prevents 'Cannot read properties of undefined (reading 'S')' and other hydration errors
const IPhone3D = dynamic(() => import('./IPhone3D'), {
  ssr: false,
});

const services = [
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'iOS + Android app with React Native & Shopify API integration. Real-time product sync, cart, and checkout.',
    color: 'from-blue-500 to-cyan-500',
    href: '/services/app-development',
  },
  {
    icon: Zap,
    title: 'Conversion Optimization',
    description: 'Ultra-fast UI/UX designed for mobile-first shoppers. One-tap checkout to maximize sales.',
    color: 'from-purple-500 to-pink-500',
    href: '/services/conversion-optimization',
  },
  {
    icon: Bell,
    title: 'Push Notifications (💰 Profit)',
    description: 'Abandoned cart reminders, sales campaigns, and back-in-stock alerts. Your #1 revenue driver.',
    color: 'from-pink-500 to-rose-500',
    href: '/services/push-notifications',
    isSpecial: true,
  },
  {
    icon: Rocket,
    title: 'App Store Launch',
    description: 'We handle everything to get you published on the Apple App Store and Google Play Store.',
    color: 'from-indigo-500 to-purple-500',
    href: '/services/app-store-launch',
  },
  {
    icon: BarChart,
    title: 'Analytics & Growth',
    description: 'Track installs, retention, and customer behavior insights to drive repeat purchases.',
    color: 'from-green-500 to-emerald-500',
    href: '/services/analytics-growth',
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [trackDrag, setTrackDrag] = useState(0);

  // Memoize the onLoad function to prevent the 3D component from resetting on every parent render.
  const handleModelLoad = useCallback(() => {
    setModelLoaded(true);
  }, []);

  // Dynamically calculate the EXACT DOM track drag for flawless 3D phone alignment on all screen sizes
  useEffect(() => {
    const updateCalculations = () => {
      if (containerRef.current) {
        const sectionHeight = containerRef.current.offsetHeight;
        // The sticky container uses h-[100vh] maxed at 800px
        const stickyHeight = Math.max(window.innerHeight, 800);
        setTrackDrag(Math.max(0, sectionHeight - stickyHeight));
      }
    };

    updateCalculations();
    window.addEventListener('resize', updateCalculations);
    const timeoutId = setTimeout(updateCalculations, 500); // Check again after fonts/layouts settle

    return () => {
      window.removeEventListener('resize', updateCalculations);
      clearTimeout(timeoutId);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── TRANSFORMS ────────────────────────────────────────────────────────
  // Position animations — from Hero center to Ecosystem side.
  // X: Flawless diagonal slide matching 3D rotation exactly
  // Add a 5% dead-zone to prevent initial jitter/upscale on start of scroll
  const phoneX = useTransform(scrollYProgress, [0, 0.05, 0.85, 1], ['25vw', '25vw', '-30vw', '-30vw']);
  // Y: Calculate exact drop to Smart Retargeting natively via browser CSS engine using our exact DOM drag metric!
  const phoneYProgress = useTransform(scrollYProgress, [0, 0.05, 0.85, 1], [0, 0, 1, 1]);
  // 120px starting anchor + seamlessly progressing down through the drag + an exact targeted 80px drop
  // Reduced base offset to uplift the initial position.
  const phoneY = useMotionTemplate`calc(20px + (${phoneYProgress} * (var(--track-drag) - 70px)))`;

  // Opacity: Never disappear.
  const phoneOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <section ref={containerRef} className="relative w-full z-10 bg-dark-50" style={{ '--track-drag': `${trackDrag}px` } as React.CSSProperties}>

      {/* ── STICKY PHONE ── */}
      <div className="absolute inset-0 pointer-events-none z-[60] hidden lg:block">
        <div className="sticky top-0 h-[100vh] min-h-[800px] flex items-center justify-center">
          <motion.div
            style={{
              x: phoneX,
              y: phoneY,
              opacity: phoneOpacity,
            }}
            className="w-[600px] h-[800px] relative pointer-events-none flex items-center justify-center -mr-[50px] lg:-mr-0"
          >
            {/* Localized 3D Loader Loader — Subtle over the background */}
            {!modelLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[70] transition-opacity duration-500">
                <div className="relative w-12 h-12 animate-spin opacity-40">
                  <Image src="/footer1.png" alt="Model Loader" fill className="object-contain grayscale" priority />
                </div>
              </div>
            )}


            {/* Real WebGL iPhone 3D with Framer Motion entry to prevent CSS transition conflicts */}
            <motion.div
              initial={false}
              animate={{
                opacity: modelLoaded ? 1 : 0,
                scale: 1, // Fixed at 1 to completely eliminate any upscale effect
                filter: modelLoaded ? 'blur(0px)' : 'blur(10px)'
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full h-full pointer-events-auto"
            >
              <IPhone3D scrollProgress={scrollYProgress} onLoad={handleModelLoad} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="relative h-[100vh] min-h-[800px] flex items-center pt-24 pb-12">
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-accent-primary" />
                <span className="text-sm text-gray-300 font-medium">Launch Your App with Zero Initial Cost</span>
              </motion.div>
              <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight text-white">
                Turn Your <span className="gradient-text">Shopify Store</span><br />Into a Revenue-Driving <span className="gradient-text">Mobile App</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0">High-performance React Native apps with real-time sync, one-tap checkout, and smart push notifications.</p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link href="/contact"><button className="px-8 py-4 rounded-xl bg-gradient-primary text-white font-bold text-lg">Build Your App Now</button></Link>
                <Link href="/services"><button className="px-8 py-4 rounded-xl border-2 border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-all">Explore Features</button></Link>
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 min-h-[500px]" />
          </div>
        </div>
      </div>

      {/* ── ECOSYSTEM CONTENT ── */}
      <div className="relative py-24 min-h-screen flex items-center bg-dark-100/30">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:block lg:w-[41%]" />
            <div className="w-full lg:w-[59%] lg:pl-12">
              <div className="mb-16 max-w-2xl text-left">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Shopify App <span className="gradient-text transition-all duration-300">Development</span></h2>
                <p className="text-xl text-gray-400">Everything you need to scale your store into a mobile-first brand icon.</p>
              </div>
              <div className="space-y-6">
                {services.map((service, index) => (
                  <motion.div key={service.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative">
                    {/* Highlight Badge for Push Notifications */}
                    {'isSpecial' in service && (
                      <div className="absolute -top-3 left-8 z-20">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          className="px-4 py-1 rounded-full bg-accent-primary text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-accent-primary/50"
                        >
                          Biggest Selling Point
                        </motion.div>
                      </div>
                    )}
                    <div className={`p-8 rounded-2xl border ${'isSpecial' in service ? 'border-accent-primary bg-accent-primary/5' : 'border-gray-800 bg-dark-200/50'} hover:border-accent-primary/50 transition-all duration-300`}>
                      <div className="flex items-center space-x-6">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                          <service.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                          <p className="text-gray-400">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
