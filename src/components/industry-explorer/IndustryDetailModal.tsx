import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Sparkles } from 'lucide-react';
import { Button, Badge } from '../ui';
import { type IndustryData } from './IndustryCard';

export interface IndustryDetailModalProps {
  industry: IndustryData | null;
  isOpen: boolean;
  onClose: () => void;
  onConsultSectorAdvisor: (industry: IndustryData) => void;
}

export const IndustryDetailModal: React.FC<IndustryDetailModalProps> = ({
  industry,
  isOpen,
  onClose,
  onConsultSectorAdvisor,
}) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!industry) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="btm-industry-modal-backdrop"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="industry-modal-title"
        >
          <motion.div
            className="btm-industry-modal-window"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Sticky Topbar */}
            <div className="btm-industry-modal-topbar">
              <Badge variant="cyan" dot>
                {industry.name} Sector Practice
              </Badge>
              <button
                type="button"
                className="btm-case-modal-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Hero */}
            <div className="btm-industry-modal-hero">
              <img
                src={industry.imageUrl}
                alt={industry.imageAlt}
                className="btm-industry-modal-hero-bg"
              />
              <div className="btm-industry-modal-hero-scrim" />

              <div className="btm-industry-modal-hero-content">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="p-1.5 rounded-md bg-white/20 text-white"
                    aria-hidden="true"
                  >
                    {industry.icon}
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    BTM Enterprise Solutions
                  </span>
                </div>
                <h2 id="industry-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white font-primary mb-2">
                  {industry.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {industry.overview}
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="btm-industry-modal-body">
              {/* Verified Metrics Telemetry */}
              <div className="btm-industry-metrics-bar">
                {industry.metrics.map((m, idx) => (
                  <div key={idx} className="btm-industry-metric-item">
                    <span className="btm-industry-metric-val">{m.value}</span>
                    <span className="btm-industry-metric-lbl">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Challenge & Engineering Approach */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-bold text-[#0B2653] mb-2 font-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Complex Sector Challenge
                  </h3>
                  <p className="text-sm text-[#51668A] leading-relaxed">
                    {industry.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0B2653] mb-2 font-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    BTM Engineering Approach
                  </h3>
                  <p className="text-sm text-[#51668A] leading-relaxed">
                    {industry.approach}
                  </p>
                </div>
              </div>

              {/* Technical Capabilities Grid */}
              <div>
                <h3 className="text-base font-bold text-[#0B2653] mb-3 font-primary">
                  Key Technical Capabilities & Architectures
                </h3>
                <div className="btm-industry-caps-grid">
                  {industry.capabilities.map((cap, idx) => (
                    <div key={idx} className="btm-industry-cap-card">
                      <h4>{cap.title}</h4>
                      <p>{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Tags */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2653] mb-2">
                  Representative Core Tech Stack:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {industry.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-[#0B2653] border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call-to-Action Footer Box */}
              <div className="btm-industry-modal-cta-box">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-[#00C881]" />
                  <h4 className="text-base font-bold text-[#0B2653] font-primary">
                    Ready to modernize or build your {industry.name} platform?
                  </h4>
                </div>
                <p className="text-xs text-[#51668A] leading-relaxed">
                  Connect with our senior enterprise solutions architects to scope dedicated engineering pods, compliance boundaries, and delivery timelines.
                </p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      onClose();
                      onConsultSectorAdvisor(industry);
                    }}
                    icon={<ArrowRight size={16} />}
                  >
                    Scope My {industry.name} Pod →
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
