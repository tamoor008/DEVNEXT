'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const showcases = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A revolutionary shopping experience with seamless checkout',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Fitness Mobile App',
    description: 'Track your workouts and achieve your fitness goals',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    category: 'App Development',
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    description: 'Beautiful analytics dashboard for data-driven decisions',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    category: 'UI/UX Design',
  },
  {
    id: 4,
    title: 'FinTech Solution',
    description: 'Secure and intuitive banking application',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    category: 'Software Development',
  },
];

export default function Showcase() {
  return (
    <section className="pt-0 pb-24 bg-dark-100 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16 mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Showcasing</span>{' '}
            <span className="gradient-text">Brilliance</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A glimpse into our exceptional work and creative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden bg-dark-200 border border-gray-800 hover:border-accent-primary/50 transition-all duration-300">
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/80 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <div className="mb-3">
                    <span className="px-3 py-1 rounded-full bg-gradient-primary text-white text-sm font-semibold">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4">
                    {item.description}
                  </p>

                  <motion.div
                    className="inline-flex items-center text-accent-primary font-semibold"
                    whileHover={{ x: 5 }}
                  >
                    <span className="mr-2">View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

