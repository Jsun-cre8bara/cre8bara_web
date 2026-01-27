export function FunRunningCourse() {
  const features = [
    {
      number: '01',
      title: '체력 수준 선택',
      description: '초보자용 5km 코스부터 중급자용 10km 코스까지 다양한 난이도 제공',
    },
    {
      number: '02',
      title: '관심사 기반 추천',
      description: '카페 중심, 문화 탐방, 맛집 투어 등 테마별 코스 자동 매칭',
    },
    {
      number: '03',
      title: '경로 최적화',
      description: '경유 상점과 명소를 효율적으로 연결하는 최단 경로 계산',
    },
    {
      number: '04',
      title: '상세 정보 제공',
      description: '예상 소요 시간, 난이도, 경유지 정보 등 완벽한 코스 가이드',
    },
  ];

  const courses = [
    {
      level: '초급 코스',
      distance: '5km 내외',
      time: '40~50분',
      shops: '3~4곳',
      terrain: '평탄한 도심 코스 위주',
      color: 'green',
    },
    {
      level: '중급 코스',
      distance: '7~8km 내외',
      time: '60~70분',
      shops: '5~6곳',
      terrain: '약간의 경사 포함',
      color: 'teal',
    },
    {
      level: '챌린지 코스',
      distance: '9~10km 내외',
      time: '80~90분',
      shops: '7~8곳',
      terrain: '다양한 지형 체험',
      color: 'orange',
    },
  ];

  return (
    <section id="course" className="py-20 bg-gradient-to-br from-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-6">
          5~10km 코스 설계: 최적의 거리와 경로로 도전과 재미 극대화
        </h2>
        
        <p className="text-gray-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
          펀러닝의 코스는 5km에서 10km 내외의 거리로 설계되어, 러닝을 처음 시작하는 초보자부터 어느 정도 경험이 있는 중급 러너까지 모두가 부담 없이 참여할 수 있습니다. 각 코스는 경유해야 할 상점들과 지역 명소를 자연스럽게 연결하는 최적의 경로로 구성되며, 우리의 스마트 추천 시스템이 사용자의 체력 수준과 관심사에 맞춰 가장 적합한 루트를 제안합니다.
        </p>

        {/* 4단계 프로세스 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {feature.number}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* 코스 타입 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <h3 className={`text-2xl font-bold mb-4 text-${course.color}-600`}>
                {course.level}
              </h3>
              <div className="space-y-3">
                <p className="text-lg"><strong className="text-gray-900">{course.distance}</strong></p>
                <p className="text-gray-600">소요 시간: {course.time}</p>
                <p className="text-gray-600">경유 상점: {course.shops}</p>
                <p className="text-gray-600">{course.terrain}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
