import { useState } from 'react';
import { courses, videoResources } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Play, Clock, Eye } from 'lucide-react';

const CustomCourse = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'quiz' | 'flashcards'>('videos');
  const [expandedChapter, setExpandedChapter] = useState('cx-fundamentals');
  const [activeLesson, setActiveLesson] = useState('CX Frameworks');

  const course = courses[0]; // Customer Experience course

  return (
    <div className="animate-fade-in">
      {/* Content Type Tabs */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-lg border border-border bg-card p-1">
          {(['videos', 'quiz', 'flashcards'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
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

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar - Chapter Navigation */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">Leadership Development sample Course</h3>
            <p className="text-sm text-primary">Chapters (3)</p>
          </div>

          <div className="space-y-1">
            {course.chapters?.map((chapter) => (
              <div key={chapter.id}>
                <button
                  onClick={() =>
                    setExpandedChapter(expandedChapter === chapter.id ? '' : chapter.id)
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

        {/* Main Content - Video Grid */}
        <div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {videoResources.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-video bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground transition-transform group-hover:scale-110">
                      <Play className="h-5 w-5" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="line-clamp-2 text-sm font-medium text-foreground">
                    {video.title}
                  </h4>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {video.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCourse;
