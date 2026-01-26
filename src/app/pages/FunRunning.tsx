import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function FunRunning() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 바 */}
      <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">메인으로 돌아가기</span>
          </button>
        </div>
      </div>

      {/* 펀러닝 콘텐츠 iframe */}
      <div className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-4">Run & Tourism Contents</h1>
            <p className="text-lg text-gray-600">
              달리면, 도시가 콘텐츠가 됩니다. 러닝을 이벤트가 아닌 여행으로, 
              지역을 무대 삼은 러닝 × 관광 × 축제 콘텐츠로 사람과 도시를 연결합니다.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
            <iframe
              src="https://funrunning-8y2jvuh.gamma.site/"
              title="Fun Running Contents"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
