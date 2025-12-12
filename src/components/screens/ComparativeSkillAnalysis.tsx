import { useState } from 'react';
import { skillScores, peers } from '@/data/mockData';
import SkillCell from '@/components/SkillCell';
import { Check, X, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import PaywallModal from '@/components/PaywallModal';

const ComparativeSkillAnalysis = () => {
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'agree' | 'disagree' | null>>({});
  const [editCount, setEditCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  const peerNames = peers.map((p) => p.name);

  const handleFeedback = (skillCluster: string, type: 'agree' | 'disagree') => {
    if (feedbackGiven[skillCluster]) {
      // Already given feedback, check if paid
      if (editCount >= 1) {
        setShowPaywall(true);
        return;
      }
    }
    
    setFeedbackGiven((prev) => ({ ...prev, [skillCluster]: type }));
    setEditCount((prev) => prev + 1);
  };

  const strengths = skillScores.filter((s) => s.scores['You'] === 3).map((s) => s.skillCluster);
  const developmentAreas = skillScores.filter((s) => s.scores['You'] === 1).map((s) => s.skillCluster);

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Comparative Skill Analysis</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Analysis across 10 skill clusters (0=low, 3=strong)
        </p>
      </div>

      {/* Heatmap Table */}
      <div className="mb-6 overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Skill Cluster
              </th>
              {peerNames.map((name, index) => (
                <th
                  key={name}
                  className="px-4 py-3 text-center text-sm font-medium text-muted-foreground"
                >
                  {name}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex cursor-help items-center justify-center gap-1">
                      Feedback
                      <Info className="h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      These are AI-estimated scores. You can refine them.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {skillScores.map((skill, rowIndex) => (
              <tr key={skill.skillCluster} className="border-b border-border last:border-0">
                <td className="px-4 py-2 text-sm font-medium text-foreground">
                  {skill.skillCluster}
                </td>
                {peerNames.map((name, colIndex) => (
                  <td key={name} className="p-1">
                    <SkillCell score={skill.scores[name]} isUser={colIndex === 0} />
                  </td>
                ))}
                <td className="px-2 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleFeedback(skill.skillCluster, 'agree')}
                      className={`rounded p-1.5 transition-colors ${
                        feedbackGiven[skill.skillCluster] === 'agree'
                          ? 'bg-success text-success-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-success'
                      }`}
                      title="Agree with this assessment"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleFeedback(skill.skillCluster, 'disagree')}
                      className={`rounded p-1.5 transition-colors ${
                        feedbackGiven[skill.skillCluster] === 'disagree'
                          ? 'bg-destructive text-destructive-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-destructive'
                      }`}
                      title="Disagree with this assessment"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-8 rounded bg-skill-novice" />
          <span className="text-muted-foreground">0 - Novice</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-8 rounded bg-skill-developing" />
          <span className="text-muted-foreground">1 - Developing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-8 rounded bg-skill-proficient" />
          <span className="text-muted-foreground">2 - Proficient</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-8 rounded bg-skill-expert" />
          <span className="text-muted-foreground">3 - Expert</span>
        </div>
      </div>

      {/* Strengths and Development Areas */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <h3 className="font-semibold text-foreground">Your Strengths (Score 3)</h3>
          </div>
          <ul className="space-y-1.5">
            {strengths.length > 0 ? (
              strengths.map((strength) => (
                <li key={strength} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 text-primary">•</span>
                  {strength}
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 text-primary">•</span>
                  Strategy & Vision
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 text-primary">•</span>
                  P&L / Operations Leadership
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 text-primary">•</span>
                  Supply Chain / Logistics Management
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 text-primary">•</span>
                  Business Transformation / SFE
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 text-primary">•</span>
                  Domain — Retail Operations
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 text-primary">•</span>
                  Team Building / People Leadership
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-warning" />
            <h3 className="font-semibold text-foreground">Development Areas (Score 1)</h3>
          </div>
          <ul className="space-y-1.5">
            {developmentAreas.map((area) => (
              <li key={area} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1 text-warning">•</span>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PaywallModal open={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default ComparativeSkillAnalysis;
