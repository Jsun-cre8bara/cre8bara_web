import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../app/components/ui/button';
import { FunRunningHero } from '../app/components/funrunning/FunRunningHero';
import { FunRunningAbout } from '../app/components/funrunning/FunRunningAbout';
import { FunRunningAttractions } from '../app/components/funrunning/FunRunningAttractions';
import { FunRunningCourse } from '../app/components/funrunning/FunRunningCourse';
import { FunRunningPartnership } from '../app/components/funrunning/FunRunningPartnership';
import { FunRunningUserExperience } from '../app/components/funrunning/FunRunningUserExperience';
import { FunRunningHealth } from '../app/components/funrunning/FunRunningHealth';
import { FunRunningSuccess } from '../app/components/funrunning/FunRunningSuccess';
import { FunRunningGuide } from '../app/components/funrunning/FunRunningGuide';
import { FunRunningCTA } from '../app/components/funrunning/FunRunningCTA';

export function FunRunningPage() {
  return (
    <div className="pt-16">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              메인으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>

      <FunRunningHero />
      <FunRunningAbout />
      <FunRunningAttractions />
      <FunRunningCourse />
      <FunRunningPartnership />
      <FunRunningUserExperience />
      <FunRunningHealth />
      <FunRunningSuccess />
      <FunRunningGuide />
      <FunRunningCTA />
    </div>
  );
}
