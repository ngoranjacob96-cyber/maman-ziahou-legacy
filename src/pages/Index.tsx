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
import JoelChatBot from '@/components/JoelChatBot';
import WhatsAppButton from '@/components/WhatsAppButton';
import WarningBanner from '@/components/WarningBanner';

const Index = () => {
  return (
    <main className="min-h-screen">
      <WarningBanner />
      <div className="pt-16">
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
      </div>
      <JoelChatBot />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
