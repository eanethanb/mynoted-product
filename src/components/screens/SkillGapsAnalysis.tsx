import { useMemo, useState } from "react";
import { useReportData } from "@/contexts/ReportContext";
import GapBadge from "@/components/GapBadge";
import { ChevronRight, Check, AlertTriangle, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import WaitlistModal from "@/components/WaitlistModal";
import Disclaimer from "@/components/Disclaimer";

type AccuracyType = "accurate" | "partial" | "not-relevant";

interface GapFeedback {
  accuracy: AccuracyType | null;
  notRelevantReasons: string[];
}

const notRelevantOptions = ["Already strong", "Not needed for my role", "Low priority now"];

interface CustomSkillGap {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
}

const SkillGapsAnalysis = () => {
  const { skillGaps: reportSkillGaps } = useReportData();
  const [feedback, setFeedback] = useState<Record<string, GapFeedback>>({});
  const [showWaitlist, setShowWaitlist] = useState(false);

  const skillGapsList = reportSkillGaps;

  // Custom skill gap state
  const [customGaps, setCustomGaps] = useState<CustomSkillGap[]>([]);
  const [addGapCount, setAddGapCount] = useState(0);
  const [showAddGapModal, setShowAddGapModal] = useState(false);
  const [newGapTitle, setNewGapTitle] = useState("");
  const [newGapDescription, setNewGapDescription] = useState("");
  const [newGapPriority, setNewGapPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const handleAccuracyChange = (_gapId: string, _accuracy: AccuracyType) => {
    setShowWaitlist(true);
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

  const handleAddSkillGap = () => {
    setShowWaitlist(true);
  };

  const handleSaveNewGap = () => {
    if (!newGapTitle.trim()) return;

    const newGap: CustomSkillGap = {
      id: `custom-${Date.now()}`,
      title: newGapTitle,
      description: newGapDescription,
      priority: newGapPriority,
    };

    setCustomGaps((prev) => [...prev, newGap]);
    setAddGapCount((prev) => prev + 1);
    setShowAddGapModal(false);
    setNewGapTitle("");
    setNewGapDescription("");
    setNewGapPriority("Medium");
  };

  const getPriorityColor = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "Low":
        return "bg-success/10 text-success border-success/20";
    }
  };

  const top3 = useMemo(() => skillGapsList?.slice?.(0, 3) ?? [], [skillGapsList]);

  return (
    <div className="animate-fade-in">
      <div className="mb-6 text-center md:mb-8">
        <h1 className="text-xl font-semibold text-foreground md:text-2xl">Skill Gaps Analysis</h1>
        <p className="mt-2 text-xs text-muted-foreground md:text-sm">
          Targeted upskilling roadmap for you
        </p>
      </div>

      {/* Priority Gaps Banner */}
      <div className="mb-4 rounded-lg border border-primary/20 bg-accent/30 p-3 md:mb-6 md:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-2 md:gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 md:h-8 md:w-8">
              <AlertTriangle className="h-3 w-3 text-primary md:h-4 md:w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground md:text-base">Top Priority Gaps</h3>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                Critical for role excellence and advancement. These represent the most significant
                development opportunities.
              </p>
              {top3.length > 0 && (
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {top3.map((g: any) => g.title).join(" • ")}
                </p>
              )}
            </div>
          </div>

          <Button onClick={handleAddSkillGap} className="gap-2 whitespace-nowrap w-full sm:w-auto" size="sm">
            <Plus className="h-4 w-4" />
            Add Skill Gap
          </Button>
        </div>

        <p className="mt-3 text-[10px] text-muted-foreground md:text-xs">
          Free: Add + prioritise up to 2 skill gaps. ({2 - addGapCount} remaining)
        </p>
      </div>

      {/* Custom Skill Gaps */}
      {customGaps.length > 0 && (
        <div className="mb-4 space-y-3 md:mb-6 md:space-y-4">
          <h3 className="text-base font-semibold text-foreground md:text-lg">Your Added Skill Gaps</h3>
          {customGaps.map((gap) => (
            <div
              key={gap.id}
              className="rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-sm md:p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground md:text-lg">{gap.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground md:text-sm">{gap.description}</p>
                </div>
                <span
                  className={`self-start rounded-full border px-2 py-0.5 text-[10px] font-medium md:px-3 md:py-1 md:text-xs ${getPriorityColor(
                    gap.priority
                  )}`}
                >
                  {gap.priority} Priority
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skill Gap Cards */}
      <div className="space-y-3 md:space-y-4">
        {skillGapsList.map((gap: any) => (
          <div
            key={gap.id}
            className="rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-sm md:p-5"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-foreground md:text-lg">{gap.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">{gap.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {gap.importance && (
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium md:px-3 md:py-1 md:text-xs ${
                    gap.importance === "Critical"
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : gap.importance === "Important"
                      ? "bg-warning/10 text-warning border-warning/20"
                      : "bg-success/10 text-success border-success/20"
                  }`}>
                    {gap.importance}
                  </span>
                )}
                <GapBadge score={gap.gapScore} />
              </div>
            </div>

            <div className="mt-3 md:mt-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary-dark text-xs md:text-sm"
              >
                {gap.category}
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>

            {/* Competitor Companies */}
            {gap.competitorCompanies && gap.competitorCompanies.length > 0 && gap.competitorCompanies[0] !== "unknown" && (
              <div className="mt-2">
                <span className="inline-flex items-center rounded-md bg-accent px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  Found at: {gap.competitorCompanies.join(", ")}
                </span>
              </div>
            )}

            {/* Accuracy Assessment */}
            <div className="mt-5 border-t border-border pt-4">
              <p className="mb-3 text-sm font-medium text-foreground">How accurate is this assessment?</p>

              <RadioGroup
                value={feedback[gap.id]?.accuracy || ""}
                onValueChange={(value) => handleAccuracyChange(gap.id, value as AccuracyType)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="accurate" id={`${gap.id}-accurate`} />
                  <Label htmlFor={`${gap.id}-accurate`} className="flex cursor-pointer items-center gap-1.5 text-sm">
                    <Check className="h-4 w-4 text-success" />
                    Accurate
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="partial" id={`${gap.id}-partial`} />
                  <Label htmlFor={`${gap.id}-partial`} className="flex cursor-pointer items-center gap-1.5 text-sm">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    Partially accurate
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="not-relevant" id={`${gap.id}-not-relevant`} />
                  <Label htmlFor={`${gap.id}-not-relevant`} className="flex cursor-pointer items-center gap-1.5 text-sm">
                    <X className="h-4 w-4 text-destructive" />
                    Not relevant
                  </Label>
                </div>
              </RadioGroup>

              {feedback[gap.id]?.accuracy === "not-relevant" && (
                <div className="mt-3 rounded-md bg-muted/50 p-3">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Tell us why this isn't relevant:</p>
                  <div className="space-y-2">
                    {notRelevantOptions.map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <Checkbox
                          id={`${gap.id}-${option}`}
                          checked={feedback[gap.id]?.notRelevantReasons?.includes(option)}
                          onCheckedChange={() => handleReasonToggle(gap.id, option)}
                        />
                        <Label htmlFor={`${gap.id}-${option}`} className="cursor-pointer text-sm text-muted-foreground">
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
      <div className="mt-6 md:mt-8">
        <h3 className="mb-3 text-base font-semibold text-foreground md:mb-4 md:text-lg">
          Expected Timeline & Impact
        </h3>

        <div className="grid gap-3 md:gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-3 text-center md:p-5">
            <div className="text-xl font-bold text-primary md:text-2xl">90 Days</div>
            <p className="mt-1.5 text-xs text-muted-foreground md:mt-2 md:text-sm">
              Early progress and quick wins from addressing priority gaps.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-3 text-center md:p-5">
            <div className="text-xl font-bold text-success md:text-2xl">180 Days</div>
            <p className="mt-1.5 text-xs text-muted-foreground md:mt-2 md:text-sm">
              Stronger role performance and measurable lift in the weakest areas.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-3 text-center md:p-5">
            <div className="text-xl font-bold text-destructive md:text-2xl">12 Months</div>
            <p className="mt-1.5 text-xs text-muted-foreground md:mt-2 md:text-sm">
              Consolidated leadership profile and readiness for higher scale.
            </p>
          </div>
        </div>
      </div>

      <Disclaimer />

      {/* Add Skill Gap Modal */}
      <Dialog open={showAddGapModal} onOpenChange={setShowAddGapModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Skill Gap</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="gapTitle">Skill Gap Title</Label>
              <Input
                id="gapTitle"
                placeholder="e.g., Financial Modeling"
                value={newGapTitle}
                onChange={(e) => setNewGapTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gapDescription">Description</Label>
              <Textarea
                id="gapDescription"
                placeholder="Describe why this skill gap is important..."
                value={newGapDescription}
                onChange={(e) => setNewGapDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Priority Level</Label>
              <Select
                value={newGapPriority}
                onValueChange={(v) => setNewGapPriority(v as "High" | "Medium" | "Low")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High Priority</SelectItem>
                  <SelectItem value="Medium">Medium Priority</SelectItem>
                  <SelectItem value="Low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddGapModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewGap} disabled={!newGapTitle.trim()}>
              Add Skill Gap
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <WaitlistModal open={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </div>
  );
};

export default SkillGapsAnalysis;
