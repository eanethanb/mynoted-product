// Mock data for MyNoted AI Career Intelligence Workspace
// Betsy Thomas (SEO Specialist, Global Media Insight) Report Data

export interface Peer {
  id: string;
  name: string;
  title: string;
  company: string;
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
  whyGap?: string;
}

export interface CourseChapter {
  id: string;
  title: string;
  lessons: string[];
  outcomes?: string;
  metrics?: string;
}

export interface VideoResource {
  id: string;
  title: string;
  duration: string;
  views: string;
  thumbnail: string;
}

// Main subject: Betsy Thomas (SEO Specialist, Global Media Insight)
export const peers: Peer[] = [
  { 
    id: 'betsy', 
    name: 'Betsy Thomas', 
    title: 'SEO Specialist',
    company: 'Global Media Insight',
    description: 'Limited 0→1 product/tech ownership; GTM/scale execution lighter. Strong in AI Search Optimization and Generative AI.',
    productTechScore: 3.3, 
    gtmScore: 2.7, 
    isUser: true 
  },
  { 
    id: 'reshu', 
    name: 'Reshu Verma', 
    title: 'Search Marketing Leader',
    company: 'Techmagnate',
    description: 'Strong Search Marketing Leadership with SEO Team Leadership. Excels in Performance & Incentives.',
    productTechScore: 0.0, 
    gtmScore: 3.3 
  },
  { 
    id: 'neema', 
    name: 'Neema Bisht', 
    title: 'Sr. SEO Executive',
    company: 'Techmagnate',
    description: 'Strong product/tech depth in Technical & Forensics (Computer/Cyber Forensics). Solid SEO tools integration.',
    productTechScore: 6.7, 
    gtmScore: 2.7 
  },
  { 
    id: 'dineshh', 
    name: 'Dineshh Verma', 
    title: 'SEO Expert',
    company: 'Techmagnate',
    description: 'Strong Marketing & Branding focus with Brand Visibility Enhancement and Digital Marketing Campaigns.',
    productTechScore: 0.0, 
    gtmScore: 2.7 
  },
  { 
    id: 'piyush', 
    name: 'Piyush Sharma', 
    title: 'Senior Digital Marketing Manager',
    company: 'Pagetraffic',
    description: 'Strong SEO & Search Optimization with Local SEO Strategies and White Label SEO Services.',
    productTechScore: 0.0, 
    gtmScore: 4.0 
  },
  { 
    id: 'ritu', 
    name: 'Ritu Sharma', 
    title: 'Content Head',
    company: 'Pagetraffic',
    description: 'Marketing & Branding strength with Content Development & Strategy and Creative Writing.',
    productTechScore: 0.0, 
    gtmScore: 2.7 
  },
  { 
    id: 'ali', 
    name: 'Ali Hamza', 
    title: 'SEO Specialist',
    company: 'Webfx',
    description: 'Balanced profile with Technical & Forensics and Design & Creative Services capabilities.',
    productTechScore: 3.3, 
    gtmScore: 2.0 
  },
  { 
    id: 'michael', 
    name: "Michael O'Dea", 
    title: 'Internet Marketer',
    company: 'Webfx',
    description: 'Limited product/tech ownership; GTM/scale execution lighter across all clusters.',
    productTechScore: 0.0, 
    gtmScore: 0.7 
  },
  { 
    id: 'bran', 
    name: 'Bran Carter', 
    title: 'Link Building Specialist',
    company: 'Webfx',
    description: 'Strong SEO & Search Optimization focus with Link Building expertise. Has iGaming and Email Marketing skills.',
    productTechScore: 0.0, 
    gtmScore: 3.3 
  },
  { 
    id: 'jaspinder', 
    name: 'Jaspinder Singh', 
    title: 'Digital Marketing Strategist',
    company: 'Seo Discovery',
    description: 'Design & Creative Services strength. Limited technical and GTM depth.',
    productTechScore: 0.0, 
    gtmScore: 1.3 
  },
  { 
    id: 'shilpa', 
    name: 'Shilpa Thakur', 
    title: 'SEO Executive',
    company: 'Seo Discovery',
    description: 'Limited product/tech ownership; GTM/scale execution lighter across domains.',
    productTechScore: 0.0, 
    gtmScore: 0.7 
  },
];

// 12 skill clusters with scores for all peers (0-3 scale)
export const skillScores: SkillScore[] = [
  { 
    skillCluster: 'Strategy & Vision', 
    scores: { 
      'Betsy Thomas': 1, 
      'Reshu Verma': 2, 
      'Neema Bisht': 1, 
      'Dineshh Verma': 1, 
      'Piyush Sharma': 1, 
      'Ritu Sharma': 0, 
      'Ali Hamza': 1, 
      "Michael O'Dea": 0, 
      'Bran Carter': 0, 
      'Jaspinder Singh': 0, 
      'Shilpa Thakur': 1 
    } 
  },
  { 
    skillCluster: 'Marketing & Branding', 
    scores: { 
      'Betsy Thomas': 1, 
      'Reshu Verma': 1, 
      'Neema Bisht': 1, 
      'Dineshh Verma': 2, 
      'Piyush Sharma': 1, 
      'Ritu Sharma': 3, 
      'Ali Hamza': 1, 
      "Michael O'Dea": 1, 
      'Bran Carter': 0, 
      'Jaspinder Singh': 1, 
      'Shilpa Thakur': 0 
    } 
  },
  { 
    skillCluster: 'SEO & Search Optimization', 
    scores: { 
      'Betsy Thomas': 2, 
      'Reshu Verma': 2, 
      'Neema Bisht': 2, 
      'Dineshh Verma': 1, 
      'Piyush Sharma': 3, 
      'Ritu Sharma': 1, 
      'Ali Hamza': 0, 
      "Michael O'Dea": 0, 
      'Bran Carter': 3, 
      'Jaspinder Singh': 1, 
      'Shilpa Thakur': 0 
    } 
  },
  { 
    skillCluster: 'Client & Customer Management', 
    scores: { 
      'Betsy Thomas': 0, 
      'Reshu Verma': 0, 
      'Neema Bisht': 0, 
      'Dineshh Verma': 0, 
      'Piyush Sharma': 1, 
      'Ritu Sharma': 0, 
      'Ali Hamza': 1, 
      "Michael O'Dea": 0, 
      'Bran Carter': 1, 
      'Jaspinder Singh': 0, 
      'Shilpa Thakur': 0 
    } 
  },
  { 
    skillCluster: 'Performance & Incentives', 
    scores: { 
      'Betsy Thomas': 0, 
      'Reshu Verma': 2, 
      'Neema Bisht': 0, 
      'Dineshh Verma': 0, 
      'Piyush Sharma': 0, 
      'Ritu Sharma': 0, 
      'Ali Hamza': 0, 
      "Michael O'Dea": 0, 
      'Bran Carter': 0, 
      'Jaspinder Singh': 0, 
      'Shilpa Thakur': 0 
    } 
  },
  { 
    skillCluster: 'Communication & Networking', 
    scores: { 
      'Betsy Thomas': 0, 
      'Reshu Verma': 1, 
      'Neema Bisht': 1, 
      'Dineshh Verma': 0, 
      'Piyush Sharma': 0, 
      'Ritu Sharma': 0, 
      'Ali Hamza': 0, 
      "Michael O'Dea": 0, 
      'Bran Carter': 0, 
      'Jaspinder Singh': 0, 
      'Shilpa Thakur': 0 
    } 
  },
  { 
    skillCluster: 'Design & Creative Services', 
    scores: { 
      'Betsy Thomas': 0, 
      'Reshu Verma': 0, 
      'Neema Bisht': 0, 
      'Dineshh Verma': 0, 
      'Piyush Sharma': 0, 
      'Ritu Sharma': 0, 
      'Ali Hamza': 1, 
      "Michael O'Dea": 0, 
      'Bran Carter': 0, 
      'Jaspinder Singh': 2, 
      'Shilpa Thakur': 0 
    } 
  },
  { 
    skillCluster: 'Technical & Forensics', 
    scores: { 
      'Betsy Thomas': 1, 
      'Reshu Verma': 0, 
      'Neema Bisht': 2, 
      'Dineshh Verma': 0, 
      'Piyush Sharma': 0, 
      'Ritu Sharma': 0, 
      'Ali Hamza': 1, 
      "Michael O'Dea": 0, 
      'Bran Carter': 0, 
      'Jaspinder Singh': 0, 
      'Shilpa Thakur': 0 
    } 
  },
  { 
    skillCluster: 'Event & Response Management', 
    scores: { 
      'Betsy Thomas': 0, 
      'Reshu Verma': 0, 
      'Neema Bisht': 0, 
      'Dineshh Verma': 0, 
      'Piyush Sharma': 0, 
      'Ritu Sharma': 0, 
      'Ali Hamza': 1, 
      "Michael O'Dea": 0, 
      'Bran Carter': 0, 
      'Jaspinder Singh': 0, 
      'Shilpa Thakur': 0 
    } 
  },
  { 
    skillCluster: 'iGaming', 
    scores: { 
      'Betsy Thomas': 0, 
      'Reshu Verma': 0, 
      'Neema Bisht': 0, 
      'Dineshh Verma': 0, 
      'Piyush Sharma': 0, 
      'Ritu Sharma': 0, 
      'Ali Hamza': 0, 
      "Michael O'Dea": 0, 
      'Bran Carter': 1, 
      'Jaspinder Singh': 0, 
      'Shilpa Thakur': 0 
    } 
  },
  { 
    skillCluster: 'Email Marketing', 
    scores: { 
      'Betsy Thomas': 0, 
      'Reshu Verma': 0, 
      'Neema Bisht': 0, 
      'Dineshh Verma': 0, 
      'Piyush Sharma': 0, 
      'Ritu Sharma': 0, 
      'Ali Hamza': 0, 
      "Michael O'Dea": 0, 
      'Bran Carter': 1, 
      'Jaspinder Singh': 0, 
      'Shilpa Thakur': 0 
    } 
  },
  { 
    skillCluster: 'Content Support', 
    scores: { 
      'Betsy Thomas': 1, 
      'Reshu Verma': 0, 
      'Neema Bisht': 0, 
      'Dineshh Verma': 0, 
      'Piyush Sharma': 0, 
      'Ritu Sharma': 0, 
      'Ali Hamza': 0, 
      "Michael O'Dea": 0, 
      'Bran Carter': 0, 
      'Jaspinder Singh': 0, 
      'Shilpa Thakur': 0 
    } 
  },
];

// Skill gaps for Betsy Thomas (SEO Specialist, Global Media Insight)
export const skillGaps: SkillGap[] = [
  {
    id: 'marketing',
    title: 'Marketing & Branding',
    description: 'Gap of 2 vs. top competitor Ritu Sharma (Content Head, Pagetraffic) who scores 3/3. Critical for comprehensive digital marketing campaigns and brand visibility.',
    gapScore: 2,
    category: 'Marketing & Branding',
    actionItems: [
      'Complete a focused course on Marketing & Branding and document key learnings',
      'Apply Marketing & Branding in 2–3 real initiatives with measurable outcomes',
      'Review how Ritu Sharma (Content Head, Pagetraffic) demonstrates strength in Marketing & Branding',
      'Schedule monthly reviews with your leader on Marketing & Branding-related progress',
    ],
  },
  {
    id: 'performance',
    title: 'Performance & Incentives',
    description: 'Gap of 2 vs. top competitor Reshu Verma (Search Marketing Leader, Techmagnate) who scores 2/2. Essential for team motivation and performance-driven outcomes.',
    gapScore: 2,
    category: 'Performance & Incentives',
    actionItems: [
      'Complete a focused course on Performance & Incentives and document key learnings',
      'Apply Performance & Incentives in 2–3 real initiatives with measurable outcomes',
      'Review how Reshu Verma (Search Marketing Leader, Techmagnate) demonstrates strength in Performance & Incentives',
      'Schedule monthly reviews with your leader on Performance & Incentives-related progress',
    ],
  },
  {
    id: 'design',
    title: 'Design & Creative Services',
    description: 'Gap of 2 vs. top competitor Jaspinder Singh (Digital Marketing Strategist, Seo Discovery) who scores 2/2. Important for creating visually compelling marketing assets.',
    gapScore: 2,
    category: 'Design & Creative Services',
    actionItems: [
      'Complete a focused course on Design & Creative Services and document key learnings',
      'Apply Design & Creative Services in 2–3 real initiatives with measurable outcomes',
      'Review how Jaspinder Singh (Digital Marketing Strategist, Seo Discovery) demonstrates strength in Design & Creative Services',
      'Schedule monthly reviews with your leader on Design & Creative Services-related progress',
    ],
  },
  {
    id: 'strategy',
    title: 'Strategy & Vision',
    description: 'Gap of 1 vs. top competitor Reshu Verma (Search Marketing Leader, Techmagnate) who scores 2/2. Critical for leadership advancement and strategic planning.',
    gapScore: 1,
    category: 'Strategy & Vision',
    actionItems: [
      'Complete a focused course on Strategy & Vision and document key learnings',
      'Apply Strategy & Vision in 2–3 real initiatives with measurable outcomes',
      'Review how Reshu Verma (Search Marketing Leader, Techmagnate) demonstrates strength in Strategy & Vision',
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Search Optimization',
    description: 'Gap of 1 vs. top competitors Piyush Sharma (Senior Digital Marketing Manager, Pagetraffic) and Bran Carter (Link Building Specialist, Webfx) who score 3/3.',
    gapScore: 1,
    category: 'SEO & Search Optimization',
    actionItems: [
      'Complete a focused course on SEO & Search Optimization and document key learnings',
      'Apply SEO & Search Optimization in 2–3 real initiatives with measurable outcomes',
      'Review how Piyush Sharma (Senior Digital Marketing Manager, Pagetraffic) demonstrates strength in SEO & Search Optimization',
    ],
  },
  {
    id: 'client',
    title: 'Client & Customer Management',
    description: 'Gap of 1 vs. competitors with client management skills. Essential for building lasting client relationships and retention.',
    gapScore: 1,
    category: 'Client & Customer Management',
    actionItems: [
      'Complete a focused course on Client & Customer Management and document key learnings',
      'Apply Client & Customer Management in 2–3 real initiatives with measurable outcomes',
      'Review how Piyush Sharma (Senior Digital Marketing Manager, Pagetraffic) demonstrates strength in Client & Customer Management',
    ],
  },
  {
    id: 'communication',
    title: 'Communication & Networking',
    description: 'Gap of 1 vs. competitors with networking skills. Important for professional growth and industry connections.',
    gapScore: 1,
    category: 'Communication & Networking',
    actionItems: [
      'Complete a focused course on Communication & Networking and document key learnings',
      'Apply Communication & Networking in 2–3 real initiatives with measurable outcomes',
      'Review how Reshu Verma (Search Marketing Leader, Techmagnate) demonstrates strength in Communication & Networking',
    ],
  },
  {
    id: 'technical',
    title: 'Technical & Forensics',
    description: 'Gap of 1 vs. Neema Bisht (Sr. SEO Executive, Techmagnate) who scores 2/2. Valuable for technical SEO audits and advanced analysis.',
    gapScore: 1,
    category: 'Technical & Forensics',
    actionItems: [
      'Complete a focused course on Technical & Forensics and document key learnings',
      'Apply Technical & Forensics in 2–3 real initiatives with measurable outcomes',
      'Review how Neema Bisht (Sr. SEO Executive, Techmagnate) demonstrates strength in Technical & Forensics',
    ],
  },
];

// Pros for Betsy Thomas (SEO Specialist, Global Media Insight)
export const competitiveAdvantages = [
  {
    title: 'AI & Emerging Tech Adoption',
    description: 'Betsy Thomas (SEO Specialist, Global Media Insight) has unique skills in AI Search Optimization and Generative AI that most competitors lack — positioned well for future SEO trends.',
  },
  {
    title: 'Strong SEO Foundation',
    description: 'Solid SEO & Search Optimization score (2/3) with practical skills in Link Exchange and Search Engine Optimization fundamentals.',
  },
  {
    title: 'Technical Awareness',
    description: 'Has Technical & Forensics capability (1/3) through Generative AI expertise — more than most competitors in the cohort.',
  },
  {
    title: 'Content Support Unique Skill',
    description: 'Only person in the cohort with Content Support skill (1/1) — a differentiator for integrated SEO-content strategies.',
  },
  {
    title: 'Social Listening Capability',
    description: 'Social Media Listening skill provides marketing intelligence advantage over pure SEO-focused competitors.',
  },
];

// Cons for Betsy Thomas (SEO Specialist, Global Media Insight)
export const developmentOpportunities = [
  {
    title: 'Marketing & Branding Gap',
    description: 'Significant gap (1 vs 3) compared to Ritu Sharma (Content Head, Pagetraffic). Needs to develop broader marketing and content strategy capabilities.',
  },
  {
    title: 'Performance & Incentives Absent',
    description: 'Zero coverage in Performance & Incentives vs. Reshu Verma (Search Marketing Leader, Techmagnate) at 2. Critical for leadership progression.',
  },
  {
    title: 'Client Management Missing',
    description: 'No Client & Customer Management skills. Competitors like Piyush Sharma (Senior Digital Marketing Manager, Pagetraffic) have this coverage.',
  },
  {
    title: 'Design & Creative Gap',
    description: 'Zero Design & Creative Services vs. Jaspinder Singh (Digital Marketing Strategist, Seo Discovery) at 2. Limits ability to create compelling visual assets.',
  },
  {
    title: 'Lower GTM/Scale Score',
    description: 'GTM/Scale score of 2.7 vs. top performer Piyush Sharma (Senior Digital Marketing Manager, Pagetraffic) at 4.0. Needs stronger go-to-market execution capabilities.',
  },
];

// Courses for Betsy Thomas with 3-level structure
export const courses: Course[] = [
  {
    id: 'seo-strategy',
    title: 'SEO Strategy Development',
    duration: '12 hours',
    levels: 3,
    gapScore: 2,
    whyGap: 'Present in 11/33 competitors; examples: big leap, highervisibility, outerbox',
    chapters: [
      { 
        id: 'seo-foundations', 
        title: 'Level 1: SEO Strategy Foundations (2 hours)', 
        lessons: ['Core Concepts & Mental Models', 'SEO Strategy Frameworks', 'Competitive Analysis Basics', 'Goal Setting & KPI Definition'],
        outcomes: 'Understand the core concepts, language, and mental models behind SEO Strategy Development',
        metrics: 'Complete all 4 modules, pass foundation assessment with 80%+',
      },
      { 
        id: 'seo-application', 
        title: 'Level 2: Applying SEO Strategy (4 hours)', 
        lessons: ['Realistic Case Studies', 'Strategy Implementation', 'Performance Tracking', 'Competitor Benchmarking', 'Content-SEO Alignment'],
        outcomes: 'Work through realistic case studies for SEO Strategy Development',
        metrics: 'Complete 2 case study analyses, create 1 strategy document',
      },
      { 
        id: 'seo-mastery', 
        title: 'Level 3: Mastering SEO Strategy (6 hours)', 
        lessons: ['Cross-functional Leadership', 'Enterprise SEO Planning', 'Team Coordination', 'Stakeholder Presentations', 'Long-term Roadmapping'],
        outcomes: 'Lead cross-functional initiatives anchored in SEO Strategy Development',
        metrics: 'Lead 1 cross-functional SEO initiative, present strategy to stakeholders',
      },
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    duration: '12 hours',
    levels: 3,
    gapScore: 2,
    whyGap: 'Present in 4/33 competitors; examples: big leap, highervisibility, outerbox',
    chapters: [
      { 
        id: 'dm-foundations', 
        title: 'Level 1: Digital Marketing Foundations (2 hours)', 
        lessons: ['Digital Marketing Ecosystem', 'Channel Overview', 'Customer Journey Basics', 'Metrics & Attribution'],
        outcomes: 'Learn the core concepts, language, and mental models behind Digital Marketing',
        metrics: 'Complete all modules, score 80%+ on foundation quiz',
      },
      { 
        id: 'dm-application', 
        title: 'Level 2: Applying Digital Marketing (4 hours)', 
        lessons: ['Campaign Planning', 'Multi-channel Coordination', 'Budget Allocation', 'A/B Testing Frameworks', 'Performance Optimization'],
        outcomes: 'Work through realistic case studies for Digital Marketing',
        metrics: 'Design 2 campaign plans, run 1 A/B test analysis',
      },
      { 
        id: 'dm-mastery', 
        title: 'Level 3: Mastering Digital Marketing (6 hours)', 
        lessons: ['Integrated Marketing Leadership', 'Team Management', 'Agency Coordination', 'Executive Reporting', 'Innovation & Trends'],
        outcomes: 'Lead cross-functional initiatives anchored in Digital Marketing',
        metrics: 'Lead 1 integrated campaign, present ROI report to leadership',
      },
    ],
  },
  {
    id: 'digital-marketing-strategy',
    title: 'Digital Marketing Strategy',
    duration: '12 hours',
    levels: 3,
    gapScore: 2,
    whyGap: 'Present in 3/33 competitors; examples: big leap, seo discovery, thrive internet marketing agency',
    chapters: [
      { 
        id: 'dms-foundations', 
        title: 'Level 1: Strategy Foundations (2 hours)', 
        lessons: ['Strategic Planning Basics', 'Market Analysis', 'Competitive Positioning', 'Goal Hierarchy'],
        outcomes: 'Learn the core concepts, language, and mental models behind Digital Marketing Strategy',
        metrics: 'Complete foundation modules, pass strategy assessment',
      },
      { 
        id: 'dms-application', 
        title: 'Level 2: Applying Strategy (4 hours)', 
        lessons: ['Strategy Development Process', 'Resource Allocation', 'Timeline Planning', 'Risk Assessment', 'Stakeholder Alignment'],
        outcomes: 'Work through realistic case studies for Digital Marketing Strategy',
        metrics: 'Create 1 complete strategy document, present to peer group',
      },
      { 
        id: 'dms-mastery', 
        title: 'Level 3: Strategy Leadership (6 hours)', 
        lessons: ['Executive Strategy Sessions', 'Board Presentations', 'Long-term Visioning', 'Change Management', 'Innovation Integration'],
        outcomes: 'Lead cross-functional initiatives anchored in Digital Marketing Strategy',
        metrics: 'Lead 1 strategic initiative, secure stakeholder buy-in',
      },
    ],
  },
  {
    id: 'google-analytics',
    title: 'Google Analytics',
    duration: '12 hours',
    levels: 3,
    gapScore: 2,
    whyGap: 'Present in 4/33 competitors; examples: highervisibility, outerbox, thrive internet marketing agency',
    chapters: [
      { 
        id: 'ga-foundations', 
        title: 'Level 1: Google Analytics Foundations (2 hours)', 
        lessons: ['GA4 Interface Overview', 'Tracking Fundamentals', 'Report Navigation', 'Basic Metrics'],
        outcomes: 'Learn the core concepts, language, and mental models behind Google Analytics',
        metrics: 'Complete GA4 certification basics, set up tracking on 1 property',
      },
      { 
        id: 'ga-application', 
        title: 'Level 2: Applying Google Analytics (4 hours)', 
        lessons: ['Custom Reports', 'Conversion Tracking', 'Audience Segmentation', 'Event Configuration', 'E-commerce Tracking'],
        outcomes: 'Work through realistic case studies for Google Analytics',
        metrics: 'Create 3 custom reports, configure conversion tracking for 2 goals',
      },
      { 
        id: 'ga-mastery', 
        title: 'Level 3: Mastering Google Analytics (6 hours)', 
        lessons: ['Advanced Attribution', 'Cross-platform Analytics', 'Data Studio Integration', 'API & Automation', 'Predictive Analytics'],
        outcomes: 'Lead cross-functional initiatives anchored in Google Analytics',
        metrics: 'Build 1 executive dashboard, automate 2 reporting workflows',
      },
    ],
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing',
    duration: '12 hours',
    levels: 3,
    gapScore: 2,
    whyGap: 'Present in 4/33 competitors; examples: big leap, highervisibility, outerbox',
    chapters: [
      { 
        id: 'cm-foundations', 
        title: 'Level 1: Content Marketing Foundations (2 hours)', 
        lessons: ['Content Strategy Basics', 'Audience Research', 'Content Types & Formats', 'Editorial Planning'],
        outcomes: 'Learn the core concepts, language, and mental models behind Content Marketing',
        metrics: 'Complete foundation modules, create 1 content brief',
      },
      { 
        id: 'cm-application', 
        title: 'Level 2: Applying Content Marketing (4 hours)', 
        lessons: ['Content Calendar Development', 'SEO-Content Integration', 'Distribution Strategies', 'Performance Measurement', 'Content Optimization'],
        outcomes: 'Work through realistic case studies for Content Marketing',
        metrics: 'Develop 1 content calendar, optimize 3 existing pieces',
      },
      { 
        id: 'cm-mastery', 
        title: 'Level 3: Mastering Content Marketing (6 hours)', 
        lessons: ['Content Team Leadership', 'Brand Voice Development', 'Cross-channel Strategy', 'Content Operations', 'Thought Leadership'],
        outcomes: 'Lead cross-functional initiatives anchored in Content Marketing',
        metrics: 'Lead 1 content campaign, establish 1 thought leadership piece',
      },
    ],
  },
  {
    id: 'link-building',
    title: 'Link Building Strategies',
    duration: '12 hours',
    levels: 3,
    gapScore: 2,
    whyGap: 'Present in 2/33 competitors; examples: thrive internet marketing agency, webfx',
    chapters: [
      { 
        id: 'lb-foundations', 
        title: 'Level 1: Link Building Foundations (2 hours)', 
        lessons: ['Link Value Fundamentals', 'Authority Metrics', 'Outreach Basics', 'Ethical Link Building'],
        outcomes: 'Learn the core concepts, language, and mental models behind Link Building Strategies',
        metrics: 'Complete foundation modules, analyze 5 competitor backlink profiles',
      },
      { 
        id: 'lb-application', 
        title: 'Level 2: Applying Link Building (4 hours)', 
        lessons: ['Outreach Campaign Design', 'Content for Links', 'Relationship Building', 'Guest Posting Strategy', 'Broken Link Tactics'],
        outcomes: 'Work through realistic case studies for Link Building Strategies',
        metrics: 'Run 1 outreach campaign, secure 5 quality backlinks',
      },
      { 
        id: 'lb-mastery', 
        title: 'Level 3: Mastering Link Building (6 hours)', 
        lessons: ['Scalable Link Programs', 'Digital PR Integration', 'Team & Agency Management', 'Link Portfolio Strategy', 'Risk Management'],
        outcomes: 'Lead cross-functional initiatives anchored in Link Building Strategies',
        metrics: 'Build 1 scalable link program, improve domain authority by measurable amount',
      },
    ],
  },
];

export const videoResources: VideoResource[] = [
  { id: '1', title: 'SEO Strategy Development Masterclass', duration: '45 min 30 sec', views: '12.5K views', thumbnail: '/placeholder.svg' },
  { id: '2', title: 'Digital Marketing Fundamentals 2024', duration: '38 min 15 sec', views: '28.3K views', thumbnail: '/placeholder.svg' },
  { id: '3', title: 'Google Analytics 4 Complete Guide', duration: '52 min 40 sec', views: '45.2K views', thumbnail: '/placeholder.svg' },
  { id: '4', title: 'Content Marketing Strategy Blueprint', duration: '35 min 22 sec', views: '18.7K views', thumbnail: '/placeholder.svg' },
  { id: '5', title: 'Advanced Link Building Techniques', duration: '41 min 18 sec', views: '8.9K views', thumbnail: '/placeholder.svg' },
  { id: '6', title: 'SEO & Content Integration Workshop', duration: '1 hr 5 min', views: '15.4K views', thumbnail: '/placeholder.svg' },
  { id: '7', title: 'Digital Marketing Analytics Deep Dive', duration: '48 min 55 sec', views: '22.1K views', thumbnail: '/placeholder.svg' },
  { id: '8', title: 'Building High-Authority Backlinks', duration: '33 min 42 sec', views: '11.8K views', thumbnail: '/placeholder.svg' },
];

export const axisOptions = {
  x: ['Product/Tech', 'SEO Depth', 'Technical', 'Analytics'],
  y: ['GTM/Scale', 'Leadership', 'Marketing', 'Strategy'],
};

export const experienceSignals = [
  'Led SEO campaigns',
  'Managed content teams',
  'Owned digital marketing',
  'Launched link building programs',
  'Scaled organic traffic',
  'Built client relationships',
  'Drove AI adoption',
  'Managed analytics',
];

export const goalChips = [
  'Become SEO Director',
  'Lead Digital Marketing Team',
  'Move to Agency Leadership',
  'Build SEO Consultancy',
  'Head of Growth Role',
  'VP Marketing Track',
];

// Course link for Betsy Thomas
export const courseLink = 'https://mynoted.com/course/fc1d372f-075c-4db4-b451-58c1e2f8b694';
