import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  ShoppingBag,
  Smartphone,
  Building2,
  HeartPulse,
  Coins,
  Sparkles,
  Lightbulb,
  Palette,
  Rocket,
  RefreshCw,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  Code,
  ShieldCheck,
} from 'lucide-react';
import { Badge, Button, GradientText } from '../ui';
import './productFinder.css';

export type ProductType =
  | 'saas'
  | 'marketplace'
  | 'mobile-app'
  | 'enterprise-platform'
  | 'healthcare'
  | 'fintech'
  | 'ai-product';

export type ProductStage = 'idea' | 'prototype' | 'mvp' | 'existing-product' | 'scaling';

interface ProductTypeOption {
  id: ProductType;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
}

const PRODUCT_TYPES: ProductTypeOption[] = [
  {
    id: 'saas',
    title: 'SaaS',
    subtitle: 'Multi-tenant cloud web applications',
    icon: <Layers size={20} />,
    accentColor: '#38BDF8',
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    subtitle: 'Two-sided transactional platforms',
    icon: <ShoppingBag size={20} />,
    accentColor: '#06B6D4',
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    subtitle: 'Native iOS, Android & Cross-Platform',
    icon: <Smartphone size={20} />,
    accentColor: '#3B82F6',
  },
  {
    id: 'enterprise-platform',
    title: 'Enterprise Platform',
    subtitle: 'Internal workflows & high-security portals',
    icon: <Building2 size={20} />,
    accentColor: '#8B5CF6',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    subtitle: 'HIPAA-compliant healthtech systems',
    icon: <HeartPulse size={20} />,
    accentColor: '#10B981',
  },
  {
    id: 'fintech',
    title: 'Fintech',
    subtitle: 'Fixed income, payments & financial analytics',
    icon: <Coins size={20} />,
    accentColor: '#F59E0B',
  },
  {
    id: 'ai-product',
    title: 'AI Product',
    subtitle: 'LLMs, NLP, Document IDR & intelligent bots',
    icon: <Sparkles size={20} />,
    accentColor: '#C084FC',
  },
];

interface ProductStageOption {
  id: ProductStage;
  title: string;
  subtitle: string;
  startIndex: number;
  icon: React.ReactNode;
}

const PRODUCT_STAGES: ProductStageOption[] = [
  {
    id: 'idea',
    title: 'Idea',
    subtitle: 'Concept phase & initial vision',
    startIndex: 0,
    icon: <Lightbulb size={18} />,
  },
  {
    id: 'prototype',
    title: 'Prototype',
    subtitle: 'Wireframes & design mockups ready',
    startIndex: 1,
    icon: <Palette size={18} />,
  },
  {
    id: 'mvp',
    title: 'MVP',
    subtitle: 'Seeking initial market validation',
    startIndex: 3,
    icon: <Rocket size={18} />,
  },
  {
    id: 'existing-product',
    title: 'Existing Product',
    subtitle: 'Live product needing new features/modernization',
    startIndex: 3,
    icon: <RefreshCw size={18} />,
  },
  {
    id: 'scaling',
    title: 'Scaling',
    subtitle: 'Growing user base & enterprise infrastructure',
    startIndex: 5,
    icon: <TrendingUp size={18} />,
  },
];

const JOURNEY_STEPS = [
  { step: 'Discovery', label: '1. Discovery', desc: 'Scope, feasibility & user personas', icon: <Compass size={16} /> },
  { step: 'UX', label: '2. UX & UI', desc: 'Clickable prototypes & design system', icon: <Palette size={16} /> },
  { step: 'Architecture', label: '3. Architecture', desc: 'Cloud, database & API blueprint', icon: <Layers size={16} /> },
  { step: 'Build', label: '4. Build', desc: 'Agile sprints with Top 1% engineers', icon: <Code size={16} /> },
  { step: 'QA', label: '5. QA Testing', desc: 'Automated test suites & security', icon: <ShieldCheck size={16} /> },
  { step: 'Launch', label: '6. Launch', desc: 'Production deployment & monitoring', icon: <Rocket size={16} /> },
  { step: 'Scale', label: '7. Scale', desc: 'Continuous iteration & optimization', icon: <TrendingUp size={16} /> },
];

export interface ProductFinderSectionProps {
  onBuildRoadmapClick?: (productDetails: {
    type: ProductType;
    stage: ProductStage;
    journey: typeof JOURNEY_STEPS;
    timelineEstimate: string;
  }) => void;
}

export const ProductFinderSection: React.FC<ProductFinderSectionProps> = ({ onBuildRoadmapClick }) => {
  const [selectedType, setSelectedType] = useState<ProductType>('saas');
  const [selectedStage, setSelectedStage] = useState<ProductStage>('idea');

  // Find active stage configuration
  const currentStageConfig = useMemo(() => {
    return PRODUCT_STAGES.find((s) => s.id === selectedStage) || PRODUCT_STAGES[0];
  }, [selectedStage]);

  const currentTypeConfig = useMemo(() => {
    return PRODUCT_TYPES.find((t) => t.id === selectedType) || PRODUCT_TYPES[0];
  }, [selectedType]);

  // Dynamic delivery timeframe
  const timelineEstimate = useMemo(() => {
    if (selectedStage === 'idea') return '8 – 14 Weeks (Discovery to Launch)';
    if (selectedStage === 'prototype') return '6 – 10 Weeks (Architecture to Launch)';
    if (selectedStage === 'mvp') return '4 – 8 Weeks (Core Build & Release)';
    if (selectedStage === 'existing-product') return 'Agile Continuous Sprints (2-Week Iterations)';
    return 'Dedicated Scaling Pod (Immediate Ramp-Up)';
  }, [selectedStage]);

  return (
    <section className="btm-productfinder-root" id="product-finder">
      <div className="btm-productfinder-container">
        {/* Section Header */}
        <div className="btm-productfinder-header">
          <Badge variant="violet" dot className="mb-3">
            Startup & Product Lifecycle Engine
          </Badge>
          <h2 className="btm-productfinder-title">
            Product Finder for <GradientText variant="accent">Visionary Builders</GradientText>
          </h2>
          <p className="btm-productfinder-subtitle">
            Whether you are launching an MVP or scaling an enterprise platform, configure your custom engineering roadmap in seconds.
          </p>
        </div>

        {/* Question 1: What are you building? */}
        <div className="btm-pf-block">
          <div className="btm-pf-question-header">
            <span className="btm-pf-step-badge">Question 1</span>
            <h3 className="btm-pf-question-title">What are you building?</h3>
          </div>

          <div className="btm-pf-types-grid">
            {PRODUCT_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  className={`btm-pf-type-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <div className="flex items-center gap-2" style={{ color: type.accentColor }}>
                      {type.icon}
                      <span className="font-bold text-slate-100 text-sm">{type.title}</span>
                    </div>
                    {isSelected && <span className="btm-pf-checked-bullet">✓</span>}
                  </div>
                  <span className="text-xs text-slate-400 block text-left">{type.subtitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 2: Where are you now? */}
        <div className="btm-pf-block">
          <div className="btm-pf-question-header">
            <span className="btm-pf-step-badge">Question 2</span>
            <h3 className="btm-pf-question-title">Where are you now?</h3>
          </div>

          <div className="btm-pf-stages-grid">
            {PRODUCT_STAGES.map((stage) => {
              const isSelected = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  className={`btm-pf-stage-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedStage(stage.id)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sky-400">{stage.icon}</span>
                    <span className="font-bold text-slate-100 text-sm">{stage.title}</span>
                  </div>
                  <span className="text-xs text-slate-400 block text-left">{stage.subtitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Result: Recommended Journey Roadmap */}
        <div className="btm-pf-journey-result-panel">
          <div className="btm-pf-journey-header">
            <div>
              <span className="btm-pf-journey-eyebrow">YOUR CUSTOMIZED PRODUCT ROADMAP</span>
              <h3 className="btm-pf-journey-title">
                {currentTypeConfig.title} Roadmap • Starting at "{currentStageConfig.title}" Stage
              </h3>
            </div>
            <div className="btm-pf-timeline-badge">
              <Clock size={15} className="text-sky-400" />
              <span>{timelineEstimate}</span>
            </div>
          </div>

          {/* Interactive Timeline Stepper */}
          <div className="btm-pf-timeline-container">
            <div className="btm-pf-timeline-track">
              {JOURNEY_STEPS.map((stepItem, idx) => {
                const isPastOrCurrent = idx >= currentStageConfig.startIndex;
                return (
                  <div
                    key={stepItem.step}
                    className={`btm-pf-timeline-node ${isPastOrCurrent ? 'active' : 'pre-stage'}`}
                  >
                    <div className="btm-node-dot-wrap">
                      <div className="btm-node-dot">
                        {isPastOrCurrent ? stepItem.icon : <span className="btm-dot-dim" />}
                      </div>
                      {idx < JOURNEY_STEPS.length - 1 && (
                        <div className={`btm-node-connector ${isPastOrCurrent ? 'active' : ''}`} />
                      )}
                    </div>
                    <div className="btm-node-content">
                      <span className="btm-node-title">{stepItem.label}</span>
                      <span className="btm-node-desc">{stepItem.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Roadmap Action Callout */}
          <div className="btm-pf-roadmap-cta-wrap">
            <div className="btm-pf-roadmap-summary">
              <h4 className="text-white font-bold text-base mb-1">
                Ready to engineer your {currentTypeConfig.title}?
              </h4>
              <p className="text-slate-400 text-xs">
                Our senior product architects will review your requirements, create an architectural blueprint, and assemble your dedicated engineering team.
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="btm-roadmap-btn"
              onClick={() =>
                onBuildRoadmapClick?.({
                  type: selectedType,
                  stage: selectedStage,
                  journey: JOURNEY_STEPS,
                  timelineEstimate,
                })
              }
              icon={<ArrowRight size={18} />}
            >
              Build My Roadmap →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
