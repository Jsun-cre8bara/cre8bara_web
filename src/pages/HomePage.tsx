import { HeroSection } from '../app/components/HeroSection';
import { ServicesSection } from '../app/components/ServicesSection';
import { ContactForm } from '../app/components/ContactForm';

export function HomePage() {
  return (
    <main className="pt-16">
      <HeroSection />
      <ServicesSection />
      <ContactForm />
    </main>
  );
}
