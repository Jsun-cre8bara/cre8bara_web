import { Phone } from 'lucide-react';
import { Button } from './ui/button';
import logoImage from '@/assets/1e634da90e99b7120d179edc9e040fa5ecd31cdb.png';

export function Header() {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src={logoImage} alt="Cre8BARA Logo" className="h-8" />
            <span className="text-gray-600 text-sm">Working together for Good</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition">About us</a>
            <a href="#services" className="text-gray-600 hover:text-gray-900 transition">Services</a>
            <a href="#portfolio" className="text-gray-600 hover:text-gray-900 transition">Portfolio</a>
            <a href="#tools" className="text-gray-600 hover:text-gray-900 transition">TCATS</a>
            <a href="/funrunning/index.html" className="text-gray-600 hover:text-gray-900 transition">FunRunning</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
          </nav>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>1661-1301</span>
          </Button>
        </div>
      </div>
    </header>
  );
}