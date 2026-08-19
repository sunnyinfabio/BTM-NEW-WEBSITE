import React, { createContext, useContext, useState } from 'react';

export type GoalId =
  | 'build-product'
  | 'find-developers'
  | 'dedicated-team'
  | 'add-ai'
  | 'modernize-tech'
  | 'improve-quality'
  | 'not-sure';

export interface SolutionRecommendation {
  goalId: GoalId;
  title: string;
  matchedServices: string[];
  engagementModels: string[];
  deliverables: string[];
  timelineEstimate: string;
  recommendedNextStep: string;
  ctaText: string;
}

export interface SolutionFinderState {
  selectedGoal: GoalId | null;
  step: number;
  answers: Record<string, any>;
  recommendation: SolutionRecommendation | null;
  leadIntent: string;
  setSelectedGoal: (goal: GoalId) => void;
  setAnswer: (key: string, value: any) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

export const RECOMMENDATIONS: Record<GoalId, SolutionRecommendation> = {
  'build-product': {
    goalId: 'build-product',
    title: 'Custom Product & MVP Engineering',
    matchedServices: ['Software Outsourcing', 'Web Development', 'Mobile App Development (iOS & Android)'],
    engagementModels: ['Agile Dedicated Pod', 'Fixed-Scope Milestone'],
    deliverables: ['UI/UX Prototyping', 'Cloud Architecture (AWS/Azure)', 'Cross-Platform App', 'Automated QA & Launch'],
    timelineEstimate: '4 – 12 Weeks MVP Launch',
    recommendedNextStep: 'Define scope, tech stack, and user stories with our solutions architect.',
    ctaText: 'Scope My Product →',
  },
  'find-developers': {
    goalId: 'find-developers',
    title: 'Top 1% IT Staff Augmentation',
    matchedServices: ['Staff Augmentation', 'Dedicated Developers'],
    engagementModels: ['Direct Talent Augmentation (Monthly/Hourly)', 'Full-Time Remote Engineers'],
    deliverables: ['Pre-vetted Senior Developers (Java, .NET, Python, React, Cloud)', 'Immediate Time-Zone Aligned Integration', 'Zero Recruitment Overhead'],
    timelineEstimate: 'Immediate Deployment (48h – 1 Week)',
    recommendedNextStep: 'Tell us what your team is missing. Interview pre-vetted engineers in 48 hours.',
    ctaText: 'Build My Team →',
  },
  'dedicated-team': {
    goalId: 'dedicated-team',
    title: 'Autonomous Managed Engineering Pod',
    matchedServices: ['Dedicated Teams', 'Engineering Governance & Management'],
    deliverables: ['Senior Tech Lead & Scrum Master', 'Full-Stack Developers & QA Engineers', 'Sprint Velocity & Transparent Backlog'],
    engagementModels: ['Dedicated Team Model (Long-term pod)'],
    timelineEstimate: 'Pod Assembly in 1 – 2 Weeks',
    recommendedNextStep: 'Spin up a fully managed pod with dedicated Scrum governance aligned with your leadership.',
    ctaText: 'Spin Up Dedicated Pod →',
  },
  'add-ai': {
    goalId: 'add-ai',
    title: 'Enterprise AI, NLP & Intelligent Automation',
    matchedServices: ['Emerging Technologies', 'AI & Machine Learning', 'Robotic Process Automation (RPA)'],
    deliverables: ['Intelligent Document Recognition (IDR)', 'Natural Language Processing (NLP)', 'Predictive Business Intelligence', 'Workflow Automation Bots'],
    engagementModels: ['Feasibility Sprint + T&M Development'],
    timelineEstimate: '2 – 6 Weeks Feasibility & Model Integration',
    recommendedNextStep: 'Assess data readiness and architect custom AI models tailored to your business data.',
    ctaText: 'Explore AI Roadmap →',
  },
  'modernize-tech': {
    goalId: 'modernize-tech',
    title: 'Cloud Architecture & Legacy Modernization',
    matchedServices: ['Software Modernization', 'Cloud Migration (AWS/Azure/GCP)', 'Microservice Refactoring'],
    deliverables: ['Monolith to Microservices', 'Database Optimization & SQL Re-architecture', 'API & Integration Modernization', 'Zero-Downtime Migration Plan'],
    engagementModels: ['Milestone-Based Modernization or Dedicated Refactoring Pod'],
    timelineEstimate: 'Phased Agile Sprints (Zero Disruption)',
    recommendedNextStep: 'Audit your current code base and establish a zero-downtime modernization roadmap.',
    ctaText: 'Plan Modernization →',
  },
  'improve-quality': {
    goalId: 'improve-quality',
    title: 'End-to-End QA & Test Automation',
    matchedServices: ['Quality Assurance', 'Software QA Automation Testing', 'Functional & Usability Testing'],
    deliverables: ['CI/CD Automated Test Suites', 'Regression & Functional Validation', 'Security & Stress Testing', 'Multi-Device Usability Audits'],
    engagementModels: ['QA-as-a-Service / Embedded QA Engineers'],
    timelineEstimate: 'Immediate Test Suite Deployment',
    recommendedNextStep: 'Integrate automated test coverage into your deployment pipelines to accelerate release velocity.',
    ctaText: 'Improve QA Coverage →',
  },
  'not-sure': {
    goalId: 'not-sure',
    title: 'Guided Technology Advisor Session',
    matchedServices: ['All BTM Capabilities: Staff Augmentation, Dedicated Pods, Custom Software, AI & QA'],
    deliverables: ['Technical Feasibility Study', 'Engagement Model Comparison', 'Cost & Timeline Estimation', 'Architecture Recommendations'],
    engagementModels: ['Free No-Obligation Architecture Consultation'],
    timelineEstimate: '30-Minute Architecture Diagnostic',
    recommendedNextStep: 'Connect directly with our senior technology leadership in the US and India for an unbiased diagnostic.',
    ctaText: 'Start Guided Diagnostic →',
  },
};

const SolutionFinderContext = createContext<SolutionFinderState | undefined>(undefined);

export const SolutionFinderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedGoal, setSelectedGoalInternal] = useState<GoalId | null>(null);
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [leadIntent, setLeadIntent] = useState<string>('');

  const setSelectedGoal = (goal: GoalId) => {
    setSelectedGoalInternal(goal);
    setLeadIntent(RECOMMENDATIONS[goal]?.title || '');
  };

  const setAnswer = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setSelectedGoalInternal(null);
    setStep(1);
    setAnswers({});
    setLeadIntent('');
  };

  const recommendation = selectedGoal ? RECOMMENDATIONS[selectedGoal] : null;

  return (
    <SolutionFinderContext.Provider
      value={{
        selectedGoal,
        step,
        answers,
        recommendation,
        leadIntent,
        setSelectedGoal,
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
