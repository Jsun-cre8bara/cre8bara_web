import { Check, Lightbulb } from 'lucide-react';
import { Button } from '../ui/button';

export function FunRunningCTA() {
  const benefits = [
    {
      icon: '🎁',
      title: '웰컴 혜택',
      description: '신규 회원 첫 미션 완수 시 5,000원 상당의 제휴 상점 쿠폰 증정',
    },
    {
      icon: '🏆',
      title: '이벤트 참여',
      description: '매월 다양한 챌린지와 경품 이벤트 자동 참여 자격 부여',
    },
    {
      icon: '👥',
      title: '커뮤니티 가입',
      description: '전국 펀러닝 커뮤니티 가입으로 러닝 메이트 찾기와 정보 공유',
    },
  ];

  const checklist = [
    '매일 같은 코스를 달리던 지루함은 이제 그만',
    '목표 없이 달리던 무료함에서 벗어나기',
    '운동하면서 동네 구석구석 탐험하기',
    '건강도 챙기고 지역 경제도 살리는 보람',
    '친구, 가족과 함께하는 특별한 추억 만들기',
  ];

  return (
    <section id="start" className="py-20 bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
          🚀 지금 시작하세요
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          지금 바로 펀러닝에 도전하세요!
        </h2>
        
        <p className="text-lg mb-6 text-white/90 leading-relaxed">
          건강과 재미, 그리고 지역 사랑까지 한 번에 누릴 수 있는 특별한 러닝 경험이 여러분을 기다립니다. 가까운 5~10km 내 상점들을 경유하며 새로운 동네 탐험을 시작해보세요. 펀러닝은 단순한 운동이 아니라, 당신의 일상에 활력과 즐거움을 더하는 새로운 라이프스타일입니다.
        </p>
        
        <p className="text-lg mb-12 text-white/90 leading-relaxed">
          지금 회원가입하고 첫 미션에 도전하시면 특별한 웰컴 혜택과 다양한 이벤트 참여 기회가 제공됩니다. 전국의 수천 명의 러너들이 이미 펀러닝과 함께 건강하고 즐거운 러닝 라이프를 만들어가고 있습니다. 당신도 오늘부터 그 일원이 되어보세요!
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
            >
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-sm text-white/80">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 mb-12">
          <h3 className="text-2xl font-bold mb-6">펀러닝과 함께라면</h3>
          <ul className="space-y-3 text-left max-w-2xl mx-auto">
            {checklist.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-10 py-6"
            onClick={() => alert('펀러닝 서비스는 곧 출시 예정입니다! 조금만 기다려주세요 😊')}
          >
            무료로 시작하기
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-6"
            onClick={() => document.getElementById('course')?.scrollIntoView({ behavior: 'smooth' })}
          >
            추천 코스 보기
          </Button>
        </div>

        {/* Tip */}
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex items-start gap-4 text-left">
          <Lightbulb className="w-8 h-8 text-yellow-300 flex-shrink-0" />
          <p className="text-white/90">
            <strong>💡 첫 미션 완수 팁:</strong> 처음에는 5km 초급 코스로 시작하세요! 경유지가 3~4곳인 짧은 코스로 펀러닝의 재미를 먼저 경험한 후, 점차 거리와 경유지를 늘려가는 것을 추천합니다. 친구와 함께하면 더욱 즐겁습니다!
          </p>
        </div>
      </div>
    </section>
  );
}
