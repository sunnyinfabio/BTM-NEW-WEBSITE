import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Headphones,
  Cog,
  Code,
  BarChart3,
  FileText,
  Bot,
  Database,
  Workflow,
  LineChart,
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Badge, Button, GradientText } from '../ui';
import './aiFinder.css';

export type AiDomain = 'sales' | 'support' | 'operations' | 'development' | 'analytics' | 'documents';
export type AiTechType = 'ai-agent' | 'rag' | 'automation' | 'prediction' | 'llm-integration';

interface AiDomainOption {
  id: AiDomain;
  title: string;
  subtitle: string;
  impact: string;
  icon: React.ReactNode;
  accentColor: string;
  applicableTech: AiTechType[];
  useCases: string[];
  timeline: string;
}

const AI_DOMAINS: AiDomainOption[] = [
  {
    id: 'sales',
    title: 'Sales',
    subtitle: 'Lead scoring, personalized outreach & CRM enrichment',
    impact: '3× faster lead qualification',
    icon: <TrendingUp size={22} />,
    accentColor: '#38BDF8',
    applicableTech: ['ai-agent', 'rag', 'prediction', 'llm-integration'],
    useCases: [
      'Autonomous inbound lead qualification agents',
      'Hyper-personalized email outreach using proprietary CRM context',
      'Predictive conversion probability & deal close forecasting',
      'Automated sales meeting transcript summarization and next-step actions',
    ],
    timeline: '3 – 6 Weeks Feasibility to Deployment',
  },
  {
    id: 'support',
    title: 'Support',
    subtitle: '24/7 autonomous tier-1 resolution & ticket triage',
    impact: '70% routine ticket deflection',
    icon: <Headphones size={22} />,
    accentColor: '#06B6D4',
    applicableTech: ['ai-agent', 'rag', 'llm-integration', 'automation'],
    useCases: [
      'Enterprise RAG chatbot answering strictly from internal documentation',
      'Automated ticket categorization, sentiment analysis & urgent routing',
      'Multi-lingual real-time customer query resolution',
      'Human-in-the-loop escalation with pre-drafted expert answers',
    ],
    timeline: '2 – 5 Weeks Setup & Vector Store Sync',
  },
  {
    id: 'operations',
    title: 'Operations',
    subtitle: 'Robotic Process Automation & intelligent workflow routing',
    impact: '80% reduction in manual data entry',
    icon: <Cog size={22} />,
    accentColor: '#8B5CF6',
    applicableTech: ['automation', 'ai-agent', 'llm-integration'],
    useCases: [
      'End-to-end ERP and inventory reconciliation bots',
      'Automated vendor invoice validation and approval routing',
      'Exception triage for logistics and supply chain fulfillment',
      'System-to-system data synchronization with zero manual re-keying',
    ],
    timeline: '4 – 8 Weeks RPA & API Pipeline Build',
  },
  {
    id: 'development',
    title: 'Development',
    subtitle: 'AI-assisted coding, automated QA suites & legacy refactoring',
    impact: '40% acceleration in sprint velocity',
    icon: <Code size={22} />,
    accentColor: '#3B82F6',
    applicableTech: ['ai-agent', 'llm-integration', 'automation'],
    useCases: [
      'Automated unit & integration test generation from code diffs',
      'Legacy .NET / Java code migration assistants & documentation generation',
      'AI pull request security scanning and anti-pattern detection',
      'Custom internal developer copilot fine-tuned on company repositories',
    ],
    timeline: '2 – 4 Weeks Custom Pipeline Integration',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    subtitle: 'Predictive forecasting, anomaly detection & executive BI',
    impact: 'Real-time proactive business signals',
    icon: <BarChart3 size={22} />,
    accentColor: '#10B981',
    applicableTech: ['prediction', 'rag', 'llm-integration'],
    useCases: [
      'Natural language SQL querying ("Ask your database in plain English")',
      'Predictive customer churn & lifetime value forecasting models',
      'Automated anomaly detection across financial transactions',
      'Daily AI executive briefings summarizing cross-departmental KPIs',
    ],
    timeline: '3 – 6 Weeks Data Pipeline & Model Training',
  },
  {
    id: 'documents',
    title: 'Documents',
    subtitle: 'Intelligent Document Recognition (IDR), OCR & contract parsing',
    impact: '99% extraction accuracy over paper & PDFs',
    icon: <FileText size={22} />,
    accentColor: '#F59E0B',
    applicableTech: ['llm-integration', 'rag', 'automation', 'prediction'],
    useCases: [
      'BTM proprietary Intelligent Document Recognition (IDR) for unstructured PDFs',
      'Automated legal contract clause extraction and risk flagging',
      'Medical records & insurance claims parsing with strict compliance',
      'Multi-document cross-comparison and discrepancy reconciliation',
    ],
    timeline: '3 – 5 Weeks Model Tuning & Validation',
  },
];

interface AiTechBadge {
  id: AiTechType;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

const AI_TECH_CATALOG: Record<AiTechType, AiTechBadge> = {
  'ai-agent': {
    id: 'ai-agent',
    title: 'AI Agent',
    desc: 'Autonomous multi-step reasoning & tool execution',
    icon: <Bot size={16} />,
    color: '#38BDF8',
  },
  rag: {
    id: 'rag',
    title: 'RAG (Retrieval-Augmented)',
    desc: 'Grounds LLM outputs in your private company data without hallucinations',
    icon: <Database size={16} />,
    color: '#06B6D4',
  },
  automation: {
    id: 'automation',
    title: 'Automation & RPA',
    desc: 'Robotic bots eliminating repetitive manual screen & API tasks',
    icon: <Workflow size={16} />,
    color: '#8B5CF6',
  },
  prediction: {
    id: 'prediction',
    title: 'Prediction & ML',
    desc: 'Statistical machine learning for demand, risk & churn forecasting',
    icon: <LineChart size={16} />,
    color: '#10B981',
  },
  'llm-integration': {
    id: 'llm-integration',
    title: 'LLM Integration',
    desc: 'Custom-tuned foundation models integrated securely into your app stack',
    icon: <BrainCircuit size={16} />,
    color: '#F59E0B',
  },
};

export interface AiOpportunityFinderSectionProps {
  onExploreAiPathClick?: (aiDetails: {
    domain: AiDomain;
    domainTitle: string;
    applicableTech: AiTechType[];
    useCases: string[];
    timeline: string;
  }) => void;
}

export const AiOpportunityFinderSection: React.FC<AiOpportunityFinderSectionProps> = ({
  onExploreAiPathClick,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<AiDomain>('documents');

  const currentDomainConfig = useMemo(() => {
    return AI_DOMAINS.find((d) => d.id === selectedDomain) || AI_DOMAINS[0];
  }, [selectedDomain]);

  return (
    <section className="btm-aifinder-root" id="ai-finder">
      <div className="btm-aifinder-container">
        {/* Section Header */}
        <div className="btm-aifinder-header">
          <Badge variant="cyan" dot className="mb-3">
            Practical Enterprise AI Engine
          </Badge>
          <h2 className="btm-aifinder-title">
            Where could AI make your <GradientText variant="accent">business better?</GradientText>
          </h2>
          <p className="btm-aifinder-subtitle">
            Skip the buzzwords. Select your high-friction operational area to inspect concrete AI architectures engineered for verified ROI.
          </p>
        </div>

        {/* The 6 Business Opportunity Cards Grid */}
        <div className="btm-ai-domain-grid">
          {AI_DOMAINS.map((domain) => {
            const isSelected = selectedDomain === domain.id;
            return (
              <button
                key={domain.id}
                type="button"
                className={`btm-ai-domain-card ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedDomain(domain.id)}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className="btm-ai-icon-pill"
                    style={{ color: domain.accentColor, borderColor: `${domain.accentColor}33` }}
                  >
                    {domain.icon}
                  </div>
                  {isSelected && <span className="btm-ai-check-badge">Active Selection ✓</span>}
                </div>

                <h3 className="btm-ai-card-title">{domain.title}</h3>
                <p className="btm-ai-card-subtitle">{domain.subtitle}</p>

                <div className="btm-ai-impact-tag">
                  <Sparkles size={12} style={{ color: domain.accentColor }} />
                  <span>{domain.impact}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic AI Technical Recommendation Stage */}
        <div className="btm-ai-recommendation-panel">
          {/* Header */}
          <div className="btm-ai-rec-header">
            <div>
              <span className="btm-ai-rec-eyebrow">MATCHED AI ARCHITECTURE MATRIX</span>
              <h3 className="btm-ai-rec-title">
                AI Blueprint for {currentDomainConfig.title} Operations
              </h3>
            </div>
            <div className="btm-ai-timeline-pill">
              <Zap size={14} className="text-amber-400" />
              <span>{currentDomainConfig.timeline}</span>
            </div>
          </div>

          {/* Applicable AI Building Blocks */}
          <div className="btm-ai-tech-blocks-section">
            <h4 className="btm-ai-section-label">Your selected opportunity could potentially use:</h4>
            <div className="btm-ai-tech-chips-grid">
              {currentDomainConfig.applicableTech.map((techId) => {
                const tech = AI_TECH_CATALOG[techId];
                return (
                  <div key={techId} className="btm-ai-tech-chip">
                    <div className="flex items-center gap-2 mb-1" style={{ color: tech.color }}>
                      {tech.icon}
                      <span className="font-bold text-slate-100 text-sm">{tech.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-snug">{tech.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Concrete Implementation Use-Cases */}
          <div className="btm-ai-usecases-section">
            <h4 className="btm-ai-section-label">Target Production Deliverables:</h4>
            <div className="btm-ai-usecases-grid">
              {currentDomainConfig.useCases.map((useCase, idx) => (
                <div key={idx} className="btm-ai-usecase-item">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout */}
          <div className="btm-ai-action-footer">
            <div className="btm-ai-action-text">
              <h4 className="text-white font-bold text-base mb-1">
                Explore feasibility for your {currentDomainConfig.title.toLowerCase()} workflows?
              </h4>
              <p className="text-slate-400 text-xs">
                Our AI engineers will evaluate your proprietary data readiness, security boundaries, and calculate model inference costs.
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="btm-ai-explore-btn"
              onClick={() =>
                onExploreAiPathClick?.({
                  domain: selectedDomain,
                  domainTitle: currentDomainConfig.title,
                  applicableTech: currentDomainConfig.applicableTech,
                  useCases: currentDomainConfig.useCases,
                  timeline: currentDomainConfig.timeline,
                })
              }
              icon={<ArrowRight size={18} />}
            >
              Explore My AI Path →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
