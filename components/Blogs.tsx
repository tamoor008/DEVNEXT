'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const blogs = [
  {
    id: 1,
    title: 'The Future of Mobile App Development',
    excerpt: 'Exploring the latest trends and technologies shaping the mobile app landscape in 2024',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    date: 'March 15, 2024',
    category: 'Development',
  },
  {
    id: 2,
    title: 'UI/UX Design Principles for 2024',
    excerpt: 'Key design principles that will dominate user interface and experience design this year',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    date: 'March 10, 2024',
    category: 'Design',
  },
  {
    id: 3,
    title: 'Building Scalable Web Applications',
    excerpt: 'Best practices for creating web applications that grow with your business needs',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    date: 'March 5, 2024',
    category: 'Development',
  },
];

export default function Blogs() {
  return (
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
            <span className="text-white">Latest</span>{' '}
            <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest trends and insights from our team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl bg-dark-100 border border-gray-800 overflow-hidden hover:border-accent-primary/50 transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-primary text-white text-sm font-semibold">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{blog.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-primary transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <motion.div
                    className="flex items-center text-accent-primary font-semibold"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm mr-2">Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

