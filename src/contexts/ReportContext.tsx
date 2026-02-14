import { createContext, useContext, ReactNode } from "react";

// The raw report JSON shape from the DB
type ReportData = any;

interface ReportContextValue {
  report: ReportData;
  employeeId: string;
}

const ReportContext = createContext<ReportContextValue | null>(null);

export const ReportProvider = ({
  report,
  employeeId,
  children,
}: {
  report: ReportData;
  employeeId: string;
  children: ReactNode;
}) => (
  <ReportContext.Provider value={{ report, employeeId }}>
    {children}
  </ReportContext.Provider>
);

/**
 * Hook that returns all derived data from the report JSON,
 * matching the same shape as the old mockData exports.
 */
export function useReportData() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error("useReportData must be used within ReportProvider");

  const r = ctx.report;

  const peers = r.peers ?? [];

  const skillScores = (r.heatmapMatrix ?? []).map((row: any) => ({
    skillCluster: row.cluster,
    scores: Object.fromEntries(
      peers.map((peer: any) => [
        peer.name,
        (row.values as Record<string, number>)?.[peer.id] ?? 0,
      ])
    ),
  }));

  // New format: skillGaps with skill, importance, description, competitorCompanies
  const skillGaps = (r.skillGaps ?? []).map((sg: any, i: number) => ({
    id: `gap-${i + 1}`,
    title: sg.skill,
    description: sg.description,
    category: sg.category ?? sg.importance,
    importance: sg.importance,
    gapScore: sg.importance === "Critical" ? 3 : sg.importance === "Important" ? 2 : 1,
    competitorCompanies: sg.competitorCompanies ?? [],
  }));

  // Axis options derived from axisGaps (new format)
  const allAxisGaps = r.axisGaps ?? [];
  const xAxes = allAxisGaps.filter((a: any) => a.axisType === "x");
  const yAxes = allAxisGaps.filter((a: any) => a.axisType === "y");

  const axisOptions = {
    xAxis: xAxes.map((a: any) => ({ id: a.axisId, label: a.axisLabel })),
    yAxis: yAxes.map((a: any) => ({ id: a.axisId, label: a.axisLabel })),
  };

  const courses = (r.coursePlan ?? []).map((cp: any, i: number) => {
    const totalHours =
      (cp.levels?.beginner?.estimatedHours ?? 0) +
      (cp.levels?.intermediate?.estimatedHours ?? 0) +
      (cp.levels?.advanced?.estimatedHours ?? 0);

    const chapters = (["beginner", "intermediate", "advanced"] as const)
      .filter((lvl) => cp.levels?.[lvl])
      .map((lvl, j) => ({
        id: `ch-${i + 1}-${j + 1}`,
        title: `${lvl.charAt(0).toUpperCase() + lvl.slice(1)} — ${cp.levels[lvl]!.outcome?.slice(0, 60) ?? ""}…`,
        lessons: cp.levels[lvl]!.modules ?? [],
      }));

    return {
      id: `course-${i + 1}`,
      title: cp.skill?.replace(/\b\w/g, (c: string) => c.toUpperCase()) ?? "",
      level: cp.importance,
      provider: "MyNoted AI",
      description: cp.reason,
      url: r.primaryCourseLink?.url ?? "#",
      duration: `${totalHours}h`,
      levels: 3,
      gapScore: cp.importance === "Critical" ? 3 : 2,
      chapters,
    };
  });

  const videoResources = (r.recommendedCourses?.[0]?.videoResources ?? []).map(
    (v: any, i: number) => ({
      id: `vid-${i + 1}`,
      title: v.title ?? "Video",
      platform: v.platform ?? "YouTube",
      url: v.url ?? "#",
      duration: v.duration ?? "—",
      views: v.views ?? "—",
    })
  );

  // Gap actions (new format: axisId/axisLabel instead of cluster/description/category)
  const gapActions = (r.gapActions ?? []).map((ga: any, i: number) => ({
    id: `action-${i + 1}`,
    title: ga.axisLabel ?? ga.cluster ?? "",
    description: ga.description ?? "",
    category: ga.category ?? "",
    gapScore: ga.gap,
    actionItems: ga.actions ?? [],
    timeline: ga.timeline ?? "",
  }));

  return {
    peers,
    skillScores,
    skillGaps,
    gapActions,
    axisOptions,
    axisGaps: allAxisGaps,
    courses,
    videoResources,
    competitiveAdvantages: r.prosAndCons?.pros ?? [],
    developmentOpportunities: r.prosAndCons?.cons ?? [],
    meta: r.meta ?? {},
    executiveSummary: r.executiveSummary ?? "",
    personSkills: r.personSkills ?? {},
    gaps: r.gaps ?? [],
    roadmap: r.roadmap ?? {},
    courseLink: {
      label: r.primaryCourseLink?.label ?? "View more curated courses",
      url: r.primaryCourseLink?.url ?? "#",
    },
    recommendedCourses: r.recommendedCourses ?? [],
    experienceSignals: r.experienceSignals ?? [],
    goalChips: r.goalChips ?? [],
  };
}
