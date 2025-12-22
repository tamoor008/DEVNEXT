'use client';

import { motion } from 'framer-motion';

const companies = [
  'TechCorp', 'InnovateLab', 'DigitalFlow', 'CloudSync', 'NextGen',
  'SmartSolutions', 'FutureTech', 'CodeCraft', 'AppVenture', 'WebForge',
];

export default function Companies() {
  return (
    <section className="py-16 bg-dark-200 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-2">
            Trusted by Industry Leaders
          </h3>
          <p className="text-gray-500">Companies we&apos;ve had the privilege to work with</p>
        </motion.div>

        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-200 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-200 to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <motion.div
              className="flex space-x-12"
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 10,
                  ease: 'linear',
                },
              }}
            >
              {/* First set - visible */}
              {companies.map((company, index) => (
                <div
                  key={`first-${company}-${index}`}
                  className="flex-shrink-0"
                >
                  <div className="px-8 py-4 rounded-xl bg-dark-300 border border-gray-800 hover:border-accent-primary/50 transition-all duration-300">
                    <span className="text-xl font-semibold text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                      {company}
                    </span>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companies.map((company, index) => (
                <div
                  key={`second-${company}-${index}`}
                  className="flex-shrink-0"
                >
                  <div className="px-8 py-4 rounded-xl bg-dark-300 border border-gray-800 hover:border-accent-primary/50 transition-all duration-300">
                    <span className="text-xl font-semibold text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                      {company}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

