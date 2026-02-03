// src/components/screens/ComparativeSkillAnalysis.tsx
import { useEffect, useMemo, useState } from "react";
import {
  peers as fallbackPeers,
  skillScores as fallbackSkillScores,
  getMockReport,
} from "@/data/mockData";
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

// ---- helpers to read from DB payload safely ----

// Try multiple paths so backend JSON can evolve without breaking UI
function extractPeersFromPayload(payload: any): Peer[] | null {
  const candidates = [
    payload?.peers,
    payload?.sections?.peers,
    payload?.sections?.peerProfiles,
    payload?.peerProfiles,
    payload?.sections?.peer_profiles,
  ];
  const found = candidates.find((x) => Array.isArray(x));
  return (found as Peer[]) ?? null;
}

function extractSkillScoresFromPayload(payload: any): SkillScoreRow[] | null {
  const candidates = [
    payload?.skillScores,
    payload?.sections?.skillScores,
    payload?.sections?.skill_scores,
    payload?.sections?.comparativeSkills,
    payload?.comparativeSkills,
  ];
  const found = candidates.find((x) => Array.isArray(x));
  return (found as SkillScoreRow[]) ?? null;
}

// ------------------------------------------------

const ComparativeSkillAnalysis = () => {
  const [feedbackGiven, setFeedbackGiven] = useState<
    Record<string, FeedbackType | null>
  >({});
  const [editCount, setEditCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  // start with local mock data so UI never goes blank
  const [peerList, setPeerList] = useState<Peer[]>(fallbackPeers as Peer[]);
  const [skillScoreList, setSkillScoreList] = useState<SkillScoreRow[]>(
    fallbackSkillScores as SkillScoreRow[],
  );

  // Load DB JSON once and override local mocks if present
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const payload = await getMockReport();
        const peersFromDb = extractPeersFromPayload(payload);
        const scoresFromDb = extractSkillScoresFromPayload(payload);

        if (!cancelled) {
          if (Array.isArray(peersFromDb) && peersFromDb.length > 0) {
            setPeerList(peersFromDb);
          }
          if (Array.isArray(scoresFromDb) && scoresFromDb.length > 0) {
            setSkillScoreList(scoresFromDb);
          }
        }
      } catch (e) {
        console.error(
          "ComparativeSkillAnalysis: DB load failed, using fallback mock data:",
          e,
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const userPeer: Peer | undefined =
    useMemo(() => peerList.find((p) => p.isUser) ?? peerList[0], [peerList]) ??
    undefined;

  const userName = userPeer?.name || "You";

  const peerNames = useMemo(
    () => peerList.map((p) => p.name),
    [peerList],
  );

  const handleFeedback = (skillCluster: string, type: FeedbackType) => {
    // free: first edit, then paywall
    if (feedbackGiven[skillCluster]) {
      if (editCount >= 1) {
        setShowPaywall(true);
        return;
      }
    }

    setFeedbackGiven((prev) => ({ ...prev, [skillCluster]: type }));
    setEditCount((prev) => prev + 1);
  };

<<<<<<< HEAD
  const strengths = skillScores.filter((s) => s.scores['You'] === 3).map((s) => s.skillCluster);
  const developmentAreas = skillScores.filter((s) => s.scores['You'] === 1).map((s) => s.skillCluster);
=======
  // strengths & development areas based on user row
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
        .filter((s) => s.scores?.[userName] === 1)
        .map((s) => s.skillCluster),
    [skillScoreList, userName],
  );
>>>>>>> e35c98d (your message here)

  return (
    <div className="animate-fade-in">
      <div className="mb-6 text-center md:mb-8">
        <h1 className="text-xl font-semibold text-foreground md:text-2xl">
          Comparative Skill Analysis
        </h1>
        <p className="mt-2 text-xs text-muted-foreground md:text-sm">
<<<<<<< HEAD
          Analysis across 10 skill clusters (0=low, 3=strong)
=======
          Analysis for {userName}
          {userPeer?.title || userPeer?.company ? (
            <>
              {" "}
              ({userPeer?.title}
              {userPeer?.title && userPeer?.company ? ", " : ""}
              {userPeer?.company})
            </>
          ) : null}
          {" "}
          across {skillScoreList.length} skill clusters (0 = low, 3 = strong)
>>>>>>> e35c98d (your message here)
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
                {peerNames.map((name) => (
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
<<<<<<< HEAD
            <h3 className="font-semibold text-foreground">Your Strengths (Score 3)</h3>
=======
            <h3 className="font-semibold text-foreground">
              {userName}&apos;s Strengths (Score 3)
            </h3>
>>>>>>> e35c98d (your message here)
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
              <li className="text-sm text-muted-foreground">
                Once we have more high-scoring clusters, we&apos;ll highlight your top
                strengths here.
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-warning" />
            <h3 className="font-semibold text-foreground">
              Development Areas (Score 1)
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
