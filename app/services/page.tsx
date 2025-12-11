'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Smartphone, Globe, Palette, Code, Database, Cloud, Shield } from 'lucide-react';

type Service = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  image: string;
  details: {
    features: string[];
    technologies: string[];
  };
};

const services: Service[] = [
  {
    id: 'app-development',
    title: 'App Development',
    icon: Smartphone,
    description: 'Native and cross-platform mobile applications',
    color: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    details: {
      features: [
        'iOS & Android Native Development',
        'React Native & Flutter Cross-Platform',
        'Progressive Web Apps (PWA)',
        'App Store Optimization',
        'Performance Optimization',
        'Maintenance & Support',
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic'],
    },
  },
  {
    id: 'website-design',
    title: 'Website Design',
    icon: Globe,
    description: 'Responsive and SEO-optimized websites',
    color: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    details: {
      features: [
        'Responsive Web Design',
        'E-Commerce Solutions',
        'Content Management Systems',
        'SEO Optimization',
        'Performance Optimization',
        'Security Implementation',
      ],
      technologies: ['Next.js', 'React', 'WordPress', 'Shopify', 'Node.js'],
    },
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    icon: Palette,
    description: 'Beautiful and intuitive user interfaces',
    color: 'from-pink-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    details: {
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design',
        'Interaction Design',
        'Design Systems',
        'Usability Testing',
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
    },
  },
  {
    id: 'software-solutions',
    title: 'Software Solutions',
    icon: Code,
    description: 'Custom software for your business',
    color: 'from-indigo-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    details: {
      features: [
        'Custom Software Development',
        'Enterprise Solutions',
        'API Development',
        'System Integration',
        'Cloud Migration',
        'Legacy System Modernization',
      ],
      technologies: ['Python', 'Java', '.NET', 'Node.js', 'Docker'],
    },
  },
  {
    id: 'database-solutions',
    title: 'Database Solutions',
    icon: Database,
    description: 'Efficient and scalable database systems',
    color: 'from-green-500 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    details: {
      features: [
        'Database Design & Architecture',
        'Data Migration',
        'Performance Tuning',
        'Backup & Recovery',
        'Data Security',
        'Real-time Analytics',
      ],
      technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch'],
    },
  },
  {
    id: 'cloud-services',
    title: 'Cloud Services',
    icon: Cloud,
    description: 'Scalable cloud infrastructure',
    color: 'from-cyan-500 to-blue-500',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    details: {
      features: [
        'Cloud Architecture Design',
        'AWS/Azure/GCP Setup',
        'DevOps Implementation',
        'Auto-scaling Solutions',
        'Cost Optimization',
        '24/7 Monitoring',
      ],
      technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform'],
    },
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    icon: Shield,
    description: 'Protect your digital assets',
    color: 'from-red-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    details: {
      features: [
        'Security Audits',
        'Penetration Testing',
        'Vulnerability Assessment',
        'Security Implementation',
        'Compliance (GDPR, HIPAA)',
        'Incident Response',
      ],
      technologies: ['OWASP', 'SSL/TLS', 'Firewalls', 'SIEM', 'Encryption'],
    },
  },
];

// Separate component for services list with proper animation triggers
function ServicesList({ 
  services, 
  openService, 
  toggleService,
  listVariants,
  cardVariants 
}: {
  services: Service[];
  openService: string | null;
  toggleService: (id: string) => void;
  listVariants: any;
  cardVariants: any;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={listVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={index}
          isOpen={openService === service.id}
          onToggle={() => toggleService(service.id)}
          variants={cardVariants}
        />
      ))}
    </motion.div>
  );
}

// Individual service card component
function ServiceCard({ 
  service, 
  index, 
  isOpen, 
  onToggle,
  variants 
}: {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  variants: any;
}) {
  return (
    <motion.div
      variants={variants}
      className="rounded-2xl bg-dark-100 border border-gray-800 overflow-hidden shadow-lg shadow-black/10 flex flex-col group hover:border-accent-primary/50 transition-all duration-300"
    >
      {/* Header - Clickable on mobile only */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-dark-200 transition-colors md:cursor-default md:hover:bg-transparent"
      >
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
            <service.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-white group-hover:text-accent-primary transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm">{service.description}</p>
          </div>
        </div>
        {/* Chevron - Only visible on mobile */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </button>

      {/* Content - Always visible on desktop, dropdown on mobile */}
      <div className="md:block hidden">
        <div className="p-6 pt-0">
          <div className="flex flex-col gap-6">
            {/* Image Top */}
            <div className="relative h-48 rounded-xl overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-20`} />
            </div>
            
            {/* Content Bottom */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                <ul className="space-y-2">
                  {service.details.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-accent-primary mt-1">•</span>
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {service.details.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-dark-200 border border-gray-700 text-gray-300 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <Link href={`/services/${service.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-full bg-gradient-to-r ${service.color} text-white font-semibold`}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <div className="p-6 pt-0">
              <div className="flex flex-col gap-6">
                {/* Image Top */}
                <div className="relative h-48 rounded-xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-20`} />
                </div>
                
                {/* Content Bottom */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                    <ul className="space-y-2">
                      {service.details.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-accent-primary mt-1">•</span>
                          <span className="text-gray-400 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.details.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-dark-200 border border-gray-700 text-gray-300 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Link href={`/services/${service.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-full bg-gradient-to-r ${service.color} text-white font-semibold`}
                      >
                        Learn More
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const [openService, setOpenService] = useState<string | null>(null);

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      scale: 0.8, 
      rotate: -5
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 0.61, 0.36, 1],
        type: 'spring',
        stiffness: 80,
        damping: 15
      } 
    },
  };

  const toggleService = (id: string) => {
    setOpenService(openService === id ? null : id);
  };

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
              <span className="text-white">Our</span>{' '}
              <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Comprehensive tech solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-dark-200 relative overflow-hidden">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <ServicesList 
            services={services} 
            openService={openService} 
            toggleService={toggleService}
            listVariants={listVariants}
            cardVariants={cardVariants}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

