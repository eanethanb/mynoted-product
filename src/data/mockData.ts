// Mock data for MyNoted AI Career Intelligence Workspace

export interface Peer {
  id: string;
  name: string;
  description: string;
  productTechScore: number;
  gtmScore: number;
  isUser?: boolean;
}

export interface SkillScore {
  skillCluster: string;
  scores: Record<string, number>;
}

export interface SkillGap {
  id: string;
  title: string;
  description: string;
  gapScore: number;
  category: string;
  actionItems: string[];
}

export interface Course {
  id: string;
  title: string;
  duration: string;
  levels: number;
  gapScore: number;
  chapters?: CourseChapter[];
}

export interface CourseChapter {
  id: string;
  title: string;
  lessons: string[];
}

export interface VideoResource {
  id: string;
  title: string;
  duration: string;
  views: string;
  thumbnail: string;
}

export const peers: Peer[] = [
  { id: 'you', name: 'You', description: 'Moderate leadership/ops experience; limited digital transformation and customer experience depth; needs development in key areas.', productTechScore: 3.5, gtmScore: 6, isUser: true },
  { id: 'priya', name: 'Priya Sharma', description: 'Retail operator→COO; strong supply chain & ops depth; proven customer experience leadership.', productTechScore: 7, gtmScore: 8.5 },
  { id: 'rajesh', name: 'Rajesh Mehta', description: 'Founder with digital/brand muscle and strong strategic vision; excellent domain expertise across functions.', productTechScore: 8, gtmScore: 7.5 },
  { id: 'amit', name: 'Amit Desai', description: 'COO with stakeholder management/partnership excellence; strong retail operations and P&L leadership.', productTechScore: 7.5, gtmScore: 8 },
  { id: 'kavita', name: 'Kavita Rao', description: 'Operations + retail ops strength; balanced across multiple domains; solid all-around performer.', productTechScore: 6.5, gtmScore: 6.5 },
  { id: 'arjun', name: 'Arjun Patel', description: 'Digital transformation heavyweight with strong business transformation capability; well-rounded leader.', productTechScore: 7.5, gtmScore: 7.5 },
];

export const skillScores: SkillScore[] = [
  { skillCluster: 'Strategy & Vision', scores: { You: 2, 'Priya Sharma': 3, 'Rajesh Mehta': 3, 'Amit Desai': 3, 'Kavita Rao': 2, 'Arjun Patel': 3 } },
  { skillCluster: 'P&L / Operations Leadership', scores: { You: 2, 'Priya Sharma': 3, 'Rajesh Mehta': 2, 'Amit Desai': 3, 'Kavita Rao': 2, 'Arjun Patel': 2 } },
  { skillCluster: 'Supply Chain / Logistics Management', scores: { You: 2, 'Priya Sharma': 3, 'Rajesh Mehta': 2, 'Amit Desai': 3, 'Kavita Rao': 3, 'Arjun Patel': 2 } },
  { skillCluster: 'Business Transformation / Process Excellence', scores: { You: 2, 'Priya Sharma': 3, 'Rajesh Mehta': 2, 'Amit Desai': 2, 'Kavita Rao': 2, 'Arjun Patel': 3 } },
  { skillCluster: 'Domain — Retail Operations', scores: { You: 2, 'Priya Sharma': 3, 'Rajesh Mehta': 2, 'Amit Desai': 2, 'Kavita Rao': 2, 'Arjun Patel': 3 } },
  { skillCluster: 'Domain — Customer Experience', scores: { You: 1, 'Priya Sharma': 3, 'Rajesh Mehta': 3, 'Amit Desai': 3, 'Kavita Rao': 2, 'Arjun Patel': 2 } },
  { skillCluster: 'Digital Transformation', scores: { You: 1, 'Priya Sharma': 2, 'Rajesh Mehta': 3, 'Amit Desai': 2, 'Kavita Rao': 2, 'Arjun Patel': 3 } },
  { skillCluster: 'Stakeholder / Partnership Management', scores: { You: 1, 'Priya Sharma': 2, 'Rajesh Mehta': 2, 'Amit Desai': 3, 'Kavita Rao': 2, 'Arjun Patel': 2 } },
  { skillCluster: 'Brand Development / Marketing', scores: { You: 2, 'Priya Sharma': 3, 'Rajesh Mehta': 3, 'Amit Desai': 2, 'Kavita Rao': 2, 'Arjun Patel': 2 } },
  { skillCluster: 'Team Building / People Leadership', scores: { You: 2, 'Priya Sharma': 3, 'Rajesh Mehta': 3, 'Amit Desai': 3, 'Kavita Rao': 2, 'Arjun Patel': 3 } },
];

export const skillGaps: SkillGap[] = [
  {
    id: 'cx',
    title: 'Domain — Customer Experience',
    description: 'Limited customer experience depth (2/3 vs. peers at 3/3). Critical for COO excellence in retail operations where customer satisfaction drives operational success.',
    gapScore: 2,
    category: 'Domain',
    actionItems: [
      'CX frameworks & metrics; customer journey mapping/NPS/CSAT fundamentals',
      'Lead a 90-day CX improvement pilot with customer feedback integration',
      'Study best-in-class CX case studies from hospitality and e-commerce sectors',
      'Shadow Priya Sharma or Rajesh Mehta for CX insights',
    ],
  },
  {
    id: 'digital',
    title: 'Digital Transformation',
    description: 'Significant digital transformation gap (1/3 vs. peers at 3/3). Essential for modern COO roles to drive operational efficiency through technology and automation.',
    gapScore: 2,
    category: 'Digital Transformation',
    actionItems: [
      'Own one digital initiative (e.g., omnichannel platform or AI-powered inventory system)',
      'Weekly project reviews with analytics instrumentation',
      'Publish a transformation log with metrics',
      'Partner with Arjun Patel or Rajesh Mehta for digital mentorship',
      'Attend 2 digital transformation workshops',
    ],
  },
  {
    id: 'stakeholder',
    title: 'Stakeholder / Partnership Management',
    description: 'Partnership management needs enhancement (2/3 vs. top performers at 3/3). Critical for COO success in vendor negotiations, strategic partnerships, and cross-functional collaboration.',
    gapScore: 2,
    category: 'Stakeholder / Partnership Management',
    actionItems: [
      'Create partnership-grade presentation materials (vendor economics, SLA frameworks, win-win models)',
      "Rehearse 'quarterly business review' scripts with KPI partnership cadence",
      'Lead 3 strategic partnership negotiations end-to-end',
      "Learn from Amit Desai's stakeholder management approach",
    ],
  },
];

export const competitiveAdvantages = [
  {
    title: 'Operational Excellence & Process Mastery',
    description: 'World-class P&L and operations leadership (3/3 scores). Deep expertise in supply chain, logistics management, and operational scaling across complex retail environments.',
  },
  {
    title: 'Retail Domain Authority',
    description: 'Maximum proficiency (3/3) in retail operations domain. Strong foundation in business transformation and process excellence — critical for COO success.',
  },
  {
    title: 'Team Building & People Leadership',
    description: 'Top-tier people leadership and team building capabilities (3/3). Proven ability to scale teams, drive operational culture, and build high-performing organizations.',
  },
  {
    title: 'Strategy & Vision Strength',
    description: 'Solid strategic thinking and vision-setting abilities (2/3) — balanced with operational execution. Understands the strategic-operational bridge essential for effective COO leadership.',
  },
];

export const developmentOpportunities = [
  {
    title: 'Customer Experience Depth',
    description: 'Limited customer experience capabilities (2/3 vs. peers at 3/3). Modern COO roles require deep CX fluency to drive customer-centric operational improvements.',
  },
  {
    title: 'Digital Transformation Gap',
    description: 'Significant gap in digital transformation (1/3 vs. peers at 3/3). Critical limitation for COO roles in tech-enabled retail where automation and digital operations are key.',
  },
  {
    title: 'Partnership Management Experience',
    description: 'Partnership and stakeholder management needs development (2/3 vs. top performers at 3/3). Essential for vendor negotiations, strategic alliances, and cross-functional collaboration.',
  },
  {
    title: 'Brand Development & Marketing',
    description: 'Limited brand development and marketing exposure (2/3). Modern COOs increasingly need marketing fluency to align operations with brand promise and customer expectations.',
  },
];

export const courses: Course[] = [
  {
    id: 'cx-course',
    title: 'Customer Experience',
    duration: '9 weeks',
    levels: 3,
    gapScore: 2,
    chapters: [
      { id: 'cx-fundamentals', title: 'CX Fundamentals', lessons: ['CX Frameworks & Metrics', 'NPS CSAT CES Deep Dive', 'Customer Touchpoint Mapping', 'Feedback System Design'] },
      { id: 'journey-design', title: 'Journey Design & Voice of Customer', lessons: ['Customer Journey Mapping', 'VoC Program Setup', 'Persona Development', 'Pain Point Analysis'] },
      { id: 'cx-pilot', title: 'CX Pilot Implementation', lessons: ['90-Day Pilot Planning', 'Metrics Dashboard Setup', 'Stakeholder Alignment', 'Results Analysis'] },
    ],
  },
  {
    id: 'digital-course',
    title: 'Digital Transformation',
    duration: '9 weeks',
    levels: 3,
    gapScore: 2,
    chapters: [
      { id: 'digital-strategy', title: 'Digital Strategy Foundations', lessons: ['Digital Maturity Assessment', 'Technology Stack Planning', 'Change Management Basics', 'ROI Frameworks'] },
      { id: 'implementation', title: 'Implementation & Automation', lessons: ['Process Automation', 'AI/ML Integration', 'Data Analytics Setup', 'Platform Selection'] },
      { id: 'digital-leadership', title: 'Digital Leadership', lessons: ['Leading Digital Teams', 'Agile Methodologies', 'Innovation Culture', 'Scaling Digital Initiatives'] },
    ],
  },
  {
    id: 'stakeholder-course',
    title: 'Stakeholder / Partnership Management',
    duration: '4 weeks',
    levels: 3,
    gapScore: 2,
    chapters: [
      { id: 'stakeholder-basics', title: 'Stakeholder Mapping & Analysis', lessons: ['Stakeholder Identification', 'Power-Interest Matrix', 'Communication Planning', 'Influence Strategies'] },
      { id: 'partnership-dev', title: 'Partnership Development', lessons: ['Vendor Economics', 'SLA Frameworks', 'Win-Win Negotiations', 'Contract Management'] },
      { id: 'relationship-mgmt', title: 'Relationship Management', lessons: ['QBR Best Practices', 'Conflict Resolution', 'Long-term Partnership Building', 'Performance Tracking'] },
    ],
  },
  {
    id: 'brand-course',
    title: 'Brand Development / Marketing',
    duration: '12 weeks',
    levels: 3,
    gapScore: 2,
    chapters: [
      { id: 'brand-strategy', title: 'Brand Strategy Fundamentals', lessons: ['Brand Positioning', 'Value Proposition Design', 'Competitive Analysis', 'Brand Architecture'] },
      { id: 'marketing-ops', title: 'Marketing Operations for COOs', lessons: ['Marketing-Ops Alignment', 'Campaign ROI Measurement', 'Customer Acquisition Metrics', 'Brand Consistency'] },
      { id: 'integrated-marketing', title: 'Integrated Marketing Leadership', lessons: ['Cross-functional Collaboration', 'Marketing Technology Stack', 'Data-Driven Decisions', 'Brand Experience Design'] },
    ],
  },
];

export const videoResources: VideoResource[] = [
  { id: '1', title: 'The WAYS CX Framework', duration: '38 min 56 sec', views: '210 views', thumbnail: '/placeholder.svg' },
  { id: '2', title: 'Michael Killeen The Cx Framework Six F...', duration: '2 min 23 sec', views: '218 views', thumbnail: '/placeholder.svg' },
  { id: '3', title: 'What is customer experience (CX)?', duration: '3 min 52 sec', views: '5.6K views', thumbnail: '/placeholder.svg' },
  { id: '4', title: 'Ultimate Guide to Customer Experience...', duration: '10 min 45 sec', views: '25.3K views', thumbnail: '/placeholder.svg' },
  { id: '5', title: 'Mastering CX Fundamentals with Nicol...', duration: '44 min 28 sec', views: '691 views', thumbnail: '/placeholder.svg' },
  { id: '6', title: 'The CX design framework | Santhakum...', duration: '19 min 35 sec', views: '99 views', thumbnail: '/placeholder.svg' },
  { id: '7', title: 'CX Service Design Webinar', duration: '59 Min 29 Sec', views: '1.4K views', thumbnail: '/placeholder.svg' },
  { id: '8', title: 'What Is CRM? | Introduction To CRM Sof...', duration: '8 min 43 sec', views: '793.8K views', thumbnail: '/placeholder.svg' },
];

export const axisOptions = {
  x: ['Product', 'Tech', 'GTM', 'Ops'],
  y: ['Leadership', 'Strategy', 'Execution'],
};

export const experienceSignals = [
  'Led a team',
  'Managed revenue',
  'Owned a product line',
  'Launched a product',
  'Scaled operations',
  'Built partnerships',
  'Drove digital transformation',
  'Managed P&L',
];

export const goalChips = [
  'Become CTO',
  'Grow to COO-level role',
  'Move to Series B startup',
  'Lead a turnaround',
  'Build a team from scratch',
  'IPO readiness',
];
