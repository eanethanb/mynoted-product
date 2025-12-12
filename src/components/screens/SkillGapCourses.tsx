import { useState } from 'react';
import { courses } from '@/data/mockData';
import GapBadge from '@/components/GapBadge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import PaywallModal from '@/components/PaywallModal';
import Disclaimer from '@/components/Disclaimer';

const SkillGapCourses = () => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const handleRefinePath = () => {
    setShowPaywall(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Your Skill Gap Courses</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Structured learning paths with levels, outcomes, and success metrics
        </p>
      </div>

      {/* Refinement Banner */}
      <div className="mb-6 flex items-center justify-between rounded-lg border border-primary/20 bg-accent/30 p-4">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            Your learning path is based on AI + your inputs. Want a refined personalised course plan?
          </p>
        </div>
        <Button onClick={handleRefinePath} size="sm">
          Refine My Learning Path
        </Button>
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-lg border border-border bg-card transition-shadow hover:shadow-sm"
          >
            <button
              onClick={() => toggleCourse(course.id)}
              className="flex w-full items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">{course.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Total duration: {course.duration}
                    </span>
                    <span>•</span>
                    <span>{course.levels} progressive levels</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GapBadge score={course.gapScore} />
                {expandedCourse === course.id ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {expandedCourse === course.id && course.chapters && (
              <div className="border-t border-border px-4 py-3">
                <div className="space-y-2">
                  {course.chapters.map((chapter, index) => (
                    <div key={chapter.id}>
                      <button className="flex w-full items-center justify-between py-2 text-left">
                        <span className="font-medium text-primary">{chapter.title}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {chapter.lessons.length > 0 && (
                        <div className="ml-4 space-y-1 border-l-2 border-primary/20 pl-3">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="py-1 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {lesson}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Disclaimer />

      <PaywallModal open={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default SkillGapCourses;
