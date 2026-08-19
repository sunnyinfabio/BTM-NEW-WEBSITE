import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ShieldCheck, Clock, CheckCircle2, Sparkles, PhoneCall } from 'lucide-react';
import { Badge, Button, GradientText } from '../ui';
import './leadGen.css';

export interface ProgressiveLeadGenSectionProps {
  onLeadSubmit?: (data: { email: string; details?: any }) => void;
}

export const ProgressiveLeadGenSection: React.FC<ProgressiveLeadGenSectionProps> = ({ onLeadSubmit }) => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('CTO / VP Engineering');
  const [timeline, setTimeline] = useState('Immediate (48h – 2 Weeks)');
  const [budget, setBudget] = useState('Standard Pod / Flexible');
  const [notes, setNotes] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) {
      setEmailError('Please enter a valid work email');
      return;
    }
    setEmailError('');
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    onLeadSubmit?.({ email, details: { fullName, company, role, timeline, budget, notes } });
  };

  return (
    <section className="btm-leadgen-section-root" id="get-started">
      <div className="btm-leadgen-section-container">
        <div className="btm-leadgen-section-box">
          {/* Section Header */}
          <div className="btm-leadgen-section-header">
            <Badge variant="primary" dot className="mb-3">
              Actionable Technology Plan
            </Badge>
            <h2 className="btm-leadgen-section-title">
              Want us to turn this into a <GradientText variant="accent">real plan?</GradientText>
            </h2>
            <p className="btm-leadgen-section-subtitle">
              Get an architectural roadmap, vetted engineering pod structure, and delivery timeline tailored to your exact tech stack.
            </p>
          </div>

          {/* Progressive Form Area */}
          <div className="btm-leadgen-section-form-wrap">
            <AnimatePresence mode="wait">
              {/* STEP 1: Single Email Input Hook */}
              {step === 1 && (
                <motion.form
                  key="step1"
                  onSubmit={handleStep1}
                  className="btm-section-single-email-form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="btm-section-email-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      placeholder="Enter your work email (e.g. alex@company.com)"
                      className="btm-section-email-input"
                      required
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="btm-section-submit-btn"
                      icon={<ArrowRight size={18} />}
                    >
                      Get My Recommendation →
                    </Button>
                  </div>
                  {emailError && <span className="btm-error-msg text-center">{emailError}</span>}

                  <div className="btm-section-trust-row">
                    <span>🛡 100% Strict NDA Protection</span>
                    <span>•</span>
                    <span>⏱ Architect response in &lt;24 hours</span>
                    <span>•</span>
                    <span>🚫 Zero recruitment sales spam</span>
                  </div>
                </motion.form>
              )}

              {/* STEP 2: Progressive Enrichment */}
              {step === 2 && (
                <motion.form
                  key="step2"
                  onSubmit={handleStep2}
                  className="btm-section-expanded-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 text-center">
                    <p className="text-sm text-sky-400 font-semibold">
                      Work Email: <span className="text-white">{email}</span> (✓ Saved)
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Configure your company details to tailor the delivery proposal:
                    </p>
                  </div>

                  <div className="btm-input-grid-2 mb-3">
                    <div className="btm-input-wrap">
                      <label className="btm-lead-label">Your Full Name *</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="btm-lead-input"
                        required
                      />
                    </div>
                    <div className="btm-input-wrap">
                      <label className="btm-lead-label">Company / Startup *</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Technologies"
                        className="btm-lead-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="btm-input-grid-2 mb-3">
                    <div className="btm-input-wrap">
                      <label className="btm-lead-label">Your Role</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="btm-lead-select"
                      >
                        <option>CTO / VP Engineering</option>
                        <option>Founder / CEO</option>
                        <option>Head of Product / PM</option>
                        <option>Engineering Manager / Tech Lead</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="btm-input-wrap">
                      <label className="btm-lead-label">Target Timeline</label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="btm-lead-select"
                      >
                        <option>Immediate (48h – 2 Weeks)</option>
                        <option>1 – 3 Months (Next Quarter)</option>
                        <option>3 – 6 Months (Planning)</option>
                        <option>Exploratory</option>
                      </select>
                    </div>
                  </div>

                  <div className="btm-input-wrap mb-4">
                    <label className="btm-lead-label">Optional Scope / Tech Notes</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific tech stacks (e.g. React, Python, AWS), target team size, or deadlines..."
                      className="btm-lead-textarea"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="btm-section-submit-btn"
                      icon={<ArrowRight size={18} />}
                    >
                      Generate My Custom Blueprint →
                    </Button>
                  </div>
                </motion.form>
              )}

              {/* STEP 3: Instant Confirmation State */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  className="btm-section-confirmed-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <CheckCircle2 size={44} color="#34d399" className="mb-2" />
                  <h3 className="text-xl font-bold text-white mb-1">
                    Your Custom Plan is on its Way!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-4">
                    Thank you, <strong className="text-white">{fullName || 'Builder'}</strong>. Our senior solutions architects are preparing your roadmap and sending it to <strong className="text-sky-400">{email}</strong> within 24 hours.
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center text-xs">
                    <a href="tel:+18624371138" className="btm-phone-bubble">
                      📞 Direct US Office: +1-862-437-1138
                    </a>
                    <a href="tel:+911244104312" className="btm-phone-bubble">
                      📞 Direct India Office: +91-124-410-4312
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
