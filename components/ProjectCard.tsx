'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Download } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  video?: string;
  technologies: string[];
  link: string;
  github: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: () => void;
}

export default function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative overflow-hidden bg-dark-100 border border-gray-800 hover:border-accent-primary/50 transition-all duration-500 cursor-pointer shadow-2xl rounded-2xl"
        animate={{ 
          height: isHovered ? 520 : 450,
          scale: isHovered ? 1.15 : 1,
          y: isHovered ? -35 : 0,
          zIndex: isHovered ? 50 : 1
        }}
        transition={{ 
          duration: 0.2, 
          ease: "easeOut" 
        }}
        onClick={onSelect}
      >
        {/* Thumbnail Image (Always present as fallback/background) */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-700 ${isHovered ? 'scale-110 opacity-30 blur-sm' : 'scale-100 opacity-100'}`}
        />

        {/* Video Background (Show immediately on hover) */}
        <AnimatePresence>
          {isHovered && project.video && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30"
            >
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gradient Overlays - Only show when NOT playing video to allow clear view */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/40 to-transparent z-20"
            />
          )}
        </AnimatePresence>

        {/* Hover Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-6 right-6 z-40"
            >
              <button className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-primary text-white text-sm font-bold shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-105 transition-all duration-300">
                <Download className="w-4 h-4" />
                <span>Download App</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <motion.div
            animate={isHovered ? { y: -10 } : { y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <span className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${project.color} text-white text-xs font-bold uppercase tracking-wider`}>
                {project.category}
              </span>
            </div>

            <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-accent-primary transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-6 transition-all duration-300 group-hover:text-white">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-medium backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-0`} />
      </motion.div>
    </motion.div>
  );
}
