import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface IndustryData {
  id: string;
  name: string;
  oneLiner: string;
  icon: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  accentColor: string;
  overview: string;
  challenge: string;
  approach: string;
  capabilities: { title: string; desc: string }[];
  metrics: { value: string; label: string }[];
  techStack: string[];
}

export interface IndustryCardProps {
  industry: IndustryData;
  onClick: () => void;
  index: number;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry, onClick, index }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.button
      type="button"
      className="btm-industry-card"
      onClick={onClick}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      aria-label={`Explore ${industry.name} technology solutions`}
      tabIndex={0}
    >
      {/* Background Image Layer */}
      <div className="btm-industry-image-wrap">
        <img
          src={industry.imageUrl}
          alt={industry.imageAlt}
          className="btm-industry-img"
          loading="lazy"
        />
        <div className="btm-industry-scrim" />
      </div>

      {/* Foreground Content */}
      <div className="btm-industry-card-content">
        <div
          className="btm-industry-icon-bubble"
          style={{ borderColor: `${industry.accentColor}55` }}
          aria-hidden="true"
        >
          {industry.icon}
        </div>
        <h3 className="btm-industry-name">{industry.name}</h3>
        <p className="btm-industry-desc">{industry.oneLiner}</p>
        <span className="btm-industry-cta-row">
          <span>Explore Industry</span>
          <ArrowRight size={15} />
        </span>
      </div>
    </motion.button>
  );
};
