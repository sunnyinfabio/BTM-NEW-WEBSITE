import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Users,
  Briefcase,
  Sparkles,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  ShoppingBag,
  FlaskConical,
  Activity,
  Boxes,
  Flame,
  RotateCcw,
} from 'lucide-react';
import {
  useSolutionFinder,
  type GoalId,
  type IndustryId,
  INDUSTRY_OPTIONS,
  GOAL_TITLES,
  INDUSTRY_NAMES,
} from '../../context/SolutionFinderContext';
import { Button, Badge } from '../ui';
import {
  CustomSoftwareVisual,
  StaffAugVisual,
  DedicatedTeamsVisual,
  EmergingTechVisual,
  ModernizationVisual,
  QaVisual,
  StrategicAdvisorVisual,
} from '../ui/ConceptualVisuals';
import './solutionFinder.css';

interface GoalCardData {
  id: GoalId;
  title: string;
  oneLiner: string;
  icon: React.ReactNode;
  accentColor: string;
  badge?: string;
  visualComponent: React.ReactNode;
}

const GOAL_CARDS: GoalCardData[] = [
  {
    id: 'build-product',
    title: 'Custom Software',
    oneLiner: 'Turn your concept into a scalable web or mobile application',
    icon: <Code size={22} />,
    accentColor: '#0B2653',
    badge: 'Build a Product',
    visualComponent: <CustomSoftwareVisual />,
  },
  {
    id: 'find-developers',
    title: 'Staff Augmentation',
    oneLiner: 'Augment your existing team with Top 1% vetted engineers',
    icon: <Users size={22} />,
    accentColor: '#EC1C24',
    badge: 'Find Developers',
    visualComponent: <StaffAugVisual />,
  },
  {
    id: 'dedicated-team',
    title: 'Managed Pods',
    oneLiner: 'Deploy an autonomous engineering pod with tech lead & agile governance',
    icon: <Briefcase size={22} />,
    accentColor: '#00875A',
    badge: 'Dedicated Team',
    visualComponent: <DedicatedTeamsVisual />,
  },
  {
    id: 'add-ai',
    title: 'Emerging Tech',
    oneLiner: 'Integrate intelligent document recognition, NLP, ML & RPA automation',
    icon: <Sparkles size={22} />,
    accentColor: '#6F42C1',
    badge: 'Add AI & ML',
    visualComponent: <EmergingTechVisual />,
  },
  {
    id: 'modernize-tech',
    title: 'Modernization',
    oneLiner: 'Decompose monoliths, migrate to cloud & refactor legacy codebases',
    icon: <RefreshCw size={22} />,
    accentColor: '#0B2653',
    badge: 'Modernize Tech',
    visualComponent: <ModernizationVisual />,
  },
  {
    id: 'improve-quality',
    title: 'QA & Testing',
    oneLiner: 'Build CI/CD automated test suites and eradicate production bugs',
    icon: <CheckCircle size={22} />,
    accentColor: '#00875A',
    badge: 'Improve Quality',
    visualComponent: <QaVisual />,
  },
  {
    id: 'not-sure',
    title: "I'm Not Sure",
    oneLiner: 'Get an unbiased architectural roadmap and engagement recommendation',
    icon: <HelpCircle size={22} />,
    accentColor: '#0B2653',
    badge: 'Free Diagnostic',
    visualComponent: <StrategicAdvisorVisual />,
  },
];

const INDUSTRY_ICONS: Record<IndustryId, React.ReactNode> = {
  'capital-market': <TrendingUp size={18} />,
  'retail': <ShoppingBag size={18} />,
  'pharma': <FlaskConical size={18} />,
  'healthcare': <Activity size={18} />,
  'fmcg': <Boxes size={18} />,
  'oil-and-gas': <Flame size={18} />,
};

export interface SolutionFinderSectionProps {
  onActionTrigger?: (matrixPayload: {
    goalId: GoalId;
    industryId: IndustryId | null;
    title: string;
    category: string;
    details: string;
    summaryItems: { label: string; value: string }[];
  }) => void;
}

export const SolutionFinderSection: React.FC<SolutionFinderSectionProps> = ({
  onActionTrigger,
}) => {
  const {
    selectedGoal,
    selectedIndustry,
    funnelStep,
    matrixRecommendation,
    setSelectedGoal,
    setSelectedIndustry,
    setFunnelStep,
    reset,
  } = useSolutionFinder();

  const industrySectionRef = useRef<HTMLDivElement>(null);
  const recommendationSectionRef = useRef<HTMLDivElement>(null);

  const handleGoalSelect = (goalId: GoalId) => {
    setSelectedGoal(goalId);
    setTimeout(() => {
      industrySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
  };

  const handleIndustrySelect = (industryId: IndustryId) => {
    setSelectedIndustry(industryId);
    setTimeout(() => {
      recommendationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
  };

  const handleActionClick = () => {
    if (!selectedGoal || !matrixRecommendation) return;

    onActionTrigger?.({
      goalId: selectedGoal,
      industryId: selectedIndustry,
      title: matrixRecommendation.matrixTitle,
      category: `${selectedIndustry ? INDUSTRY_NAMES[selectedIndustry] : 'Enterprise'} Pathway`,
      details: matrixRecommendation.recommendedNextStep,
      summaryItems: [
        { label: 'Selected Goal', value: GOAL_TITLES[selectedGoal].split('(')[0].trim() },
        { label: 'Industry Practice', value: selectedIndustry ? INDUSTRY_NAMES[selectedIndustry] : 'General Enterprise' },
        { label: 'Estimated Timeline', value: matrixRecommendation.timelineEstimate },
      ],
    });
  };

  return (
    <section className="btm-solution-finder-root" id="solution-finder">
      <div className="btm-solution-finder-container">
        {/* Section Header */}
        <div className="btm-finder-header">
          <Badge variant="primary" dot className="mb-3">
            Interactive Pathway Advisor
          </Badge>
          <h2 className="btm-finder-title">
            What are you trying to <span style={{ color: '#EC1C24' }}>achieve?</span>
          </h2>
          <p className="btm-finder-subtitle">
            Choose your goal and industry. We'll generate your tailored BTM technology blueprint.
          </p>
        </div>

        {/* Lightweight Funnel Stepper Progress Bar */}
        <div className="btm-funnel-stepper" role="navigation" aria-label="Solution Pathway Funnel">
          <button
            type="button"
            className={`btm-stepper-item ${!selectedGoal ? 'active' : 'completed'}`}
            onClick={() => setFunnelStep('goal')}
          >
            <span>1. Goal:</span>
            <span>{selectedGoal ? GOAL_TITLES[selectedGoal].split('(')[0].trim() : 'Select'}</span>
          </button>

          <span className="btm-stepper-arrow">→</span>

          <button
            type="button"
            className={`btm-stepper-item ${selectedGoal && !selectedIndustry ? 'active' : selectedIndustry ? 'completed' : ''}`}
            onClick={() => setFunnelStep('industry')}
          >
            <span>2. Industry:</span>
            <span>{selectedIndustry ? INDUSTRY_NAMES[selectedIndustry] : 'Select'}</span>
          </button>

          <span className="btm-stepper-arrow">→</span>

          <button
            type="button"
            className={`btm-stepper-item ${selectedGoal && selectedIndustry ? 'active' : ''}`}
            onClick={() => setFunnelStep('recommendation')}
            disabled={!selectedGoal}
          >
            <span>3. Blueprint Pathway</span>
          </button>

          {(selectedGoal || selectedIndustry) && (
            <button
              type="button"
              onClick={reset}
              className="btm-stepper-item"
              style={{ marginLeft: 'auto', color: 'var(--brand-red)' }}
              title="Reset selection"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Step 1: The 7 Interactive Goal Cards Grid */}
        <div className="btm-finder-cards-grid" role="radiogroup" aria-label="Select your technology goal">
          {GOAL_CARDS.map((card, idx) => {
            const isSelected = selectedGoal === card.id;

            return (
              <motion.div
                key={card.id}
                role="radio"
                tabIndex={0}
                aria-checked={isSelected}
                aria-expanded={isSelected}
                className={`btm-finder-card ${isSelected ? 'selected' : ''} ${card.id === 'not-sure' ? 'card-not-sure' : ''}`}
                onClick={() => handleGoalSelect(card.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleGoalSelect(card.id);
                  }
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
              >
                <div className="btm-card-header">
                  <div
                    className="btm-card-icon-wrapper"
                    style={{ color: card.accentColor, borderColor: `${card.accentColor}33` }}
                  >
                    {card.icon}
                  </div>
                  {card.badge && (
                    <span className="btm-card-badge-pill" style={{ color: card.accentColor }}>
                      {card.badge}
                    </span>
                  )}
                </div>

                <div className="btm-card-body">
                  <h3 className="btm-card-title">{card.title}</h3>
                  <p className="btm-card-oneliner">{card.oneLiner}</p>

                  <div className="btm-card-conceptual-graphic">
                    {card.visualComponent}
                  </div>
                </div>

                <div className="btm-card-footer">
                  <span className="btm-card-action-indicator">
                    {isSelected ? 'Selected Goal ✓' : 'Select Goal →'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Step 2: "Which industry are you building for?" (Appears when Goal is selected) */}
        <AnimatePresence>
          {selectedGoal && (
            <motion.div
              ref={industrySectionRef}
              className="btm-industry-selector-section"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="btm-industry-selector-header">
                <Badge variant="cyan" dot className="mb-2">
                  DIMENSION 2
                </Badge>
                <h3 className="btm-industry-selector-title">
                  Which industry are you building for?
                </h3>
                <p className="btm-industry-selector-subtitle">
                  Select your sector so we can tailor the architectural patterns, compliance boundaries, and pod structure.
                </p>
              </div>

              <div className="btm-industry-pills-grid" role="radiogroup" aria-label="Select industry">
                {INDUSTRY_OPTIONS.map((ind) => {
                  const isIndSelected = selectedIndustry === ind.id;

                  return (
                    <button
                      key={ind.id}
                      type="button"
                      role="radio"
                      aria-checked={isIndSelected}
                      className={`btm-industry-selector-card ${isIndSelected ? 'active' : ''}`}
                      onClick={() => handleIndustrySelect(ind.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">{INDUSTRY_ICONS[ind.id]}</span>
                        <span className="btm-industry-card-name">{ind.name}</span>
                      </div>
                      <ChevronRight size={16} className={isIndSelected ? 'text-white' : 'text-slate-400'} />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Dynamic 2D Matrix Recommendation Stage ("YOUR BTM PATH") */}
        <AnimatePresence mode="wait">
          {selectedGoal && matrixRecommendation && (
            <motion.div
              ref={recommendationSectionRef}
              key={`${selectedGoal}-${selectedIndustry || 'general'}`}
              className="btm-expanded-pathway-stage"
              initial={{ opacity: 0, y: 25, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="btm-pathway-inner-card">
                {/* Pathway Top Banner */}
                <div className="btm-pathway-header">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="btm-pathway-eyebrow">
                        <Sparkles size={14} />
                        YOUR BTM PATH
                      </span>
                      <Badge variant="primary">
                        {matrixRecommendation.combinationBadge}
                      </Badge>
                    </div>
                    <h3 className="btm-pathway-title">{matrixRecommendation.matrixTitle}</h3>
                  </div>

                  <div className="btm-pathway-quick-meta">
                    <div className="btm-meta-pill">
                      <Clock size={14} className="text-[#0B2653]" />
                      <span>{matrixRecommendation.timelineEstimate}</span>
                    </div>
                    <div className="btm-meta-pill">
                      <Briefcase size={14} className="text-[#00875A]" />
                      <span>{matrixRecommendation.engagementModels[0]}</span>
                    </div>
                  </div>
                </div>

                {/* 4-Step Sequence Flow Visual */}
                <div className="btm-pathway-sequence-wrap">
                  <div className="btm-sequence-label">Architectural Blueprint Flow</div>
                  <div className="btm-sequence-steps-row">
                    {matrixRecommendation.pillarSequence.map((stepName, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <span className="btm-sequence-step-pill">{stepName}</span>
                        {sIdx < matrixRecommendation.pillarSequence.length - 1 && (
                          <span className="btm-sequence-step-arrow">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Pathway Content Columns */}
                <div className="btm-pathway-grid">
                  {/* Left Column: Tailored Solution Focus Areas */}
                  <div className="btm-pathway-details">
                    <div className="mb-4">
                      <h4 className="btm-pathway-section-label">Tailored Solution Focus Areas</h4>
                      <div className="btm-pathway-tailored-areas">
                        {matrixRecommendation.tailoredSolutionAreas.map((area, aIdx) => (
                          <div key={aIdx} className="btm-tailored-area-box">
                            <h5 className="btm-tailored-area-title">{area.title}</h5>
                            <p className="btm-tailored-area-desc">{area.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="btm-pathway-section-label">Verified Delivery Governance</h4>
                      <ul className="btm-pathway-checklist">
                        {matrixRecommendation.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="btm-checklist-item">
                            <CheckCircle2 size={16} className="text-[#00875A] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Next Step & Personalized Dynamic CTA */}
                  <div className="btm-pathway-action-box">
                    <div className="btm-action-box-inner">
                      <h4 className="btm-action-box-title">Recommended Next Step</h4>
                      <p className="btm-action-box-text">{matrixRecommendation.recommendedNextStep}</p>

                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full mt-4"
                        onClick={handleActionClick}
                        icon={<ArrowRight size={18} />}
                      >
                        {matrixRecommendation.personalizedCta}
                      </Button>

                      <div className="btm-action-box-footer">
                        <span>Direct Senior Advisory Access:</span>
                        <a href="tel:+18624371138" className="btm-phone-direct">
                          📞 US: +1-862-437-1138
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
