'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Mail, ChevronDown, Smartphone, Zap, Bell, Rocket, BarChart } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Shopify App Development', href: '/services', isService: true },
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={mounted ? { y: -100 } : { y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-dark-200/95 backdrop-blur-md shadow-lg shadow-accent-primary/20'
          : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative h-16 w-auto"
            >
              <Image
                src="/asset/techlogo.png"
                alt="TechniFuse Logo"
                width={400}
                height={400}
                className="h-full w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group"
                >
                  {item.isService ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-300 relative group overflow-hidden ${isActive
                          ? 'bg-accent-primary/15 border border-accent-primary/30 shadow-lg shadow-accent-primary/10'
                          : 'bg-white/5 border border-white/10 hover:border-accent-primary/30 hover:bg-accent-primary/5'
                        }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
                        <Smartphone className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex flex-col items-start leading-tight">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-accent-primary font-black mb-1 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                          Primary Service
                        </span>
                        <span className={`text-sm font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-100 group-hover:text-white'
                          }`}>
                          {item.name}
                        </span>
                      </div>
                      {/* Interactive Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-primary/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                    </motion.div>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index + 1) * 0.1 }}
                      className={`transition-colors duration-300 font-medium ${isActive
                          ? 'text-white'
                          : 'text-gray-300 hover:text-white'
                        }`}
                    >
                      {item.name}
                    </motion.span>
                  )}
                  {isActive && !item.isService && (
                    <motion.div
                      layoutId="desktop-active-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-primary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/50 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>Contact us</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 bg-dark-200/80 border border-gray-800 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-200/98 backdrop-blur-md border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Contact us first */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact us</span>
                </Link>
              </motion.div>

              {/* Nav items */}
              {navItems.map((item, index) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.08 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2 font-medium transition-colors relative ${isActive
                          ? 'text-white'
                          : 'text-gray-300 hover:text-white'
                        }`}
                    >
                      {item.isService ? (
                        <div className={`p-4 rounded-xl border transition-all duration-300 ${isActive
                            ? 'bg-accent-primary/20 border-accent-primary/40'
                            : 'bg-white/5 border-white/10'
                          }`}>
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                              <Smartphone className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[11px] uppercase tracking-[0.25em] text-accent-primary font-black mb-1.5 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                                Primary Service
                              </span>
                              <span className="text-white font-bold">{item.name}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className={isActive ? 'text-white' : 'text-gray-300'}>
                            {item.name}
                          </span>
                          {isActive && (
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-accent-primary"
                              layoutId="mobile-active-dot"
                            />
                          )}
                        </div>
                      )}
                      {isActive && !item.isService && (
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary"
                          layoutId="mobile-active-indicator"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

