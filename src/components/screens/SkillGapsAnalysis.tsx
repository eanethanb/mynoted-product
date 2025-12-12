import { useState } from 'react';
import { skillGaps } from '@/data/mockData';
import GapBadge from '@/components/GapBadge';
import { ChevronRight, Check, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type AccuracyType = 'accurate' | 'partial' | 'not-relevant';

interface GapFeedback {
  accuracy: AccuracyType | null;
  notRelevantReasons: string[];
}

const notRelevantOptions = [
  'I already have this skill',
  'Not needed for my role',
  'Low priority now',
];

const SkillGapsAnalysis = () => {
  const [feedback, setFeedback] = useState<Record<string, GapFeedback>>({});

  const handleAccuracyChange = (gapId: string, accuracy: AccuracyType) => {
    setFeedback((prev) => ({
      ...prev,
      [gapId]: { ...prev[gapId], accuracy, notRelevantReasons: [] },
    }));
  };

  const handleReasonToggle = (gapId: string, reason: string) => {
    setFeedback((prev) => {
      const current = prev[gapId]?.notRelevantReasons || [];
      const updated = current.includes(reason)
        ? current.filter((r) => r !== reason)
        : [...current, reason];
      return {
        ...prev,
        [gapId]: { ...prev[gapId], notRelevantReasons: updated },
      };
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Skill Gaps Analysis</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Targeted upskilling roadmap for you
        </p>
      </div>

      {/* Priority Gaps Banner */}
      <div className="mb-6 rounded-lg border border-primary/20 bg-accent/30 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <AlertTriangle className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Top 3 Priority Gaps</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Critical for COO role excellence and advancement. These three gaps (all at score 1, vs. peer maximum of 3) represent the most significant development opportunities for operational leadership effectiveness. Expected time-to-impact: 6-12 months with targeted interventions.
            </p>
          </div>
        </div>
      </div>

      {/* Skill Gap Cards */}
      <div className="space-y-4">
        {skillGaps.map((gap) => (
          <div
            key={gap.id}
            className="rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{gap.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{gap.description}</p>
              </div>
              <GapBadge score={gap.gapScore} />
            </div>

            <div className="mt-4">
              <Button variant="outline" size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary-dark">
                {gap.category}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-foreground">ACTION ITEMS:</h4>
              <ul className="mt-2 space-y-1.5">
                {gap.actionItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-0.5 text-primary">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Accuracy Assessment */}
            <div className="mt-5 border-t border-border pt-4">
              <p className="mb-3 text-sm font-medium text-foreground">
                How accurate is this assessment?
              </p>
              <RadioGroup
                value={feedback[gap.id]?.accuracy || ''}
                onValueChange={(value) => handleAccuracyChange(gap.id, value as AccuracyType)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="accurate" id={`${gap.id}-accurate`} />
                  <Label
                    htmlFor={`${gap.id}-accurate`}
                    className="flex cursor-pointer items-center gap-1.5 text-sm"
                  >
                    <Check className="h-4 w-4 text-success" />
                    Accurate
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="partial" id={`${gap.id}-partial`} />
                  <Label
                    htmlFor={`${gap.id}-partial`}
                    className="flex cursor-pointer items-center gap-1.5 text-sm"
                  >
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    Partially accurate
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="not-relevant" id={`${gap.id}-not-relevant`} />
                  <Label
                    htmlFor={`${gap.id}-not-relevant`}
                    className="flex cursor-pointer items-center gap-1.5 text-sm"
                  >
                    <X className="h-4 w-4 text-destructive" />
                    Not relevant
                  </Label>
                </div>
              </RadioGroup>

              {/* Not Relevant Reasons */}
              {feedback[gap.id]?.accuracy === 'not-relevant' && (
                <div className="mt-3 rounded-md bg-muted/50 p-3">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Tell us why this isn't relevant:
                  </p>
                  <div className="space-y-2">
                    {notRelevantOptions.map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <Checkbox
                          id={`${gap.id}-${option}`}
                          checked={feedback[gap.id]?.notRelevantReasons?.includes(option)}
                          onCheckedChange={() => handleReasonToggle(gap.id, option)}
                        />
                        <Label
                          htmlFor={`${gap.id}-${option}`}
                          className="cursor-pointer text-sm text-muted-foreground"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Expected Timeline & Impact</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5 text-center">
            <div className="text-2xl font-bold text-primary">90 Days</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Insurance pilot launched, first PRD shipped, investor deck v1.0
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 text-center">
            <div className="text-2xl font-bold text-success">180 Days</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Insurance score +1.5, product ownership proven, board materials standardized
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 text-center">
            <div className="text-2xl font-bold text-destructive">12 Months</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Complete COO profile, quadrant position (6, 9), ready for larger scale operational leadership role
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapsAnalysis;
