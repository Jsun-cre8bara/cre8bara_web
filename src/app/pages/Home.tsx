import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { ContactForm } from '../components/ContactForm';

export function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ContactForm />
    </>
  );
}
