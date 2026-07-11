'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Smartphone, Zap, Bell, Rocket, BarChart, Shield, CheckCircle } from 'lucide-react';

type Service = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  image: string;
  details: {
    features: string[];
    technologies: string[];
  };
};

const services: Service[] = [
  {
    id: 'app-development',
    title: 'App Development',
    icon: Smartphone,
    description: 'iOS + Android app with React Native & Shopify API integration.',
    color: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    details: {
      features: [
        'React Native (iOS + Android)',
        'Shopify API Integration',
        'Real-time Product Sync',
        'Native Cart & Checkout',
        'Custom Branded UI/UX',
        'Performance Optimized',
      ],
      technologies: ['React Native', 'Shopify API', 'Node.js', 'GraphQL', 'Firebase'],
    },
  },
  {
    id: 'conversion-optimization',
    title: 'Conversion Optimization',
    icon: Zap,
    description: 'Fast UI/UX designed for mobile-first shoppers to maximize sales.',
    color: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    details: {
      features: [
        'Ultra-Fast Loading Times',
        'Mobile-First Design',
        'One-Tap Checkout Experience',
        'Intuitive Navigation',
        'Reduced Friction Points',
        'Higher Add-to-Cart Rates',
      ],
      technologies: ['Figma', 'UX Research', 'A/B Testing', 'Core Web Vitals'],
    },
  },
  {
    id: 'push-notifications',
    title: 'Push Notifications (💰 Profit)',
    icon: Bell,
    description: 'Your #1 revenue driver with abandoned cart and sales alerts.',
    color: 'from-pink-500 to-rose-500',
    image: '/push-notifications.png',
    details: {
      features: [
        'Abandoned Cart Reminders',
        'Personalized Sales Campaigns',
        'Back-in-Stock Alerts',
        'Limited Time Offers',
        'Direct-to-Customer Engagement',
        'High Open & Click Rates',
      ],
      technologies: ['OneSignal', 'Firebase Cloud Messaging', 'Deep Linking'],
    },
  },
  {
    id: 'app-store-launch',
    title: 'App Store Launch',
    icon: Rocket,
    description: 'Full publishing management for Apple App Store & Google Play Store.',
    color: 'from-indigo-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    details: {
      features: [
        'App Store submission',
        'Google Play deployment',
        'App Store Optimization (ASO)',
        'Guidelines Compliance',
        'Release Management',
        'Post-Launch Monitoring',
      ],
      technologies: ['App Store Connect', 'Google Play Console', 'Fastlane', 'ASO Tools'],
    },
  },
  {
    id: 'analytics-growth',
    title: 'Analytics & Growth',
    icon: BarChart,
    description: 'Data-driven insights to track retention and customer behavior.',
    color: 'from-green-500 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    details: {
      features: [
        'Track Installs & Retention',
        'Customer Behavior Mapping',
        'Improve Repeat Purchases',
        'Revenue Attribution',
        'User Journey Analysis',
        'Data-Driven Design Updates',
      ],
      technologies: ['Mixpanel', 'Amplitude', 'Google Analytics', 'Shopify Analytics'],
    },
  },
];

// Separate component for services list with proper animation triggers
function ServicesList({
  services,
  openService,
  toggleService,
  listVariants,
  cardVariants
}: {
  services: Service[];
  openService: string | null;
  toggleService: (id: string) => void;
  listVariants: any;
  cardVariants: any;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={listVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={index}
          isOpen={openService === service.id}
          onToggle={() => toggleService(service.id)}
          variants={cardVariants}
        />
      ))}
    </motion.div>
  );
}

// Individual service card component
function ServiceCard({
  service,
  index,
  isOpen,
  onToggle,
  variants
}: {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  variants: any;
}) {
  return (
    <motion.div
      variants={variants}
      className="rounded-2xl bg-dark-100 border border-gray-800 overflow-hidden shadow-lg shadow-black/10 flex flex-col group hover:border-accent-primary/50 transition-all duration-300"
    >
      {/* Header - Clickable on mobile only */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-dark-200 transition-colors md:cursor-default md:hover:bg-transparent"
      >
        <div className="flex items-center space-x-4 sm:space-x-5">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg shadow-black/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-500`}
          >
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
            <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md relative z-10" />
          </motion.div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-white group-hover:text-accent-primary transition-colors duration-300">
              {service.title}
            </h3>
            <p className={`text-sm tracking-wide ${index === 1 ? 'text-gray-200 font-bold' : 'text-gray-300 font-medium'}`}>
              {service.description}
            </p>
          </div>
        </div>
        {/* Chevron - Only visible on mobile */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </button>

      {/* Content - Always visible on desktop, dropdown on mobile */}
      <div className="md:block hidden">
        <div className="p-6 pt-0">
          <div className="flex flex-col gap-6">
            {/* Image Top */}
            <div className="relative h-48 rounded-xl overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-20`} />
            </div>

            {/* Content Bottom */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                <ul className="space-y-2">
                  {service.details.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-accent-primary mt-1">•</span>
                      <span className="text-white text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {service.details.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-dark-200 border border-gray-700 text-gray-300 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <div className="p-6 pt-0">
              <div className="flex flex-col gap-6">
                {/* Image Top */}
                <div className="relative h-48 rounded-xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-20`} />
                </div>

                {/* Content Bottom */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                    <ul className="space-y-2">
                      {service.details.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-accent-primary mt-1">•</span>
                          <span className="text-white text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.details.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-dark-200 border border-gray-700 text-gray-300 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const [openService, setOpenService] = useState<string | null>(null);

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotate: -5
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 0.61, 0.36, 1],
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    },
  };

  const toggleService = (id: string) => {
    setOpenService(openService === id ? null : id);
  };

  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-dark-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              <span className="text-white">Shopify App</span>{' '}
              <span className="gradient-text">Development</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Scale your store into a mobile powerhouse. High-performance apps with Shopify sync, push notifications, and analytics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-dark-200 relative overflow-hidden">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <ServicesList
            services={services}
            openService={openService}
            toggleService={toggleService}
            listVariants={listVariants}
            cardVariants={cardVariants}
          />
        </div>
      </section>

    </main>
  );
}


