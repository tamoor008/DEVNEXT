'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

const serviceDetails: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  process: { step: number; title: string; description: string }[];
  color: string;
}> = {
  'app-development': {
    title: 'App Development',
    description: 'Native and cross-platform mobile applications',
    longDescription: 'We create stunning mobile applications that deliver exceptional user experiences across iOS and Android platforms. Our team specializes in both native and cross-platform development, ensuring your app performs flawlessly on any device.',
    features: [
      'iOS & Android Native Development',
      'React Native & Flutter Cross-Platform',
      'Progressive Web Apps (PWA)',
      'App Store Optimization',
      'Performance Optimization',
      'Maintenance & Support',
      'Real-time Analytics Integration',
      'Push Notification Systems',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Xamarin'],
    process: [
      { step: 1, title: 'Discovery', description: 'Understanding your requirements and target audience' },
      { step: 2, title: 'Design', description: 'Creating intuitive UI/UX designs' },
      { step: 3, title: 'Development', description: 'Building the app with best practices' },
      { step: 4, title: 'Testing', description: 'Rigorous testing across devices' },
      { step: 5, title: 'Launch', description: 'App store submission and deployment' },
      { step: 6, title: 'Support', description: 'Ongoing maintenance and updates' },
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  'website-design': {
    title: 'Website Design',
    description: 'Responsive and SEO-optimized websites',
    longDescription: 'We design and develop high-performance websites that not only look stunning but also drive results. Our websites are fully responsive, SEO-optimized, and built with the latest technologies.',
    features: [
      'Responsive Web Design',
      'E-Commerce Solutions',
      'Content Management Systems',
      'SEO Optimization',
      'Performance Optimization',
      'Security Implementation',
      'Analytics Integration',
      'Conversion Optimization',
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify', 'Node.js', 'TypeScript'],
    process: [
      { step: 1, title: 'Planning', description: 'Strategy and wireframing' },
      { step: 2, title: 'Design', description: 'Visual design and prototyping' },
      { step: 3, title: 'Development', description: 'Frontend and backend development' },
      { step: 4, title: 'Testing', description: 'Quality assurance and optimization' },
      { step: 5, title: 'Launch', description: 'Deployment and go-live' },
      { step: 6, title: 'Maintenance', description: 'Updates and support' },
    ],
    color: 'from-purple-500 to-pink-500',
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces',
    longDescription: 'We create user-centered designs that are not only visually appealing but also highly functional. Our design process focuses on understanding user behavior and creating experiences that users love.',
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design',
      'Interaction Design',
      'Design Systems',
      'Usability Testing',
      'Accessibility Compliance',
      'Design Handoff',
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer'],
    process: [
      { step: 1, title: 'Research', description: 'User research and analysis' },
      { step: 2, title: 'Wireframing', description: 'Creating structure and layout' },
      { step: 3, title: 'Design', description: 'Visual design and branding' },
      { step: 4, title: 'Prototyping', description: 'Interactive prototypes' },
      { step: 5, title: 'Testing', description: 'Usability testing and refinement' },
      { step: 6, title: 'Handoff', description: 'Developer handoff and documentation' },
    ],
    color: 'from-pink-500 to-rose-500',
  },
  'software-solutions': {
    title: 'Software Solutions',
    description: 'Custom software for your business',
    longDescription: 'We develop custom software solutions tailored to your specific business needs. From enterprise applications to specialized tools, we build scalable and maintainable software.',
    features: [
      'Custom Software Development',
      'Enterprise Solutions',
      'API Development',
      'System Integration',
      'Cloud Migration',
      'Legacy System Modernization',
      'Microservices Architecture',
      'DevOps Implementation',
    ],
    technologies: ['Python', 'Java', '.NET', 'Node.js', 'Docker', 'Kubernetes'],
    process: [
      { step: 1, title: 'Analysis', description: 'Requirements gathering and analysis' },
      { step: 2, title: 'Architecture', description: 'System design and architecture' },
      { step: 3, title: 'Development', description: 'Agile development process' },
      { step: 4, title: 'Testing', description: 'Comprehensive testing' },
      { step: 5, title: 'Deployment', description: 'Production deployment' },
      { step: 6, title: 'Support', description: 'Maintenance and updates' },
    ],
    color: 'from-indigo-500 to-purple-500',
  },
  'database-solutions': {
    title: 'Database Solutions',
    description: 'Efficient and scalable database systems',
    longDescription: 'We design and implement robust database solutions that ensure data integrity, performance, and scalability. Our expertise covers both SQL and NoSQL databases, helping you choose the right solution for your needs.',
    features: [
      'Database Design & Architecture',
      'Data Migration',
      'Performance Tuning',
      'Backup & Recovery',
      'Data Security',
      'Real-time Analytics',
      'Data Warehousing',
      'Database Optimization',
    ],
    technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'Cassandra'],
    process: [
      { step: 1, title: 'Analysis', description: 'Understanding data requirements and structure' },
      { step: 2, title: 'Design', description: 'Database schema and architecture design' },
      { step: 3, title: 'Implementation', description: 'Database setup and configuration' },
      { step: 4, title: 'Migration', description: 'Data migration and validation' },
      { step: 5, title: 'Optimization', description: 'Performance tuning and optimization' },
      { step: 6, title: 'Maintenance', description: 'Ongoing monitoring and support' },
    ],
    color: 'from-green-500 to-emerald-500',
  },
  'cloud-services': {
    title: 'Cloud Services',
    description: 'Scalable cloud infrastructure',
    longDescription: 'We help you leverage the power of cloud computing to scale your business. From AWS to Azure and GCP, we design and implement cloud solutions that are secure, scalable, and cost-effective.',
    features: [
      'Cloud Architecture Design',
      'AWS/Azure/GCP Setup',
      'DevOps Implementation',
      'Auto-scaling Solutions',
      'Cost Optimization',
      '24/7 Monitoring',
      'Disaster Recovery',
      'Cloud Security',
    ],
    technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'Docker'],
    process: [
      { step: 1, title: 'Assessment', description: 'Evaluating current infrastructure and needs' },
      { step: 2, title: 'Planning', description: 'Cloud strategy and architecture planning' },
      { step: 3, title: 'Migration', description: 'Moving applications to the cloud' },
      { step: 4, title: 'Configuration', description: 'Setting up services and automation' },
      { step: 5, title: 'Optimization', description: 'Performance and cost optimization' },
      { step: 6, title: 'Support', description: 'Ongoing management and monitoring' },
    ],
    color: 'from-cyan-500 to-blue-500',
  },
  'cybersecurity': {
    title: 'Cybersecurity',
    description: 'Protect your digital assets',
    longDescription: 'Safeguard your business with comprehensive cybersecurity solutions. We provide security audits, penetration testing, and implementation of security best practices to protect your digital assets.',
    features: [
      'Security Audits',
      'Penetration Testing',
      'Vulnerability Assessment',
      'Security Implementation',
      'Compliance (GDPR, HIPAA)',
      'Incident Response',
      'Security Training',
      'Threat Monitoring',
    ],
    technologies: ['OWASP', 'SSL/TLS', 'Firewalls', 'SIEM', 'Encryption', 'VPN'],
    process: [
      { step: 1, title: 'Assessment', description: 'Security audit and vulnerability scanning' },
      { step: 2, title: 'Analysis', description: 'Identifying risks and threats' },
      { step: 3, title: 'Planning', description: 'Developing security strategy' },
      { step: 4, title: 'Implementation', description: 'Deploying security measures' },
      { step: 5, title: 'Testing', description: 'Penetration testing and validation' },
      { step: 6, title: 'Monitoring', description: 'Ongoing security monitoring' },
    ],
    color: 'from-red-500 to-orange-500',
  },
};

export default function ServiceDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const service = serviceDetails[slug];

  if (!service) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <Link href="/services" className="text-accent-primary hover:underline">
            Back to Services
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-dark-100 relative overflow-hidden">
        {/* Animated Background - Same as Home Hero */}
        <div className="absolute inset-0 bg-gradient-dark">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/services" className="inline-flex items-center text-white/80 hover:text-white mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white">
              {service.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              {service.longDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-4 rounded-xl bg-dark-200 border border-gray-800"
                >
                  <CheckCircle className="w-6 h-6 text-accent-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Technologies We Use</h2>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 rounded-full bg-dark-200 border border-gray-700 text-gray-300 font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-dark-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-gray-400">How we bring your project to life</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-1 md:order-1"
            >
              <h3 className="text-3xl font-bold text-white mb-4">Step-by-Step Excellence</h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                Our proven methodology ensures your project is delivered on time, within budget, and exceeds expectations. We follow a structured approach that combines creativity with technical expertise.
              </p>
              <div className="space-y-4">
                {service.process.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-dark-100 border border-gray-800"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 md:order-2"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
                  alt="Our Process"
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-l ${service.color} opacity-20`} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-400 mb-8">Let's discuss your project and create something amazing together</p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-full bg-gradient-to-r ${service.color} text-white font-semibold text-lg`}
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

