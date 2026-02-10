// src/data/mockData.ts
// All data is now sourced from reportData.json — the single source of truth.

import reportData from "./reportData.json";

// ---------------------- RE-EXPORT FROM JSON ----------------------

// Peers — used by PeerProfiles, SkillMapping, ComparativeSkillAnalysis
export const peers = reportData.peers;

// Heatmap matrix — used by ComparativeSkillAnalysis
// Transform heatmapMatrix into the skillScores format the heatmap component expects
export const skillScores = reportData.heatmapMatrix.map((row) => ({
  skillCluster: row.cluster,
  scores: Object.fromEntries(
    reportData.peers.map((peer) => [
      peer.name,
      (row.values as Record<string, number>)[peer.id] ?? 0,
    ])
  ),
}));

// Skill gaps — used by SkillGapsAnalysis
// Map gapActions to the shape the UI expects (id, title, description, category, gapScore, actionItems)
export const skillGaps = reportData.gapActions.map((ga, i) => ({
  id: `gap-${i + 1}`,
  title: ga.cluster,
  description: ga.description,
  category: ga.category,
  gapScore: ga.gap,
  actionItems: ga.actions,
  timeline: ga.timeline,
}));

// Axis options — used by SkillMapping quadrant
export const axisOptions = {
  xAxis: [
    {
      id: reportData.meta.axisScoreFields.x,
      label: reportData.meta.axisScoreFields.xLabel,
    },
  ],
  yAxis: [
    {
      id: reportData.meta.axisScoreFields.y,
      label: reportData.meta.axisScoreFields.yLabel,
    },
  ],
};

// Courses — used by SkillGapCourses
// Transform coursePlan into the shape the courses UI expects
export const courses = reportData.coursePlan.map((cp, i) => {
  const totalHours =
    (cp.levels.beginner?.estimatedHours ?? 0) +
    (cp.levels.intermediate?.estimatedHours ?? 0) +
    (cp.levels.advanced?.estimatedHours ?? 0);

  // Build chapters from levels
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
    url: reportData.primaryCourseLink?.url ?? "#",
    duration: `${totalHours}h`,
    levels: 3,
    gapScore: cp.importance === "Critical" ? 3 : 2,
    chapters,
  };
});

// Recommended courses from the JSON (pre-built course links)
export const recommendedCourses = reportData.recommendedCourses ?? [];

// Video resources — currently empty in JSON, provide empty array
export const videoResources = (reportData.recommendedCourses?.[0]?.videoResources ?? []).map(
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
  label: reportData.primaryCourseLink?.label ?? "View more curated courses",
  url: reportData.primaryCourseLink?.url ?? "#",
};

// SWOT / Pros & Cons — used by SwotAnalysis
export const competitiveAdvantages = reportData.prosAndCons.pros;
export const developmentOpportunities = reportData.prosAndCons.cons;

// Paid features — used by PaidFeatures
export const experienceSignals = reportData.experienceSignals ?? [];
export const goalChips = reportData.goalChips ?? [];

// Meta / executive summary
export const meta = reportData.meta;
export const executiveSummary = reportData.executiveSummary;
export const personSkills = reportData.personSkills;
export const quadrant = reportData.quadrant;
export const clusterDefinition = reportData.clusterDefinition;
export const roadmap = reportData.roadmap;

// ---------------------- DB API LOADER (kept for future use) ----------------------

const API_BASE = "http://127.0.0.1:5050";

type LatestReportResponse = {
  id: number | string;
  target_person: string;
  payload: any;
  created_at: string;
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
  }
  return (await res.json()) as T;
}

export async function getMockReport() {
  const data = await fetchJson<LatestReportResponse>(
    `${API_BASE}/api/report/latest`
  );
  return data.payload;
}
