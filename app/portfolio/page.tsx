'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A full-featured e-commerce platform with advanced shopping cart and payment integration',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    technologies: ['Next.js', 'React', 'Stripe', 'MongoDB'],
    link: '#',
    github: '#',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Fitness Mobile App',
    category: 'App Development',
    description: 'A comprehensive fitness tracking app with workout plans and progress monitoring',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    technologies: ['React Native', 'Firebase', 'Redux'],
    link: '#',
    github: '#',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    category: 'UI/UX Design',
    description: 'Beautiful analytics dashboard for data visualization and business insights',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    technologies: ['Figma', 'React', 'D3.js'],
    link: '#',
    github: '#',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 4,
    title: 'FinTech Solution',
    category: 'Software Development',
    description: 'Secure banking application with real-time transactions and fraud detection',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    technologies: ['Node.js', 'PostgreSQL', 'AWS'],
    link: '#',
    github: '#',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 5,
    title: 'Healthcare Portal',
    category: 'Web Development',
    description: 'Patient management system with appointment scheduling and medical records',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    link: '#',
    github: '#',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 6,
    title: 'Social Media Platform',
    category: 'App Development',
    description: 'Modern social networking app with real-time messaging and content sharing',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    technologies: ['Flutter', 'Firebase', 'GraphQL'],
    link: '#',
    github: '#',
    color: 'from-cyan-500 to-blue-500',
  },
];

const categories = ['All', 'Web Development', 'App Development', 'UI/UX Design', 'Software Development'];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

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
              <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Explore our collection of successful projects and creative solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-dark-200 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-primary text-white'
                    : 'bg-dark-100 text-gray-400 border border-gray-800 hover:border-accent-primary'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-dark-200 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="relative h-80 rounded-2xl overflow-hidden bg-dark-100 border border-gray-800 hover:border-accent-primary/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Image */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/80 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <div className="mb-3">
                        <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${project.color} text-white text-sm font-semibold`}>
                          {project.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded bg-dark-200/80 text-gray-300 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-dark-100 rounded-2xl overflow-hidden border border-gray-800"
            >
              <div className="relative h-64">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-200/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-dark-200 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-8">
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${selectedProject.color} text-white text-sm font-semibold`}>
                    {selectedProject.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                <p className="text-gray-400 mb-6">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-dark-200 border border-gray-700 text-gray-300 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold hover:shadow-lg transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Project</span>
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 rounded-full border border-gray-700 text-white font-semibold hover:border-accent-primary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

