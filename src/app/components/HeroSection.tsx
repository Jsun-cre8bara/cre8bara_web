import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative h-[500px] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1626849257546-7f88d2c947d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMHRvdXJpc20lMjBzdW5zZXR8ZW58MXx8fHwxNzY3ODc4NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-purple-600/30"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl mb-6">새로운 콘텐츠의 패러다임</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          공연을 커머스로, 러닝을 관광산업으로 연결합니다.<br />
          CRE8BARA와 함께 창조하고 만들어가는 미래를 경험하세요.
        </p>
      </div>
    </section>
  );
}