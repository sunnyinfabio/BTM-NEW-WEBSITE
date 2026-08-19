import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  ArrowRight,
  CheckCircle2,
  Building,
  User,
  Clock,
  Coins,
  FileText,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { Button, Input, Badge, ProgressBar, GradientText } from '../ui';
import './leadGen.css';

export interface LeadGenContextData {
  title: string;
  category?: string;
  details?: string;
  summaryItems?: { label: string; value: string }[];
}

export interface ProgressiveLeadGenDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contextData?: LeadGenContextData | null;
}

export const ProgressiveLeadGenDrawer: React.FC<ProgressiveLeadGenDrawerProps> = ({
  isOpen,
  onClose,
  contextData,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('CTO / VP Engineering');
  const [timeline, setTimeline] = useState('Immediate (48h – 2 Weeks)');
  const [budget, setBudget] = useState('Standard Pod / Flexible');
  const [projectDetails, setProjectDetails] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset step on open/close
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEmailError('');
    }
  }, [isOpen]);

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

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) {
      setEmailError('Please enter a valid work email address');
      return;
    }
    setEmailError('');
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 600);
  };

  const activeTitle = contextData?.title || 'Custom Engineering & Architecture Blueprint';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="btm-leadgen-backdrop" onClick={onClose}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="btm-leadgen-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Navigation */}
            <div className="btm-leadgen-topbar">
              <div className="flex items-center gap-2">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btm-leadgen-back-btn"
                    aria-label="Back to step 1"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}
                <span className="btm-leadgen-step-tag">
                  {step === 1 ? 'Step 1 of 2' : step === 2 ? 'Step 2 of 2' : 'Confirmed'}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close Drawer"
                className="btm-leadgen-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="btm-leadgen-body">
              {/* Context Summary Capsule */}
              {contextData && step !== 3 && (
                <div className="btm-leadgen-context-capsule">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-sky-400" />
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                      Selected Blueprint Target
                    </span>
                  </div>
                  <h4 className="text-white text-sm font-bold">{activeTitle}</h4>
                  {contextData.details && (
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{contextData.details}</p>
                  )}
                  {contextData.summaryItems && (
                    <div className="btm-capsule-items-list">
                      {contextData.summaryItems.map((item, idx) => (
                        <span key={idx} className="btm-capsule-pill">
                          <strong>{item.label}:</strong> {item.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 1: Zero-Friction Work Email Hook */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="btm-leadgen-prompt-title">
                    Want us to turn this into a <GradientText variant="accent">real plan?</GradientText>
                  </h3>
                  <p className="btm-leadgen-prompt-desc">
                    Enter your work email. We'll generate an architectural breakdown, team allocation model, and timeline estimate.
                  </p>

                  <form onSubmit={handleStep1Submit} className="btm-leadgen-form">
                    <div className="btm-input-wrap">
                      <label htmlFor="lead-work-email" className="btm-lead-label">
                        Work Email
                      </label>
                      <div className="relative">
                        <input
                          id="lead-work-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError('');
                          }}
                          placeholder="name@company.com"
                          className="btm-lead-input"
                          autoFocus
                          required
                        />
                      </div>
                      {emailError && <span className="btm-error-msg">{emailError}</span>}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full mt-2"
                      icon={<ArrowRight size={18} />}
                    >
                      Get My Recommendation →
                    </Button>
                  </form>

                  <div className="btm-leadgen-trust-bar">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      <span>Zero spam • 100% strict NDA</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-sky-400" />
                      <span>Architect response in &lt;24h</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Progressive Enrichment */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="btm-leadgen-prompt-title">
                    Almost there! <GradientText>Tailor Your Blueprint</GradientText>
                  </h3>
                  <p className="btm-leadgen-prompt-desc">
                    A few quick details so our technology leadership can configure your exact pod size and architecture.
                  </p>

                  <form onSubmit={handleStep2Submit} className="btm-leadgen-form">
                    <div className="btm-input-grid-2">
                      <div className="btm-input-wrap">
                        <label htmlFor="lead-name" className="btm-lead-label">Full Name *</label>
                        <input
                          id="lead-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your Name"
                          className="btm-lead-input"
                          required
                        />
                      </div>

                      <div className="btm-input-wrap">
                        <label htmlFor="lead-company" className="btm-lead-label">Company / Organization *</label>
                        <input
                          id="lead-company"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Company Name"
                          className="btm-lead-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="btm-input-grid-2">
                      <div className="btm-input-wrap">
                        <label htmlFor="lead-role" className="btm-lead-label">Your Role</label>
                        <select
                          id="lead-role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="btm-lead-select"
                        >
                          <option>CTO / VP Engineering</option>
                          <option>Founder / CEO</option>
                          <option>Head of Product / PM</option>
                          <option>Engineering Manager / Tech Lead</option>
                          <option>Other Executive</option>
                        </select>
                      </div>

                      <div className="btm-input-wrap">
                        <label htmlFor="lead-timeline" className="btm-lead-label">Target Timeline</label>
                        <select
                          id="lead-timeline"
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          className="btm-lead-select"
                        >
                          <option>Immediate (48h – 2 Weeks)</option>
                          <option>1 – 3 Months (Next Quarter)</option>
                          <option>3 – 6 Months (Planning)</option>
                          <option>Exploratory Feasibility</option>
                        </select>
                      </div>
                    </div>

                    <div className="btm-input-wrap">
                      <label htmlFor="lead-budget" className="btm-lead-label">Optional Budget Scope</label>
                      <select
                        id="lead-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="btm-lead-select"
                      >
                        <option>Standard Pod / Flexible</option>
                        <option>&lt; $25k Initial MVP / Trial</option>
                        <option>$25k – $50k Scoped Deliverable</option>
                        <option>$50k – $100k Dedicated Team</option>
                        <option>$100k+ Enterprise Architecture</option>
                      </select>
                    </div>

                    <div className="btm-input-wrap">
                      <label htmlFor="lead-notes" className="btm-lead-label">Project Details / Notes (Optional)</label>
                      <textarea
                        id="lead-notes"
                        rows={3}
                        value={projectDetails}
                        onChange={(e) => setProjectDetails(e.target.value)}
                        placeholder="Tell us about specific tech stacks, compliance requirements, or existing codebases..."
                        className="btm-lead-textarea"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full mt-2"
                      icon={<ArrowRight size={18} />}
                    >
                      Send My Custom Blueprint →
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: Instant Confirmation & Direct Next Steps */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="btm-leadgen-success-card"
                >
                  <div className="btm-success-icon-bubble">
                    <CheckCircle2 size={36} color="#34d399" />
                  </div>

                  <h3 className="btm-success-title">Blueprint Request Confirmed!</h3>
                  <p className="btm-success-desc">
                    Thank you, <strong className="text-white">{fullName || 'Builder'}</strong>. Your custom plan for <strong className="text-sky-400">{activeTitle}</strong> is being prepared and will be sent to <strong className="text-white">{email}</strong>.
                  </p>

                  <div className="btm-success-next-box">
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">
                      What Happens Next:
                    </h4>
                    <ul className="btm-success-steps-list">
                      <li>
                        <span className="btm-success-bullet">1</span>
                        <span>Our solutions architect reviews your technical stack requirements.</span>
                      </li>
                      <li>
                        <span className="btm-success-bullet">2</span>
                        <span>We match pre-vetted Top 1% engineers aligned with your time zone.</span>
                      </li>
                      <li>
                        <span className="btm-success-bullet">3</span>
                        <span>You receive a structured roadmap & team allocation proposal within 24 hours.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Direct Contact Links */}
                  <div className="btm-success-direct-call">
                    <p className="text-xs text-slate-400 mb-2">Need an immediate technical consultation?</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <a href="tel:+18624371138" className="btm-phone-bubble">
                        📞 US: +1-862-437-1138
                      </a>
                      <a href="tel:+911244104312" className="btm-phone-bubble">
                        📞 India: +91-124-410-4312
                      </a>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full mt-4"
                    onClick={onClose}
                  >
                    Done & Return to Site
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
