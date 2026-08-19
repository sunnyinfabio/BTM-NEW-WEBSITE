import React, { createContext, useContext, useState } from 'react';

export type GoalId =
  | 'build-product'
  | 'find-developers'
  | 'dedicated-team'
  | 'add-ai'
  | 'modernize-tech'
  | 'improve-quality'
  | 'not-sure';

export type IndustryId =
  | 'capital-market'
  | 'retail'
  | 'pharma'
  | 'healthcare'
  | 'fmcg'
  | 'oil-and-gas';

export interface IndustryOption {
  id: IndustryId;
  name: string;
  shortName: string;
  accentColor: string;
}

export const INDUSTRY_OPTIONS: IndustryOption[] = [
  { id: 'capital-market', name: 'Capital Market', shortName: 'Finance', accentColor: '#00C881' },
  { id: 'retail', name: 'Retail & Commerce', shortName: 'Retail', accentColor: '#EC1C24' },
  { id: 'pharma', name: 'Pharma & Biotech', shortName: 'Pharma', accentColor: '#6F42C1' },
  { id: 'healthcare', name: 'Healthcare & HealthTech', shortName: 'Healthcare', accentColor: '#00875A' },
  { id: 'fmcg', name: 'FMCG & Supply Chain', shortName: 'FMCG', accentColor: '#F5AC00' },
  { id: 'oil-and-gas', name: 'Oil & Gas / Energy', shortName: 'Energy', accentColor: '#0B2653' },
];

export interface MatrixRecommendation {
  goalId: GoalId;
  industryId: IndustryId | null;
  matrixTitle: string;
  combinationBadge: string;
  matchedServices: string[];
  pillarSequence: string[];
  tailoredSolutionAreas: { title: string; desc: string }[];
  deliverables: string[];
  engagementModels: string[];
  timelineEstimate: string;
  recommendedNextStep: string;
  personalizedCta: string;
}

export interface SolutionFinderState {
  selectedGoal: GoalId | null;
  selectedIndustry: IndustryId | null;
  step: number;
  funnelStep: 'goal' | 'industry' | 'recommendation';
  funnelOrigin: 'goal' | 'industry';
  answers: Record<string, any>;
  matrixRecommendation: MatrixRecommendation | null;
  leadIntent: string;
  setSelectedGoal: (goal: GoalId | null) => void;
  setSelectedIndustry: (industry: IndustryId | null) => void;
  setFunnelStep: (step: 'goal' | 'industry' | 'recommendation') => void;
  setAnswer: (key: string, value: any) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

export const GOAL_TITLES: Record<GoalId, string> = {
  'build-product': 'Custom Software (Build a Product)',
  'find-developers': 'Staff Augmentation (Find Developers)',
  'dedicated-team': 'Managed Pods (Build a Dedicated Team)',
  'add-ai': 'Emerging Tech (Add AI & ML)',
  'modernize-tech': 'Software Modernization (Modernize Tech)',
  'improve-quality': 'Quality Assurance (Improve Quality)',
  'not-sure': 'Strategic Advisory (I’m Not Sure)',
};

export const INDUSTRY_NAMES: Record<IndustryId, string> = {
  'capital-market': 'Capital Market',
  'retail': 'Retail',
  'pharma': 'Pharma',
  'healthcare': 'Healthcare',
  'fmcg': 'FMCG',
  'oil-and-gas': 'Oil & Gas',
};

export function generateMatrixRecommendation(
  goalId: GoalId,
  industryId: IndustryId | null
): MatrixRecommendation {
  const goalTitle = GOAL_TITLES[goalId] || 'Technology Engineering';
  const industryName = industryId ? INDUSTRY_NAMES[industryId] : 'Enterprise';

  // Compute Personalized CTA based on combination
  let personalizedCta = 'Build My Solution →';
  if (industryId === 'healthcare' && goalId === 'add-ai') {
    personalizedCta = 'Discuss My Healthcare AI Idea →';
  } else if (industryId === 'capital-market' && goalId === 'modernize-tech') {
    personalizedCta = 'Discuss My Modernization Plan →';
  } else if (industryId === 'retail' && goalId === 'build-product') {
    personalizedCta = 'Build My Retail Product →';
  } else if (industryId === 'fmcg' && (goalId === 'add-ai' || goalId === 'build-product')) {
    personalizedCta = 'Explore My Data Solution →';
  } else if (industryId === 'oil-and-gas' && goalId === 'add-ai') {
    personalizedCta = 'Discuss My Industrial AI Opportunity →';
  } else if (industryId === 'pharma' && goalId === 'improve-quality') {
    personalizedCta = 'Improve My Quality Workflow →';
  } else if (industryId === 'capital-market' && goalId === 'build-product') {
    personalizedCta = 'Build My Trading Platform →';
  } else if (industryId === 'healthcare' && goalId === 'find-developers') {
    personalizedCta = 'Deploy Healthcare Vetted Developers →';
  } else if (industryId === 'retail' && goalId === 'dedicated-team') {
    personalizedCta = 'Spin Up Dedicated Retail Pod →';
  } else if (industryId) {
    personalizedCta = `Build My ${industryName} Solution →`;
  }

  // Pillar sequence
  const pillarSequence = industryId === 'healthcare'
    ? ['Data & Intelligence', 'Clinical Automation', 'Digital Health', 'Cloud / Engineering']
    : industryId === 'capital-market'
    ? ['Quantitative Modeling', 'Sub-10ms Computing', 'FIX & Execution', 'Wall Street Governance']
    : industryId === 'retail'
    ? ['Omnichannel POS', 'Inventory Sync', 'Sub-50ms Checkout', 'Cloud Microservices']
    : industryId === 'pharma'
    ? ['IDR Document OCR', 'Clinical Data Hub', '21 CFR Part 11 Audit', 'Secure Cloud']
    : industryId === 'fmcg'
    ? ['Demand Forecasting ML', 'Distributor Portals', 'Warehouse WMS', 'Logistics IoT']
    : industryId === 'oil-and-gas'
    ? ['Predictive Anomaly ML', 'SCADA Ingestion', 'Digital Twin Simulation', 'Industrial Edge']
    : ['Discovery & Scope', 'Architecture Design', 'Top 1% Pod Assembly', 'Agile Sprints'];

  // Tailored solution areas
  const tailoredSolutionAreas: { title: string; desc: string }[] = [];

  if (goalId === 'add-ai') {
    tailoredSolutionAreas.push(
      { title: `${industryName} Intelligent Automation`, desc: `Custom NLP, ML models, and workflow automation tailored to ${industryName} domain datasets.` },
      { title: 'Intelligent Document Recognition (IDR)', desc: 'Automated deep learning extraction over unstructured domain documents and contracts.' },
      { title: 'Predictive Decision Intelligence', desc: 'Real-time predictive forecasting algorithms embedded into operational software.' }
    );
  } else if (goalId === 'modernize-tech') {
    tailoredSolutionAreas.push(
      { title: `${industryName} Core Monolith Refactoring`, desc: `Zero-downtime microservices decomposition and database re-architecting for ${industryName}.` },
      { title: 'Event-Driven Message Bus', desc: 'High-throughput Kafka and Redis streaming pipelines replacing legacy batch jobs.' },
      { title: 'Cloud Infrastructure Optimization', desc: 'Multi-region AWS/Azure VPC migration with automated auto-scaling and security boundaries.' }
    );
  } else if (goalId === 'build-product') {
    tailoredSolutionAreas.push(
      { title: `Custom ${industryName} Product MVP`, desc: `End-to-end web & mobile product engineering from user stories to production release.` },
      { title: 'Modern UI/UX & Design System', desc: 'Responsive high-performance interfaces tailored for domain-specific user workflows.' },
      { title: 'Production Scalability & CI/CD', desc: 'Cloud-native backend architectures engineered to support heavy concurrency and low latency.' }
    );
  } else if (goalId === 'find-developers' || goalId === 'dedicated-team') {
    tailoredSolutionAreas.push(
      { title: `Top 1% Vetted ${industryName} Engineers`, desc: `Senior developers with proven hands-on experience delivering in ${industryName}.` },
      { title: '48-Hour Rapid Pod Assembly', desc: 'Pre-vetted talent matched to your exact tech stack with zero recruitment overhead.' },
      { title: 'Agile Governance & Transparency', desc: 'Managed sprint cadence with daily standups, transparent burndown, and senior tech lead oversight.' }
    );
  } else {
    tailoredSolutionAreas.push(
      { title: `${industryName} Architecture Diagnostic`, desc: `Unbiased roadmap analysis, compliance review, and team allocation modeling.` },
      { title: 'End-to-End QA & Test Automation', desc: 'Automated regression test suites and security validation embedded into CI/CD.' },
      { title: 'Executive Technology Advisory', desc: 'Direct access to senior technology veterans governing delivery and architectural integrity.' }
    );
  }

  return {
    goalId,
    industryId,
    matrixTitle: `${industryName} × ${goalTitle.split('(')[0].trim()}`,
    combinationBadge: `${industryName} × ${goalTitle.split('(')[0].trim()}`,
    matchedServices: [
      `${industryName} Practice`,
      goalId === 'add-ai' ? 'AI & Machine Learning' : goalId === 'modernize-tech' ? 'Cloud & Modernization' : 'Custom Software Engineering',
      'Agile Pod Assembly',
    ],
    pillarSequence,
    tailoredSolutionAreas,
    deliverables: [
      `Custom ${industryName} Architectural Roadmap`,
      `Dedicated Top 1% Engineering Pod Assembly`,
      `Verified Milestone Delivery Sprints`,
      `100% Strict NDA & Security Governance`,
    ],
    engagementModels: ['Dedicated Agile Pod', 'T&M Milestone Sprint', 'Staff Augmentation'],
    timelineEstimate: goalId === 'find-developers' ? '48h Developer Matching' : '2 – 8 Weeks Initial Delivery Sprint',
    recommendedNextStep: `Connect with our ${industryName} solutions architect to review your technical specs and configure your engineering pod.`,
    personalizedCta,
  };
}

const SolutionFinderContext = createContext<SolutionFinderState | undefined>(undefined);

export const SolutionFinderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedGoal, setSelectedGoalInternal] = useState<GoalId | null>(null);
  const [selectedIndustry, setSelectedIndustryInternal] = useState<IndustryId | null>(null);
  const [step, setStep] = useState<number>(1);
  const [funnelStep, setFunnelStep] = useState<'goal' | 'industry' | 'recommendation'>('goal');
  const [funnelOrigin, setFunnelOrigin] = useState<'goal' | 'industry'>('goal');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [leadIntent, setLeadIntent] = useState<string>('');

  const setSelectedGoal = (goal: GoalId | null) => {
    setSelectedGoalInternal(goal);
    if (goal) {
      if (!selectedIndustry) {
        setFunnelStep('industry');
      } else {
        setFunnelStep('recommendation');
      }
    }
  };

  const setSelectedIndustry = (industry: IndustryId | null) => {
    setSelectedIndustryInternal(industry);
    if (industry) {
      if (!selectedGoal) {
        setFunnelStep('goal');
      } else {
        setFunnelStep('recommendation');
      }
    }
  };

  const setAnswer = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setSelectedGoalInternal(null);
    setSelectedIndustryInternal(null);
    setFunnelStep('goal');
    setStep(1);
    setAnswers({});
    setLeadIntent('');
  };

  const matrixRecommendation = selectedGoal
    ? generateMatrixRecommendation(selectedGoal, selectedIndustry)
    : null;

  return (
    <SolutionFinderContext.Provider
      value={{
        selectedGoal,
        selectedIndustry,
        step,
        funnelStep,
        funnelOrigin,
        answers,
        matrixRecommendation,
        leadIntent,
        setSelectedGoal,
        setSelectedIndustry,
        setFunnelStep,
        setAnswer,
        setStep,
        reset,
      }}
    >
      {children}
    </SolutionFinderContext.Provider>
  );
};

export const useSolutionFinder = () => {
  const context = useContext(SolutionFinderContext);
  if (!context) {
    throw new Error('useSolutionFinder must be used within a SolutionFinderProvider');
  }
  return context;
};
