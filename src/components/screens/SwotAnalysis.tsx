import { useReportData } from "@/contexts/ReportContext";
import { CheckCircle, AlertTriangle } from 'lucide-react';
import Disclaimer from '@/components/Disclaimer';

const SwotAnalysis = () => {
  const { competitiveAdvantages, developmentOpportunities, executiveSummary, meta } = useReportData();
  const targetName = (meta?.targetPerson ?? "You").split("(")[0].trim();

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">SWOT vis-à-vis Peers</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Strengths and development areas for {targetName}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Competitive Advantages (Pros) */}
        <div className="rounded-lg border-2 border-success/30 bg-success/5 p-5">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <h3 className="text-lg font-semibold text-foreground">Competitive Advantages</h3>
          </div>
          <div className="space-y-4">
            {competitiveAdvantages.map((item, index) => (
              <div key={index}>
                <div className="flex items-start gap-2">
                  <span className="mt-1 text-primary">●</span>
                  <div>
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Opportunities (Cons) */}
        <div className="rounded-lg border-2 border-warning/30 bg-warning/5 p-5">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Development Opportunities</h3>
          </div>
          <div className="space-y-4">
            {developmentOpportunities.map((item, index) => (
              <div key={index}>
                <div className="flex items-start gap-2">
                  <span className="mt-1 text-destructive">●</span>
                  <div>
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mt-8 rounded-lg border border-border bg-card p-5 md:p-6">
        <h3 className="mb-3 text-base font-semibold text-foreground">Executive Summary</h3>
        <div className="text-sm leading-relaxed text-muted-foreground space-y-3">
          {String(executiveSummary).split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      <Disclaimer />
    </div>
  );
};

export default SwotAnalysis;
