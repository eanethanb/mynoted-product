import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Target, Briefcase, Lock } from 'lucide-react';
import { experienceSignals, goalChips } from '@/data/mockData';
import PaywallModal from '@/components/PaywallModal';

const PaidFeatures = () => {
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleFeatureClick = () => {
    setShowPaywall(true);
  };

  const toggleSignal = (signal: string) => {
    setSelectedSignals((prev) =>
      prev.includes(signal) ? prev.filter((s) => s !== signal) : [...prev, signal]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Resume Upload Section */}
      <div className="relative overflow-hidden rounded-lg border border-border bg-card p-6">
        <div className="absolute inset-0 bg-card/80 backdrop-blur-sm" />
        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Resume / LinkedIn PDF Upload</h3>
              <p className="text-sm text-muted-foreground">
                Refine your report with your resume signals.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drop your resume or LinkedIn PDF here
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleFeatureClick}>
              <Lock className="mr-2 h-4 w-4" />
              Unlock Upload
            </Button>
          </div>
        </div>
      </div>

      {/* Experience Signals Section */}
      <div className="relative overflow-hidden rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Add Experience Signals</h3>
            <p className="text-sm text-muted-foreground">
              Select experiences that reflect your career achievements.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {experienceSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-2">
              <Checkbox
                id={signal}
                checked={selectedSignals.includes(signal)}
                onCheckedChange={() => toggleSignal(signal)}
                disabled
              />
              <Label
                htmlFor={signal}
                className="cursor-not-allowed text-sm text-muted-foreground opacity-60"
              >
                {signal}
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleFeatureClick} variant="outline">
            <Lock className="mr-2 h-4 w-4" />
            Unlock Signals
          </Button>
        </div>
      </div>

      {/* Future Goals Section */}
      <div className="relative overflow-hidden rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Define Future Goals</h3>
            <p className="text-sm text-muted-foreground">
              Set your career aspirations to personalize recommendations.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {goalChips.map((goal) => (
            <button
              key={goal}
              onClick={() => toggleGoal(goal)}
              disabled
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                selectedGoals.includes(goal)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground opacity-60'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleFeatureClick} variant="outline">
            <Lock className="mr-2 h-4 w-4" />
            Unlock Goals
          </Button>
        </div>
      </div>

      <PaywallModal open={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default PaidFeatures;
