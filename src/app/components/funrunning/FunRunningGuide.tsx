import { UserPlus, MapPin, Route, Play, Medal } from 'lucide-react';

export function FunRunningGuide() {
  const steps = [
    {
      icon: UserPlus,
      title: '1단계: 회원가입',
      description: '펀러닝 앱을 다운로드하고 간단한 정보 입력으로 회원가입을 완료하세요. 소셜 로그인 지원으로 더욱 빠르게 시작할 수 있습니다.',
    },
    {
      icon: MapPin,
      title: '2단계: 관심 지역 설정',
      description: '자주 활동하는 지역을 설정하면 주변의 추천 코스와 제휴 상점 정보를 바로 확인할 수 있습니다.',
    },
    {
      icon: Route,
      title: '3단계: 코스 선택',
      description: '체력 수준, 관심사, 소요 시간 등을 고려하여 나에게 맞는 미션 코스를 선택하세요. 각 코스의 난이도와 경유지 정보를 미리 확인할 수 있습니다.',
    },
    {
      icon: Play,
      title: '4단계: 미션 시작',
      description: '준비 운동을 마치고 \'미션 시작\' 버튼을 누르면 GPS 추적이 시작됩니다. 앱이 경로를 안내하고 경유지 도착 시 자동으로 인증됩니다.',
    },
    {
      icon: Medal,
      title: '5단계: 미션 완료 및 보상',
      description: '모든 경유지를 방문하고 목표 거리를 달성하면 미션 완료! 배지를 획득하고 제휴 상점 혜택을 받으세요.',
    },
  ];

  const safetyRules = [
    '충분한 준비운동: 5~10분 스트레칭으로 부상 예방',
    '수분 보충: 500ml 물병 휴대 필수',
    '적절한 페이스: 대화 가능한 속도 유지',
    '교통 안전: 횡단보도와 신호 준수',
    '날씨 체크: 미세먼지, 폭염 시 실내 대체',
  ];

  const equipment = [
    '러닝화: 쿠션이 좋은 전문 러닝화',
    '기능성 의류: 땀 배출이 잘 되는 소재',
    '스마트워치: 심박수 및 속도 모니터링',
    '작은 가방: 핸드폰, 물, 간식 휴대용',
    '선크림/모자: 자외선 차단 필수',
  ];

  return (
    <section id="guide" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-6">
          시작하는 방법: 펀러닝 미션 참여 가이드
        </h2>
        
        <p className="text-gray-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
          펀러닝을 시작하는 것은 생각보다 훨씬 간단합니다. 회원가입부터 첫 미션 완수까지, 단계별로 자세히 안내해드립니다.
        </p>

        {/* 5단계 가이드 */}
        <div className="space-y-6 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex items-start gap-6 bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <step.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-orange-50 p-8 rounded-lg border-l-4 border-orange-500">
            <h3 className="text-2xl font-bold mb-4 text-orange-600">초보자를 위한 안전 수칙</h3>
            <ol className="space-y-3">
              {safetyRules.map((rule, index) => (
                <li key={index} className="text-gray-700">
                  {index + 1}. {rule}
                </li>
              ))}
            </ol>
          </div>
          
          <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-500">
            <h3 className="text-2xl font-bold mb-4 text-green-600">추천 러닝 장비</h3>
            <ul className="space-y-3">
              {equipment.map((item, index) => (
                <li key={index} className="text-gray-700 flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
