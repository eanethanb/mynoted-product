// src/components/screens/ComparativeSkillAnalysis.tsx
import { useMemo, useState } from "react";
import { useReportData } from "@/contexts/ReportContext";
import SkillCell from "@/components/SkillCell";
import { Check, X, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import PaywallModal from "@/components/PaywallModal";
import Disclaimer from "@/components/Disclaimer";

type FeedbackType = "agree" | "disagree";

type SkillScoreRow = {
  skillCluster: string;
  scores: Record<string, number>;
};

type Peer = {
  id: string;
  name: string;
  title?: string;
  company?: string;
  isUser?: boolean;
};

const ComparativeSkillAnalysis = () => {
  const { peers: reportPeers, skillScores: reportSkillScores } = useReportData();
  const [feedbackGiven, setFeedbackGiven] = useState<
    Record<string, FeedbackType | null>
  >({});
  const [editCount, setEditCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  const peerList = reportPeers as Peer[];
  const skillScoreList = reportSkillScores as SkillScoreRow[];

  const userPeer: Peer | undefined =
    useMemo(() => peerList.find((p) => p.isUser) ?? peerList[0], [peerList]) ??
    undefined;

  const userName = userPeer?.name || "You";

  const peerNames = useMemo(
    () => peerList.map((p) => p.name),
    [peerList],
  );

  const handleFeedback = (skillCluster: string, type: FeedbackType) => {
    if (feedbackGiven[skillCluster]) {
      if (editCount >= 1) {
        setShowPaywall(true);
        return;
      }
    }

    setFeedbackGiven((prev) => ({ ...prev, [skillCluster]: type }));
    setEditCount((prev) => prev + 1);
  };

  const strengths = useMemo(
    () =>
      skillScoreList
        .filter((s) => s.scores?.[userName] === 3)
        .map((s) => s.skillCluster),
    [skillScoreList, userName],
  );

  const developmentAreas = useMemo(
    () =>
      skillScoreList
        .filter((s) => s.scores?.[userName] <= 1)
        .map((s) => s.skillCluster),
    [skillScoreList, userName],
  );


  return (
    <div className="animate-fade-in">
      <div className="mb-6 text-center md:mb-8">
        <h1 className="text-xl font-semibold text-foreground md:text-2xl">
          Comparative Skill Analysis
        </h1>
        <p className="mt-2 text-xs text-muted-foreground md:text-sm">
          {userName.split("(")[0].trim()} · {skillScoreList.length} skill clusters · Score 0–3
        </p>
      </div>

      {/* Heatmap Table */}
      <div className="mb-6 -mx-4 overflow-x-auto rounded-lg border border-border bg-card px-4 md:mx-0 md:px-0">
        {skillScoreList.length === 0 || peerNames.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            Once we have more peer skill data for this report, we&apos;ll show a
            comparative heatmap here.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Skill Cluster
                </th>
                {peerNames.map((name) => {
                  const shortName = name.split("(")[0].trim();
                  const peer = peerList.find((p) => p.name === name);
                  return (
                    <th
                      key={name}
                      className="px-2 py-3 text-center text-[11px] font-medium text-muted-foreground max-w-[120px]"
                    >
                      <div className="truncate">{shortName}</div>
                      {peer?.company && (
                        <div className="truncate text-[10px] font-normal opacity-60">{peer.company}</div>
                      )}
                    </th>
                  );
                })}
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
              {skillScoreList.map((skill) => (
                <tr
                  key={skill.skillCluster}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-2 text-sm font-medium text-foreground">
                    {skill.skillCluster}
                  </td>
                  {peerNames.map((name, colIndex) => (
                    <td key={name} className="p-1">
                      <SkillCell
                        score={skill.scores?.[name]}
                        isUser={peerList[colIndex]?.isUser}
                      />
                    </td>
                  ))}
                  <td className="px-2 py-2">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleFeedback(skill.skillCluster, "agree")}
                        className={`rounded p-1.5 transition-colors ${
                          feedbackGiven[skill.skillCluster] === "agree"
                            ? "bg-success text-success-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-success"
                        }`}
                        title="Agree with this assessment"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleFeedback(skill.skillCluster, "disagree")
                        }
                        className={`rounded p-1.5 transition-colors ${
                          feedbackGiven[skill.skillCluster] === "disagree"
                            ? "bg-destructive text-destructive-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-destructive"
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
        )}
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

            <h3 className="font-semibold text-foreground">
              {userName}&apos;s Strengths (Score 2-3)
            </h3>
          </div>
          <ul className="space-y-1.5">
            {strengths.length > 0 ? (
              strengths.map((strength) => (
                <li
                  key={strength}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1 text-primary">•</span>
                  {strength}
                </li>
              ))
            ) : (
              // Also show score=2 clusters as strengths when no 3s exist
              skillScoreList
                .filter((s) => s.scores?.[userName] === 2)
                .map((s) => s.skillCluster)
                .length > 0 ? (
                skillScoreList
                  .filter((s) => s.scores?.[userName] === 2)
                  .map((s) => (
                    <li
                      key={s.skillCluster}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1 text-primary">•</span>
                      {s.skillCluster}
                    </li>
                  ))
              ) : (
                <li className="text-sm text-muted-foreground">
                  Once we have more high-scoring clusters, we&apos;ll highlight your top
                  strengths here.
                </li>
              )
            )}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-warning" />
            <h3 className="font-semibold text-foreground">
              Development Areas (Score 0-1)
            </h3>
          </div>
          <ul className="space-y-1.5">
            {developmentAreas.length > 0 ? (
              developmentAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1 text-warning">•</span>
                  {area}
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">
                No clear low-score clusters yet. As you refine the heatmap, we&apos;ll
                summarise your key development areas here.
              </li>
            )}
          </ul>
        </div>
      </div>

      <Disclaimer />
      <PaywallModal open={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default ComparativeSkillAnalysis;
