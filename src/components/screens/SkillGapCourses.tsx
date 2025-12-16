import { useState } from 'react';
import { courses, videoResources, courseLink } from '@/data/mockData';
import GapBadge from '@/components/GapBadge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, BookOpen, Clock, Sparkles, Play, Eye, ArrowLeft, ExternalLink } from 'lucide-react';
import PaywallModal from '@/components/PaywallModal';
import Disclaimer from '@/components/Disclaimer';

const SkillGapCourses = () => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'videos' | 'quiz' | 'flashcards'>('videos');
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const openCourseDetail = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    setActiveCourse(courseId);
    if (course?.chapters?.[0]) {
      setExpandedChapter(course.chapters[0].id);
      if (course.chapters[0].lessons[0]) {
        setActiveLesson(course.chapters[0].lessons[0]);
      }
    }
  };

  const handleRefinePath = () => {
    setShowPaywall(true);
  };

  const currentCourse = courses.find(c => c.id === activeCourse);

  // Detailed course view with Videos/Quiz/Flashcards
  if (activeCourse && currentCourse) {
    return (
      <div className="animate-fade-in">
        {/* Back button */}
        <button
          onClick={() => setActiveCourse(null)}
          className="mb-4 flex items-center gap-2 text-xs text-primary hover:underline md:text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
          Back to courses
        </button>

        {/* Course Title */}
        <h1 className="mb-4 text-center text-lg font-semibold text-primary md:mb-6 md:text-2xl">
          {currentCourse.title}
        </h1>

        {/* Content Type Tabs */}
        <div className="mb-4 flex justify-center md:mb-6">
          <div className="inline-flex rounded-lg border border-border bg-card p-1">
            {(['videos', 'quiz', 'flashcards'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors md:px-6 md:py-2 md:text-sm ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar - Chapter Navigation */}
          <div className="rounded-lg border border-border bg-card p-3 md:p-4">
            <div className="mb-3 md:mb-4">
              <h3 className="text-sm font-semibold text-foreground md:text-base">{currentCourse.title}</h3>
              <p className="text-xs text-primary md:text-sm">Chapters ({currentCourse.chapters?.length || 0})</p>
            </div>

            <div className="space-y-1">
              {currentCourse.chapters?.map((chapter) => (
                <div key={chapter.id}>
                  <button
                    onClick={() =>
                      setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)
                    }
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                  >
                    <span
                      className={`font-medium ${
                        expandedChapter === chapter.id ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {chapter.title}
                    </span>
                    {expandedChapter === chapter.id ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>

                  {expandedChapter === chapter.id && chapter.lessons.length > 0 && (
                    <div className="ml-2 space-y-0.5 border-l-2 border-primary pl-3">
                      {chapter.lessons.map((lesson) => (
                        <button
                          key={lesson}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full rounded-md px-2 py-1.5 text-left text-sm ${
                            activeLesson === lesson
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {lesson}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            {activeTab === 'videos' && (
              <div className="grid gap-3 grid-cols-2 md:gap-4 lg:grid-cols-4">
                {videoResources.map((video) => (
                  <div
                    key={video.id}
                    className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/90 text-primary-foreground transition-transform group-hover:scale-110 md:h-12 md:w-12">
                          <Play className="h-3.5 w-3.5 md:h-5 md:w-5" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-2 md:p-3">
                      <h4 className="line-clamp-2 text-xs font-medium text-foreground md:text-sm">
                        {video.title}
                      </h4>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground md:mt-2 md:gap-3 md:text-xs">
                        <span className="flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5 md:h-3 md:w-3" />
                          {video.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-2.5 w-2.5 md:h-3 md:w-3" />
                          {video.views}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-border bg-card">
                <div className="text-center">
                  <p className="text-lg font-medium text-foreground">Quiz Coming Soon</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Test your knowledge with interactive quizzes
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'flashcards' && (
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-border bg-card">
                <div className="text-center">
                  <p className="text-lg font-medium text-foreground">FlashCards Coming Soon</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Reinforce your learning with flashcards
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Disclaimer />
        <PaywallModal open={showPaywall} onClose={() => setShowPaywall(false)} />
      </div>
    );
  }

  // Course listing view
  return (
    <div className="animate-fade-in">
      <div className="mb-6 text-center md:mb-8">
        <h1 className="text-xl font-semibold text-foreground md:text-2xl">Your Skill Gap Courses</h1>
        <p className="mt-2 text-xs text-muted-foreground md:text-sm">
          Structured learning paths for Betsy Thomas (SEO Specialist, Global Media Insight)
        </p>
      </div>

      {/* Course Link Banner */}
      <div className="mb-4 rounded-xl border-2 border-primary bg-gradient-to-r from-primary/10 via-primary/5 to-accent/30 p-4 md:mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground md:text-base">Access Your Full Course</h3>
              <p className="text-xs text-muted-foreground">Start your personalised learning journey now</p>
            </div>
          </div>
          <Button 
            asChild
            className="w-full gap-2 bg-primary hover:bg-primary/90 sm:w-auto"
          >
            <a href={courseLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Go to My Course
            </a>
          </Button>
        </div>
      </div>

      {/* Refinement Banner */}
      <div className="mb-4 flex flex-col gap-3 rounded-lg border border-primary/20 bg-accent/30 p-3 sm:flex-row sm:items-center sm:justify-between md:mb-6 md:p-4">
        <div className="flex items-center gap-2 md:gap-3">
          <Sparkles className="h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />
          <p className="text-xs text-muted-foreground md:text-sm">
            Your learning path is based on AI + your inputs. Want a refined personalised course plan?
          </p>
        </div>
        <Button onClick={handleRefinePath} size="sm" className="w-full sm:w-auto">
          Refine My Learning Path
        </Button>
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`rounded-lg border bg-card transition-all ${
              expandedCourse === course.id 
                ? 'border-primary shadow-sm' 
                : 'border-border hover:shadow-sm'
            }`}
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
                  {course.chapters.map((chapter) => (
                    <div key={chapter.id}>
                      <button 
                        onClick={() => openCourseDetail(course.id)}
                        className="flex w-full items-center justify-between py-2 text-left hover:bg-muted/50 rounded-md px-2 transition-colors"
                      >
                        <span className="font-medium text-primary">{chapter.title}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {chapter.lessons.length > 0 && (
                        <div className="ml-4 space-y-1 border-l-2 border-primary/20 pl-3">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              onClick={() => openCourseDetail(course.id)}
                              className="cursor-pointer py-1 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {lesson}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Start Learning Button */}
                <div className="mt-4 border-t border-border pt-4">
                  <Button 
                    onClick={() => openCourseDetail(course.id)}
                    className="w-full"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Learning
                  </Button>
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
