import { competitiveAdvantages, developmentOpportunities } from '@/data/mockData';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const SwotAnalysis = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">SWOT vis-à-vis Peers</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Strengths and development areas compared to fintech leadership cohort
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Competitive Advantages */}
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

        {/* Development Opportunities */}
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

      {/* Strategic Position Summary */}
      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <h3 className="mb-3 text-lg font-semibold text-foreground">Strategic Position Summary</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your profile represents a{' '}
          <span className="font-medium text-primary">world-class operational leader</span> with
          exceptional P&L management and process excellence capabilities. To achieve elite COO
          positioning in modern retail, the path forward requires strengthening{' '}
          <span className="font-medium text-success">customer experience depth</span>,{' '}
          <span className="font-medium text-success">digital transformation capabilities</span>, and{' '}
          <span className="font-medium text-success">partnership management fluency</span> — all
          achievable through focused 6-12 month development initiatives. With these enhancements,
          you would establish yourself in the top tier of retail COOs, combining operational mastery
          with customer-centric and technology-forward leadership.
        </p>
      </div>
    </div>
  );
};

export default SwotAnalysis;
