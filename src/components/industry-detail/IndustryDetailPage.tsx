import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  PhoneCall,
  Check,
} from 'lucide-react';
import { Button, Badge } from '../ui';
import {
  INDUSTRY_DETAILS,
  type IndustryDetailData,
  type IndustryChallenge,
  type IndustrySolutionArea,
} from './industryDetailData';
import './industryDetail.css';

export interface IndustryDetailPageProps {
  slug: string;
  onNavigateHome: () => void;
  onSelectIndustry: (slug: string) => void;
  onOpenAdvisorDrawer: (context: {
    title: string;
    category: string;
    details: string;
    summaryItems?: { label: string; value: string }[];
  }) => void;
}

export const IndustryDetailPage: React.FC<IndustryDetailPageProps> = ({
  slug,
  onNavigateHome,
  onSelectIndustry,
  onOpenAdvisorDrawer,
}) => {
  const [expandedChallengeId, setExpandedChallengeId] = useState<string | null>(null);

  const industry: IndustryDetailData =
    INDUSTRY_DETAILS[slug] || INDUSTRY_DETAILS['capital-market'];

  // SEO & Scroll Restoration on Mount or Slug Change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic SEO Title & Meta Description
    document.title = industry.seo.title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', industry.seo.description);

    // Open Graph Tags
    const setMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('og:title', industry.seo.title);
    setMetaTag('og:description', industry.seo.description);
    setMetaTag('og:image', industry.imageUrl);
    setMetaTag('og:url', window.location.href);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);

    // Reset expanded challenge
    if (industry.challenges.length > 0) {
      setExpandedChallengeId(industry.challenges[0].id);
    }
  }, [slug, industry]);

  const toggleChallenge = (id: string) => {
    setExpandedChallengeId((prev) => (prev === id ? null : id));
  };

  const handleChallengeAction = (challenge: IndustryChallenge) => {
    onOpenAdvisorDrawer({
      title: `${industry.name}: ${challenge.title}`,
      category: `${industry.name} Architecture`,
      details: `Inquiring about ${challenge.oneLiner} Solution approach: ${challenge.btmCapability}`,
      summaryItems: [
        { label: 'Industry Practice', value: industry.name },
        { label: 'Core Tech', value: challenge.technology.slice(0, 3).join(', ') },
      ],
    });
  };

  const handleGeneralConsult = () => {
    onOpenAdvisorDrawer({
      title: `${industry.name} Technology Advisory`,
      category: `${industry.name} Engineering Pod`,
      details: `Consulting with BTM senior architecture team regarding ${industry.heroHeadline}`,
      summaryItems: [{ label: 'Sector Domain', value: industry.name }],
    });
  };

  const allSlugs = Object.keys(INDUSTRY_DETAILS);

  return (
    <div className="btm-industry-page-root">
      {/* ──────────────────────────────────────────────────────────
          1. Sticky Breadcrumb & Fast Industry Switcher
          ────────────────────────────────────────────────────────── */}
      <div className="btm-industry-nav-bar">
        <button
          type="button"
          onClick={onNavigateHome}
          className="btm-industry-back-link"
        >
          <ArrowLeft size={16} />
          <span>Back to Home / All Industries</span>
        </button>

        {/* Industry Switcher Pills */}
        <div
          className="btm-industry-switcher-wrap"
          role="navigation"
          aria-label="Switch industry view"
        >
          {allSlugs.map((s) => {
            const ind = INDUSTRY_DETAILS[s];
            const isActive = s === slug;
            return (
              <button
                key={s}
                type="button"
                className={`btm-industry-switch-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectIndustry(s)}
              >
                {ind.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          1. Industry Hero Section
          ────────────────────────────────────────────────────────── */}
      <section className="btm-industry-hero-section">
        <img
          src={industry.imageUrl}
          alt={industry.imageAlt}
          className="btm-industry-hero-bg-img"
        />
        <div className="btm-industry-hero-scrim" />

        <div className="btm-industry-hero-content">
          <div className="btm-industry-hero-eyebrow">
            <Sparkles size={15} color="#00C881" />
            <span>{industry.eyebrow}</span>
          </div>

          <h1 className="btm-industry-hero-h1">{industry.heroHeadline}</h1>

          <p className="btm-industry-hero-p">{industry.heroSubtitle}</p>

          <div className="btm-industry-hero-actions">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGeneralConsult}
              icon={<ArrowRight size={18} />}
            >
              Find My {industry.name} Solution →
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('industry-challenges');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Sector Challenges ↓
            </Button>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. Interactive Challenges: "WHAT ARE YOU TRYING TO SOLVE?"
          ────────────────────────────────────────────────────────── */}
      <section className="btm-challenges-section" id="industry-challenges">
        <div className="btm-challenges-container">
          <div className="btm-challenges-header">
            <Badge variant="primary" dot className="mb-2">
              SECTOR OBJECTIVES
            </Badge>
            <h2 className="btm-challenges-title">
              What are you trying to <span style={{ color: '#EC1C24' }}>solve?</span>
            </h2>
            <p className="btm-challenges-subtitle">
              Select any {industry.name} challenge to reveal verified BTM engineering capabilities, architectures, and tech stacks.
            </p>
          </div>

          <div className="btm-challenges-grid" role="list">
            {industry.challenges.map((challenge, idx) => {
              const isExpanded = expandedChallengeId === challenge.id;

              return (
                <motion.div
                  key={challenge.id}
                  className={`btm-challenge-card ${isExpanded ? 'expanded' : ''}`}
                  layout
                  transition={{ duration: 0.25 }}
                  onClick={() => toggleChallenge(challenge.id)}
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleChallenge(challenge.id);
                    }
                  }}
                  aria-expanded={isExpanded}
                >
                  <div className="btm-challenge-card-top">
                    <span className="btm-challenge-number">0{idx + 1}</span>
                    <ChevronDown
                      size={18}
                      className="btm-challenge-toggle-icon"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="btm-challenge-title">{challenge.title}</h3>
                  <p className="btm-challenge-oneliner">{challenge.oneLiner}</p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="btm-challenge-expanded-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* 1. Problem Statement */}
                        <div className="btm-challenge-step-box">
                          <span className="btm-challenge-step-label">Problem</span>
                          <p className="btm-challenge-step-val">{challenge.problem}</p>
                        </div>

                        {/* 2. Potential BTM Capability */}
                        <div className="btm-challenge-step-box">
                          <span className="btm-challenge-step-label capability">
                            Relevant BTM Capability
                          </span>
                          <p className="btm-challenge-step-val">{challenge.btmCapability}</p>
                        </div>

                        {/* 3. Relevant Verified Technology */}
                        <div className="btm-challenge-step-box">
                          <span className="btm-challenge-step-label tech">Relevant Technology</span>
                          <div className="btm-challenge-tech-row">
                            {challenge.technology.map((t, tIdx) => (
                              <span key={tIdx} className="btm-challenge-tech-pill">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* 4. Action CTA */}
                        <div className="btm-challenge-action-wrap">
                          <Button
                            variant="primary"
                            size="md"
                            className="w-full"
                            onClick={() => handleChallengeAction(challenge)}
                            icon={<ArrowRight size={16} />}
                          >
                            Explore This Solution →
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. BTM Solution Areas
          ────────────────────────────────────────────────────────── */}
      <section className="btm-solution-areas-section">
        <div className="btm-solution-areas-container">
          <div className="btm-solution-areas-header">
            <Badge variant="cyan" dot className="mb-2">
              ENGINEERING PILLARS
            </Badge>
            <h2 className="btm-solution-areas-title">
              BTM Solution Areas in <span style={{ color: '#EC1C24' }}>{industry.name}</span>
            </h2>
            <p className="btm-solution-areas-subtitle">
              How our dedicated engineering pods structure delivery across architecture, data streaming, and governance.
            </p>
          </div>

          <div className="btm-solution-areas-grid">
            {industry.solutionAreas.map((area, idx) => (
              <div key={idx} className="btm-solution-area-card">
                <div className="btm-solution-area-num">0{idx + 1}</div>
                <h3 className="btm-solution-area-card-title">{area.title}</h3>
                <p className="btm-solution-area-card-desc">{area.desc}</p>
                <div className="btm-solution-area-highlights">
                  {area.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="btm-solution-area-highlight-item">
                      <Check size={14} className="text-[#00C881]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. Relevant Verified Technologies Interactive Section
          ────────────────────────────────────────────────────────── */}
      <section className="btm-industry-tech-section">
        <div className="btm-industry-tech-container">
          <h3 className="btm-industry-tech-title">
            Relevant Technologies for <span style={{ color: '#EC1C24' }}>{industry.name}</span>
          </h3>
          <p className="btm-industry-tech-subtitle">
            Every technology in our roster is backed by senior engineers with hands-on production delivery.
          </p>

          <div className="btm-industry-tech-chips-row">
            {industry.verifiedTechnologies.map((tech, idx) => (
              <div key={idx} className="btm-tech-chip-item">
                <Cpu size={15} color="#0B2653" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. Relevant Work / Proof Section
          ────────────────────────────────────────────────────────── */}
      <section className="btm-industry-proof-section">
        <div className="btm-industry-proof-container">
          <div className="btm-industry-proof-card">
            <div className="btm-proof-meta-row">
              <Badge variant="cyan" dot>
                Verified Sector Proof
              </Badge>
              <span className="text-xs font-bold text-[#00875A]">Production Deployed</span>
            </div>

            {industry.proofSection.hasVerifiedCase && industry.proofSection.caseStudy ? (
              <div>
                <h3 className="btm-proof-case-title">
                  {industry.proofSection.caseStudy.title}
                </h3>
                <p className="btm-proof-case-tagline">
                  {industry.proofSection.caseStudy.tagline}
                </p>

                <div className="btm-proof-metrics-grid">
                  {industry.proofSection.caseStudy.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="btm-proof-metric-box">
                      <span className="btm-proof-metric-val">{m}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {industry.proofSection.caseStudy.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-[#0B2653] border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleGeneralConsult}
                    icon={<ArrowRight size={16} />}
                  >
                    Build Similar Architecture →
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="btm-proof-case-title">Explore Related Capabilities</h3>
                <p className="btm-proof-case-tagline">
                  BTM deploys dedicated engineering pods across custom cloud architectures, high-volume data streaming, and automated QA for {industry.name}.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleGeneralConsult}
                  icon={<ArrowRight size={16} />}
                >
                  Consult a Sector Architect →
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          6. Industry Final CTA Section
          ────────────────────────────────────────────────────────── */}
      <section className="btm-industry-cta-section">
        <div className="btm-industry-cta-card">
          <h2 className="btm-industry-cta-title">
            Have a challenge specific to <span style={{ color: '#EC1C24' }}>{industry.name}?</span>
          </h2>
          <p className="btm-industry-cta-desc">
            Connect with our senior enterprise solutions architects. We'll analyze your requirements, size your agile engineering pod, and provide a transparent delivery roadmap in 48 hours.
          </p>

          <div className="btm-industry-cta-btns">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGeneralConsult}
              icon={<ArrowRight size={18} />}
            >
              Find My Solution →
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleGeneralConsult}
              icon={<PhoneCall size={18} />}
            >
              Talk to BTM →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
