import React, { useState } from 'react';
import { HeroSection } from './components/hero/HeroSection';
import { SolutionFinderSection } from './components/solution-finder/SolutionFinderSection';
import { TechUniverseSection } from './components/tech-universe/TechUniverseSection';
import { CaseStudiesSection } from './components/case-studies/CaseStudiesSection';
import { type CaseStudyData } from './components/case-studies/CaseStudyModal';
import { WhyBtmSection } from './components/why-btm/WhyBtmSection';
import { LeadershipTrustSection } from './components/leadership/LeadershipTrustSection';
import { TeamBuilderSection, type RoleType, type TeamSize, type Timeline } from './components/team-builder/TeamBuilderSection';
import { ProductFinderSection, type ProductType, type ProductStage } from './components/product-finder/ProductFinderSection';
import { AiOpportunityFinderSection, type AiDomain, type AiTechType } from './components/ai-finder/AiOpportunityFinderSection';
import { ProgressiveLeadGenDrawer, type LeadGenContextData } from './components/lead-gen/ProgressiveLeadGenDrawer';
import { ProgressiveLeadGenSection } from './components/lead-gen/ProgressiveLeadGenSection';
import { SolutionFinderProvider, useSolutionFinder, type GoalId } from './context/SolutionFinderContext';
import { Button, GradientText, Badge } from './components/ui';
import { ArrowRight, ShieldCheck } from 'lucide-react';

function AppContent() {
  const [isLeadDrawerOpen, setIsLeadDrawerOpen] = useState(false);
  const [drawerContext, setDrawerContext] = useState<LeadGenContextData | null>(null);

  const { selectedGoal, setSelectedGoal, recommendation } = useSolutionFinder();

  // Handlers for interactive sections
  const handleOpenDrawerWithContext = (context: LeadGenContextData) => {
    setDrawerContext(context);
    setIsLeadDrawerOpen(true);
  };

  const handleSolutionFinderAction = (goalId: GoalId) => {
    setSelectedGoal(goalId);
    if (recommendation) {
      handleOpenDrawerWithContext({
        title: recommendation.title,
        category: 'Solution Pathway',
        details: recommendation.recommendedNextStep,
        summaryItems: [
          { label: 'Delivery Model', value: recommendation.engagementModels[0] || 'Dedicated Pod' },
          { label: 'Timeline', value: recommendation.timelineEstimate },
        ],
      });
    } else {
      handleOpenDrawerWithContext({
        title: 'Custom Engineering Diagnostic',
        category: 'Solution Finder',
        details: 'Unbiased technical roadmap and talent recommendation.',
      });
    }
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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* ──────────────────────────────────────────────────────────
          1. Clean Primary Navigation Header
          ────────────────────────────────────────────────────────── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--glass-surface)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          padding: '1rem clamp(1rem, 4vw, 2.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'var(--font-primary)' }}>
            BTM <GradientText variant="accent">OUTSOURCING</GradientText>
          </span>
          <Badge variant="cyan" dot className="hidden sm:inline-flex">
            Interactive Technology Advisor
          </Badge>
        </div>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            fontSize: 'var(--fs-body-sm)',
            fontWeight: 500,
          }}
          className="hidden md:flex"
        >
          <span
            style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}
            onClick={() => handleNavigateSection('solution-finder')}
          >
            Solutions
          </span>
          <span
            style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}
            onClick={() => handleNavigateSection('tech-universe')}
          >
            Technology
          </span>
          <span
            style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}
            onClick={() => handleNavigateSection('work-showcase')}
          >
            Work
          </span>
          <span
            style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}
            onClick={() => handleNavigateSection('why-btm')}
          >
            About
          </span>
        </nav>

        <Button
          variant="primary"
          size="sm"
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
      </header>

      {/* ──────────────────────────────────────────────────────────
          The Final Pure Flow (Detailed info lives behind interactions)
          ────────────────────────────────────────────────────────── */}
      <main>
        {/* 1. HERO SECTION: "WHAT ARE YOU BUILDING NEXT?" + 3D TECH WORLD */}
        <HeroSection
          onPrimaryCtaClick={() => handleNavigateSection('solution-finder')}
          onSecondaryCtaClick={() => handleNavigateSection('work-showcase')}
        />

        {/* 2. SOLUTION FINDER: "WHAT ARE YOU TRYING TO ACHIEVE?" (7 Goals) */}
        <SolutionFinderSection
          onActionTrigger={(goalId) => handleSolutionFinderAction(goalId)}
        />

        {/* 3. EXPLORE BTM CAPABILITIES: Connected Node Constellation Graph */}
        <TechUniverseSection
          onTechExploreClick={(techData) => handleTechExplore(techData)}
        />

        {/* 4. OUR WORK: Real BTM Case Studies (Click -> Full-Screen Modal) */}
        <CaseStudiesSection
          onDiscussCaseClick={(caseData) => handleDiscussCase(caseData)}
        />

        {/* 5. WHY COMPANIES CHOOSE BTM: Proof • Process • People */}
        <WhyBtmSection
          onLearnMoreClick={(pillarId) => handlePillarInspect(pillarId)}
        />

        {/* 5B. REAL BTM LEADERSHIP: The Technology Advisor Difference */}
        <LeadershipTrustSection
          onConsultLeaderClick={(leader) => handleLeaderConsult(leader)}
        />

        {/* 6. NOT SURE WHERE TO START?: Progressive Lead Generation Engine */}
        <ProgressiveLeadGenSection
          onLeadSubmit={(lead) => {
            console.log('Lead submitted:', lead);
          }}
        />
      </main>

      {/* ──────────────────────────────────────────────────────────
          Interactive Deep-Dive Drawer (Lives Behind Interactions)
          ────────────────────────────────────────────────────────── */}
      <ProgressiveLeadGenDrawer
        isOpen={isLeadDrawerOpen}
        onClose={() => setIsLeadDrawerOpen(false)}
        contextData={drawerContext}
      />

      {/* ──────────────────────────────────────────────────────────
          Enterprise Footer (Real BTM Headquarters & APAC Center)
          ────────────────────────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: 'var(--surface-elevated)',
          borderTop: '1px solid var(--border)',
          padding: '4rem 1.5rem 2rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
            {/* Col 1: BTM Overview */}
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'var(--font-primary)', marginBottom: '0.75rem' }}>
                BTM <GradientText variant="accent">OUTSOURCING</GradientText>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Interactive Technology Advisor & elite software engineering partner. Delivering high-throughput platforms, dedicated agile pods, and production AI architectures.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#10B981' }}>
                <ShieldCheck size={16} />
                <span>100% Strict NDA Protection & Top 1% Vetted Talent</span>
              </div>
            </div>

            {/* Col 2: US Corporate Office */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                US Corporate Headquarters
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                4 Canterbury Road, Denville,<br />
                NJ -07834, United States
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                <a href="tel:+18624371138" style={{ color: 'var(--accent-electric)', textDecoration: 'none' }}>
                  📞 +1-862-437-1138
                </a>
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                ✉ cs@btm-financial.com
              </p>
            </div>

            {/* Col 3: India Delivery Center */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                APAC Delivery & Engineering Center
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                Unit No. 807, Tower-B4, Spaze I Tech Park,<br />
                Sector-49, Sohna Road, Gurgaon Haryana, India (122018)
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                <a href="tel:+911244104312" style={{ color: 'var(--accent-electric)', textDecoration: 'none' }}>
                  📞 +91-124-410-4312
                </a>
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                ✉ infocs@btm-financial.com
              </p>
            </div>

            {/* Col 4: Solutions & Leadership */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                Core Capabilities
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <li>• Top 1% IT Staff Augmentation</li>
                <li>• Dedicated Agile Engineering Pods</li>
                <li>• Custom SaaS & Web Application Build</li>
                <li>• Enterprise AI, IDR & RAG Architectures</li>
                <li>• Fixed Income & Financial Analytics</li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            <div>
              © {new Date().getFullYear()} BTM Financial LLC / BTM Outsourcing. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Security & Compliance</span>
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
