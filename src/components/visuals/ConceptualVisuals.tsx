import React from 'react';
import './conceptualVisuals.css';

/**
 * 1. Web Conceptual Visual: Abstract UI architecture, code stream & modular design system
 */
export const WebConceptualVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`btm-conceptual-visual btm-web-visual ${className}`}>
    <div className="btm-concept-browser-frame">
      <div className="btm-concept-top-dots">
        <span className="btm-c-dot red" />
        <span className="btm-c-dot yellow" />
        <span className="btm-c-dot green" />
        <div className="btm-concept-address-bar" />
      </div>
      <div className="btm-concept-browser-body">
        <div className="btm-concept-sidebar-lines">
          <div className="btm-c-line w-full" />
          <div className="btm-c-line w-3/4" />
          <div className="btm-c-line w-1/2" />
        </div>
        <div className="btm-concept-main-canvas">
          <div className="btm-c-card-grid">
            <div className="btm-c-mini-card active" />
            <div className="btm-c-mini-card" />
            <div className="btm-c-mini-card" />
          </div>
          <div className="btm-c-code-bar" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * 2. Mobile Conceptual Visual: Multi-platform mobile app wireframe & fluid responsiveness
 */
export const MobileConceptualVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`btm-conceptual-visual btm-mobile-visual ${className}`}>
    <div className="btm-concept-phone-frame">
      <div className="btm-concept-phone-notch" />
      <div className="btm-concept-phone-screen">
        <div className="btm-phone-header-pill" />
        <div className="btm-phone-hero-card" />
        <div className="btm-phone-row-items">
          <div className="btm-phone-circle" />
          <div className="btm-phone-bar-wrap">
            <div className="btm-phone-bar w-full" />
            <div className="btm-phone-bar w-2/3" />
          </div>
        </div>
        <div className="btm-phone-row-items">
          <div className="btm-phone-circle" />
          <div className="btm-phone-bar-wrap">
            <div className="btm-phone-bar w-4/5" />
            <div className="btm-phone-bar w-1/2" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * 3. AI Conceptual Visual: Neural matrix, vector embeddings & deep learning synapses
 */
export const AiConceptualVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`btm-conceptual-visual btm-ai-visual ${className}`}>
    <svg className="btm-ai-neural-svg" viewBox="0 0 200 120" preserveAspectRatio="none">
      <line x1="30" y1="30" x2="100" y2="20" className="btm-synapse-line" />
      <line x1="30" y1="30" x2="100" y2="60" className="btm-synapse-line" />
      <line x1="30" y1="90" x2="100" y2="60" className="btm-synapse-line" />
      <line x1="30" y1="90" x2="100" y2="100" className="btm-synapse-line" />
      <line x1="100" y1="20" x2="170" y2="60" className="btm-synapse-line active" />
      <line x1="100" y1="60" x2="170" y2="60" className="btm-synapse-line active" />
      <line x1="100" y1="100" x2="170" y2="60" className="btm-synapse-line active" />

      <circle cx="30" cy="30" r="7" className="btm-neural-node" />
      <circle cx="30" cy="90" r="7" className="btm-neural-node" />
      <circle cx="100" cy="20" r="8" className="btm-neural-node" />
      <circle cx="100" cy="60" r="10" className="btm-neural-node core-pulse" />
      <circle cx="100" cy="100" r="8" className="btm-neural-node" />
      <circle cx="170" cy="60" r="11" className="btm-neural-node output-node" />
    </svg>
    <span className="btm-ai-tag">LLM • RAG • IDR</span>
  </div>
);

/**
 * 4. Cloud Conceptual Visual: Distributed microservice topology & multi-region sync
 */
export const CloudConceptualVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`btm-conceptual-visual btm-cloud-visual ${className}`}>
    <div className="btm-cloud-topology-wrap">
      <div className="btm-cloud-cluster-box main">
        <span className="btm-cluster-label">VPC Primary (AWS/Azure)</span>
        <div className="btm-pod-dots">
          <span className="btm-p-dot active" />
          <span className="btm-p-dot active" />
          <span className="btm-p-dot active" />
          <span className="btm-p-dot" />
        </div>
      </div>
      <div className="btm-cloud-replicas-row">
        <div className="btm-cloud-cluster-box sub">
          <span className="btm-cluster-label">Replica US-East</span>
        </div>
        <div className="btm-cloud-cluster-box sub">
          <span className="btm-cluster-label">Replica APAC</span>
        </div>
      </div>
    </div>
  </div>
);

/**
 * 5. Data Conceptual Visual: High-frequency data pipelines & relational analytics
 */
export const DataConceptualVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`btm-conceptual-visual btm-data-visual ${className}`}>
    <div className="btm-data-pipeline-grid">
      <div className="btm-data-cylinder">
        <div className="btm-cyl-top" />
        <div className="btm-cyl-body" />
      </div>
      <div className="btm-data-flow-arrows">
        <span className="btm-flow-dot" />
        <span className="btm-flow-dot" />
        <span className="btm-flow-dot" />
      </div>
      <div className="btm-data-stats-card">
        <span className="text-emerald-400 font-bold text-xs">50M+ Computations</span>
        <div className="btm-data-bars-row">
          <span style={{ height: '60%' }} />
          <span style={{ height: '90%' }} />
          <span style={{ height: '45%' }} />
          <span style={{ height: '100%' }} />
        </div>
      </div>
    </div>
  </div>
);

/**
 * 6. Quality Assurance / Security Conceptual Visual: Automated test suites & zero-trust shield
 */
export const QaConceptualVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`btm-conceptual-visual btm-qa-visual ${className}`}>
    <div className="btm-qa-shield-box">
      <div className="btm-qa-check-ring">
        <span className="text-emerald-400 font-extrabold text-sm">100%</span>
      </div>
      <div className="btm-qa-test-rows">
        <div className="btm-qa-line passed">
          <span>✓ Unit & Integration</span>
          <span className="btm-status-pill">PASS</span>
        </div>
        <div className="btm-qa-line passed">
          <span>✓ HIPAA & SOC2 Security</span>
          <span className="btm-status-pill">VERIFIED</span>
        </div>
      </div>
    </div>
  </div>
);
