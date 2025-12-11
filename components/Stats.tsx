'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Briefcase, Award, Code } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: 500, suffix: '+', label: 'Projects Completed', color: 'from-blue-500 to-cyan-500' },
  { icon: Users, value: 200, suffix: '+', label: 'Happy Clients', color: 'from-purple-500 to-pink-500' },
  { icon: Award, value: 50, suffix: '+', label: 'Awards Won', color: 'from-pink-500 to-rose-500' },
  { icon: Code, value: 10000, suffix: '+', label: 'Lines of Code', color: 'from-indigo-500 to-purple-500' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-24 bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">By The</span>{' '}
            <span className="gradient-text">Numbers</span>
          </h2>
          <p className="text-xl text-gray-400">
            Our journey in numbers
          </p>
        </motion.div>
      </div>

      {/* Single Full-Width Card - Touches screen edges */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-screen bg-dark-200 border-y border-gray-800 py-8 sm:py-12 lg:py-16 relative overflow-hidden"
      >
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-accent-secondary/5 to-accent-tertiary/5 opacity-50" />
        
        {/* Stats Grid - Full Width Content */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 relative z-10 px-4 sm:px-6 lg:px-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Value */}
              <div className="mb-2 sm:mb-4 relative z-10">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg font-medium relative z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

