import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import './components.css';

/* ==========================================================================
   1. Button Component
   ========================================================================== */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'btm-btn-sm' : size === 'lg' ? 'btm-btn-lg' : '';
  const variantClass = `btm-btn-${variant}`;

  return (
    <button
      className={`btm-btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="btm-btn-spinner" />}
      {!isLoading && icon && iconPosition === 'left' && <span className="btm-btn-icon">{icon}</span>}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="btm-btn-icon">{icon}</span>}
    </button>
  );
};

/* ==========================================================================
   2. Badge & Pill Components
   ========================================================================== */
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'cyan' | 'violet' | 'neutral';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  dot = false,
  className = '',
}) => {
  return (
    <span className={`btm-badge btm-badge-${variant} ${className}`}>
      {dot && <span className="btm-badge-dot" />}
      {children}
    </span>
  );
};

export const Pill: React.FC<{
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}> = ({ label, active = false, onClick, icon, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btm-badge ${active ? 'btm-badge-primary' : 'btm-badge-neutral'} ${onClick ? 'cursor-pointer hover:border-blue-500' : ''} ${className}`}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

/* ==========================================================================
   3. Card & ExpandableCard Components
   ========================================================================== */
export interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  elevated?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  elevated = false,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`btm-card ${interactive ? 'btm-card-interactive' : ''} ${elevated ? 'btm-card-elevated' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  subtitle,
  badge,
  children,
  defaultExpanded = false,
  icon,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`btm-card ${isExpanded ? 'btm-card-elevated' : ''} ${className}`}>
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {icon}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h4 style={{ margin: 0, fontSize: 'var(--fs-h4)' }}>{title}</h4>
              {badge && <Badge variant="primary">{badge}</Badge>}
            </div>
            {subtitle && <p style={{ fontSize: 'var(--fs-body-sm)', margin: '0.25rem 0 0 0', color: 'var(--text-secondary)' }}>{subtitle}</p>}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={20} color="var(--text-secondary)" />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border)', marginTop: '1.25rem' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ==========================================================================
   4. SectionHeader Component
   ========================================================================== */
export interface SectionHeaderProps {
  tag?: string;
  tagVariant?: 'primary' | 'cyan' | 'violet';
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  tagVariant = 'primary',
  title,
  description,
  align = 'center',
  className = '',
}) => {
  return (
    <div className={`btm-section-header align-${align} ${className}`}>
      {tag && (
        <div className="btm-section-tag">
          <Badge variant={tagVariant} dot>{tag}</Badge>
        </div>
      )}
      <h2 className="btm-section-title">{title}</h2>
      {description && <p className="btm-section-desc">{description}</p>}
    </div>
  );
};

/* ==========================================================================
   5. GradientText Component (Clean Solid Brand Colors - No Artifacts)
   ========================================================================== */
export const GradientText: React.FC<{
  children: React.ReactNode;
  variant?: 'light' | 'accent' | 'primary';
  className?: string;
}> = ({ children, variant = 'accent', className = '' }) => {
  const color = variant === 'accent' ? '#EC1C24' : '#0B2653';
  return (
    <span
      className={className}
      style={{
        color: color,
        display: 'inline',
        fontWeight: 'inherit',
      }}
    >
      {children}
    </span>
  );
};

/* ==========================================================================
   6. Modal & Drawer Components
   ========================================================================== */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="btm-modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="btm-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              {title && <h3 style={{ margin: 0 }}>{title}</h3>}
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{ color: 'var(--text-secondary)', padding: '0.25rem', borderRadius: '50%' }}
              >
                <X size={22} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="btm-modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="btm-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              {title && <h3 style={{ margin: 0 }}>{title}</h3>}
              <button
                onClick={onClose}
                aria-label="Close drawer"
                style={{ color: 'var(--text-secondary)', padding: '0.25rem', borderRadius: '50%' }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ flex: 1 }}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ==========================================================================
   7. Tabs Component
   ========================================================================== */
export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`btm-tabs-container ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`btm-tab-item ${isActive ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

/* ==========================================================================
   8. Form Inputs (Input, Textarea, Select)
   ========================================================================== */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, id, className = '', ...props }) => {
  return (
    <div className="btm-input-group">
      {label && <label htmlFor={id} className="btm-input-label">{label}</label>}
      <input id={id} className={`btm-input-field ${className}`} {...props} />
      {error && <span style={{ color: '#EF4444', fontSize: 'var(--fs-caption)' }}>{error}</span>}
    </div>
  );
};

/* ==========================================================================
   9. TechnologyChip & LogoCloud Components
   ========================================================================== */
export const TechnologyChip: React.FC<{
  name: string;
  category?: string;
  icon?: React.ReactNode;
}> = ({ name, category, icon }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '0.5rem 0.875rem',
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--text-primary)',
      }}
    >
      {icon}
      <span>{name}</span>
      {category && (
        <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--fs-caption)' }}>• {category}</span>
      )}
    </div>
  );
};

export const LogoCloud: React.FC<{
  items: { name: string; icon?: React.ReactNode }[];
  title?: string;
}> = ({ items, title }) => {
  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      {title && (
        <p style={{ fontSize: 'var(--fs-caption)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: '1.25rem' }}>
          {title}
        </p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '0.625rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   10. ProgressBar Component
   ========================================================================== */
export const ProgressBar: React.FC<{
  currentStep: number;
  totalSteps: number;
  label?: string;
}> = ({ currentStep, totalSteps, label }) => {
  const percentage = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div style={{ width: '100%', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', fontSize: 'var(--fs-caption)', color: 'var(--text-secondary)' }}>
        <span>{label || `Step ${currentStep} of ${totalSteps}`}</span>
        <span>{percentage}%</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'var(--surface)', borderRadius: '999px', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent-electric) 100%)' }}
        />
      </div>
    </div>
  );
};

/* ==========================================================================
   11. CaseStudyCard Component
   ========================================================================== */
export interface CaseStudyCardProps {
  title: string;
  category: string;
  impact: string;
  technologies: string[];
  summary: string;
  onClick?: () => void;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  category,
  impact,
  technologies,
  summary,
  onClick,
}) => {
  return (
    <Card interactive onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <Badge variant="cyan">{category}</Badge>
        <span style={{ color: 'var(--accent-emerald)', fontSize: 'var(--fs-caption)', fontWeight: 600 }}>
          {impact}
        </span>
      </div>
      <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        {summary}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: 'auto' }}>
        {technologies.map((t, idx) => (
          <span
            key={idx}
            style={{
              fontSize: '0.7rem',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              color: 'var(--text-tertiary)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </Card>
  );
};

/* ==========================================================================
   12. CTA Banner Component
   ========================================================================== */
export const CTA: React.FC<{
  title: string;
  subtitle: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}> = ({
  title,
  subtitle,
  primaryActionLabel = 'Find My Solution',
  secondaryActionLabel = 'Explore Our Work',
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(13, 18, 26, 0.95) 100%)',
        border: '1px solid var(--primary-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(2rem, 5vw, 4rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: '0.75rem' }}>{title}</h2>
      <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 2rem auto' }}>
        {subtitle}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
        <Button size="lg" variant="primary" onClick={onPrimaryClick} icon={<ArrowRight size={18} />}>
          {primaryActionLabel}
        </Button>
        {secondaryActionLabel && (
          <Button size="lg" variant="secondary" onClick={onSecondaryClick}>
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
