import { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import logoImage from '@/assets/1e634da90e99b7120d179edc9e040fa5ecd31cdb.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src={logoImage} alt="Cre8BARA Logo" className="h-8" />
            <span className="text-gray-600 text-sm hidden sm:block">Working together for Good</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/#about" className="text-gray-600 hover:text-gray-900 transition">About us</a>
            <a href="/#services" className="text-gray-600 hover:text-gray-900 transition">Services</a>
            <a href="/#portfolio" className="text-gray-600 hover:text-gray-900 transition">Portfolio</a>
            <a href="/#tools" className="text-gray-600 hover:text-gray-900 transition">TCATS</a>
            <a 
              href="https://funrunning-8y2jvuh.gamma.site/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              FunRunning
            </a>
            <a href="/#contact" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
          </nav>
          
          <div className="flex items-center gap-4">
            {/* Phone Button (Desktop) */}
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>1661-1301</span>
            </Button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition"
              aria-label="메뉴 토글"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            <a 
              href="/#about" 
              className="block py-2 text-gray-600 hover:text-gray-900 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              About us
            </a>
            <a 
              href="/#services" 
              className="block py-2 text-gray-600 hover:text-gray-900 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="/#portfolio" 
              className="block py-2 text-gray-600 hover:text-gray-900 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </a>
            <a 
              href="/#tools" 
              className="block py-2 text-gray-600 hover:text-gray-900 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              TCATS
            </a>
            <a 
              href="https://funrunning-8y2jvuh.gamma.site/" 
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-gray-600 hover:text-gray-900 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              FunRunning
            </a>
            <a 
              href="/#contact" 
              className="block py-2 text-gray-600 hover:text-gray-900 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="pt-3 border-t border-gray-200">
              <a href="tel:1661-1301" className="flex items-center gap-2 py-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>1661-1301</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}