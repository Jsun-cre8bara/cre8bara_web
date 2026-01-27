import { Check } from 'lucide-react';

export function FunRunningHealth() {
  const activities = [
    {
      title: '가족과 함께',
      description: '온 가족이 함께 즐길 수 있는 난이도 조절 가능한 코스로 건강한 주말 나들이를 만들어보세요',
    },
    {
      title: '친구들과 함께',
      description: '친구들과 팀을 이뤄 미션을 수행하며 우정을 더욱 돈독히 하는 시간을 가져보세요',
    },
    {
      title: '동호회와 함께',
      description: '러닝 동호회 활동에 새로운 재미를 더하고 커뮤니티 러닝 문화를 함께 만들어가세요',
    },
  ];

  const healthBenefits = [
    { title: '심폐 기능 향상', description: '5~10km 유산소 운동으로 심장과 폐 건강 증진' },
    { title: '체중 관리', description: '규칙적인 러닝으로 칼로리 소모 및 체지방 감소' },
    { title: '스트레스 해소', description: '야외 활동과 목표 달성의 쾌감으로 정신 건강 개선' },
    { title: '사회적 교류', description: '지역 커뮤니티와의 연결로 고립감 해소' },
  ];

  return (
    <section id="health" className="py-20 bg-gradient-to-br from-green-600 to-teal-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-6">
          지역 탐방과 건강 챙기기: 펀러닝이 주는 두 가지 선물
        </h2>
        
        <p className="text-white/90 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
          펀러닝은 단순히 칼로리를 소모하고 체력을 기르는 운동 효과를 넘어, 지역의 숨은 명소와 매력적인 상점들을 탐방하며 일상에 활력을 불어넣는 특별한 경험을 선사합니다. 심학산 둘레길, 부안변산마실길 같은 아름다운 자연 경관을 자랑하는 코스부터, 도심 속 핫플레이스를 연결하는 트렌디한 코스까지 지역별 추천 루트와 자유롭게 연계할 수 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
            >
              <img 
                src="https://www.genspark.ai/api/files/s/rDq1nl1C" 
                alt={activity.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
              <p className="text-white/80 text-sm">{activity.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-center">펀러닝으로 얻는 건강 효과</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">{benefit.title}:</strong>{' '}
                  <span className="text-white/80">{benefit.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
