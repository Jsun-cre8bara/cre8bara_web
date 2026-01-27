import { MapPin, Save, Trophy, Share2 } from 'lucide-react';

export function FunRunningUserExperience() {
  const features = [
    {
      icon: MapPin,
      title: 'GPS 실시간 추적',
      description: '정확한 위치 기반 경로 추적과 자동 경유지 인증',
    },
    {
      icon: Save,
      title: '자동 기록 저장',
      description: '거리, 시간, 경유 상점, 칼로리 소모량 등 완벽한 데이터 관리',
    },
    {
      icon: Trophy,
      title: '배지 & 랭킹',
      description: '성취에 따른 배지 획득과 전국 러너 랭킹 시스템',
    },
    {
      icon: Share2,
      title: 'SNS 공유',
      description: '친구들과 함께 도전하고 성과를 공유하는 즐거움',
    },
  ];

  return (
    <section id="user-experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8">
          사용자 경험: 앱과 웹으로 쉽고 즐겁게 미션 참여하기
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              펀러닝은 GPS 기반의 실시간 위치 추적 시스템을 통해 러너의 이동 경로를 정확하게 기록하고, 경유 상점 도착 시 자동으로 미션 인증을 처리합니다. 복잡한 조작 없이도 앱을 켜고 달리기만 하면, 모든 기록이 자동으로 저장됩니다.
            </p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              미션 완료 시에는 자동으로 기록이 저장되며, 달성한 거리와 시간에 따라 다양한 배지를 획득할 수 있습니다. 전국 러너들과 함께 랭킹 시스템에 참여하며 건강한 경쟁을 즐기고, 특별한 성취를 이뤘다면 SNS 공유 기능을 통해 친구들과 함께 기쁨을 나눠보세요.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://www.genspark.ai/api/files/s/JV8CtlY4" 
              alt="펀러닝 앱 화면" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
