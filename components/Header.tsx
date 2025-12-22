'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, ChevronDown, Smartphone, Globe, Palette, Code, Database, Cloud, Shield } from 'lucide-react';

const services = [
  { id: 'app-development', name: 'App Development', description: 'Native and cross-platform mobile applications', icon: Smartphone, href: '/services/app-development' },
  { id: 'website-design', name: 'Website Design', description: 'Responsive and SEO-optimized websites', icon: Globe, href: '/services/website-design' },
  { id: 'ui-ux-design', name: 'UI/UX Design', description: 'Beautiful and intuitive user interfaces', icon: Palette, href: '/services/ui-ux-design' },
  { id: 'software-solutions', name: 'Software Solutions', description: 'Custom software for your business', icon: Code, href: '/services/software-solutions' },
  { id: 'database-solutions', name: 'Database Solutions', description: 'Efficient and scalable database systems', icon: Database, href: '/services/database-solutions' },
  { id: 'cloud-services', name: 'Cloud Services', description: 'Scalable cloud infrastructure', icon: Cloud, href: '/services/cloud-services' },
  { id: 'cybersecurity', name: 'Cybersecurity', description: 'Protect your digital assets', icon: Shield, href: '/services/cybersecurity' },
];

const navItems = [
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-200/95 backdrop-blur-md shadow-lg shadow-accent-primary/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-2xl font-bold gradient-text"
            >
              TechniFuse
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home Link */}
            <Link href="/" className="relative group">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`transition-colors duration-300 font-medium ${
                  pathname === '/' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </motion.span>
              <motion.div
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                  pathname === '/' 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}
                initial={false}
              />
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesHovered(true)}
              onMouseLeave={() => setIsServicesHovered(false)}
            >
              <div className="relative group">
                <span
                  className={`transition-colors duration-300 font-medium cursor-pointer flex items-center space-x-1 ${
                    pathname.startsWith('/services') 
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesHovered ? 'rotate-180' : ''}`} />
                </span>
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                    pathname.startsWith('/services') 
                      ? 'w-full' 
                      : 'w-0 group-hover:w-full'
                  }`}
                  initial={false}
                />
              </div>

              {/* Invisible Bridge to prevent gap */}
              {isServicesHovered && (
                <div className="absolute top-full left-0 right-0 h-2" />
              )}

              {/* Dropdown Menu - Cards Layout */}
              <AnimatePresence>
                {isServicesHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-2 w-[600px] z-50"
                  >
                    <div className="p-4 rounded-xl bg-dark-200 border border-gray-800 shadow-xl">
                      <div className="grid grid-cols-2 gap-3">
                        {services.map((service, index) => (
                          <Link
                            key={service.id}
                            href={service.href}
                            onClick={() => setIsServicesHovered(false)}
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="p-4 rounded-lg bg-dark-100 border border-gray-800 hover:border-accent-primary/50 transition-all duration-300 group h-full"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                                  <service.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-semibold text-sm group-hover:text-accent-primary transition-colors block mb-1">
                                    {service.name}
                                  </span>
                                  <p className="text-gray-400 text-xs leading-relaxed">
                                    {service.description}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group"
                >
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index + 2) * 0.1 }}
                    className={`transition-colors duration-300 font-medium ${
                      isActive 
                        ? 'text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </motion.span>
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                      isActive 
                        ? 'w-full' 
                        : 'w-0 group-hover:w-full'
                    }`}
                    initial={false}
                  />
                </Link>
              );
            })}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-primary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/50 transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Meeting</span>
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
              {/* Book a Meeting first */}
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
                  <Calendar className="w-4 h-4" />
                  <span>Book a Meeting</span>
                </Link>
              </motion.div>

              {/* Home */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 font-medium transition-colors relative ${
                    pathname === '/' ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Home
                  {pathname === '/' && (
                    <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary" layoutId="mobile-active-indicator" />
                  )}
                </Link>
              </motion.div>

              {/* Other nav items */}
              {navItems.map((item, index) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + index * 0.08 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2 font-medium transition-colors relative ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary"
                          layoutId="mobile-active-indicator"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Services accordion at the end */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + navItems.length * 0.08 }}
              className="border-t border-gray-800 pt-2"
              >
                <button
                  className="w-full flex items-center justify-between py-3 text-gray-200 hover:text-white transition-colors"
                  onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                >
                  <span className="font-medium">Services</span>
                  <span className="text-accent-primary text-2xl font-bold leading-none">
                    {isMobileServicesOpen ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2 overflow-hidden bg-black border border-gray-800 rounded-xl mt-2 p-3"
                    >
                      {services.map((service, idx) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="border-b border-gray-800 last:border-b-0"
                        >
                          <Link
                            href={service.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileServicesOpen(false);
                            }}
                            className="flex items-center space-x-2 py-2 text-gray-200 hover:text-white transition-colors"
                          >
                            <service.icon className="w-4 h-4 text-accent-primary" />
                            <span>{service.name}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

