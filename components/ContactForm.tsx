'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle, Phone, Mail, Building2, LayoutGrid } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    'App Development',
    'Website Design',
    'UI/UX Design',
    'Software Solutions',
    'Database Solutions',
    'Cloud Services',
    'Cybersecurity',
    'Other',
  ];

  const budgetOptions = [
    '$5k - $10k',
    '$10k - $25k',
    '$25k - $50k',
    '$50k - $100k',
    '$100k+',
  ];

  const timelineOptions = [
    'ASAP',
    '1 - 2 months',
    '3 - 4 months',
    '5 - 6 months',
    'Flexible / Not sure',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-24 bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.07),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_45%)]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Get In</span>{' '}
            <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can help bring your vision to life
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-br from-dark-200 via-dark-100/60 to-dark-200 shadow-2xl shadow-accent-primary/10">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 via-transparent to-accent-secondary/10 pointer-events-none" />
            <div className="p-8 sm:p-10 lg:p-12 relative">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-semibold border border-accent-primary/30">
                    <LayoutGrid className="w-4 h-4" />
                    <span>Project Brief</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">Tell us about your project</h3>
                  <p className="text-gray-400">
                    Share a few details so we can prepare tailored ideas and timelines for you.
                  </p>
                </div>
                <div className="grid gap-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-accent-primary" />
                    <span>We respond within 1 business day.</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-accent-secondary" />
                    <span>Detailed proposal and next steps after our call.</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-dark-200 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary transition-all duration-200"
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }}>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">Work Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-dark-200 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary transition-all duration-200"
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-5 py-4 rounded-xl bg-dark-200 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary transition-all duration-200"
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.25 }}>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company or brand"
                    className="w-full px-5 py-4 rounded-xl bg-dark-200 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary transition-all duration-200"
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-dark-200 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary transition-all duration-200"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.35 }}>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-dark-200 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary transition-all duration-200"
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 }}>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-dark-200 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary transition-all duration-200"
                  >
                    <option value="" disabled>
                      When do you want to start?
                    </option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  className="md:col-span-2"
                >
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">Project Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your goals, target audience, and any key requirements."
                    required
                    rows={5}
                    className="w-full px-5 py-4 rounded-xl bg-dark-200 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary transition-all duration-200 resize-none"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="md:col-span-2"
                >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full px-8 py-4 rounded-full bg-gradient-primary text-white font-semibold text-lg flex items-center justify-center space-x-2"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

