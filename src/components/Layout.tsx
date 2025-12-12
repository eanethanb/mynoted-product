import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle2 } from 'lucide-react';
import PaywallModal from './PaywallModal';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [hasRunReport, setHasRunReport] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleRunReport = () => {
    if (hasRunReport) {
      setShowPaywall(true);
      return;
    }
    
    setIsRunning(true);
    // Simulate report generation
    setTimeout(() => {
      setIsRunning(false);
      setHasRunReport(true);
    }, 2000);
  };

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
      
      {/* Pre-run guidance banner */}
      {!hasRunReport && (
        <div className="border-b border-primary/20 bg-primary/5 px-6 py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <p className="text-sm text-foreground">
              <span className="font-medium">Review all sections.</span> You can edit peers, skills, axes, goals, and other signals. 
              When ready, click <span className="font-semibold text-primary">'Run Updated Report'</span> to generate your personalised career intelligence. 
              <span className="ml-1 text-muted-foreground">You can run the report once for free.</span>
            </p>
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
