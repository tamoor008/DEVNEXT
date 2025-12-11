import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServicesPreview from '@/components/ServicesPreview';
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
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ServicesPreview />
      <Companies />
      <Stats />
      <Showcase />
      <WhyChoose />
      <Reviews />
      <Team />
      <Blogs />
      <Quote />
      <ContactForm />
      <Footer />
    </main>
  );
}

