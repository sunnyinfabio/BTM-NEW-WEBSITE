import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  Cpu,
  ArrowRight,
  Sparkles,
  Clock,
  Zap,
  TrendingUp,
  Activity,
  Layers,
  Terminal,
  FileCode2,
  Calendar,
  Lock,
} from 'lucide-react';
import { Badge, Button, GradientText } from '../ui';
import './whyBtm.css';

export type InteractiveViewMode = 'proof' | 'process' | 'comparison';
export type IndustryFilter = 'all' | 'fintech' | 'healthcare' | 'logistics' | 'ai' | 'telecom';

interface ProofMetric {
  id: string;
  industry: IndustryFilter;
  label: string;
  value: string;
  subValue: string;
  sla: string;
  icon: React.ReactNode;
  accentColor: string;
  description: string;
}

const PROOF_METRICS: ProofMetric[] = [
  {
    id: 'fintech-vol',
    industry: 'fintech',
    label: 'Daily Derivative Computations',
    value: '50M+',
    subValue: '<10ms valuation latency',
    sla: '100% Mathematical Audit Accuracy',
    icon: <Activity size={22} />,
    accentColor: '#38BDF8',
    description: 'Real-time fixed income valuation, risk analytics & bond structuring engines for Wall Street tier-1 institutions.',
  },
  {
    id: 'health-uptime',
    industry: 'healthcare',
    label: 'Patient Teleconsultation SLA',
    value: '99.99%',
    subValue: '250,000+ active patients',
    sla: '100% HIPAA & SOC2 Type II Certified',
    icon: <ShieldCheck size={22} />,
    accentColor: '#34D399',
    description: 'Zero-vulnerability encrypted patient record synchronization and WebRTC teleconsultation infrastructure.',
  },
  {
    id: 'logistics-fleet',
    industry: 'logistics',
    label: 'Connected Telematics Fleet',
    value: '10,000+',
    subValue: '<250ms GPS data sync',
    sla: '18% Verified Fuel Cost Reduction',
    icon: <TrendingUp size={22} />,
    accentColor: '#F59E0B',
    description: 'Real-time turn-by-turn route optimization and high-frequency IoT streaming across cross-border freight.',
  },
  {
    id: 'ai-accuracy',
    industry: 'ai',
    label: 'Document IDR OCR Accuracy',
    value: '99.2%',
    subValue: '2,000,000+ complex PDFs parsed',
    sla: '85% Faster Processing Cycle Time',
    icon: <Sparkles size={22} />,
    accentColor: '#C084FC',
    description: 'BTM proprietary deep learning layout analysis & NLP parsing over unstructured contracts and financial statements.',
  },
  {
    id: 'telecom-cdr',
    industry: 'telecom',
    label: 'High-Frequency CDR Events/Sec',
    value: '5M+',
    subValue: '<10ms real-time rating',
    sla: '99.999% Carrier-Grade Reliability',
    icon: <Zap size={22} />,
    accentColor: '#06B6D4',
    description: 'Distributed gRPC & Spring Boot microservice rating engines running on multi-region Kubernetes clusters.',
  },
];

interface SprintStep {
  hour: string;
  title: string;
  tagline: string;
  deliverables: string[];
  artifactLabel: string;
  artifactCode: string;
  icon: React.ReactNode;
  badge: string;
}

const SPRINT_STEPS: SprintStep[] = [
  {
    hour: 'Hour 00:00',
    title: 'Architectural Diagnostic & Pod Sizing',
    tagline: 'Senior solutions architect reviews technical scope, compliance boundaries & required seniority.',
    deliverables: [
      'Tech stack roadmap defined (Java, .NET, Python, React, Cloud)',
      'Precision pod sizing (Tech Lead + Senior Devs + Automated QA)',
      'Strict NDA & IP security protocols executed',
    ],
    artifactLabel: 'architecture-scope.json',
    artifactCode: `{\n  "engagement": "Dedicated Agile Pod",\n  "leadArchitect": "Anupam Oberai / Gaurav Singh",\n  "securityStandard": "HIPAA / SOC2 Compliant",\n  "timezoneOverlap": "100% US East & APAC Overlap"\n}`,
    icon: <Cpu size={20} />,
    badge: 'Step 1: Scope',
  },
  {
    hour: 'Hour 24:00',
    title: 'Top 1% Vetted Talent Matching',
    tagline: 'Our internal talent cloud matches senior engineers with proven production competence.',
    deliverables: [
      'Pre-vetted coding assessment & system design scorecards provided',
      'Direct resume inspection with verified GitHub/enterprise track record',
      'No junior fillers or generic keyword-stuffed profiles',
    ],
    artifactLabel: 'vetted-candidate-roster.yaml',
    artifactCode: `pod_allocation:\n  - role: Senior Backend Engineer (Java / .NET)\n    seniority: 8+ Years\n    technical_score: 98.4%\n  - role: Frontend Lead (React / TypeScript)\n    seniority: 7+ Years\n    technical_score: 99.1%`,
    icon: <Users size={20} />,
    badge: 'Step 2: Matching',
  },
  {
    hour: 'Hour 48:00',
    title: 'Technical Video Interview & Kickoff',
    tagline: 'Interview your matched engineers directly. Approve your team and start building immediately.',
    deliverables: [
      'Direct 1-on-1 technical interview with your CTO/Tech Lead',
      'Instant environmental setup & GitHub/Jira access provisioning',
      'Sprint 1 backlog planning with dedicated Scrum Master',
    ],
    artifactLabel: 'sprint-onboarding.log',
    artifactCode: `[2026-08-19 10:00] Candidate Interview: PASSED (100%)\n[2026-08-19 14:00] Jira Board & Repo Access: PROVISIONED\n[2026-08-19 16:00] Pod Assembly: READY FOR SPRINT 1`,
    icon: <CheckCircle2 size={20} />,
    badge: 'Step 3: Kickoff',
  },
  {
    hour: 'Sprint Day 05',
    title: 'First Working Demo & Velocity Report',
    tagline: 'Inspect working code, continuous CI/CD pipelines, and initial milestone release velocity.',
    deliverables: [
      'Live working software demo presented in bi-weekly sprint review',
      'Automated test coverage % and code quality audit report',
      'Transparent burndown chart with real-time velocity tracking',
    ],
    artifactLabel: 'sprint-velocity-report.json',
    artifactCode: `{\n  "sprintNumber": 1,\n  "storyPointsCompleted": 42,\n  "unitTestCoverage": "96.8%",\n  "regressionBugs": 0,\n  "velocityIndex": 1.14\n}`,
    icon: <Sparkles size={20} />,
    badge: 'Step 4: Delivery',
  },
];

export interface WhyBtmSectionProps {
  onLearnMoreClick?: (pillarId: string) => void;
}

export const WhyBtmSection: React.FC<WhyBtmSectionProps> = ({ onLearnMoreClick }) => {
  const [activeTab, setActiveTab] = useState<InteractiveViewMode>('process');
  const [industryFilter, setIndustryFilter] = useState<IndustryFilter>('all');
  const [selectedSprintStepIndex, setSelectedSprintStepIndex] = useState<number>(0);

  const filteredMetrics = useMemo(() => {
    if (industryFilter === 'all') return PROOF_METRICS;
    return PROOF_METRICS.filter((m) => m.industry === industryFilter);
  }, [industryFilter]);

  const activeSprintStep = SPRINT_STEPS[selectedSprintStepIndex];

  return (
    <section className="btm-why-root" id="why-btm">
      <div className="btm-why-container">
        {/* Section Header */}
        <div className="btm-why-header">
          <Badge variant="primary" dot className="mb-3">
            The Interactive Technology Advisor Difference
          </Badge>
          <h2 className="btm-why-title">
            Why Companies <GradientText>Choose BTM</GradientText>
          </h2>
          <p className="btm-why-subtitle">
            Explore our verified enterprise proof, interactive 48-hour deployment simulator, and outcome-first technology advisory model.
          </p>

          {/* Interactive Mode Switcher Tabs */}
          <div className="btm-why-mode-nav">
            <button
              type="button"
              className={`btm-why-mode-btn ${activeTab === 'process' ? 'active' : ''}`}
              onClick={() => setActiveTab('process')}
            >
              <Clock size={16} />
              <span>⏱ 48-Hour Sprint Simulator</span>
            </button>
            <button
              type="button"
              className={`btm-why-mode-btn ${activeTab === 'proof' ? 'active' : ''}`}
              onClick={() => setActiveTab('proof')}
            >
              <Award size={16} />
              <span>📊 Live Enterprise Proof</span>
            </button>
            <button
              type="button"
              className={`btm-why-mode-btn ${activeTab === 'comparison' ? 'active' : ''}`}
              onClick={() => setActiveTab('comparison')}
            >
              <Cpu size={16} />
              <span>⚖ Advisor vs. Agency Model</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Stage Container */}
        <div className="btm-why-interactive-canvas">
          <AnimatePresence mode="wait">
            {/* ============================================================
                TAB 1: 48-HOUR SPRINT SIMULATOR
                ============================================================ */}
            {activeTab === 'process' && (
              <motion.div
                key="process"
                className="btm-simulator-wrapper"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* 4-Step Interactive Timeline Scrubber */}
                <div className="btm-timeline-scrubber">
                  {SPRINT_STEPS.map((step, idx) => {
                    const isSelected = selectedSprintStepIndex === idx;
                    return (
                      <button
                        key={step.hour}
                        type="button"
                        className={`btm-scrubber-node ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedSprintStepIndex(idx)}
                      >
                        <div className="btm-scrubber-top">
                          <span className="btm-scrubber-hour">{step.hour}</span>
                          <span className="btm-scrubber-badge">{step.badge}</span>
                        </div>
                        <span className="btm-scrubber-title">{step.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Step Deep-Dive Canvas */}
                <div className="btm-step-deepdive-grid">
                  {/* Left: Step Details & Deliverables */}
                  <div className="btm-step-details-box">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="btm-step-pill-accent">{activeSprintStep.hour}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {activeSprintStep.badge}
                      </span>
                    </div>

                    <h3 className="text-white font-extrabold text-xl font-primary mb-2">
                      {activeSprintStep.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                      {activeSprintStep.tagline}
                    </p>

                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Verified Milestone Deliverables:
                    </h4>
                    <ul className="btm-deliverables-checklist mb-6">
                      {activeSprintStep.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="btm-deliverable-item">
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => onLearnMoreClick?.('process')}
                      icon={<ArrowRight size={16} />}
                    >
                      Start Your 48h Team Ramp-Up →
                    </Button>
                  </div>

                  {/* Right: Live Terminal Artifact Preview */}
                  <div className="btm-step-terminal-box">
                    <div className="btm-terminal-topbar">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      </div>
                      <span className="btm-terminal-filename">
                        <FileCode2 size={12} className="inline mr-1 text-sky-400" />
                        {activeSprintStep.artifactLabel}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">LIVE ARTIFACT</span>
                    </div>
                    <pre className="btm-terminal-code-body">
                      <code>{activeSprintStep.artifactCode}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================
                TAB 2: LIVE ENTERPRISE PROOF & METRIC TELEMETRY
                ============================================================ */}
            {activeTab === 'proof' && (
              <motion.div
                key="proof"
                className="btm-proof-wrapper"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* Industry Filter Pills */}
                <div className="btm-industry-filter-row">
                  {[
                    { id: 'all', label: 'All Domains (15+)' },
                    { id: 'fintech', label: 'Fintech Analytics' },
                    { id: 'healthcare', label: 'Healthcare & EHR' },
                    { id: 'logistics', label: 'Logistics & IoT' },
                    { id: 'ai', label: 'AI & Document IDR' },
                    { id: 'telecom', label: 'Telecom & Cloud' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      className={`btm-filter-pill-btn ${industryFilter === filter.id ? 'active' : ''}`}
                      onClick={() => setIndustryFilter(filter.id as IndustryFilter)}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic Telemetry Metrics Cards Grid */}
                <div className="btm-proof-cards-grid">
                  {filteredMetrics.map((metric, idx) => (
                    <motion.div
                      key={metric.id}
                      className="btm-proof-telemetry-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: idx * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="btm-proof-icon-circle"
                          style={{ color: metric.accentColor, borderColor: `${metric.accentColor}33` }}
                        >
                          {metric.icon}
                        </div>
                        <span className="btm-proof-sla-badge" style={{ color: metric.accentColor }}>
                          {metric.sla}
                        </span>
                      </div>

                      <span className="btm-proof-big-num" style={{ color: metric.accentColor }}>
                        {metric.value}
                      </span>
                      <h4 className="btm-proof-card-label">{metric.label}</h4>
                      <span className="btm-proof-sub-value">{metric.subValue}</span>

                      <p className="btm-proof-desc">{metric.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* SLA Trust Footer */}
                <div className="btm-proof-trust-footer">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <span>100% Strict NDA Protection • Full IP Rights Transferred on Milestone Payment</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onLearnMoreClick?.('proof')}
                    icon={<ArrowRight size={15} />}
                  >
                    Inspect Full SLA Audit & Metrics →
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ============================================================
                TAB 3: ADVISOR VS. AGENCY MODEL COMPARISON
                ============================================================ */}
            {activeTab === 'comparison' && (
              <motion.div
                key="comparison"
                className="btm-comparison-wrapper"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="btm-diff-matrix-grid">
                  {/* Traditional Agencies / Platforms */}
                  <div className="btm-matrix-col traditional">
                    <div className="btm-matrix-col-header">
                      <span className="btm-matrix-badge-bad">Traditional Matching Platforms</span>
                      <h3 className="text-white text-lg font-bold">Turing / BairesDev / Legacy Agencies</h3>
                      <p className="text-xs text-slate-400">Keyword-matching and massive developer rosters</p>
                    </div>

                    <div className="btm-matrix-items-list">
                      <div className="btm-matrix-item bad">
                        <span className="btm-bad-x">✕</span>
                        <div>
                          <strong className="text-white text-xs block">"Search 10,000 resumes yourself"</strong>
                          <span className="text-xs text-slate-400">Pushes candidate filtering burden onto your busy engineering team.</span>
                        </div>
                      </div>

                      <div className="btm-matrix-item bad">
                        <span className="btm-bad-x">✕</span>
                        <div>
                          <strong className="text-white text-xs block">Billable Hours vs. Outcomes</strong>
                          <span className="text-xs text-slate-400">Incentivized to inflate headcount rather than optimize velocity.</span>
                        </div>
                      </div>

                      <div className="btm-matrix-item bad">
                        <span className="btm-bad-x">✕</span>
                        <div>
                          <strong className="text-white text-xs block">Junior Account Hand-Off</strong>
                          <span className="text-xs text-slate-400">Account passes to non-technical coordinators post-sale.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BTM Interactive Technology Advisor */}
                  <div className="btm-matrix-col advisor">
                    <div className="btm-matrix-col-header">
                      <div className="flex items-center gap-1.5">
                        <Sparkles size={14} className="text-sky-400" />
                        <span className="btm-matrix-badge-good">The BTM Technology Advisor Model</span>
                      </div>
                      <h3 className="text-white text-lg font-bold">Outcome-Driven Interactive Advisory</h3>
                      <p className="text-xs text-sky-200">Architectural blueprint + precision engineering pod</p>
                    </div>

                    <div className="btm-matrix-items-list">
                      <div className="btm-matrix-item good">
                        <span className="btm-good-check">✔</span>
                        <div>
                          <strong className="text-sky-400 text-xs block">"Tell us what you're trying to accomplish"</strong>
                          <span className="text-xs text-slate-200">We analyze requirements and design the tailored team and tech stack.</span>
                        </div>
                      </div>

                      <div className="btm-matrix-item good">
                        <span className="btm-good-check">✔</span>
                        <div>
                          <strong className="text-sky-400 text-xs block">Wall Street Executive Governance</strong>
                          <span className="text-xs text-slate-200">Governed by Goldman Sachs & Lehman Brothers engineering alumni.</span>
                        </div>
                      </div>

                      <div className="btm-matrix-item good">
                        <span className="btm-good-check">✔</span>
                        <div>
                          <strong className="text-sky-400 text-xs block">Precision Pod Assembly in 48 Hours</strong>
                          <span className="text-xs text-slate-200">Tech Lead + Senior Engineers + Automated QA with 100% timezone alignment.</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full mt-4"
                      onClick={() => onLearnMoreClick?.('people')}
                      icon={<ArrowRight size={18} />}
                    >
                      Connect with a Technology Advisor →
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
