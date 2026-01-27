export function FunRunningSuccess() {
  const successStories = [
    {
      icon: '📍',
      title: '경기도 연천 푸르내마을',
      description: '농촌 체험 프로그램과 펀러닝 미션을 결합한 특별 코스를 개발하여, 주말 방문객이 전년 대비 45% 증가했습니다. 마을 주민들이 직접 운영하는 농산물 직판장과 체험 공방이 미션 경유지로 지정되면서, 지역 경제 활성화와 함께 도농 교류의 새로운 모델을 만들어냈습니다.',
    },
    {
      icon: '📚',
      title: '서울 인왕산 초소책방',
      description: '인왕산 둘레길 러닝 코스의 주요 경유지로 선정된 후, 북카페 방문객이 30% 증가하는 놀라운 성과를 거뒀습니다. 특히 20~30대 젊은 층의 신규 고객 유입이 두드러졌으며, "달리다 들른 책방이 이제 단골 카페가 되었다"는 후기가 이어지고 있습니다.',
    },
    {
      icon: '🏃',
      title: '지역 상권 활성화',
      description: '펀러닝 제휴 상점들의 평균 매출이 15~25% 상승하는 효과가 나타났습니다. 특히 오전 시간대와 주말의 고객 유입이 크게 늘었으며, 펀러닝을 통해 처음 방문한 고객의 약 60%가 재방문하는 높은 충성도를 보였습니다. 지역 주민들도 새로운 상점을 발견하는 계기가 되었다는 반응입니다.',
    },
  ];

  const stats = [
    { number: '45%', label: '방문객 증가', description: '연천 푸르내마을 주말 방문객 증가율' },
    { number: '30%', label: '북카페 성장', description: '인왕산 초소책방 방문객 증가율' },
    { number: '15~25%', label: '매출 향상', description: '제휴 상점 평균 매출 증가율' },
    { number: '60%', label: '재방문률', description: '펀러닝을 통해 처음 방문한 고객의 재방문 비율' },
  ];

  return (
    <section id="success-stories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-6">
          성공 사례: 펀러닝으로 변화한 지역과 사람들
        </h2>
        
        <p className="text-gray-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
          펀러닝은 이미 여러 지역에서 주민들과 상점주, 그리고 러너들 모두에게 긍정적인 변화를 만들어내고 있습니다. 실제 사례들을 통해 펀러닝이 가져온 놀라운 변화를 확인해보세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {successStories.map((story, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-5xl mb-4 text-center">{story.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-center">{story.title}</h3>
              <p className="text-gray-600 leading-relaxed">{story.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-green-50 p-8 rounded-lg mb-12">
          <p className="text-lg text-gray-700 italic text-center">
            "펀러닝 덕분에 우리 동네 숨은 맛집과 카페들을 많이 알게 되었어요. 달리기도 하고 새로운 곳도 발견하고, 일석이조죠!"{' '}
            <strong className="text-green-600">- 펀러닝 참여자 김OO</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
              <h4 className="text-lg font-bold mb-2">{stat.label}</h4>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
