import { competitiveAdvantages, developmentOpportunities, peers } from '@/data/mockData';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const SwotAnalysis = () => {
  const userPeer = peers.find(p => p.isUser);
  const userName = userPeer?.name || 'Betsy Thomas';
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">SWOT vis-à-vis Peers</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Strengths and development areas for {userName} ({userPeer?.title}, {userPeer?.company}) compared to SEO leadership cohort
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
          {userName} ({userPeer?.title}, {userPeer?.company}) has strong foundational skills but lacks critical expertise in several areas. 
          Key gaps include{' '}
          <span className="font-medium text-warning">SEO strategy development</span>,{' '}
          <span className="font-medium text-warning">digital marketing</span>, and{' '}
          <span className="font-medium text-warning">performance incentives</span>. 
          These gaps are significant compared to competitors who possess advanced skills in these areas. 
          To address these gaps, {userName} should prioritize upskilling in SEO strategy development and digital marketing, 
          including digital marketing strategy and Google Analytics. 
          Focusing on these top skills will provide the best return on investment and enhance ability to drive 
          successful campaigns and improve team performance.
        </p>
      </div>
    </div>
  );
};

export default SwotAnalysis;
