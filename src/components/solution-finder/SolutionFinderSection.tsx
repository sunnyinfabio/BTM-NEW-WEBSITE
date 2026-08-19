import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Code,
  Users,
  Sparkles,
  Zap,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Briefcase,
} from 'lucide-react';
import { useSolutionFinder, type GoalId } from '../../context/SolutionFinderContext';
import { Badge, Button, GradientText } from '../ui';
import {
  WebConceptualVisual,
  MobileConceptualVisual,
  AiConceptualVisual,
  CloudConceptualVisual,
  DataConceptualVisual,
  QaConceptualVisual,
} from '../visuals/ConceptualVisuals';
import './solutionFinder.css';

interface GoalCardConfig {
  id: GoalId;
  title: string;
  oneLiner: string;
  icon: React.ReactNode;
  accentColor: string;
  badge?: string;
  visualComponent: React.ReactNode;
}

const GOAL_CARDS: GoalCardConfig[] = [
  {
    id: 'build-product',
    title: 'Build a Product',
    oneLiner: 'Turn your concept into a scalable web or mobile application',
    icon: <Layers size={24} />,
    accentColor: '#38BDF8',
    badge: 'Custom Software',
    visualComponent: <WebConceptualVisual />,
  },
  {
    id: 'find-developers',
    title: 'Find Developers',
    oneLiner: 'Augment your existing team with Top 1% vetted engineers',
    icon: <Code size={24} />,
    accentColor: '#3B82F6',
    badge: 'Staff Augmentation',
    visualComponent: <DataConceptualVisual />,
  },
  {
    id: 'dedicated-team',
    title: 'Build a Dedicated Team',
    oneLiner: 'Deploy an autonomous engineering pod with tech lead & agile governance',
    icon: <Users size={24} />,
    accentColor: '#8B5CF6',
    badge: 'Managed Pods',
    visualComponent: <CloudConceptualVisual />,
  },
  {
    id: 'add-ai',
    title: 'Add AI',
    oneLiner: 'Integrate intelligent document recognition, NLP, ML & RPA automation',
    icon: <Sparkles size={24} />,
    accentColor: '#C084FC',
    badge: 'Emerging Tech',
    visualComponent: <AiConceptualVisual />,
  },
  {
    id: 'modernize-tech',
    title: 'Modernize Technology',
    oneLiner: 'Refactor legacy code, migrate to cloud microservices & eliminate tech debt',
    icon: <Zap size={24} />,
    accentColor: '#06B6D4',
    badge: 'Cloud & Architecture',
    visualComponent: <CloudConceptualVisual />,
  },
  {
    id: 'improve-quality',
    title: 'Improve Quality',
    oneLiner: 'Automate QA test suites, eliminate regression bugs & accelerate releases',
    icon: <ShieldCheck size={24} />,
    accentColor: '#10B981',
    badge: 'QA & Testing',
    visualComponent: <QaConceptualVisual />,
  },
  {
    id: 'not-sure',
    title: "I'm Not Sure",
    oneLiner: 'Explore options with an unbiased 30-minute technology advisor diagnostic',
    icon: <HelpCircle size={24} />,
    accentColor: '#94A3B8',
    badge: 'Free Consultation',
    visualComponent: <MobileConceptualVisual />,
  },
];

export interface SolutionFinderSectionProps {
  onActionTrigger?: (goalId: GoalId) => void;
}

export const SolutionFinderSection: React.FC<SolutionFinderSectionProps> = ({ onActionTrigger }) => {
  const { selectedGoal, setSelectedGoal, recommendation } = useSolutionFinder();

  const handleCardClick = (goalId: GoalId) => {
    setSelectedGoal(goalId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, goalId: GoalId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedGoal(goalId);
    }
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
            What are you trying to <GradientText>achieve?</GradientText>
          </h2>
          <p className="btm-finder-subtitle">
            Choose a goal. We'll show you the BTM path that fits.
          </p>
        </div>

        {/* The 7 Interactive Cards Grid */}
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
                onClick={() => handleCardClick(card.id)}
                onKeyDown={(e) => handleKeyDown(e, card.id)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
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
                    {isSelected ? 'Selected Pathway ✓' : 'Select Goal →'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Expanded Solution Pathway Stage */}
        <AnimatePresence mode="wait">
          {selectedGoal && recommendation && (
            <motion.div
              key={selectedGoal}
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
                      <span className="btm-pathway-eyebrow">RECOMMENDED BTM PATHWAY</span>
                    </div>
                    <h3 className="btm-pathway-title">{recommendation.title}</h3>
                  </div>

                  <div className="btm-pathway-quick-meta">
                    <div className="btm-meta-pill">
                      <Clock size={14} className="text-sky-400" />
                      <span>{recommendation.timelineEstimate}</span>
                    </div>
                    <div className="btm-meta-pill">
                      <Briefcase size={14} className="text-cyan-400" />
                      <span>{recommendation.engagementModels[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Pathway Content Columns */}
                <div className="btm-pathway-grid">
                  {/* Left Column: Services & Deliverables */}
                  <div className="btm-pathway-details">
                    <div className="mb-4">
                      <h4 className="btm-pathway-section-label">Matched BTM Capabilities</h4>
                      <div className="btm-pathway-services-wrap">
                        {recommendation.matchedServices.map((service, sIdx) => (
                          <Badge key={sIdx} variant="primary">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="btm-pathway-section-label">Key Delivery Outcomes</h4>
                      <ul className="btm-pathway-checklist">
                        {recommendation.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="btm-checklist-item">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Next Step & CTA Box */}
                  <div className="btm-pathway-action-box">
                    <div className="btm-action-box-inner">
                      <h4 className="btm-action-box-title">Recommended Next Step</h4>
                      <p className="btm-action-box-text">{recommendation.recommendedNextStep}</p>

                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full mt-4"
                        onClick={() => onActionTrigger?.(selectedGoal)}
                        icon={<ArrowRight size={18} />}
                      >
                        {recommendation.ctaText}
                      </Button>

                      <div className="btm-action-box-footer">
                        <span>Direct Leadership Access:</span>
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
