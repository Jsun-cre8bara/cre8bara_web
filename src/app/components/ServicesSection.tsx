import { Music, Route, Lightbulb, Globe } from 'lucide-react';

const services = [
  {
    icon: Music,
    title: '공연 커머스',
    description: '공연과 엔터테인먼트를 새로운 커머스 경험으로 전환합니다',
  },
  {
    icon: Route,
    title: '러닝 관광',
    description: '러닝을 통해 지역을 탐험하는 새로운 관광 콘텐츠를 제공합니다',
  },
  {
    icon: Lightbulb,
    title: '콘텐츠 창작',
    description: '창의적인 아이디어로 새로운 가치를 만들어갑니다',
  },
  {
    icon: Globe,
    title: '플랫폼 연결',
    description: '다양한 산업을 연결하는 혁신적인 플랫폼을 구축합니다',
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
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}