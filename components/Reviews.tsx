'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 5,
    text: 'DEVNEXT transformed our digital presence. Their attention to detail and innovative solutions exceeded our expectations.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, InnovateLab',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 5,
    text: 'Working with DEVNEXT was a game-changer. They delivered a stunning app that our users absolutely love.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Director, DigitalFlow',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 5,
    text: 'Professional, creative, and results-driven. DEVNEXT helped us achieve our goals faster than we imagined.',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'CTO, CloudSync',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 5,
    text: 'Outstanding service and expertise. DEVNEXT built us a scalable platform that handles millions of users seamlessly.',
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    role: 'Marketing Director, NextGen',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150',
    rating: 5,
    text: 'The team at DEVNEXT understood our vision perfectly and delivered beyond our expectations. Highly recommended!',
  },
  {
    id: 6,
    name: 'Robert Taylor',
    role: 'Founder, SmartSolutions',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    rating: 5,
    text: 'Exceptional quality and professionalism. DEVNEXT transformed our business with their innovative solutions.',
  },
  {
    id: 7,
    name: 'Lisa Anderson',
    role: 'Product Manager, FutureTech',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    rating: 5,
    text: 'Working with DEVNEXT was a pleasure. They delivered on time, within budget, and exceeded all our expectations.',
  },
  {
    id: 8,
    name: 'James Wilson',
    role: 'CEO, CodeCraft',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    rating: 5,
    text: 'DEVNEXT is the best development agency we\'ve worked with. Their technical expertise and creativity are unmatched.',
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-dark-200 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">What Our</span>{' '}
            <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        {/* Horizontal Scrollable Container */}
        <div className="overflow-x-auto scrollbar-hide pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 lg:gap-8" style={{ width: 'max-content' }}>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  z: 50,
                }}
                className="perspective-1000 flex-shrink-0 w-[320px] sm:w-[380px] lg:w-[400px]"
              >
                <div className="relative h-full p-8 rounded-2xl bg-dark-100 border border-gray-800 hover:border-accent-primary/50 transition-all duration-300 group">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-12 h-12 text-accent-primary" />
                  </div>

                  {/* Stars */}
                  <div className="flex space-x-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                      >
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed relative z-10">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4 relative z-10">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-accent-primary/50">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{review.name}</h4>
                      <p className="text-gray-400 text-sm">{review.role}</p>
                    </div>
                  </div>

                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

