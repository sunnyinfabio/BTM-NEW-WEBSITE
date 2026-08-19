import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Award, Sparkles, MapPin } from 'lucide-react';
import { Badge, Button, GradientText } from '../ui';
import './leadership.css';

export interface LeaderProfile {
  name: string;
  role: string;
  location: string;
  pedigree: string;
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
    pedigree: '10+ Years Goldman Sachs Head of Fixed Income Analytics • MBA Univ of Hartford',
    bio: 'Former head of US Fixed Income Analytics at Goldman Sachs. Over 25 years of experience leading complex enterprise technology, quantitative financial engineering, and large-scale delivery organizations.',
    expertise: ['Enterprise Strategy', 'Fixed Income Analytics', 'Engineering Governance', 'Executive Advisory'],
    initials: 'AO',
    accentColor: '#0B2653',
  },
  {
    name: 'Anjul Oberai',
    role: 'Partner, Asia Pacific',
    location: 'Gurgaon, Haryana, India',
    pedigree: '25+ Years Wall Street Leadership • Managing Director Lehman Brothers & Deutsche Bank • MBA',
    bio: 'Extensive track record leading global trading floor technology, derivative risk systems, and offshore engineering operations for Tier-1 investment banks and multinational corporations.',
    expertise: ['Offshore Delivery Centers', 'Global Pod Scaling', 'Risk Management Systems', 'Talent Curation'],
    initials: 'AO',
    accentColor: '#00875A',
  },
  {
    name: 'Rajendra Birla',
    role: 'Partner & Quantitative Analytics Lead',
    location: 'United States & APAC',
    pedigree: 'Master\'s in Finance • Specialized in CMBS, RMBS & Structured Finance',
    bio: 'Deep mathematical modeling and software architecture background in complex asset-backed securities, bond structuring, portfolio valuation algorithms, and cloud data pipelines.',
    expertise: ['Structured Finance', 'Data Engineering', 'Quantitative Modeling', 'Platform Scalability'],
    initials: 'RB',
    accentColor: '#0B2653',
  },
  {
    name: 'Gaurav Singh',
    role: 'Senior Technology Manager & Engineering Lead',
    location: 'Gurgaon, Haryana, India',
    pedigree: '12+ Years Enterprise Software Leadership • .NET Core, Java, Python, Big Data',
    bio: 'Directs BTM’s senior engineering practice. Specializes in microservice decomposition, cloud migration, automated CI/CD pipelines, and high-performance full-stack architectures.',
    expertise: ['.NET & Java Microservices', 'Cloud Architecture (AWS/Azure)', 'Agile Pod Leadership', 'DevOps & QA'],
    initials: 'GS',
    accentColor: '#EC1C24',
  },
];

export interface LeadershipTrustSectionProps {
  onConsultLeaderClick?: (leader: LeaderProfile) => void;
}

export const LeadershipTrustSection: React.FC<LeadershipTrustSectionProps> = ({
  onConsultLeaderClick,
}) => {
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
        <div className="btm-strategic-diff-card mb-12">
          <div className="btm-diff-grid">
            <div className="btm-diff-col competitors">
              <span className="btm-matrix-badge-bad mb-2">Generic Talent Matching Platforms</span>
              <h3 className="text-[#0B2653] text-lg font-bold mb-3">Turing / BairesDev / Legacy Agencies</h3>
              <ul className="btm-diff-list">
                <li className="btm-diff-item"><span className="btm-diff-bad-x">✕</span><span className="text-[#51668A]">"Search 10,000 resumes yourself"</span></li>
                <li className="btm-diff-item"><span className="btm-diff-bad-x">✕</span><span className="text-[#51668A]">Pushes developer headcounts to maximize billable hours</span></li>
                <li className="btm-diff-item"><span className="btm-diff-bad-x">✕</span><span className="text-[#51668A]">Hands off to junior account managers post-sale</span></li>
                <li className="btm-diff-item"><span className="btm-diff-bad-x">✕</span><span className="text-[#51668A]">Generic keyword-matching without architectural context</span></li>
              </ul>
            </div>

            <div className="btm-diff-col btm-advantage">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-[#00C881]" />
                <span className="btm-matrix-badge-good">The BTM Technology Advisor Model</span>
              </div>
              <h3 className="text-[#0B2653] text-lg font-bold mb-3">Outcome-First Interactive Advisory</h3>
              <ul className="btm-diff-list">
                <li className="btm-diff-item"><span className="btm-diff-good-check">✔</span><strong className="text-[#0B2653]">"Tell us what you're trying to accomplish."</strong></li>
                <li className="btm-diff-item"><span className="btm-diff-good-check">✔</span><strong className="text-[#0B2653]">"Here is the team, technology and approach that fits."</strong></li>
                <li className="btm-diff-item"><span className="btm-diff-good-check">✔</span><span className="text-[#0B2653]">Governed directly by Goldman Sachs & Lehman Brothers tech alumni</span></li>
                <li className="btm-diff-item"><span className="btm-diff-good-check">✔</span><span className="text-[#0B2653]">Precision pod sizing (Tech Lead + Senior Engineers + Automated QA)</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real BTM Leadership Team Profiles */}
        <div className="mb-6 text-center">
          <h3 className="text-[#0B2653] text-xl font-bold font-primary mb-1">
            Real People. Real Enterprise Pedigree.
          </h3>
          <p className="text-[#51668A] text-sm max-w-xl mx-auto">
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
                  className="btm-leader-avatar-circle"
                  style={{
                    backgroundColor: `${leader.accentColor}10`,
                    borderColor: leader.accentColor,
                    color: leader.accentColor,
                  }}
                >
                  {leader.initials}
                </div>
                <div>
                  <h3 className="btm-leader-name">{leader.name}</h3>
                  <p className="btm-leader-role">{leader.role}</p>
                  <span className="btm-leader-loc flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="inline text-[#00C881]" />
                    {leader.location}
                  </span>
                </div>
              </div>

              {/* Pedigree Box */}
              <div className="btm-leader-creds-box mb-4">
                <Award size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#0B2653] leading-snug">
                  {leader.pedigree}
                </span>
              </div>

              {/* Bio Summary */}
              <p className="btm-leader-bio mb-4">{leader.bio}</p>

              {/* Domain Expertise Tags */}
              <div className="btm-leader-expertise-row mb-6">
                {leader.expertise.map((tag, tIdx) => (
                  <span key={tIdx} className="btm-exp-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Leader Direct Consultation CTA */}
              <div className="btm-leader-card-footer mt-auto">
                <button
                  type="button"
                  className="btm-consult-leader-btn flex items-center gap-1.5"
                  onClick={() => onConsultLeaderClick?.(leader)}
                >
                  <span>Schedule Consultation with {leader.name.split(' ')[0]} →</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
