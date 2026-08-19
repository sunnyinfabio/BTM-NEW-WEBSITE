import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export interface FloatingAdvisorTriggerProps {
  onClick: () => void;
}

export const FloatingAdvisorTrigger: React.FC<FloatingAdvisorTriggerProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
          }}
        >
          <button
            type="button"
            onClick={onClick}
            style={{
              background: '#EC1C24',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '9999px',
              padding: '0.75rem 1.4rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              boxShadow: '0 8px 25px rgba(236, 28, 36, 0.4)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLElement).style.backgroundColor = '#0B2653';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(11, 38, 83, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.backgroundColor = '#EC1C24';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 25px rgba(236, 28, 36, 0.4)';
            }}
          >
            <Zap size={15} color="#FFFFFF" />
            <span>⚡ Match My Pod in 48h</span>
            <ArrowRight size={14} color="#FFFFFF" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
