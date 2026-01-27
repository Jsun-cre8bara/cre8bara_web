export function FunRunningAbout() {
  const features = [
    {
      title: '운동 + 탐방',
      description: '5~10km 러닝과 지역 상점 방문을 결합한 새로운 경험',
    },
    {
      title: '목표와 재미',
      description: '미션 완수를 통한 성취감과 즐거움 동시 제공',
    },
    {
      title: '지역 상생',
      description: '건강과 지역 경제 활성화를 함께 추구하는 플랫폼',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              펀러닝이란? 미션 러닝으로 달리기의 재미를 재발견하다
            </h2>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              펀러닝은 단순히 달리는 것을 넘어, 지역 내 상점들을 경유하는 미션을 통해 운동에 목표와 재미를 동시에 제공하는 혁신적인 러닝 플랫폼입니다. 5~10km 거리 내에 위치한 다양한 상점들을 방문하는 미션을 수행하면서, 운동과 지역 탐방을 자연스럽게 결합한 새로운 러닝 경험을 만들어갑니다.
            </p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              건강한 라이프스타일을 추구하면서 동시에 지역 경제 활성화에도 기여할 수 있는 윈윈 플랫폼입니다. 러너들은 운동 목표를 달성하는 동시에 동네 곳곳의 숨은 명소와 상점들을 발견하게 되며, 지역 상점들은 새로운 고객 유입의 기회를 얻게 됩니다. 펀러닝은 개인의 건강뿐만 아니라 지역 커뮤니티 전체의 활력을 불어넣는 특별한 플랫폼입니다.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg"
                >
                  <h3 className="font-bold text-green-700 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://www.genspark.ai/api/files/s/EyjKSPHg" 
              alt="펀러닝 러너" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
