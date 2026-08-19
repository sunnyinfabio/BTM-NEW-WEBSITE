import React from 'react';
import './backgrounds.css';

/**
 * 1. HeroTechnologyBackground
 * Combines high-tech subtle grid, radial glow nodes, and dynamic depth for hero sections.
 */
export const HeroTechnologyBackground: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`btm-bg-container btm-bg-hero ${className}`}>
      <div className="btm-bg-grid-overlay" />
      <div className="btm-bg-glow-node btm-glow-primary" />
      <div className="btm-bg-glow-node btm-glow-cyan" />
      <div className="btm-bg-vignette" />
      <div className="btm-bg-content">{children}</div>
    </div>
  );
};

/**
 * 2. GridGlowBackground
 * Geometric grid with centered or accent electric blue ambient glow.
 */
export const GridGlowBackground: React.FC<{
  children?: React.ReactNode;
  glowColor?: 'blue' | 'cyan' | 'violet';
  className?: string;
}> = ({ children, glowColor = 'blue', className = '' }) => {
  return (
    <div className={`btm-bg-container btm-bg-grid-glow ${className}`}>
      <div className="btm-bg-fine-grid" />
      <div className={`btm-bg-ambient-orb orb-${glowColor}`} />
      <div className="btm-bg-content">{children}</div>
    </div>
  );
};

/**
 * 3. AuroraBackground
 * Soft undulating multi-color cosmic gradient background (Electric Blue + Violet + Cyan).
 */
export const AuroraBackground: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`btm-bg-container btm-bg-aurora ${className}`}>
      <div className="btm-aurora-layer aurora-layer-1" />
      <div className="btm-aurora-layer aurora-layer-2" />
      <div className="btm-aurora-layer aurora-layer-3" />
      <div className="btm-bg-noise-overlay" />
      <div className="btm-bg-content">{children}</div>
    </div>
  );
};

/**
 * 4. TechnologyMeshBackground
 * Technical circuit/matrix feel with micro-dots and subtle diagonal mesh lines.
 */
export const TechnologyMeshBackground: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`btm-bg-container btm-bg-mesh ${className}`}>
      <div className="btm-mesh-pattern" />
      <div className="btm-mesh-gradient" />
      <div className="btm-bg-content">{children}</div>
    </div>
  );
};

/**
 * 5. CleanSurfaceBackground
 * High-clarity solid dark surface with refined borders for content-dense cards or modal panels.
 */
export const CleanSurfaceBackground: React.FC<{
  children?: React.ReactNode;
  elevated?: boolean;
  className?: string;
}> = ({ children, elevated = false, className = '' }) => {
  return (
    <div
      className={`btm-bg-container btm-bg-clean ${elevated ? 'surface-elevated' : 'surface-base'} ${className}`}
    >
      <div className="btm-bg-content">{children}</div>
    </div>
  );
};

/**
 * 6. ImageOverlayBackground
 * Controlled dark overlay with gradient mask for team and office imagery.
 */
export const ImageOverlayBackground: React.FC<{
  src: string;
  alt?: string;
  opacity?: number;
  children?: React.ReactNode;
  className?: string;
}> = ({ src, alt = '', opacity = 0.25, children, className = '' }) => {
  return (
    <div className={`btm-bg-container btm-bg-image-overlay ${className}`}>
      <img
        src={src}
        alt={alt}
        className="btm-bg-img"
        style={{ opacity }}
        loading="lazy"
      />
      <div className="btm-bg-img-gradient-scrim" />
      <div className="btm-bg-content">{children}</div>
    </div>
  );
};
