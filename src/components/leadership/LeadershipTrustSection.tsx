import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Briefcase, Users, Cpu, ArrowRight, CheckCircle2, Linkedin, Sparkles } from 'lucide-react';
import { Badge, Button, GradientText } from '../ui';
import './leadership.css';

interface LeaderProfile {
  name: string;
  role: string;
  location: string;
  credentials: string;
  bio: string;
  expertise: string[];
  initials: string;
  accentColor: string;
}

const BTM_LEADERS: LeaderProfile[] = [
  {
    name: 'Anupam Oberai',
    role: 'Senior Partner & Chief Executive Officer',
    location: 'Denville, NJ, United States',
    credentials: '10+ Years Goldman Sachs Head of Fixed Income Analytics • MBA Univ of Hartford',
    bio: 'Former head of US Fixed Income Analytics at Goldman Sachs. Over 25 years of experience leading complex enterprise technology, quantitative financial engineering, and large-scale delivery organizations.',
    expertise: ['Enterprise Strategy', 'Fixed Income Analytics', 'Engineering Governance', 'Executive Advisory'],
    initials: 'AO',
    accentColor: '#38BDF8',
  },
  {
    name: 'Anjul Oberai',
    role: 'Partner, Asia Pacific',
    location: 'Gurgaon, Haryana, India',
    credentials: '25+ Years Wall Street Leadership • Managing Director Lehman Brothers & Deutsche Bank • MBA',
    bio: 'Extensive track record leading global trading floor technology, derivative risk systems, and offshore engineering operations for Tier-1 investment banks and multinational corporations.',
    expertise: ['Offshore Delivery Centers', 'Global Pod Scaling', 'Risk Management Systems', 'Talent Curation'],
    initials: 'AO',
    accentColor: '#3B82F6',
  },
  {
    name: 'Rajendra Birla',
    role: 'Partner & Quantitative Analytics Lead',
    location: 'United States & APAC',
    credentials: "Master's in Finance • Specialized in CMBS, RMBS & Structured Finance",
    bio: 'Deep mathematical modeling and software architecture background in complex asset-backed securities, bond structuring, portfolio valuation algorithms, and cloud data pipelines.',
    expertise: ['Structured Finance', 'Data Engineering', 'Quantitative Modeling', 'Platform Scalability'],
    initials: 'RB',
    accentColor: '#06B6D4',
  },
  {
    name: 'Gaurav Singh',
    role: 'Senior Technology Manager & Engineering Lead',
    location: 'Gurgaon, Haryana, India',
    credentials: '12+ Years Enterprise Software Leadership • .NET Core, Java, Python, Big Data',
    bio: 'Directs BTM’s senior engineering practice. Specializes in microservice decomposition, cloud migration, automated CI/CD pipelines, and high-performance full-stack architectures.',
    expertise: ['.NET & Java Microservices', 'Cloud Architecture (AWS/Azure)', 'Agile Pod Leadership', 'DevOps & QA'],
    initials: 'GS',
    accentColor: '#10B981',
  },
];

export interface LeadershipTrustSectionProps {
  onConsultLeaderClick?: (leader: LeaderProfile) => void;
}

export const LeadershipTrustSection: React.FC<LeadershipTrustSectionProps> = ({ onConsultLeaderClick }) => {
  return (
    <section className="btm-leadership-root" id="leadership-trust">
      <div className="btm-leadership-container">
        {/* Section Header */}
        <div className="btm-leadership-header">
          <Badge variant="cyan" dot className="mb-3">
            Real Leadership • Proven Pedigree
          </Badge>
          <h2 className="btm-leadership-title">
            The Interactive Technology Advisor <GradientText variant="accent">Difference</GradientText>
          </h2>
          <p className="btm-leadership-subtitle">
            Most platforms just search developer resumes. BTM analyzes your objective, designs the architectural roadmap, and deploys seasoned engineering pods governed by Wall Street technology veterans.
          </p>
        </div>

        {/* The Core Differentiator Comparison Matrix */}
        <div className="btm-advisor-diff-card mb-12">
          <div className="btm-diff-grid">
            <div className="btm-diff-col traditional">
              <span className="btm-diff-eyebrow">Generic Talent Matching Platforms</span>
              <h3 className="text-white text-lg font-bold mb-3">Turing / BairesDev / Legacy Agencies</h3>
              <ul className="btm-diff-list">
                <li>✕ "Search 10,000 resumes yourself"</li>
                <li>✕ Pushes developer headcounts to maximize billable hours</li>
                <li>✕ Hands off to junior account managers post-sale</li>
                <li>✕ Generic keyword-matching without architectural context</li>
              </ul>
            </div>

            <div className="btm-diff-col advisor">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-sky-400" />
                <span className="btm-diff-eyebrow text-sky-400">The BTM Technology Advisor Model</span>
              </div>
              <h3 className="text-white text-lg font-bold mb-3">Outcome-First Interactive Advisory</h3>
              <ul className="btm-diff-list-btm">
                <li>✔ <strong>"Tell us what you're trying to accomplish."</strong></li>
                <li>✔ <strong>"Here is the team, technology and approach that fits."</strong></li>
                <li>✔ Governed directly by Goldman Sachs & Lehman Brothers tech alumni</li>
                <li>✔ Precision pod sizing (Tech Lead + Senior Engineers + Automated QA)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real BTM Leadership Team Profiles */}
        <div className="mb-4 text-center">
          <h3 className="text-white text-xl font-bold font-primary mb-1">
            Real People. Real Enterprise Pedigree.
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Directly accessible leadership with decades of experience at the world's most demanding financial and technology institutions.
          </p>
        </div>

        <div className="btm-leaders-grid">
          {BTM_LEADERS.map((leader, idx) => (
            <motion.div
              key={idx}
              className="btm-leader-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
            >
              {/* Leader Avatar & Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="btm-leader-avatar"
                  style={{
                    backgroundColor: `${leader.accentColor}18`,
                    borderColor: `${leader.accentColor}55`,
                    color: leader.accentColor,
                  }}
                >
                  <span>{leader.initials}</span>
                </div>
                <div>
                  <h4 className="btm-leader-name">{leader.name}</h4>
                  <p className="btm-leader-role">{leader.role}</p>
                  <span className="btm-leader-loc">{leader.location}</span>
                </div>
              </div>

              {/* Verified Credentials Badge */}
              <div className="btm-leader-creds-box mb-3">
                <Award size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-amber-200 font-medium leading-snug">{leader.credentials}</span>
              </div>

              {/* Bio */}
              <p className="btm-leader-bio mb-4">{leader.bio}</p>

              {/* Expertise Tags */}
              <div className="btm-leader-expertise-row mb-4">
                {leader.expertise.map((exp, eIdx) => (
                  <span key={eIdx} className="btm-exp-tag">
                    {exp}
                  </span>
                ))}
              </div>

              {/* Action Trigger */}
              <div className="btm-leader-card-footer">
                <button
                  type="button"
                  className="btm-consult-leader-btn"
                  onClick={() => onConsultLeaderClick?.(leader)}
                >
                  <span>Schedule Consultation with {leader.name.split(' ')[0]} →</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
