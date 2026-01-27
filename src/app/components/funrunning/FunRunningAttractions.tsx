import { Coffee, BookOpen, Home, TreePine } from 'lucide-react';

export function FunRunningAttractions() {
  const attractions = [
    {
      icon: Coffee,
      title: '카페 & 베이커리',
      description: '지역의 특색 있는 카페와 베이커리에서 잠깐의 휴식과 함께 맛있는 보상을 즐기세요',
    },
    {
      icon: BookOpen,
      title: '북카페 & 문화공간',
      description: '서울 인왕산 초소책방처럼 독특한 분위기의 문화 공간을 경유하며 지적 자극을 받아보세요',
    },
    {
      icon: Home,
      title: '지역 맛집',
      description: '주민들이 사랑하는 숨은 맛집을 발견하고 건강한 식사로 에너지를 충전하세요',
    },
    {
      icon: TreePine,
      title: '자연 & 명소',
      description: '경기도 연천 푸르내마을 같은 자연 속 힐링 공간에서 특별한 러닝 경험을 만들어보세요',
    },
  ];

  return (
    <section id="attractions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-6">
          미션 러닝의 매력: 달리며 만나는 동네의 숨은 보석들
        </h2>
        
        <p className="text-gray-600 text-center max-w-4xl mx-auto mb-6 leading-relaxed">
          펀러닝 미션 코스는 카페, 베이커리, 북카페, 맛집, 편의점 등 다양한 업종의 상점들을 경유하도록 설계되어 있습니다. 서울 인왕산 초소책방처럼 독특한 문화 공간부터, 경기도 연천 푸르내마을 같은 자연 속 휴식처, 그리고 지역 주민들이 사랑하는 맛집과 카페까지 다채로운 장소들이 여러분을 기다립니다.
        </p>
        
        <p className="text-gray-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
          단순한 운동을 넘어 지역 문화와 라이프스타일을 직접 체험할 수 있는 기회입니다. 매번 같은 코스를 달리던 지루함은 이제 그만! 미션을 수행하며 새로운 장소를 발견하고, 지역의 이야기를 만나며, 러닝의 즐거움을 새롭게 경험하세요.
        </p>

        {/* 이미지 */}
        <div className="mb-12">
          <img 
            src="https://www.genspark.ai/api/files/s/UGUButbV" 
            alt="다양한 미션 장소" 
            className="rounded-lg shadow-lg w-full max-w-3xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {attractions.map((attraction, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <attraction.icon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{attraction.title}</h3>
              <p className="text-gray-600">{attraction.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
