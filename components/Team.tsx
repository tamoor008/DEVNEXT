'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Alex Thompson',
    role: 'Founder & CEO',
    designation: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Lead Developer',
    designation: 'Full-Stack Development Lead',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'UI/UX Designer',
    designation: 'Creative Design Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    role: 'Project Manager',
    designation: 'Senior Project Coordinator',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600',
  },
];

function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  // Cards 2 and 4 (index 1 and 3) are smaller
  const isSmaller = index === 1 || index === 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative flex items-center ${isSmaller ? 'self-center' : ''}`}
    >
      <div className={`relative w-full rounded-2xl overflow-hidden bg-dark-200 border border-gray-800 hover:border-accent-primary/50 transition-all duration-300 cursor-pointer ${
        isSmaller 
          ? 'h-[460px] sm:h-[500px] lg:h-[540px]' 
          : 'h-[550px] sm:h-[600px] lg:h-[650px]'
      }`}>
        {/* Image */}
        <div className="absolute inset-0">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Gradient Overlay at Bottom - Only for name */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-100 via-dark-100/95 to-transparent z-10"
        />

        {/* Name - Always visible, hides on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-6 z-10"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {member.name}
          </h3>
        </motion.div>

        {/* Hover Overlay - Shows role and designation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-dark-100/90 via-dark-100/70 to-dark-100/50 z-20 flex items-end"
        >
          <div className="w-full p-6 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {member.name}
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-1"
            >
              <p className={`font-semibold text-base ${
                member.id === 1 ? 'text-accent-primary' : 'text-white'
              }`}>
                {member.role}
              </p>
              <p className="text-gray-300 text-sm">
                {member.designation}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Subtle Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section className="py-24 bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">The Minds Behind</span>{' '}
            <span className="gradient-text">the Magic</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collective of creative visionaries and strategic thinkers dedicated to elevating your brand
          </p>
        </motion.div>
      </div>

      {/* Full Width Cards Section */}
      <div className="w-screen relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 px-4 sm:px-6 lg:px-8 items-center">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

