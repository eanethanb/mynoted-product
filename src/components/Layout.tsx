import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle2, Info, Check } from 'lucide-react';
import PaywallModal from './PaywallModal';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  activeTab?: string;
  visitedTabs?: string[];
  reportVersion?: number | null;
}

const sectionLabels: Record<string, string> = {
  peers: 'Peer Profiles',
  comparative: 'Comparative Skill Analysis',
  mapping: 'Skill Mapping',
  gaps: 'Skill Gaps Analysis',
  courses: 'Recommended Courses',
  create: 'Create Free Course',
};

const Layout = ({ children, activeTab, visitedTabs = [], reportVersion }: LayoutProps) => {
  const [hasRunReport, setHasRunReport] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleRunReport = () => {
    if (hasRunReport) {
      setShowPaywall(true);
      return;
    }
    
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRunReport(true);
    }, 2000);
  };

  const sections = ['peers', 'comparative', 'mapping', 'gaps', 'courses', 'create'];
  const allSectionsVisited = sections.every(section => visitedTabs.includes(section));
  const isRunButtonEnabled = allSectionsVisited;

  return (
    <div className="min-h-screen bg-background font-poppins">
      <header className="border-b border-border bg-card px-4 py-3 md:px-6 md:py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-base font-semibold text-foreground md:text-lg">MyNoted AI</span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              v{reportVersion ?? '—'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">Career Intelligence Workspace</span>
          </div>
        </div>
      </header>
      
      {/* Pre-run guidance banner with section chips */}
      {!hasRunReport && (
        <div className="border-b border-primary/20 bg-primary/5 px-4 py-3 md:px-6 md:py-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-start gap-2 md:gap-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground md:text-base">Review your report carefully</h3>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  You can make edits across all sections. You get 1 free AI re-run after reviewing everything.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5 md:mt-3 md:gap-2">
                  {sections.map((section) => {
                    const isVisited = visitedTabs.includes(section);
                    return (
                      <span
                        key={section}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors md:gap-1.5 md:px-3 md:py-1 md:text-xs ${
                          isVisited
                            ? 'bg-green-100 text-green-700'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {isVisited && <Check className="h-2.5 w-2.5 md:h-3 md:w-3" />}
                        <span className="truncate">{sectionLabels[section]}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Post-run success banner */}
      {hasRunReport && (
        <div className="border-b border-green-200 bg-green-50 px-4 py-2 md:px-6 md:py-3">
          <div className="mx-auto flex max-w-7xl items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
            <p className="text-xs text-green-800 md:text-sm">
              Your report has been generated. To run again with new edits, upgrade to MyNoted Pro.
            </p>
          </div>
        </div>
      )}
      
      <main className="mx-auto max-w-7xl px-4 py-4 pb-28 md:px-6 md:py-6 md:pb-24">
        {children}
      </main>
      
      {/* Persistent Run Report Button */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card px-4 py-3 shadow-lg md:px-6 md:py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground md:text-sm">
            {!hasRunReport 
              ? (isRunButtonEnabled 
                  ? "All sections reviewed! Click to generate your personalised career intelligence."
                  : "Visit all sections to enable the AI report generation.")
              : "Report generated. Upgrade to run unlimited updates."
            }
          </div>
          <Button 
            onClick={handleRunReport}
            disabled={isRunning || (!isRunButtonEnabled && !hasRunReport)}
            className={cn(
              "gap-2 w-full sm:w-auto",
              !isRunButtonEnabled && !hasRunReport && "opacity-50 cursor-not-allowed"
            )}
            variant={hasRunReport ? "outline" : "default"}
          >
            <Play className="h-4 w-4" />
            {isRunning ? "Running..." : "Run Updated Report"}
          </Button>
        </div>
      </div>
      
      <PaywallModal open={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default Layout;
