import { Mail, Phone, MapPin } from 'lucide-react';
import logoImage from '@/assets/1e634da90e99b7120d179edc9e040fa5ecd31cdb.png';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logoImage} alt="Cre8BARA Logo" className="h-8 mb-4" />
            <p className="text-gray-400 text-sm">
              Working together for Good
            </p>
          </div>
          
          <div>
            <h4 className="mb-4">빠른 링크</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-400 hover:text-white transition">회사 소개</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">서비스</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-white transition">포트폴리오</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition">문의하기</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4">연락처</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>1661-1301</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>cre8bara@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Seoul, Korea</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2006 크리에이트바라 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}