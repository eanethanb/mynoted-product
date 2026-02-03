// src/data/mockData.ts

// ---------------------- FALLBACK MOCKS ----------------------

// Used by PeerProfiles as fallback
export const peers = [
  {
    id: "user",
    name: "You",
    title: "COO / Product Leader",
    company: "Your Company",
    description: "Your baseline profile used for comparison.",
    productTechScore: 6,
    gtmScore: 6,
    isUser: true,
  },
  {
    id: "peer-1",
    name: "Peer 1",
    title: "COO",
    company: "PeerCorp A",
    description: "Operator with strong GTM and execution strengths.",
    productTechScore: 7,
    gtmScore: 8,
  },
  {
    id: "peer-2",
    name: "Peer 2",
    title: "COO",
    company: "PeerCorp B",
    description: "Balanced profile with solid operations and people leadership.",
    productTechScore: 6,
    gtmScore: 7,
  },
];

// Used by SkillGapsAnalysis as fallback
export const skillGaps = [
  {
    id: "gap-1",
    title: "Board-Level Storytelling & Investor Narrative",
    description:
      "Translating ops performance into a crisp board / investor narrative with clear metrics and upside.",
    category: "Executive Communication",
    gapScore: 3,
    actionItems: [
      "Draft a 6–8 slide mock board update for your current business.",
      "Shadow one board meeting to study structure and language.",
      "Write monthly narrative memos tying operations to P&L.",
    ],
  },
  {
    id: "gap-2",
    title: "Data-Driven Operating Cadence",
    description:
      "Running the business on a consistent metric stack and weekly operating rhythm.",
    category: "Operating System",
    gapScore: 2,
    actionItems: [
      "Define a one-page scorecard with 10–12 core metrics.",
      "Set up a weekly operating review with a fixed agenda.",
      "Assign owners to red metrics with 14-day experiments.",

    ],
  },
];


// Used by ComparativeSkillAnalysis (heatmap)
export const skillScores = [
  {
    skillCluster: "Strategy & Vision",
    scores: {
      You: 3,
      "Peer 1": 3,
      "Peer 2": 2,
    },
  },
  {
    skillCluster: "P&L / Ops Leadership",
    scores: {
      You: 2,
      "Peer 1": 3,
      "Peer 2": 3,
    },
  },
  {
    skillCluster: "People & Culture",
    scores: {
      You: 3,
      "Peer 1": 2,
      "Peer 2": 2,
    },
  },
  {
    skillCluster: "AI / Automation",
    scores: {
      You: 1,
      "Peer 1": 2,
      "Peer 2": 2,
    },
  },
];

// Used by SkillMapping (quadrant)
export const axisOptions = {
  xAxis: [
    { id: "productTechScore", label: "Product / Tech" },
    { id: "gtmScore", label: "GTM / Scale" },
  ],
  yAxis: [
    { id: "productTechScore", label: "Product / Tech" },
    { id: "gtmScore", label: "GTM / Scale" },
  ],
};

// Used by SkillGapCourses (even if you haven't opened it yet)
export const courses = [
  {
    id: "course-1",
    title: "Board Storytelling for Operators",
    level: "Intermediate",
    provider: "MyNoted AI",
    description:
      "Learn how to convert operational performance into a clear board narrative.",
    url: "https://example.com/board-storytelling",
  },
  {
    id: "course-2",
    title: "Building a Weekly Operating System",
    level: "Intermediate",
    provider: "MyNoted AI",
    description:
      "Design a scorecard and weekly review rhythm for your business.",
    url: "https://example.com/operating-system",
  },
];

export const videoResources = [
  {
    id: "vid-1",
    title: "How COOs Present to Boards",
    platform: "YouTube",
    url: "https://youtube.com/watch?v=dummy1",
    duration: "18:32",
  },
  {
    id: "vid-2",
    title: "Weekly Operating Review in Practice",
    platform: "YouTube",
    url: "https://youtube.com/watch?v=dummy2",
    duration: "22:10",
  },
];

// simple extra helper for courses page
export const courseLink = {
  label: "View more curated courses",
  url: "https://example.com/all-courses",
};

// ---------------------- DB API LOADER ----------------------

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

// 🔑 Used by PeerProfiles + SkillGapsAnalysis (and can be reused later)
export async function getMockReport() {
  const data = await fetchJson<LatestReportResponse>(`${API_BASE}/api/report/latest`);
  // we only care about the JSON payload, frontend expects `payload` shape
  return data.payload;
}

