// src/data/mockData.ts
// All data is now sourced from reportData.json — the single source of truth.

import reportData from "./reportData.json";

// ---------------------- RE-EXPORT FROM JSON ----------------------

// Peers — used by PeerProfiles, SkillMapping, ComparativeSkillAnalysis
export const peers = reportData.peers;

// Heatmap matrix — used by ComparativeSkillAnalysis
export const skillScores = (reportData.heatmapMatrix ?? []).map((row: any) => ({
  skillCluster: row.cluster,
  scores: Object.fromEntries(
    reportData.peers.map((peer) => [
      peer.name,
      (row.values as Record<string, number>)?.[peer.id] ?? 0,
    ])
  ),
}));

// Skill gaps — used by SkillGapsAnalysis
// New format: skillGaps array with skill, importance, description, competitorCompanies
export const skillGaps = (reportData.skillGaps ?? []).map((sg: any, i: number) => ({
  id: `gap-${i + 1}`,
  title: sg.skill,
  description: sg.description,
  category: sg.category ?? sg.importance,
  importance: sg.importance,
  gapScore: sg.importance === "Critical" ? 3 : sg.importance === "Important" ? 2 : 1,
  competitorCompanies: sg.competitorCompanies ?? [],
}));

// Gap actions — used by SkillGapsAnalysis for action items
// New format has axisId/axisLabel instead of cluster/description/category
export const gapActions = (reportData.gapActions ?? []).map((ga: any, i: number) => ({
  id: `action-${i + 1}`,
  title: ga.axisLabel ?? ga.cluster ?? "",
  description: ga.description ?? "",
  category: ga.category ?? "",
  gapScore: ga.gap,
  actionItems: ga.actions ?? [],
  timeline: ga.timeline ?? "",
}));

// Axis options — derived from axisGaps (new format)
const xAxes = (reportData.axisGaps ?? []).filter((a: any) => a.axisType === "x");
const yAxes = (reportData.axisGaps ?? []).filter((a: any) => a.axisType === "y");

export const axisOptions = {
  xAxis: xAxes.map((a: any) => ({ id: a.axisId, label: a.axisLabel })),
  yAxis: yAxes.map((a: any) => ({ id: a.axisId, label: a.axisLabel })),
};

// Courses — used by SkillGapCourses
export const courses = reportData.coursePlan.map((cp, i) => {
  const totalHours =
    (cp.levels.beginner?.estimatedHours ?? 0) +
    (cp.levels.intermediate?.estimatedHours ?? 0) +
    (cp.levels.advanced?.estimatedHours ?? 0);

  const chapters = (["beginner", "intermediate", "advanced"] as const)
    .filter((lvl) => cp.levels[lvl])
    .map((lvl, j) => ({
      id: `ch-${i + 1}-${j + 1}`,
      title: `${lvl.charAt(0).toUpperCase() + lvl.slice(1)} — ${cp.levels[lvl]!.outcome.slice(0, 60)}…`,
      lessons: cp.levels[lvl]!.modules,
    }));

  return {
    id: `course-${i + 1}`,
    title: cp.skill.replace(/\b\w/g, (c) => c.toUpperCase()),
    level: cp.importance,
    provider: "MyNoted AI",
    description: cp.reason,
    url: (reportData as any).primaryCourseLink?.url ?? "#",
    duration: `${totalHours}h`,
    levels: 3,
    gapScore: cp.importance === "Critical" ? 3 : 2,
    chapters,
  };
});

// Recommended courses from the JSON
export const recommendedCourses = (reportData as any).recommendedCourses ?? [];

// Video resources
export const videoResources = ((reportData as any).recommendedCourses?.[0]?.videoResources ?? []).map(
  (v: any, i: number) => ({
    id: `vid-${i + 1}`,
    title: v.title ?? "Video",
    platform: v.platform ?? "YouTube",
    url: v.url ?? "#",
    duration: v.duration ?? "—",
    views: v.views ?? "—",
  })
);

// Course link
export const courseLink = {
  label: (reportData as any).primaryCourseLink?.label ?? "View more curated courses",
  url: (reportData as any).primaryCourseLink?.url ?? "#",
};

// SWOT / Pros & Cons
export const competitiveAdvantages = (reportData as any).prosAndCons?.pros ?? [];
export const developmentOpportunities = (reportData as any).prosAndCons?.cons ?? [];

// Paid features
export const experienceSignals = (reportData as any).experienceSignals ?? [];
export const goalChips = reportData.goalChips ?? [];

// Meta / executive summary
export const meta = reportData.meta;
export const executiveSummary = (reportData as any).executiveSummary ?? "";
export const personSkills = (reportData as any).personSkills ?? {};
export const clusterDefinition = (reportData as any).clusterDefinition ?? {};
export const roadmap = reportData.roadmap;
export const axisGaps = reportData.axisGaps ?? [];
export const gaps = reportData.gaps ?? [];
