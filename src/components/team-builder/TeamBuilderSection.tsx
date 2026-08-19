import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Server,
  Smartphone,
  Sparkles,
  ShieldCheck,
  Cloud,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  Cpu,
  PhoneCall,
} from 'lucide-react';
import { Badge, Button, GradientText } from '../ui';
import './teamBuilder.css';

export type RoleType = 'frontend' | 'backend' | 'mobile' | 'ai' | 'qa' | 'devops';
export type TeamSize = '1-3' | '4-10' | '10-25' | '25+';
export type Timeline = 'asap' | '1-3-months' | '3-6-months';

interface RoleOption {
  id: RoleType;
  title: string;
  subtitle: string;
  technologies: string;
  icon: React.ReactNode;
  color: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Modern Web & UI/UX',
    technologies: 'React, Angular, TypeScript, Vue, Next.js',
    icon: <Code2 size={20} />,
    color: '#38BDF8',
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'APIs & Core Architecture',
    technologies: 'Java, .NET Core, Python, Node.js, Go, SQL',
    icon: <Server size={20} />,
    color: '#3B82F6',
  },
  {
    id: 'mobile',
    title: 'Mobile',
    subtitle: 'iOS & Android Apps',
    technologies: 'React Native, Flutter, Swift, Kotlin',
    icon: <Smartphone size={20} />,
    color: '#06B6D4',
  },
  {
    id: 'ai',
    title: 'AI & Data',
    subtitle: 'Machine Learning & Automation',
    technologies: 'Python, NLP, ML, RPA, PyTorch, Big Data',
    icon: <Sparkles size={20} />,
    color: '#C084FC',
  },
  {
    id: 'qa',
    title: 'QA & Testing',
    subtitle: 'Automated & Functional Testing',
    technologies: 'Selenium, Cypress, Jest, Performance, CI/CD',
    icon: <ShieldCheck size={20} />,
    color: '#10B981',
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    subtitle: 'Infrastructure & Pipelines',
    technologies: 'AWS, Azure, GCP, Docker, Kubernetes, CI/CD',
    icon: <Cloud size={20} />,
    color: '#F59E0B',
  },
];

export interface TeamBuilderSectionProps {
  onTalkToBtmClick?: (config: {
    roles: RoleType[];
    size: TeamSize;
    timeline: Timeline;
    composition: { roleName: string; count: number }[];
  }) => void;
}

export const TeamBuilderSection: React.FC<TeamBuilderSectionProps> = ({ onTalkToBtmClick }) => {
  const [selectedRoles, setSelectedRoles] = useState<RoleType[]>(['frontend', 'backend', 'qa']);
  const [selectedSize, setSelectedSize] = useState<TeamSize>('4-10');
  const [selectedTimeline, setSelectedTimeline] = useState<Timeline>('asap');
  const [activeStep, setActiveStep] = useState<number>(1);

  // Toggle role selection
  const toggleRole = (roleId: RoleType) => {
    setSelectedRoles((prev) => {
      if (prev.includes(roleId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((r) => r !== roleId);
      } else {
        return [...prev, roleId];
      }
    });
  };

  // Calculate balanced team allocation dynamically
  const recommendedComposition = useMemo(() => {
    const totalCountMap: Record<TeamSize, number> = {
      '1-3': 3,
      '4-10': 6,
      '10-25': 16,
      '25+': 30,
    };
    const totalTarget = totalCountMap[selectedSize];
    const roleCount = selectedRoles.length;
    const basePerRole = Math.floor(totalTarget / roleCount);
    let remainder = totalTarget % roleCount;

    const namesMap: Record<RoleType, string> = {
      frontend: 'Frontend Engineer (React / TypeScript)',
      backend: 'Backend Engineer (Java / .NET / Python)',
      mobile: 'Mobile Engineer (iOS / Android / Cross-Platform)',
      ai: 'AI & Data Specialist (ML / NLP / RPA)',
      qa: 'QA Automation Engineer (Test Suites)',
      devops: 'DevOps & Cloud Architect (AWS / Azure / CI-CD)',
    };

    const comp = selectedRoles.map((role) => {
      const count = basePerRole + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
      return {
        roleId: role,
        roleName: namesMap[role],
        count: Math.max(1, count),
      };
    });

    return comp;
  }, [selectedRoles, selectedSize]);

  const timelineLabels: Record<Timeline, string> = {
    asap: 'Immediate (48h – 1 Week)',
    '1-3-months': 'Planned (1 – 3 Months)',
    '3-6-months': 'Strategic Roadmap (3 – 6 Months)',
  };

  return (
    <section className="btm-teambuilder-root" id="team-builder">
      <div className="btm-teambuilder-container">
        {/* Section Header */}
        <div className="btm-teambuilder-header">
          <Badge variant="cyan" dot className="mb-3">
            Talent & Pod Configurator
          </Badge>
          <h2 className="btm-teambuilder-title">
            Build My <GradientText>Custom Engineering Team</GradientText>
          </h2>
          <p className="btm-teambuilder-subtitle">
            Configure your technical discipline, team scale, and deployment speed to generate an optimized pod architecture.
          </p>
        </div>

        {/* 2-Column Layout: Left Configurator Steps / Right Live Recommended Pod */}
        <div className="btm-teambuilder-grid">
          {/* Left Column: Interactive 3-Step Controls */}
          <div className="btm-configurator-card">
            {/* Step 1: What do you need? */}
            <div className="btm-step-block">
              <div className="btm-step-title-wrap">
                <span className="btm-step-number">Step 1</span>
                <div>
                  <h3 className="btm-step-heading">What technical skills do you need?</h3>
                  <p className="btm-step-desc">Select one or more disciplines for your team</p>
                </div>
              </div>

              <div className="btm-roles-grid">
                {ROLE_OPTIONS.map((opt) => {
                  const isSelected = selectedRoles.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                      className={`btm-role-pill-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleRole(opt.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleRole(opt.id);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2" style={{ color: opt.color }}>
                          {opt.icon}
                          <span className="font-bold text-slate-100 text-sm">{opt.title}</span>
                        </div>
                        <span className={`btm-checkbox-indicator ${isSelected ? 'active' : ''}`}>
                          {isSelected ? '✓' : '+'}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 block truncate">{opt.technologies}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: How many? */}
            <div className="btm-step-block">
              <div className="btm-step-title-wrap">
                <span className="btm-step-number">Step 2</span>
                <div>
                  <h3 className="btm-step-heading">How many engineers?</h3>
                  <p className="btm-step-desc">Choose your target team headcount</p>
                </div>
              </div>

              <div className="btm-size-selector-wrap">
                {(['1-3', '4-10', '10-25', '25+'] as TeamSize[]).map((size) => {
                  const isSelected = selectedSize === size;
                  const labels: Record<TeamSize, string> = {
                    '1-3': '1–3 Engineers (Small Squad)',
                    '4-10': '4–10 Engineers (Agile Pod)',
                    '10-25': '10–25 Engineers (Multi-Pod)',
                    '25+': '25+ Engineers (Enterprise)',
                  };
                  return (
                    <button
                      key={size}
                      type="button"
                      className={`btm-choice-pill ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <span className="btm-choice-bold">{size}</span>
                      <span className="btm-choice-sub">{labels[size]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: How quickly? */}
            <div className="btm-step-block border-none pb-0">
              <div className="btm-step-title-wrap">
                <span className="btm-step-number">Step 3</span>
                <div>
                  <h3 className="btm-step-heading">How quickly do you need them?</h3>
                  <p className="btm-step-desc">Target onboarding & ramp-up speed</p>
                </div>
              </div>

              <div className="btm-timeline-selector-wrap">
                {(['asap', '1-3-months', '3-6-months'] as Timeline[]).map((time) => {
                  const isSelected = selectedTimeline === time;
                  const labels: Record<Timeline, { title: string; sub: string }> = {
                    asap: { title: 'ASAP (Immediate)', sub: 'Deploy in 48h – 1 Week' },
                    '1-3-months': { title: '1 – 3 Months', sub: 'Next Quarter Sprint' },
                    '3-6-months': { title: '3 – 6 Months', sub: 'Strategic Roadmap' },
                  };
                  return (
                    <button
                      key={time}
                      type="button"
                      className={`btm-choice-pill ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedTimeline(time)}
                    >
                      <span className="btm-choice-bold">{labels[time].title}</span>
                      <span className="btm-choice-sub">{labels[time].sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Recommended Team Result Panel */}
          <div className="btm-result-panel">
            <div className="btm-result-card">
              {/* Header */}
              <div className="btm-result-header">
                <div>
                  <span className="btm-result-eyebrow">POD RECOMMENDATION</span>
                  <h3 className="btm-result-title">YOUR RECOMMENDED TEAM</h3>
                </div>
                <div className="btm-result-timeline-pill">
                  <Clock size={14} className="text-sky-400" />
                  <span>{timelineLabels[selectedTimeline]}</span>
                </div>
              </div>

              {/* Dynamic Role Breakdown List */}
              <div className="btm-result-composition-list">
                <AnimatePresence mode="popLayout">
                  {recommendedComposition.map((item, idx) => (
                    <motion.div
                      key={item.roleId}
                      className="btm-composition-item"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="btm-role-bullet-check">✓</span>
                        <span className="btm-role-label">{item.roleName}</span>
                      </div>
                      <span className="btm-role-qty-badge">× {item.count}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Leadership / Pod Governance Notice for Pods >= 4 */}
              {selectedSize !== '1-3' && (
                <div className="btm-governance-notice">
                  <Cpu size={16} className="text-sky-400 shrink-0" />
                  <span>
                    Includes dedicated Senior Technical Lead, Scrum Master governance, and weekly sprint velocity reporting.
                  </span>
                </div>
              )}

              {/* Verified Quality Standards Checklist */}
              <div className="btm-result-checklist">
                <div className="btm-check-pill">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Top 1% Vetted Talent</span>
                </div>
                <div className="btm-check-pill">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>US & APAC Timezone Overlap</span>
                </div>
                <div className="btm-check-pill">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>100% Strict NDA Protection</span>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="btm-result-action-block">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full btm-talk-btn"
                  onClick={() =>
                    onTalkToBtmClick?.({
                      roles: selectedRoles,
                      size: selectedSize,
                      timeline: selectedTimeline,
                      composition: recommendedComposition,
                    })
                  }
                  icon={<ArrowRight size={18} />}
                >
                  Talk to BTM
                </Button>

                <div className="btm-result-phone-row">
                  <span>Fast Enterprise Dispatch:</span>
                  <a href="tel:+18624371138" className="btm-phone-link">
                    📞 US +1-862-437-1138
                  </a>
                  <span className="text-slate-600">|</span>
                  <a href="tel:+911244104312" className="btm-phone-link">
                    📞 India +91-124-410-4312
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
