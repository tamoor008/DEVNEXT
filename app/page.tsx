'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Companies from '@/components/Companies';
import Stats from '@/components/Stats';
import Showcase from '@/components/Showcase';
import WhyChoose from '@/components/WhyChoose';
import Reviews from '@/components/Reviews';
import Team from '@/components/Team';
import Blogs from '@/components/Blogs';
import Quote from '@/components/Quote';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen relative bg-dark-50">
      <div className="relative z-10">
        <Hero />
        <Companies />
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
