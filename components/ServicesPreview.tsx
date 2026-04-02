'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Globe, Bot, Zap, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'Web-to-App Conversion',
    description: 'Transform your existing Shopify, WooCommerce, or custom website into a high-performance native mobile app.',
    color: 'from-blue-500 to-cyan-500',
    href: '/services/web-to-app',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
  },
  {
    icon: Globe,
    title: 'Standalone Brand Apps',
    description: 'Custom-built mobile applications for brands that want a dedicated, app-first presence without needing a website.',
    color: 'from-purple-500 to-pink-500',
    href: '/services/standalone-apps',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  },
  {
    icon: Bot,
    title: 'AI Assistant Integration',
    description: 'Built-in AI assistants that resolve customer queries instantly and provide personalized product suggestions.',
    color: 'from-pink-500 to-rose-500',
    href: '/services/ai-integration',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=800',
  },
  {
    icon: Zap,
    title: 'Smart Retargeting',
    description: 'Boost recall and sales with automated push notifications and direct-to-consumer engagement tools.',
    color: 'from-indigo-500 to-purple-500',
    href: '/services/retargeting',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
  },
];

export default function ServicesPreview() {
  return (
    <section id="services-section" className="py-24 bg-dark-100 relative overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row">
          
          {/* Empty Left Column for Docked 3D Phone - widened for larger model */}
          <div className="hidden lg:block lg:w-[41%]" />

          {/* Content Column - Adjusted width */}
          <div className="w-full lg:w-[59%] lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-left mb-16 max-w-2xl"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="text-white">Our App</span>{' '}
                <span className="gradient-text transition-all duration-300">Ecosystem</span>
              </h2>
              <p className="text-xl text-gray-400">
                Beyond just code, we build high-recall brand assets with integrated AI and smart retargeting.
              </p>
            </motion.div>

            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 30 }} // animate from right now
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group max-w-2xl"
                >
                  <Link href={service.href} className="block">
                    <motion.div
                      whileHover={{ x: 15 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative overflow-hidden rounded-2xl border border-gray-800 bg-dark-200/50 hover:border-accent-primary/50 transition-all duration-300 backdrop-blur-sm p-6 lg:p-8"
                    >
                      <div className="flex items-center space-x-6">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg shadow-black/20`}
                        >
                          <service.icon className="w-7 h-7 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                            {service.title}
                          </h3>
                          <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 text-left"
            >
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full border-2 border-gray-700 text-white font-semibold hover:border-accent-primary hover:text-accent-primary transition-all duration-300"
                >
                  Explore Full Ecosystem
                </motion.button>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

