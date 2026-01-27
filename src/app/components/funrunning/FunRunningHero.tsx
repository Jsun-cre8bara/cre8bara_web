import { Button } from '../ui/button';

export function FunRunningHero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-teal-400">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20">
        <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
          신개념 러닝 플랫폼
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          펀러닝: 5~10km 미션으로 즐기는{' '}
          <span className="text-yellow-300">신개념 미션 러닝 플랫폼</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          달리기에 재미와 목표를 더한 새로운 러닝 경험, <strong>펀러닝</strong>과 함께 시작하세요!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6"
            onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
          >
            지금 시작하기
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
            onClick={() => document.getElementById('course')?.scrollIntoView({ behavior: 'smooth' })}
          >
            코스 둘러보기
          </Button>
        </div>
      </div>
    </section>
  );
}
