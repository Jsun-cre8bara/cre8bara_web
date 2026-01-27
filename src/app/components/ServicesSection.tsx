import { Sparkles, Music, Route, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';

const services = [
  {
    icon: Sparkles,
    title: 'Original Idea',
    description: (
      <>
        아이디어를 '될 것'으로 만듭니다
        <br />
        콘텐츠, 공연, 관광, 플랫폼을 넘나드는
        <br />
        CRE8BARA만의 오리지널 기획과 세계관 설계로
        <br />
        없던 시장을 처음부터 만듭니다.
      </>
    ),
  },
  {
    icon: Music,
    title: 'Performance Commerce',
    description: (
      <>
        공연이 끝나도 경험은 계속됩니다
        <br />
        공연·팬미팅·페스티벌을
        <br />
        굿즈, 티켓, 데이터, 구독으로 확장하는
        <br />
        공연 기반 커머스 모델을 설계합니다.
      </>
    ),
  },
  {
    icon: Route,
    title: 'Run & Tourism Contents',
    description: (
      <>
        달리면, 도시가 콘텐츠가 됩니다
        <br />
        러닝을 이벤트가 아닌 여행으로,
        <br />
        지역을 무대 삼은 러닝 × 관광 × 축제 콘텐츠로
        <br />
        사람과 도시를 연결합니다.
      </>
    ),
    link: 'https://funrunning-8y2jvuh.gamma.site/',
    linkText: '펀러닝 보기',
  },
  {
    icon: BarChart3,
    title: 'Platform & Data Strategy',
    description: (
      <>
        팬과 데이터가 다음 콘텐츠를 만듭니다
        <br />
        티켓, 참여, 이동, 소비 데이터를 기반으로
        <br />
        콘텐츠를 예측하고 확장하는
        <br />
        플랫폼·데이터 중심 전략을 만듭니다.
      </>
    ),
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">우리의 서비스</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            고객의 성공을 위해 다양한 전문 서비스를 제공합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <div className="text-gray-600 leading-relaxed mb-4 flex-grow">{service.description}</div>
              {service.link && (
                <a 
                  href={service.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto"
                >
                  <Button 
                    variant="outline" 
                    className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                  >
                    {service.linkText}
                  </Button>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}