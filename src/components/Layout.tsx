import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle2, Info, Check } from 'lucide-react';
import PaywallModal from './PaywallModal';

interface LayoutProps {
  children: ReactNode;
  activeTab?: string;
  visitedTabs?: string[];
}

const sectionLabels: Record<string, string> = {
  peers: 'Peer Profiles',
  comparative: 'Comparative Skill Analysis',
  mapping: 'Skill Mapping',
  gaps: 'Skill Gaps Analysis',
  swot: 'SWOT Analysis',
  courses: 'Skill Gap Courses',
};

const Layout = ({ children, activeTab, visitedTabs = [] }: LayoutProps) => {
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

  const sections = ['peers', 'comparative', 'mapping', 'gaps', 'swot', 'courses'];

  return (
    <div className="min-h-screen bg-background font-poppins">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-lg font-semibold text-foreground">MyNoted AI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Career Intelligence Workspace</span>
          </div>
        </div>
      </header>
      
      {/* Pre-run guidance banner with section chips */}
      {!hasRunReport && (
        <div className="border-b border-primary/20 bg-primary/5 px-6 py-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 text-primary" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Review your report carefully</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  You can make edits across all sections. You get 1 free AI re-run after reviewing everything.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sections.map((section) => {
                    const isVisited = visitedTabs.includes(section);
                    return (
                      <span
                        key={section}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                          isVisited
                            ? 'bg-green-100 text-green-700'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {isVisited && <Check className="h-3 w-3" />}
                        {sectionLabels[section]}
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
        <div className="border-b border-green-200 bg-green-50 px-6 py-3">
          <div className="mx-auto flex max-w-7xl items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <p className="text-sm text-green-800">
              Your report has been generated. To run again with new edits, upgrade to MyNoted Pro.
            </p>
          </div>
        </div>
      )}
      
      <main className="mx-auto max-w-7xl px-6 py-6 pb-24">
        {children}
      </main>
      
      {/* Persistent Run Report Button */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card px-6 py-4 shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {!hasRunReport 
              ? "Make your edits, then run the report to see updated results."
              : "Report generated. Upgrade to run unlimited updates."
            }
          </div>
          <Button 
            onClick={handleRunReport}
            disabled={isRunning}
            className="gap-2"
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
