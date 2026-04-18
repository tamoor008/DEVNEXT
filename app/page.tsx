'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

// Lazy load sections below the fold to improve initial page load performance
const Stats = dynamic(() => import('@/components/Stats'));

const Showcase = dynamic(() => import('@/components/Showcase'));
const WhyChoose = dynamic(() => import('@/components/WhyChoose'));
const Reviews = dynamic(() => import('@/components/Reviews'));
const Team = dynamic(() => import('@/components/Team'));
const Blogs = dynamic(() => import('@/components/Blogs'));
const Quote = dynamic(() => import('@/components/Quote'));
const ContactForm = dynamic(() => import('@/components/ContactForm'));

export default function Home() {
  return (
    <main className="min-h-screen relative bg-dark-50">
      <div className="relative z-10">
        <Hero />
        <Stats />

        <Showcase />
        <WhyChoose />
        <Reviews />
        <Team />
        <Blogs />
        <Quote />
        <ContactForm />
      </div>
    </main>
  );
}
