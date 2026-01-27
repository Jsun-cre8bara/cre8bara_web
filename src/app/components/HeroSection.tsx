import { useEffect, useState } from 'react';
import H_img01 from '@/assets/H_img01.jpg';
import H_img02 from '@/assets/H_img02.jpg';
import H_img03 from '@/assets/H_img03.png';

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // H_img02, H_img03 이미지 롤링
  const images = [
    H_img02,
    H_img03,
  ];

  // 자동 롤링 (3초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentIndex];

  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${currentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40"></div>
      </div>
      
      {/* 텍스트 컨텐츠 */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl mb-6 font-bold">콘텐츠의 NEW 패러다임</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          공연을 커머스로, 러닝을 관광산업으로 연결합니다.<br />
          CRE8BARA와 함께 창조하고 만들어가는 미래를 경험하세요.
        </p>
      </div>

      {/* 인디케이터 (선택사항) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}