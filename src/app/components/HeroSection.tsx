import { useEffect, useState } from 'react';
import H_img01 from '@/assets/H_img01.jpg';
import H_img02 from '@/assets/H_img02.jpg';
import H_img03 from '@/assets/H_img03.png';
import H_img04 from '@/assets/H_img04.png';

type ImageItem = 
  | { src: string; type: 'full' }
  | { src: string; type: 'split'; row: number; col: number };

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // H_img01, H_img02, H_img03 + H_img04의 6개 분할 이미지 = 총 9개 이미지
  const images: ImageItem[] = [
    { src: H_img01, type: 'full' },
    { src: H_img02, type: 'full' },
    { src: H_img03, type: 'full' },
    // H_img04를 6개로 분할 (3x2 그리드)
    { src: H_img04, type: 'split', row: 0, col: 0 }, // 왼쪽 위
    { src: H_img04, type: 'split', row: 0, col: 1 }, // 중간 위
    { src: H_img04, type: 'split', row: 0, col: 2 }, // 오른쪽 위
    { src: H_img04, type: 'split', row: 1, col: 0 }, // 왼쪽 아래
    { src: H_img04, type: 'split', row: 1, col: 1 }, // 중간 아래
    { src: H_img04, type: 'split', row: 1, col: 2 }, // 오른쪽 아래
  ];

  // 자동 롤링 (3초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentIndex];

  // H_img04 분할 이미지 스타일 계산 (3x2 그리드)
  // 6개 이미지를 3열 2행으로 분할
  const getSplitImageStyle = (row: number, col: number) => {
    // 각 열은 33.33%씩, 각 행은 50%씩 차지
    // background-position에서 배경 크기가 300% 200%일 때:
    // col 0: 0%, col 1: 50%, col 2: 100%
    // row 0: 0%, row 1: 100%
    const xPosition = col === 0 ? '0%' : col === 1 ? '50%' : '100%';
    const yPosition = row === 0 ? '0%' : '100%';
    
    return {
      backgroundImage: `url(${H_img04})`,
      backgroundSize: '300% 200%', // 3열 x 2행으로 확대
      backgroundPosition: `${xPosition} ${yPosition}`,
      backgroundRepeat: 'no-repeat',
    };
  };

  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={
          currentImage.type === 'split'
            ? getSplitImageStyle(currentImage.row, currentImage.col)
            : { 
                backgroundImage: `url(${currentImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
        }
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40"></div>
      </div>
      
      {/* 텍스트 컨텐츠 */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl mb-6 font-bold">새로운 콘텐츠의 패러다임</h1>
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