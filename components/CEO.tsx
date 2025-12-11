'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote, Linkedin, Mail } from 'lucide-react';

const ceoData = {
  name: 'Alex Thompson',
  role: 'Chief Executive Officer & Founder',
  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600',
  bio: 'With over 15 years of experience in the tech industry, Alex founded DEVNEXT with a vision to transform how businesses interact with technology. His leadership has guided the company to become a trusted partner for innovative digital solutions.',
  quote: 'Innovation is not just about technology; it\'s about creating solutions that truly make a difference in people\'s lives.',
  achievements: [
    'Led 500+ successful projects',
    'Built a team of 50+ experts',
    'Recognized as Tech Leader of the Year 2023',
    'Featured in Forbes 30 Under 30',
  ],
  social: {
    linkedin: '#',
    email: 'alex@devnext.com',
  },
};

export default function CEO() {
  return (
    <section className="py-24 bg-dark-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Our</span>{' '}
            <span className="gradient-text">Leadership</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the visionary behind DEVNEXT
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Image Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-20 blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border-4 border-gray-800">
                <div className="aspect-square relative">
                  <Image
                    src={ceoData.image}
                    alt={ceoData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-transparent" />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-primary rounded-full blur-2xl opacity-30" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-accent-secondary to-accent-tertiary rounded-full blur-2xl opacity-20" />
            </motion.div>

            {/* Content Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {ceoData.name}
                </h3>
                <p className="text-xl text-accent-primary font-semibold mb-6">
                  {ceoData.role}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {ceoData.bio}
                </p>
              </div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative p-6 rounded-xl bg-dark-100 border border-gray-800"
              >
                <Quote className="absolute top-4 left-4 w-8 h-8 text-accent-primary opacity-20" />
                <p className="text-lg text-gray-300 italic pl-8 relative z-10">
                  &ldquo;{ceoData.quote}&rdquo;
                </p>
              </motion.div>

              {/* Achievements */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ceoData.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-dark-100 border border-gray-800"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-primary mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 pt-4">
                <motion.a
                  href={ceoData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white hover:shadow-lg hover:shadow-accent-primary/50 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href={`mailto:${ceoData.social.email}`}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full border-2 border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-primary transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

