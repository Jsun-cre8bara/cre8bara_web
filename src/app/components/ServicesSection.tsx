import { Sparkles, Music, Route, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

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

const aboutParagraphs = [
  `Cre8BARA의 대표 프로젝트인 ‘홈쇼핑주식회사’는
Shop on the Stage 를 컨셉으로한  ‘퍼포밍 커머스(Performing Commerce )’ 새로운 콘텐츠 포맷으로, 공연·라이브커머스·관광 소비를 결합한 K-콘텐츠형 커머스 공연 플랫폼입니다.
무대 위 스토리텔링과 퍼포먼스로 상품과 문화를 ‘경험’하게 만들고, 해외 관광객 및 글로벌 마켓을 타깃으로 한 수출형 공연 모델로 확장하고 있습니다.`,
  `또한 ‘잇츠 런(It’s Run)’은 펀 러닝(Fun Running) 콘텐츠로,
지역 상점·로컬 브랜드와 연계한 미션형 러닝을 통해 참여형 관광 경험을 제공하며, 지역 소비경제 활성화를 견인하는 로컬 체험·관광 콘텐츠입니다.`,
  `이렇게 공연·이벤트 운영 과정에서 축적되는 이용자 구매·참여 데이터는 자체 데이터 서비스 ‘티켓츠(tCATS)’로 연결됩니다.
티켓츠는 공연·이벤트 참여 데이터를 기반으로 고객 세그먼트 분석, 리텐션 중심 CRM, 타겟 마케팅 인사이트를 제공하는 공연·이벤트 특화 데이터베이스 플랫폼입니다.`,
  `Cre8BARA는 콘텐츠의 감성(Story/Experience)과 데이터의 힘(Insight/Performance)을 결합해,
공연을 넘어 관광·커머스·플랫폼으로 확장되는 지속가능한 콘텐츠 비즈니스를 구축하고 있습니다.`,
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Company intro card (recommended: soft lavender/rose gradient) */}
          <div className="mx-auto max-w-5xl rounded-2xl shadow-md border border-black/5 bg-gradient-to-br from-fuchsia-50 via-rose-50 to-purple-50 px-5 sm:px-10 py-10">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 px-2">
              <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/70 text-orange-600 shadow-sm shrink-0">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="min-w-0 text-3xl sm:text-4xl leading-tight text-center text-balance">
                <span>About</span>
                <br className="sm:hidden" />
                <span className="sm:ml-2">크리에이트바라</span>
              </h2>
              <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/70 text-orange-600 shadow-sm shrink-0">
                <Sparkles className="w-5 h-5" />
              </span>
            </div>

            <div className="h-1 w-16 bg-orange-500/70 rounded-full mx-auto mb-8" />

            {/* Mobile: scroll box / Desktop: full copy */}
            <div className="rounded-xl bg-white/60 backdrop-blur-sm border border-black/5 shadow-sm px-4 sm:px-8 py-6 text-gray-800">
              <div className="max-h-[420px] overflow-y-auto md:max-h-none md:overflow-visible pr-2 md:pr-0 text-[14px] sm:text-[15px] md:text-base leading-7 md:leading-8 space-y-6 text-left break-keep">
                {aboutParagraphs.map((p, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
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