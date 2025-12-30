'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/technifuse', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/technifuse/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61585621269627', label: 'Facebook' },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
];

// Spinning Logo Component
function SpinningLogo() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 relative flex items-center justify-center"
    >
      <img
        src="/footer1.png"
        alt="TechniFuse Logo"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-dark-100 relative pt-1">
      {/* Glowing Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-primary to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent blur-[2px]" />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent-secondary/20 to-transparent blur-[4px]" />
      
      {/* Top Section - Call to Action & Contact Info */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Call to Action */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">👋</span>
                <span className="text-gray-400">Contact us today!</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Have <span className="gradient-text">questions?</span> get in touch!
              </h2>
              
              <p className="text-lg text-gray-400">
                A digital agency who delivers revenue-generating digital marketing solutions.
              </p>
              
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold text-lg"
                >
                  <span>Contact Us Today!</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Right Side - Contact Information & Logo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Spinning Logo - Upper Right */}
              <div className="absolute top-0 right-0">
                <SpinningLogo />
              </div>

              {/* Contact Information */}
              <div className="space-y-6 mt-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-accent-primary mt-1 flex-shrink-0" />
                  <div className="text-gray-400 space-y-1">
                    <p>Asia Pacific</p>
                    <p>United Kingdom</p>
                    <p>United Arab Emirates</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-accent-primary mt-1 flex-shrink-0" />
                  <div className="text-gray-400">
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 text-accent-primary mt-1 flex-shrink-0" />
                  <div className="text-gray-400 space-y-1">
                    <p>Mon-Fri: 10 am - 6 pm</p>
                    <p>Sat-Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-accent-primary mt-1 flex-shrink-0" />
                  <div className="text-gray-400">
                    <p>hello@technifuse.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright, Navigation & Social */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left - Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 text-sm order-1 sm:order-1"
            >
              Copyright © {new Date().getFullYear()} TechniFuse.
            </motion.div>

            {/* Center - Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 order-2 sm:order-2 flex-1">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right - Social Media Icons */}
            <div className="flex items-center gap-3 order-3 sm:order-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white hover:shadow-lg hover:shadow-accent-primary/50 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

