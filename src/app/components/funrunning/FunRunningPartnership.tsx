import { Percent, Gift, Star, Megaphone } from 'lucide-react';

export function FunRunningPartnership() {
  const benefits = [
    {
      icon: Percent,
      title: '할인 혜택',
      description: '미션 완주 시 제휴 상점에서 사용 가능한 10~20% 할인 쿠폰 즉시 제공',
    },
    {
      icon: Gift,
      title: '기념품 증정',
      description: '특정 상점 방문 시 펀러닝 전용 굿즈, 무료 샘플, 기념 스탬프 제공',
    },
    {
      icon: Star,
      title: '포인트 적립',
      description: '상점별 미션 포인트 부여로 누적 포인트에 따른 추가 보상 시스템 운영',
    },
    {
      icon: Megaphone,
      title: '상점 홍보',
      description: '앱 내 상점 소개, SNS 노출, 러너 커뮤니티 입소문으로 자연스러운 마케팅 효과',
    },
  ];

  const businessTypes = [
    '☕ 카페', '🥐 베이커리', '📚 북카페', '🍜 맛집',
    '💪 헬스클럽', '🏪 편의점', '🎨 문화공간',
  ];

  return (
    <section id="partnership" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6">
          상점과의 협업: 지역 상권과 함께 성장하는 펀러닝
        </h2>
        
        <p className="text-gray-600 mb-4 max-w-4xl leading-relaxed">
          펀러닝은 지역 상점들과 긴밀한 제휴를 통해 상생의 생태계를 구축합니다. 미션을 완주한 러너들에게는 제휴 상점에서 사용 가능한 할인 쿠폰, 특별 기념품, 무료 음료 등 다양한 혜택이 제공됩니다. 상점 입장에서는 새로운 고객 유입의 기회를 얻고, 브랜드 인지도를 높일 수 있는 효과적인 마케팅 채널이 됩니다.
        </p>
        
        <p className="text-gray-600 mb-12 max-w-4xl leading-relaxed">
          각 상점은 방문 시마다 미션 포인트를 부여하며, 이는 러너들의 방문 동기를 강화하고 재방문을 유도하는 핵심 요소입니다. 커피숍, 제과점, 헬스클럽, 북카페, 맛집 등 다양한 업종의 사업자들이 참여하고 있으며, 펀러닝 플랫폼을 통해 지역 상권 전체가 활기를 되찾고 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:border-green-400 transition-colors"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-green-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">제휴 가능 업종</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {businessTypes.map((type, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium border-2 border-green-200 hover:border-green-400 transition-colors"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
