'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Globe, Palette, Code, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences',
    color: 'from-blue-500 to-cyan-500',
    href: '/services/app-development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
  },
  {
    icon: Globe,
    title: 'Website Design',
    description: 'Responsive, fast, and SEO-optimized websites that convert visitors into customers',
    color: 'from-purple-500 to-pink-500',
    href: '/services/website-design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that users love and engage with',
    color: 'from-pink-500 to-rose-500',
    href: '/services/ui-ux-design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
  },
  {
    icon: Code,
    title: 'Software Solutions',
    description: 'Custom software solutions tailored to your business needs',
    color: 'from-indigo-500 to-purple-500',
    href: '/services/software-solutions',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-dark-100 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Our</span>{' '}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive tech solutions to elevate your digital presence
          </p>
        </motion.div>

        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
              style={{ perspective: '1000px' }}
            >
              <Link href={service.href} className="block">
                <motion.div
                  whileHover={{ rotateY: -5, rotateX: 2 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`relative overflow-hidden rounded-2xl border border-gray-800 hover:border-accent-primary/50 transition-all duration-300 ${
                    index % 2 === 0 ? 'bg-dark-200' : 'bg-dark-100'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    {/* Content Side */}
                    <div className="p-6 lg:p-8 flex flex-col justify-center relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 inline-block`}
                      >
                        <service.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-base text-gray-400 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <motion.div
                        className="flex items-center text-accent-primary font-semibold text-sm"
                        whileHover={{ x: 5 }}
                      >
                        <span className="mr-2">Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Image Side */}
                    <div className="relative h-48 md:h-full overflow-hidden">
                      <div className="absolute inset-0">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-20 transition-opacity`} />
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
          className="text-center mt-12"
        >
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full border-2 border-gray-700 text-white font-semibold hover:border-accent-primary transition-colors"
            >
              View All Services
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

