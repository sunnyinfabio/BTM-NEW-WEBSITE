import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Clock, Layers, Users, Zap, ExternalLink } from 'lucide-react';
import { Badge, Button } from '../ui';

export interface CaseStudyData {
  id: string;
  category: string;
  title: string;
  tagline: string;
  techStack: string[];
  imageGradient: string;
  imageAccentIcon: React.ReactNode;
  heroHeadline: string;
  challenge: string;
  solution: string;
  teamComposition: string[];
  outcomes: string[];
  metrics: { label: string; value: string }[];
}

export interface CaseStudyModalProps {
  caseStudy: CaseStudyData | null;
  isOpen: boolean;
  onClose: () => void;
  onDiscussProjectClick?: (caseStudy: CaseStudyData) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  isOpen,
  onClose,
  onDiscussProjectClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="btm-case-modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="btm-case-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Floating Bar */}
            <div className="btm-case-modal-topbar">
              <Badge variant="cyan">{caseStudy.category}</Badge>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Case Study"
                className="btm-case-modal-close-btn"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="btm-case-modal-scrollable">
              {/* Hero Banner Visual */}
              <div
                className="btm-case-modal-hero"
                style={{ background: caseStudy.imageGradient }}
              >
                <div className="btm-case-hero-overlay" />
                <div className="btm-case-hero-content">
                  <div className="btm-case-hero-icon-bubble">{caseStudy.imageAccentIcon}</div>
                  <span className="btm-case-hero-cat">{caseStudy.category} PLATFORM</span>
                  <h2 className="btm-case-hero-title">{caseStudy.title}</h2>
                  <p className="btm-case-hero-tagline">{caseStudy.tagline}</p>
                </div>
              </div>

              {/* Metrics Ribbon */}
              <div className="btm-case-metrics-ribbon">
                {caseStudy.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="btm-case-metric-card">
                    <span className="btm-case-metric-value">{metric.value}</span>
                    <span className="btm-case-metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* Case Details Content Grid */}
              <div className="btm-case-content-grid">
                {/* Left Column: Challenge & Solution */}
                <div className="btm-case-narrative">
                  <div className="mb-6">
                    <h3 className="btm-case-section-title">The Engineering Challenge</h3>
                    <p className="btm-case-p">{caseStudy.challenge}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="btm-case-section-title">The BTM Solution & Architecture</h3>
                    <p className="btm-case-p">{caseStudy.solution}</p>
                  </div>

                  <div>
                    <h3 className="btm-case-section-title">Key Measurable Outcomes</h3>
                    <ul className="btm-case-outcomes-list">
                      {caseStudy.outcomes.map((outcome, oIdx) => (
                        <li key={oIdx} className="btm-case-outcome-item">
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Tech Stack & Team Pod */}
                <div className="btm-case-sidebar">
                  {/* Technology Matrix */}
                  <div className="btm-sidebar-box mb-4">
                    <h4 className="btm-sidebar-heading">Technology Stack</h4>
                    <div className="btm-case-tech-badges">
                      {caseStudy.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="btm-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Team Pod Composition */}
                  <div className="btm-sidebar-box mb-6">
                    <h4 className="btm-sidebar-heading">BTM Team Allocation</h4>
                    <ul className="btm-team-pod-list">
                      {caseStudy.teamComposition.map((role, rIdx) => (
                        <li key={rIdx} className="btm-team-pod-role">
                          <Users size={14} className="text-sky-400" />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Action */}
                  <div className="btm-case-discuss-card">
                    <h4 className="text-white font-bold text-sm mb-1">
                      Building a similar {caseStudy.category} platform?
                    </h4>
                    <p className="text-slate-400 text-xs mb-4">
                      Our senior architects will prepare an architectural breakdown and scope estimate for your roadmap.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={() => onDiscussProjectClick?.(caseStudy)}
                      icon={<ArrowRight size={18} />}
                    >
                      Discuss This Solution →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
