import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MinistrySection from '@/components/MinistrySection';
import PrayerRequestForm from '@/components/PrayerRequestForm';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MinistrySection />
      <PrayerRequestForm />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ChatWidget />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
