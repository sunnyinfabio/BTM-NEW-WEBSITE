import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from './components/hero/HeroSection';
import { SolutionFinderSection } from './components/solution-finder/SolutionFinderSection';
import { TechUniverseSection } from './components/tech-universe/TechUniverseSection';
import { CaseStudiesSection } from './components/case-studies/CaseStudiesSection';
import { type CaseStudyData } from './components/case-studies/CaseStudyModal';
import { WhyBtmSection } from './components/why-btm/WhyBtmSection';
import { LeadershipTrustSection } from './components/leadership/LeadershipTrustSection';
import { ProgressiveLeadGenDrawer, type LeadGenContextData } from './components/lead-gen/ProgressiveLeadGenDrawer';
import { ProgressiveLeadGenSection } from './components/lead-gen/ProgressiveLeadGenSection';
import { SolutionFinderProvider, useSolutionFinder, type GoalId } from './context/SolutionFinderContext';
import { Button, Badge, AmbientFourLayerBackground } from './components/ui';
import { FloatingAdvisorTrigger } from './components/ui/FloatingAdvisorTrigger';
import { ArrowRight, ShieldCheck, Menu, X } from 'lucide-react';

import { IndustryExplorer } from './components/industry-explorer/IndustryExplorer';
import { IndustryDetailPage } from './components/industry-detail/IndustryDetailPage';

function AppContent() {
  const [isLeadDrawerOpen, setIsLeadDrawerOpen] = useState(false);
  const [drawerContext, setDrawerContext] = useState<LeadGenContextData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dedicated Browser URL Routing
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setIsMobileMenuOpen(false);
  };

  const { selectedGoal, setSelectedGoal, selectedIndustry, setSelectedIndustry, matrixRecommendation } = useSolutionFinder();

  // Handlers for interactive sections
  const handleOpenDrawerWithContext = (context: LeadGenContextData) => {
    setDrawerContext(context);
    setIsLeadDrawerOpen(true);
  };

  const handleSolutionFinderAction = (payload: {
    goalId: GoalId;
    industryId: any;
    title: string;
    category: string;
    details: string;
    summaryItems: { label: string; value: string }[];
  }) => {
    handleOpenDrawerWithContext({
      title: payload.title,
      category: payload.category,
      details: payload.details,
      summaryItems: payload.summaryItems,
    });
  };

  const handleTechExplore = (techData: { name: string; category: string }) => {
    handleOpenDrawerWithContext({
      title: `${techData.name} Architecture & Talent Pod`,
      category: 'Technology Stack',
      details: `Consulting on enterprise ${techData.name} infrastructure, development, and Top 1% staffing.`,
      summaryItems: [{ label: 'Technology Domain', value: techData.name }],
    });
  };

  const handleDiscussCase = (caseData: CaseStudyData) => {
    handleOpenDrawerWithContext({
      title: `Case Study Inquiry: ${caseData.title}`,
      category: `${caseData.category} Case Reference`,
      details: `Discussing technical architecture, team size, and deliverables similar to the ${caseData.title}.`,
      summaryItems: [
        { label: 'Domain', value: caseData.category },
        { label: 'Key Tech', value: caseData.techStack.slice(0, 3).join(', ') },
      ],
    });
  };

  const handleLeaderConsult = (leader: { name: string; role: string }) => {
    handleOpenDrawerWithContext({
      title: `Direct Consultation with ${leader.name}`,
      category: 'Leadership Advisory',
      details: `Consulting on enterprise strategy, engineering pod governance, and software architecture with ${leader.name} (${leader.role}).`,
      summaryItems: [{ label: 'Executive Advisor', value: leader.name }],
    });
  };

  const handlePillarInspect = (pillarId: string) => {
    handleOpenDrawerWithContext({
      title: `BTM ${pillarId.toUpperCase()} Standards Audit`,
      category: 'Governance & Standards',
      details: `Review our verified SLAs, SDLC sprint delivery governance, and executive oversight for your project.`,
      summaryItems: [{ label: 'Audit Category', value: pillarId.toUpperCase() }],
    });
  };

  const handleNavigateSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (currentPath !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Route matching for /industries/:slug
  const isIndustryRoute = currentPath.startsWith('/industries/');
  const industrySlug = isIndustryRoute ? currentPath.replace('/industries/', '').replace(/\/$/, '') : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--text-primary)', position: 'relative', overflowX: 'hidden' }}>
      {/* Global Persistent 4-Layer Ambient Atmosphere across all pages */}
      <AmbientFourLayerBackground className="btm-global-atmosphere" />

      {/* ──────────────────────────────────────────────────────────
          1. Clean Primary Navigation Header (Matching Live BTM Site)
          ────────────────────────────────────────────────────────── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          padding: '0.875rem clamp(1rem, 4vw, 2.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Brand Logo & Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src="https://btmoutsourcing.com/assets/images/logo/logo-dark.png"
              alt="BTM Outsourcing Logo"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </a>
          <Badge variant="cyan" dot className="hidden lg:inline-flex">
            Interactive Technology Advisor
          </Badge>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            fontSize: 'var(--fs-body-sm)',
            fontWeight: 700,
          }}
          className="hidden md:flex"
        >
          <span
            style={{ color: 'var(--brand-navy)', cursor: 'pointer', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-red)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--brand-navy)')}
            onClick={() => handleNavigateSection('solution-finder')}
          >
            Solutions
          </span>
          <span
            style={{ color: 'var(--brand-navy)', cursor: 'pointer', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-red)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--brand-navy)')}
            onClick={() => handleNavigateSection('industry-explorer')}
          >
            Industries
          </span>
          <span
            style={{ color: 'var(--brand-navy)', cursor: 'pointer', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-red)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--brand-navy)')}
            onClick={() => handleNavigateSection('work-showcase')}
          >
            Work
          </span>
          <span
            style={{ color: 'var(--brand-navy)', cursor: 'pointer', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-red)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--brand-navy)')}
            onClick={() => handleNavigateSection('tech-universe')}
          >
            Technology
          </span>
          <span
            style={{ color: 'var(--brand-navy)', cursor: 'pointer', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-red)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--brand-navy)')}
            onClick={() => handleNavigateSection('why-btm')}
          >
            About
          </span>
        </nav>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Button
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() =>
              handleOpenDrawerWithContext({
                title: 'Find My Custom Solution',
                category: 'General Consultation',
                details: 'Connect with a senior technology advisor to scope your engineering roadmap.',
              })
            }
            icon={<ArrowRight size={15} />}
          >
            Find My Solution →
          </Button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              color: 'var(--brand-navy)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────
          Mobile Drawer Menu Overlay
          ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 99,
              background: '#FFFFFF',
              borderBottom: '2px solid var(--brand-navy)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
              <span
                style={{ color: 'var(--brand-navy)', cursor: 'pointer', padding: '0.5rem 0' }}
                onClick={() => handleNavigateSection('solution-finder')}
              >
                1. Solutions & Goals
              </span>
              <span
                style={{ color: 'var(--brand-navy)', cursor: 'pointer', padding: '0.5rem 0' }}
                onClick={() => handleNavigateSection('industry-explorer')}
              >
                2. Industries We Empower
              </span>
              <span
                style={{ color: 'var(--brand-navy)', cursor: 'pointer', padding: '0.5rem 0' }}
                onClick={() => handleNavigateSection('work-showcase')}
              >
                3. Enterprise Work (8 Case Studies)
              </span>
              <span
                style={{ color: 'var(--brand-navy)', cursor: 'pointer', padding: '0.5rem 0' }}
                onClick={() => handleNavigateSection('tech-universe')}
              >
                4. Technology Constellation
              </span>
              <span
                style={{ color: 'var(--brand-navy)', cursor: 'pointer', padding: '0.5rem 0' }}
                onClick={() => handleNavigateSection('why-btm')}
              >
                5. Why Choose BTM (Proof & Process)
              </span>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenDrawerWithContext({
                    title: 'Find My Custom Solution',
                    category: 'Mobile Quick Diagnostic',
                    details: 'Connect with a senior technology advisor to scope your engineering roadmap.',
                  });
                }}
                icon={<ArrowRight size={18} />}
              >
                Find My Solution →
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────
          MAIN CONTENT AREA (Router: Home Flow vs Dedicated Industry View)
          ────────────────────────────────────────────────────────── */}
      <main>
        {isIndustryRoute && industrySlug ? (
          /* Dedicated Interactive Industry Detail Experience */
          <IndustryDetailPage
            slug={industrySlug}
            onNavigateHome={() => navigateTo('/')}
            onSelectIndustry={(newSlug) => navigateTo(`/industries/${newSlug}`)}
            onOpenAdvisorDrawer={handleOpenDrawerWithContext}
          />
        ) : (
          /* Pure Home Customer Journey */
          <>
            {/* 1. HERO SECTION: "WHAT ARE YOU BUILDING NEXT?" + 3D TECH WORLD */}
            <HeroSection
              onPrimaryCtaClick={() => handleNavigateSection('solution-finder')}
              onSecondaryCtaClick={() => handleNavigateSection('work-showcase')}
            />

            {/* 2. SOLUTION FINDER: "WHAT ARE YOU TRYING TO ACHIEVE?" (7 Goals × 6 Industries) */}
            <SolutionFinderSection
              onActionTrigger={(payload) => handleSolutionFinderAction(payload)}
            />

            {/* 3. INDUSTRIES WE EMPOWER: 6 Sector Practices */}
            <IndustryExplorer
              onNavigateToIndustry={(slug) => navigateTo(`/industries/${slug}`)}
              onConsultIndustryAdvisor={(industryData) =>
                handleOpenDrawerWithContext({
                  title: industryData.name,
                  category: industryData.category,
                  details: industryData.details,
                })
              }
            />

            {/* 4. WORK / PROOF: Real BTM Case Studies (Click -> Full-Screen Modal) */}
            <CaseStudiesSection
              onDiscussCaseClick={(caseData) => handleDiscussCase(caseData)}
            />

            {/* 5. TECHNOLOGY: Connected Node Constellation Graph */}
            <TechUniverseSection
              onTechExploreClick={(techData) => handleTechExplore(techData)}
            />

            {/* 6. ABOUT: Proof • Process • People */}
            <WhyBtmSection
              onLearnMoreClick={(pillarId) => handlePillarInspect(pillarId)}
            />

            {/* 6B. LEADERSHIP & TRUST: Wall Street Pedigree & Advisor Difference */}
            <LeadershipTrustSection
              onConsultLeaderClick={(leader) => handleLeaderConsult(leader)}
            />

            {/* 7. FIND MY SOLUTION / FINAL CTA: Progressive Lead Generation Engine */}
            <ProgressiveLeadGenSection
              onLeadSubmit={(lead) => {
                console.log('Lead submitted:', lead);
              }}
            />
          </>
        )}
      </main>

      {/* Floating Action Trigger on Scroll */}
      <FloatingAdvisorTrigger
        onClick={() =>
          handleOpenDrawerWithContext({
            title: '48-Hour Engineering Pod Assembly',
            category: 'Express Diagnostic',
            details: 'Get top 1% vetted talent matched in 48 hours for your technology roadmap.',
          })
        }
      />

      {/* ──────────────────────────────────────────────────────────
          Interactive Deep-Dive Drawer (Lives Behind Interactions)
          ────────────────────────────────────────────────────────── */}
      <ProgressiveLeadGenDrawer
        isOpen={isLeadDrawerOpen}
        onClose={() => setIsLeadDrawerOpen(false)}
        contextData={drawerContext}
      />

      {/* ──────────────────────────────────────────────────────────
          Corporate Enterprise Footer (Authentic BTM Deep Navy Theme)
          ────────────────────────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: '#0B2653',
          color: '#FFFFFF',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '4.5rem 1.5rem 2.5rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
            {/* Col 1: BTM Overview */}
            <div>
              <div style={{ marginBottom: '1.25rem', display: 'inline-block', background: 'rgba(255, 255, 255, 0.1)', padding: '6px 12px', borderRadius: '8px' }}>
                <img
                  src="https://btmoutsourcing.com/assets/images/logo/logo-dark.png"
                  alt="BTM Outsourcing Logo"
                  style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <p style={{ fontSize: '0.85rem', color: '#CAD7E8', lineHeight: 1.6, marginBottom: '1rem' }}>
                Interactive Technology Advisor & elite software engineering partner. Delivering high-throughput platforms, dedicated agile pods, and production AI architectures.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#00C881' }}>
                <ShieldCheck size={16} />
                <span>100% Strict NDA Protection & Top 1% Vetted Talent</span>
              </div>
            </div>

            {/* Col 2: US Corporate Office */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                US Corporate Headquarters
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#CAD7E8', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                4 Canterbury Road, Denville,<br />
                NJ -07834, United States
              </p>
              <p style={{ fontSize: '0.8rem', color: '#FFFFFF', marginBottom: '0.35rem' }}>
                <a href="tel:+18624371138" style={{ color: '#00C881', textDecoration: 'none', fontWeight: 700 }}>
                  📞 +1-862-437-1138
                </a>
              </p>
              <p style={{ fontSize: '0.8rem', color: '#CAD7E8' }}>
                ✉ cs@btm-financial.com
              </p>
            </div>

            {/* Col 3: India Delivery Center */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                APAC Delivery & Engineering Center
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#CAD7E8', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                Unit No. 807, Tower-B4, Spaze I Tech Park,<br />
                Sector-49, Sohna Road, Gurgaon Haryana, India (122018)
              </p>
              <p style={{ fontSize: '0.8rem', color: '#FFFFFF', marginBottom: '0.35rem' }}>
                <a href="tel:+911244104312" style={{ color: '#00C881', textDecoration: 'none', fontWeight: 700 }}>
                  📞 +91-124-410-4312
                </a>
              </p>
              <p style={{ fontSize: '0.8rem', color: '#CAD7E8' }}>
                ✉ infocs@btm-financial.com
              </p>
            </div>

            {/* Col 4: Industries & Solutions */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                Industries We Empower
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: '#CAD7E8' }}>
                <li>
                  <a
                    href="/industries/capital-market"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/industries/capital-market');
                    }}
                    style={{ color: '#CAD7E8', textDecoration: 'none' }}
                  >
                    • Capital Market
                  </a>
                </li>
                <li>
                  <a
                    href="/industries/retail"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/industries/retail');
                    }}
                    style={{ color: '#CAD7E8', textDecoration: 'none' }}
                  >
                    • Retail & POS
                  </a>
                </li>
                <li>
                  <a
                    href="/industries/pharma"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/industries/pharma');
                    }}
                    style={{ color: '#CAD7E8', textDecoration: 'none' }}
                  >
                    • Pharma & Clinical Data
                  </a>
                </li>
                <li>
                  <a
                    href="/industries/healthcare"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/industries/healthcare');
                    }}
                    style={{ color: '#CAD7E8', textDecoration: 'none' }}
                  >
                    • Healthcare & Telehealth
                  </a>
                </li>
                <li>
                  <a
                    href="/industries/fmcg"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/industries/fmcg');
                    }}
                    style={{ color: '#CAD7E8', textDecoration: 'none' }}
                  >
                    • FMCG & Supply Chain
                  </a>
                </li>
                <li>
                  <a
                    href="/industries/oil-and-gas"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/industries/oil-and-gas');
                    }}
                    style={{ color: '#CAD7E8', textDecoration: 'none' }}
                  >
                    • Oil & Gas Telemetry
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright, Legal Links & Right Bottom Site Credit */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.25rem', fontSize: '0.75rem', color: '#CAD7E8' }}>
            <div>
              © {new Date().getFullYear()} BTM Financial LLC / BTM Outsourcing. All rights reserved.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ cursor: 'pointer' }}>Terms of Service</span>
              <span style={{ cursor: 'pointer' }}>Security & Compliance</span>

              {/* Site Credit Badge (Right Bottom Corner) */}
              <div className="poweredBy" style={{ marginLeft: '0.5rem' }}>
                <a
                  href="https://play.fabulousmedia.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FabulousMedia"
                  className="creditLogo"
                >
                  <img
                    src="https://play.fabulousmedia.in/sitecredit/images/fabulousmedia.svg"
                    alt="FabulousMedia"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://www.infabio.com/fabulous-logo.webp';
                    }}
                  />
                </a>
                <div className="divider"></div>
                <a
                  href="https://gocommercially.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GoCommercially"
                  className="creditLogo"
                >
                  <img
                    src="https://play.fabulousmedia.in/sitecredit/images/gocommercially.svg"
                    alt="GoCommercially"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://www.infabio.com/gocommercially-logo.webp';
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SolutionFinderProvider>
      <AppContent />
    </SolutionFinderProvider>
  );
}
