'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CEO from '@/components/CEO';
import Image from 'next/image';
import { Target, Eye, Users, Award } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower businesses with cutting-edge digital solutions that drive growth and innovation.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To be the leading development agency recognized for excellence, creativity, and client success.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Our Team',
    description: 'A talented group of developers, designers, and strategists passionate about creating exceptional digital experiences.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Award,
    title: 'Our Values',
    description: 'Quality, innovation, integrity, and client satisfaction are at the core of everything we do.',
    color: 'from-indigo-500 to-purple-500',
  },
];

const timeline = [
  { year: '2020', event: 'Company Founded', description: 'Started with a vision to transform digital experiences' },
  { year: '2021', event: 'First 100 Clients', description: 'Reached milestone of serving 100 satisfied clients' },
  { year: '2022', event: 'Award Recognition', description: 'Won Best Development Agency of the Year' },
  { year: '2023', event: 'Global Expansion', description: 'Expanded services to international markets' },
  { year: '2024', event: 'Innovation Leader', description: 'Recognized as industry leader in digital innovation' },
];

export default function About() {
  return (
    <main className="min-h-screen">
      <Header />
      
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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">About</span>{' '}
              <span className="gradient-text">DEVNEXT</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              We are a passionate team of developers, designers, and innovators dedicated to creating
              exceptional digital experiences that drive business success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              <span className="text-white">Who We</span>{' '}
              <span className="gradient-text">Are</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative p-8 rounded-2xl bg-dark-100 border border-gray-800 hover:border-transparent transition-all duration-300 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 relative z-10`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 relative z-10">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
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
              <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white">Excellence in Every Detail</h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  We believe in delivering nothing but the best. Every project we undertake is a testament to our commitment to excellence, attention to detail, and passion for creating exceptional digital experiences.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white">Innovation & Creativity</h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  We push boundaries and challenge the status quo. Our team constantly explores new technologies, methodologies, and creative solutions to stay ahead of the curve and deliver cutting-edge results.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white">Client-Centric Approach</h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Your success is our success. We prioritize understanding your vision, goals, and challenges to create solutions that truly make a difference in your business.
                </p>
              </div>
            </motion.div>

            {/* Image Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  alt="Our Values"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-primary rounded-full blur-3xl opacity-30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              <span className="text-white">Our</span>{' '}
              <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-tertiary hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start space-x-8"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center border-4 border-dark-100">
                      <span className="text-white font-bold text-sm">{item.year}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.event}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <CEO />

      <Footer />
    </main>
  );
}

