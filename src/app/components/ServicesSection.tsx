import { Sparkles, Music, Route, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import aboutBg from '../../assets/H_img03.png';

const services = [
  {
    icon: Sparkles,
    title: 'Original Contents IP',
    description:
      '아이디어에서 글로벌 IP로, 무대에서 플랫폼까지 확장된 CRE8BARA의 세계관을 경험하세요.',
    link: '/homeshopping-view',
    linkText: '홈쇼핑주식회사',
    internal: true,
  },
  {
    icon: Music,
    title: 'Performing Commerce',
    description:
      '공연이 끝나도 경험은 계속됩니다. 공연·팬미팅·페스티벌을 굿즈, 티켓, 데이터, 구독으로 확장하는 공연 기반 커머스 모델을 설계합니다.',
    link: 'https://another-cat-oy54p4c.gamma.site/',
    linkText: '퍼포밍 커머스 show',
  },
  {
    icon: Route,
    title: 'Run & Tourism Contents',
    description:
      '달리면, 도시가 콘텐츠가 됩니다. 러닝을 이벤트가 아닌 여행으로, 지역을 무대 삼은 러닝×관광×축제 콘텐츠로 사람과 도시를 연결합니다.',
    link: '/funrunning-view',
    linkText: '펀러닝 보기',
    internal: true,
  },
  {
    icon: BarChart3,
    title: 'Platform & Data Strategy',
    description:
      '팬과 데이터가 다음 콘텐츠를 만듭니다. 티켓, 참여, 이동, 소비 데이터를 기반으로 콘텐츠를 예측하고 확장하는 플랫폼·데이터 중심 전략을 만듭니다.',
    link: 'https://www.tcats.kr/',
    linkText: '티켓츠 TCATS',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-20 overflow-hidden">
      {/* Background image (subtle) */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${aboutBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/90 to-white/95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-100 text-orange-600 shadow-sm">
              <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </span>
            <h2 className="text-3xl sm:text-4xl leading-tight text-balance">
              About 크리에이트바라
            </h2>
            <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-100 text-orange-600 shadow-sm">
              <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </span>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="h-1 w-16 bg-orange-500/70 rounded-full mx-auto mb-6" />

            {/* Scrollable copy container */}
            <div className="bg-white/70 backdrop-blur-sm border border-black/5 rounded-2xl shadow-sm px-4 sm:px-6 py-5 sm:py-6 text-gray-700">
              <div className="max-h-[360px] sm:max-h-[420px] overflow-y-auto pr-2 text-[13px] sm:text-sm md:text-base leading-6 sm:leading-relaxed space-y-4 sm:space-y-5 text-left md:text-center">
                <p className="break-keep whitespace-normal md:whitespace-pre-line">
                  cre8BARA의 대표 프로젝트인 ‘홈쇼핑주식회사’는
                  {'\n'}‘커머스 퍼포밍(Commerce Performing)’이라는 새로운 공연 포맷으로,
                  {'\n'}공연과 라이브커머스를 결합한 커머스 공연 플랫폼입니다.
                  {'\n'}무대 위에서 스토리와 퍼포먼스로 상품과 문화를 소개하며,
                  {'\n'}해외 관광객 및 글로벌 마켓을 타깃으로 한 K-콘텐츠 수출형 공연 모델로 확장하고 있습니다.
                </p>

                <p className="break-keep whitespace-normal md:whitespace-pre-line">
                  또한 ‘잇츠 런(It’s Run)’은 펀 러닝(Fun Running)의 한 유형으로,
                  {'\n'}지역 상점·로컬 브랜드와 연계된 미션 러닝을 통해
                  {'\n'}참여형 관광 경험을 제공하고 지역 소비 경제 활성화를 이끄는
                  {'\n'}로컬 관광·체험형 콘텐츠 사업입니다.
                </p>

                <p className="break-keep whitespace-normal md:whitespace-pre-line">
                  이러한 공연·이벤트를 통해 축적된 관객 및 참여자 데이터는
                  {'\n'}자체 데이터 서비스 ‘티켓츠(tCATS)’로 연결됩니다.
                  {'\n'}티켓츠는 공연·이벤트(러닝) 관람 및 참여 데이터를 기반으로
                  {'\n'}정교한 타겟 마케팅과 관객 분석 서비스를 제공하는
                  {'\n'}공연·이벤트 특화 데이터베이스 플랫폼입니다.
                </p>

                <p className="break-keep whitespace-normal md:whitespace-pre-line">
                  크리에이트바라는 콘텐츠의 감성과 데이터의 힘을 결합해
                  {'\n'}공연을 넘어 관광, 커머스, 플랫폼으로 확장되는
                  {'\n'}지속 가능한 콘텐츠 비즈니스를 만들어가고 있습니다.
                </p>
              </div>
            </div>
          </div>
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
              <p className="text-gray-600 leading-relaxed mb-4 flex-grow break-keep">
                {service.description}
              </p>
              {service.link && (
                service.internal ? (
                  <Link to={service.link} className="mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                    >
                      {service.linkText}
                    </Button>
                  </Link>
                ) : (
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
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}