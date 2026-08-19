import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button, GradientText } from '../ui';
import { HeroNetwork3D } from './HeroNetwork3D';
import './hero.css';

export interface HeroSectionProps {
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPrimaryCtaClick,
  onSecondaryCtaClick,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="btm-hero-root">
      {/* Dynamic Background Canvas & Ambient Layer */}
      <div className="btm-hero-ambient-glow" />
      <div className="btm-hero-grid-pattern" />
      <div className="btm-hero-noise-layer" />

      <div className="btm-hero-container">
        {/* Left Column: Editorial Value Proposition & Messaging */}
        <motion.div
          className="btm-hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow Badge */}
          <motion.div variants={itemVariants} className="btm-hero-eyebrow-wrapper">
            <div className="btm-hero-eyebrow-badge">
              <Sparkles size={14} className="text-sky-400" />
              <span>TECHNOLOGY • ENGINEERING • AI</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="btm-hero-headline">
            WHAT ARE YOU <br />
            <GradientText variant="accent">BUILDING NEXT?</GradientText>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p variants={itemVariants} className="btm-hero-description">
            Tell us where you're going. We'll help you find the right way to build it.
          </motion.p>

          {/* Primary & Secondary Action CTAs */}
          <motion.div variants={itemVariants} className="btm-hero-cta-group">
            <Button
              variant="primary"
              size="lg"
              className="btm-hero-primary-btn"
              onClick={onPrimaryCtaClick}
              icon={<ArrowRight size={18} />}
            >
              Find My Solution →
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="btm-hero-secondary-btn"
              onClick={onSecondaryCtaClick}
            >
              Explore Our Work
            </Button>
          </motion.div>

          {/* Enterprise Credibility Badges Ribbon */}
          <motion.div variants={itemVariants} className="btm-hero-trust-ribbon">
            <div className="btm-trust-item">
              <CheckCircle2 size={16} className="btm-trust-icon" />
              <span>Top 1% Vetted Engineers</span>
            </div>
            <div className="btm-trust-item">
              <ShieldCheck size={16} className="btm-trust-icon" />
              <span>Wall Street Heritage</span>
            </div>
            <div className="btm-trust-item">
              <span className="btm-trust-dot" />
              <span>US (NJ) & India (Gurgaon) Hubs</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Interactive Connected Network Visualization */}
        <motion.div
          className="btm-hero-visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
        >
          <div className="btm-hero-visual-card">
            {/* Visual Header Indicator */}
            <div className="btm-visual-header">
              <div className="btm-visual-status-pill">
                <span className="btm-live-indicator-dot" />
                <span>Interactive Capability Matrix</span>
              </div>
              <span className="btm-visual-hint">Hover nodes to inspect</span>
            </div>

            {/* 3D Network Canvas */}
            <div className="btm-visual-canvas-wrapper">
              <HeroNetwork3D />
            </div>

            {/* Visual Footer Domain Tags */}
            <div className="btm-visual-tags-bar">
              <span>AI</span>
              <span>•</span>
              <span>Cloud</span>
              <span>•</span>
              <span>Data</span>
              <span>•</span>
              <span>Product</span>
              <span>•</span>
              <span>Web</span>
              <span>•</span>
              <span>Mobile</span>
              <span>•</span>
              <span>Engineering</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
