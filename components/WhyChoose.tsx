'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Gauge, Users } from 'lucide-react';

const pillars = [
  {
    icon: Sparkles,
    title: 'Zero Upfront Cost',
    description: 'Launch your premium mobile app with a simple subscription model. No heavy upfront development fees.',
    points: ['Revenue-sharing options', 'No hidden setup costs', 'Scalable as you grow'],
  },
  {
    icon: Gauge,
    title: 'No Tech Headache',
    description: 'We handle everything from Shopify API sync to Play Store and App Store deployments and updates.',
    points: ['Shopify API management', 'Automated store sync', 'Zero deployment errors'],
  },
  {
    icon: ShieldCheck,
    title: 'Boost Brand Recall',
    description: 'Stay top-of-mind with an app icon on your customers home screen, triggering daily engagement.',
    points: ['Permanent home screen presence', 'One-tap checkout experience', 'Offline availability'],
  },
  {
    icon: Users,
    title: 'Push Profit Logic',
    description: 'Re-engage customers effortlessly with integrated push notifications for abandoned carts and sales.',
    points: ['90% open rates on push', 'Automated cart recovery', 'Seamless Shopify sync'],
  },
];

export default function WhyChoose() {
  return (
    <section className="py-24 bg-dark-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-accent-secondary/5 to-accent-tertiary/5 opacity-40" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Why Choose</span>{' '}
            <span className="gradient-text">TechniFuse</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Results-focused product teams combining strategy, design, engineering, and growth under one roof.
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                opacity: { duration: 0.6, delay: index * 0.05 },
                y: { duration: 0.6, delay: index * 0.05 },
                rotate: { duration: 0.3 },
                scale: { duration: 0 }
              }}
              whileHover={{ rotate: 3, y: -5 }}
              className="group h-full rounded-2xl bg-dark-100 border border-gray-800 hover:border-accent-primary/50 p-6 flex flex-col space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-lg shadow-accent-primary/20">
                <pillar.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-accent-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 mt-2 leading-relaxed">{pillar.description}</p>
              </div>
              <div className="space-y-2 pt-2">
                {pillar.points.map((point) => (
                  <div key={point} className="flex items-start space-x-2">
                    <span className="w-2 h-2 mt-2 rounded-full bg-gradient-primary" />
                    <span className="text-sm text-gray-300 leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


