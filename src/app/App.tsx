import { Toaster } from './components/ui/sonner';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <ServicesSection />
        <ContactForm />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
