import { Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import logoImage from '@/assets/1e634da90e99b7120d179edc9e040fa5ecd31cdb.png';

export function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isHomePage) {
      // 홈페이지가 아니면 홈으로 이동 후 스크롤
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Cre8BARA Logo" className="h-8" />
            <span className="text-gray-600 text-sm">Working together for Good</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" onClick={scrollToSection('about')} className="text-gray-600 hover:text-gray-900 transition cursor-pointer">About us</a>
            <a href="#services" onClick={scrollToSection('services')} className="text-gray-600 hover:text-gray-900 transition cursor-pointer">Services</a>
            <a href="#portfolio" onClick={scrollToSection('portfolio')} className="text-gray-600 hover:text-gray-900 transition cursor-pointer">Portfolio</a>
            <a href="#tools" onClick={scrollToSection('tools')} className="text-gray-600 hover:text-gray-900 transition cursor-pointer">TCATS</a>
            <Link to="/funrunning" className="text-gray-600 hover:text-gray-900 transition">FunRunning</Link>
            <a href="#contact" onClick={scrollToSection('contact')} className="text-gray-600 hover:text-gray-900 transition cursor-pointer">Contact</a>
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