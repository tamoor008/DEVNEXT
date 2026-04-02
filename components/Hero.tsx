'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Smartphone, Globe, Bot, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';

const services = [
  {
    icon: Smartphone,
    title: 'Web-to-App Conversion',
    description: 'Transform your existing Shopify, WooCommerce, or custom website into a high-performance native mobile app.',
    color: 'from-blue-500 to-cyan-500',
    href: '/services/web-to-app',
  },
  {
    icon: Globe,
    title: 'Standalone Brand Apps',
    description: 'Custom-built mobile applications for brands that want a dedicated, app-first presence without needing a website.',
    color: 'from-purple-500 to-pink-500',
    href: '/services/standalone-apps',
  },
  {
    icon: Bot,
    title: 'AI Assistant Integration',
    description: 'Built-in AI assistants that resolve customer queries instantly and provide personalized product suggestions.',
    color: 'from-pink-500 to-rose-500',
    href: '/services/ai-integration',
  },
  {
    icon: Zap,
    title: 'Smart Retargeting',
    description: 'Boost recall and sales with automated push notifications and direct-to-consumer engagement tools.',
    color: 'from-indigo-500 to-purple-500',
    href: '/services/retargeting',
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const spring = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });

  // ── TRANSFORMS ────────────────────────────────────────────────────────
  // Animate during 0→0.85 of scroll, then LOCK in place — phone arrives as user reaches Ecosystem
  const phoneX = useTransform(spring, [0, 0.85, 1], ['26vw', '-28vw', '-28vw']);
  const phoneY = useTransform(spring, [0, 0.85, 1], ['0vh', '106vh', '106vh']); // Lock at cards midpoint

  const rotateY = useTransform(spring, [0, 0.85, 1], [-28, 12, 12]);
  const rotateX = useTransform(spring, [0, 0.85, 1], [14, 0, 0]);
  const rotateZ = useTransform(spring, [0, 0.85, 1], [-10, 3, 3]);
  const phoneScale = useTransform(spring, [0, 0.85, 1], [1.12, 1.0, 1.0]);
  const phoneOpacity = useTransform(spring, [0, 1], [1, 1]); // Always visible

  // Screen content transitions
  const storeOpacity = useTransform(spring, [0.35, 0.60], [1, 0]);
  const aiOpacity = useTransform(spring, [0.55, 0.75], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full z-10 bg-dark-50">

      {/* ── STICKY PHONE ── */}
      <div className="absolute inset-0 pointer-events-none z-[60] hidden lg:block">
        <div className="sticky top-0 h-screen flex items-center justify-center" style={{ perspective: '1800px' }}>
          <motion.div
            style={{
              x: phoneX,
              y: phoneY,
              rotateY,
              rotateX,
              rotateZ,
              scale: phoneScale,
              opacity: phoneOpacity,
              transformStyle: 'preserve-3d',
            }}
            className="w-[330px] relative pointer-events-auto will-change-transform transform-gpu"
          >
            {/* iPhone Chassis */}
            <div style={{ transformStyle: 'preserve-3d' }} className="relative w-full aspect-[9/19.5]">
              {/* FRONT */}
              <div
                style={{ transform: 'translateZ(9px)', border: '1.5px solid #333' }}
                className="absolute inset-0 rounded-[3rem] bg-[#060606] overflow-hidden z-10"
              >
                <div className="absolute inset-[4px] rounded-[2.7rem] overflow-hidden bg-black">
                  <div className="absolute top-[10px] inset-x-0 flex justify-center z-50">
                    <div className="w-[88px] h-[26px] bg-black rounded-full border border-white/5 flex items-center justify-end px-2 gap-1">
                      <div className="w-[8px] h-[8px] rounded-full bg-[#111]" />
                    </div>
                  </div>
                  <motion.div style={{ opacity: storeOpacity }} className="absolute inset-0">
                    <Image src="/flat-store.png" alt="Store App" fill className="object-cover object-top" priority />
                  </motion.div>
                  <motion.div style={{ opacity: aiOpacity }} className="absolute inset-0">
                    <Image src="/flat-ai.png" alt="AI Assistant" fill className="object-cover object-top" />
                  </motion.div>
                </div>
              </div>
              {/* BACK */}
              <div
                style={{ transform: 'translateZ(-9px) rotateY(180deg)', border: '1px solid #1c1c1c' }}
                className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-[#1a1c1e] to-[#0a0a0c] overflow-hidden"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="relative min-h-screen flex items-center pt-24 pb-12">
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-accent-primary" />
                <span className="text-sm text-gray-300 font-medium">Launch Your App with Zero Initial Cost</span>
              </motion.div>
              <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight text-white">
                Convert Your <span className="gradient-text">Brand</span><br />Into a Powerful <span className="gradient-text">Mobile App</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0">Seamlessly integrate your store or business into a premium mobile experience.</p>
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
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our App <span className="gradient-text transition-all duration-300">Ecosystem</span></h2>
                <p className="text-xl text-gray-400">Beyond just code, we build high-recall brand assets with integrated AI.</p>
              </div>
              <div className="space-y-6">
                {services.map((service, index) => (
                  <motion.div key={service.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group">
                    <Link href={service.href} className="block p-8 rounded-2xl border border-gray-800 bg-dark-200/50 hover:border-accent-primary/50 transition-all">
                      <div className="flex items-center space-x-6">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                          <service.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                          <p className="text-gray-400">{service.description}</p>
                        </div>
                      </div>
                    </Link>
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
