import React from 'react';

/**
 * 1. Build Product — Visual Metaphor: Product UI / Multi-Device App Ecosystem
 */
export const CustomSoftwareVisual: React.FC = () => (
  <svg viewBox="0 0 240 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    {/* Background container */}
    <rect width="240" height="85" rx="8" fill="#F8FAFD" stroke="#E2E8F0" strokeWidth="1" />
    
    {/* Web App Desktop Window */}
    <g transform="translate(12, 10)">
      <rect width="145" height="65" rx="5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
      {/* Window Controls */}
      <circle cx="8" cy="8" r="2.5" fill="#EC1C24" />
      <circle cx="16" cy="8" r="2.5" fill="#F5AC00" />
      <circle cx="24" cy="8" r="2.5" fill="#00C881" />
      <line x1="0" y1="16" x2="145" y2="16" stroke="#E2E8F0" strokeWidth="1" />
      
      {/* Left Navigation Bar */}
      <rect x="6" y="22" width="28" height="37" rx="3" fill="#F1F5F9" />
      <rect x="10" y="26" width="20" height="4" rx="2" fill="#0B2653" fillOpacity="0.4" />
      <rect x="10" y="34" width="16" height="3" rx="1.5" fill="#51668A" fillOpacity="0.3" />
      <rect x="10" y="41" width="18" height="3" rx="1.5" fill="#51668A" fillOpacity="0.3" />
      <rect x="10" y="48" width="14" height="3" rx="1.5" fill="#51668A" fillOpacity="0.3" />

      {/* Main App Canvas */}
      <rect x="40" y="22" width="98" height="16" rx="3" fill="#0B2653" fillOpacity="0.06" stroke="#0B2653" strokeOpacity="0.15" />
      <text x="46" y="33" fontSize="6.5" fontWeight="700" fill="#0B2653">Production Web SaaS</text>
      
      {/* Interactive Cards in App */}
      <rect x="40" y="42" width="46" height="17" rx="3" fill="#EC1C24" fillOpacity="0.08" stroke="#EC1C24" strokeOpacity="0.2" />
      <rect x="44" y="46" width="22" height="3" rx="1.5" fill="#EC1C24" />
      <rect x="44" y="52" width="36" height="2.5" rx="1" fill="#51668A" fillOpacity="0.4" />

      <rect x="91" y="42" width="47" height="17" rx="3" fill="#00875A" fillOpacity="0.08" stroke="#00875A" strokeOpacity="0.2" />
      <rect x="95" y="46" width="22" height="3" rx="1.5" fill="#00875A" />
      <rect x="95" y="52" width="36" height="2.5" rx="1" fill="#51668A" fillOpacity="0.4" />
    </g>

    {/* Overlapping Mobile Device Screen */}
    <g transform="translate(168, 6)">
      <rect width="60" height="73" rx="7" fill="#0B2653" stroke="#0B2653" strokeWidth="1.5" />
      <rect x="2" y="2" width="56" height="69" rx="5" fill="#FFFFFF" />
      {/* Phone Notch & Speaker */}
      <rect x="20" y="4" width="20" height="2" rx="1" fill="#0B2653" fillOpacity="0.3" />
      
      {/* Mobile App UI Screen */}
      <rect x="6" y="10" width="48" height="14" rx="3" fill="#EC1C24" />
      <text x="30" y="19" fontSize="6" fontWeight="800" fill="#FFFFFF" textAnchor="middle">iOS • Android</text>

      {/* Mobile Feed */}
      <rect x="6" y="28" width="48" height="18" rx="3" fill="#F8FAFD" stroke="#E2E8F0" />
      <circle cx="13" cy="37" r="4" fill="#00C881" />
      <rect x="21" y="33" width="28" height="3" rx="1.5" fill="#0B2653" />
      <rect x="21" y="38" width="20" height="2.5" rx="1" fill="#51668A" fillOpacity="0.4" />

      {/* Bottom Nav Bar */}
      <rect x="6" y="50" width="48" height="16" rx="3" fill="#F1F5F9" />
      <circle cx="16" cy="58" r="2.5" fill="#0B2653" />
      <circle cx="30" cy="58" r="2.5" fill="#EC1C24" />
      <circle cx="44" cy="58" r="2.5" fill="#00875A" />
    </g>
  </svg>
);

/**
 * 2. Find Developers — Visual Metaphor: Developer Code Terminal & IDE Workspace
 */
export const StaffAugVisual: React.FC = () => (
  <svg viewBox="0 0 240 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    {/* Dark IDE Code Workspace */}
    <rect width="240" height="85" rx="8" fill="#0B192C" stroke="#1E293B" strokeWidth="1" />

    {/* Terminal Header */}
    <rect x="0" y="0" width="240" height="18" rx="8" fill="#071220" />
    <circle cx="12" cy="9" r="3" fill="#EF4444" />
    <circle cx="21" cy="9" r="3" fill="#F59E0B" />
    <circle cx="30" cy="9" r="3" fill="#10B981" />
    <text x="65" y="12" fontSize="7" fontFamily="monospace" fill="#94A3B8">engineer_pod.ts — Git: main</text>
    
    {/* Top 1% Vetted Badge in Editor */}
    <rect x="172" y="4" width="60" height="11" rx="3" fill="#EC1C24" />
    <text x="202" y="12" fontSize="6.5" fontWeight="800" fill="#FFFFFF" textAnchor="middle">TOP 1% VETTED</text>

    {/* Code Lines with Syntax Highlighting */}
    <g transform="translate(10, 24)" fontFamily="monospace" fontSize="6.5">
      {/* Line 1 */}
      <text x="0" y="8" fill="#475569">01</text>
      <text x="16" y="8" fill="#F43F5E">interface</text>
      <text x="56" y="8" fill="#38BDF8"> SeniorEngineer</text>
      <text x="125" y="8" fill="#CBD5E1"> {'{'}</text>

      {/* Line 2 */}
      <text x="0" y="18" fill="#475569">02</text>
      <text x="22" y="18" fill="#E2E8F0">stack:</text>
      <text x="52" y="18" fill="#FBBF24"> ['React', 'Node.js', 'Go', 'Python', 'AWS']</text>

      {/* Line 3 */}
      <text x="0" y="28" fill="#475569">03</text>
      <text x="22" y="28" fill="#E2E8F0">timezoneMatch:</text>
      <text x="90" y="28" fill="#34D399"> true</text>
      <text x="110" y="28" fill="#94A3B8"> // EST & APAC Hubs</text>

      {/* Line 4 */}
      <text x="0" y="38" fill="#475569">04</text>
      <text x="22" y="38" fill="#E2E8F0">deployTime:</text>
      <text x="75" y="38" fill="#38BDF8"> '48 Hours'</text>
      <text x="125" y="38" fill="#CBD5E1"> {'}'}</text>

      {/* Line 5 */}
      <text x="0" y="48" fill="#475569">05</text>
      <text x="16" y="48" fill="#34D399">const</text>
      <text x="40" y="48" fill="#E2E8F0"> dev = </text>
      <text x="68" y="48" fill="#F43F5E">await</text>
      <text x="92" y="48" fill="#38BDF8"> btmTalentEngine.match()</text>
      <circle cx="206" cy="46" r="3" fill="#10B981" />
      <text x="212" y="48" fill="#10B981" fontSize="6" fontWeight="700">ONLINE</text>
    </g>
  </svg>
);

/**
 * 3. Dedicated Team — Visual Metaphor: Real Cross-Functional Agile Pod Constellation
 */
export const DedicatedTeamsVisual: React.FC = () => (
  <svg viewBox="0 0 240 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="85" rx="8" fill="#F8FAFD" stroke="#E2E8F0" strokeWidth="1" />

    {/* Constellation Connection Grid Lines */}
    <path d="M45 42L120 22M120 22L195 42M45 42L120 62M120 62L195 42M120 22L120 62" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M45 42L195 42" stroke="#0B2653" strokeOpacity="0.2" strokeWidth="1.5" />

    {/* Central Core: Senior Tech Lead */}
    <g transform="translate(90, 8)">
      <rect width="60" height="28" rx="6" fill="#0B2653" stroke="#0B2653" strokeWidth="1" />
      <circle cx="12" cy="14" r="6" fill="#00C881" />
      <text x="12" y="17" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle">TL</text>
      <text x="24" y="12" fontSize="6.5" fontWeight="800" fill="#FFFFFF">TECH LEAD</text>
      <text x="24" y="20" fontSize="5.5" fontWeight="600" fill="#93C5FD">Architecture</text>
    </g>

    {/* Left Node: Senior Full-Stack Developers */}
    <g transform="translate(10, 28)">
      <rect width="68" height="28" rx="6" fill="#FFFFFF" stroke="#0B2653" strokeWidth="1.5" />
      <circle cx="12" cy="14" r="6" fill="#EC1C24" />
      <text x="12" y="17" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle">FS</text>
      <text x="24" y="12" fontSize="6.5" fontWeight="800" fill="#0B2653">DEV SQUAD</text>
      <text x="24" y="20" fontSize="5.5" fontWeight="600" fill="#51668A">Full-Stack / API</text>
    </g>

    {/* Right Node: QA & DevOps Lead */}
    <g transform="translate(162, 28)">
      <rect width="68" height="28" rx="6" fill="#FFFFFF" stroke="#00875A" strokeWidth="1.5" />
      <circle cx="12" cy="14" r="6" fill="#00875A" />
      <text x="12" y="17" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle">QA</text>
      <text x="24" y="12" fontSize="6.5" fontWeight="800" fill="#00875A">QA & DEVOPS</text>
      <text x="24" y="20" fontSize="5.5" fontWeight="600" fill="#51668A">CI/CD Governance</text>
    </g>

    {/* Bottom Status Bar: Sprint Velocity */}
    <g transform="translate(68, 56)">
      <rect width="104" height="20" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="12" cy="10" r="4" fill="#00C881" />
      <text x="20" y="13" fontSize="6.5" fontWeight="700" fill="#0B2653">Sprint Cadence: 100% Velocity</text>
    </g>
  </svg>
);

/**
 * 4. Add AI — Visual Metaphor: AI Neural Graph & Intelligent Model Pipeline
 */
export const EmergingTechVisual: React.FC = () => (
  <svg viewBox="0 0 240 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="85" rx="8" fill="#0E1726" stroke="#1E293B" strokeWidth="1" />

    {/* Synaptic Neural Connections */}
    <g stroke="#6366F1" strokeOpacity="0.4" strokeWidth="1.5">
      <line x1="28" y1="28" x2="75" y2="42" />
      <line x1="28" y1="58" x2="75" y2="42" />
      <line x1="75" y1="42" x2="135" y2="25" />
      <line x1="75" y1="42" x2="135" y2="60" />
      <line x1="135" y1="25" x2="200" y2="42" />
      <line x1="135" y1="60" x2="200" y2="42" />
    </g>

    {/* Layer 1: Input Embeddings */}
    <circle cx="28" cy="28" r="10" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1.5" />
    <text x="28" y="31" fontSize="6" fontWeight="700" fill="#C7D2FE" textAnchor="middle">OCR</text>
    <circle cx="28" cy="58" r="10" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1.5" />
    <text x="28" y="61" fontSize="6" fontWeight="700" fill="#C7D2FE" textAnchor="middle">DATA</text>

    {/* Layer 2: RAG & Reasoning Transformer Engine */}
    <rect x="58" y="24" width="34" height="36" rx="6" fill="#4F46E5" stroke="#A5B4FC" strokeWidth="1.5" />
    <text x="75" y="40" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle">RAG</text>
    <text x="75" y="49" fontSize="5" fontWeight="700" fill="#C7D2FE" textAnchor="middle">VECTOR</text>

    {/* Layer 3: Model Inferences */}
    <circle cx="135" cy="25" r="12" fill="#065F46" stroke="#34D399" strokeWidth="1.5" />
    <text x="135" y="28" fontSize="6" fontWeight="800" fill="#A7F3D0" textAnchor="middle">IDR 99%</text>

    <circle cx="135" cy="60" r="12" fill="#701A75" stroke="#E879F9" strokeWidth="1.5" />
    <text x="135" y="63" fontSize="6" fontWeight="800" fill="#F5D0FE" textAnchor="middle">LLM / NLP</text>

    {/* Layer 4: Autonomous Agent Output */}
    <g transform="translate(170, 24)">
      <rect width="60" height="36" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
      <text x="30" y="16" fontSize="6.5" fontWeight="800" fill="#38BDF8" textAnchor="middle">AUTO AGENT</text>
      <rect x="8" y="22" width="44" height="3" rx="1.5" fill="#10B981" />
      <rect x="8" y="28" width="30" height="2.5" rx="1" fill="#94A3B8" />
    </g>
  </svg>
);

/**
 * 5. Modernize — Visual Metaphor: Legacy Monolith Morphing to Cloud Microservices
 */
export const ModernizationVisual: React.FC = () => (
  <svg viewBox="0 0 240 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="85" rx="8" fill="#F8FAFD" stroke="#E2E8F0" strokeWidth="1" />

    {/* Left: Legacy Monolith Box */}
    <g transform="translate(12, 16)">
      <rect width="64" height="52" rx="4" fill="#51668A" fillOpacity="0.12" stroke="#51668A" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="8" y="8" width="48" height="10" rx="2" fill="#51668A" fillOpacity="0.25" />
      <text x="32" y="15" fontSize="6.5" fontWeight="800" fill="#0B2653" textAnchor="middle">LEGACY MONOLITH</text>
      <line x1="8" y1="24" x2="56" y2="24" stroke="#CBD5E1" strokeWidth="1" />
      <text x="32" y="34" fontSize="5.5" fontWeight="600" fill="#51668A" textAnchor="middle">High Latency • Siloed</text>
      <rect x="12" y="40" width="40" height="5" rx="2" fill="#EC1C24" fillOpacity="0.15" />
      <text x="32" y="44" fontSize="5" fontWeight="700" fill="#EC1C24" textAnchor="middle">Bottleneck</text>
    </g>

    {/* Center Transformation Pipeline Bridge */}
    <g transform="translate(82, 35)">
      <path d="M0 8H28" stroke="#EC1C24" strokeWidth="2" strokeDasharray="3 2" />
      <polygon points="28,4 36,8 28,12" fill="#EC1C24" />
      <text x="16" y="0" fontSize="5.5" fontWeight="800" fill="#EC1C24" textAnchor="middle">REFRACTOR</text>
    </g>

    {/* Right: Cloud-Native Microservices Cluster */}
    <g transform="translate(126, 12)">
      {/* Service 1: API Gateway */}
      <rect x="0" y="0" width="102" height="16" rx="4" fill="#0B2653" />
      <text x="51" y="11" fontSize="6.5" fontWeight="800" fill="#FFFFFF" textAnchor="middle">API GATEWAY • KAFKA STREAM</text>

      {/* Service 2: Microservice A */}
      <rect x="0" y="22" width="48" height="18" rx="3" fill="#FFFFFF" stroke="#00C881" strokeWidth="1.5" />
      <text x="24" y="32" fontSize="6" fontWeight="800" fill="#00875A" textAnchor="middle">Auth Service</text>
      <text x="24" y="37" fontSize="4.5" fontWeight="600" fill="#51668A" textAnchor="middle">&lt;10ms • Auto-Scale</text>

      {/* Service 3: Microservice B */}
      <rect x="54" y="22" width="48" height="18" rx="3" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="1.5" />
      <text x="78" y="32" fontSize="6" fontWeight="800" fill="#0284C7" textAnchor="middle">Core Engine</text>
      <text x="78" y="37" fontSize="4.5" fontWeight="600" fill="#51668A" textAnchor="middle">Docker • Cloud VPC</text>

      {/* Service 4: Distributed Cache */}
      <rect x="0" y="44" width="102" height="14" rx="3" fill="#00875A" fillOpacity="0.08" stroke="#00875A" strokeWidth="1" />
      <text x="51" y="53" fontSize="6" fontWeight="700" fill="#00875A" textAnchor="middle">Distributed Redis In-Memory Cache</text>
    </g>
  </svg>
);

/**
 * 6. Improve Quality — Visual Metaphor: Automated CI/CD Test Pipeline & Zero-Defect Dashboard
 */
export const QaVisual: React.FC = () => (
  <svg viewBox="0 0 240 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="85" rx="8" fill="#F8FAFD" stroke="#E2E8F0" strokeWidth="1" />

    {/* Pipeline Track */}
    <line x1="20" y1="28" x2="220" y2="28" stroke="#CBD5E1" strokeWidth="2" />

    {/* Stage 1: Unit Tests */}
    <g transform="translate(18, 14)">
      <circle cx="14" cy="14" r="12" fill="#00875A" />
      <path d="M9 14L13 18L20 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="14" y="36" fontSize="6" fontWeight="800" fill="#0B2653" textAnchor="middle">UNIT (100%)</text>
    </g>

    {/* Stage 2: Integration Tests */}
    <g transform="translate(74, 14)">
      <circle cx="14" cy="14" r="12" fill="#00875A" />
      <path d="M9 14L13 18L20 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="14" y="36" fontSize="6" fontWeight="800" fill="#0B2653" textAnchor="middle">INTEGRATION</text>
    </g>

    {/* Stage 3: Regression Suite */}
    <g transform="translate(130, 14)">
      <circle cx="14" cy="14" r="12" fill="#00875A" />
      <path d="M9 14L13 18L20 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="14" y="36" fontSize="6" fontWeight="800" fill="#0B2653" textAnchor="middle">E2E REGRESSION</text>
    </g>

    {/* Stage 4: Production Release Shield */}
    <g transform="translate(186, 14)">
      <circle cx="14" cy="14" r="12" fill="#0B2653" stroke="#00C881" strokeWidth="2" />
      <text x="14" y="17" fontSize="7" fontWeight="900" fill="#00C881" textAnchor="middle">CI/CD</text>
      <text x="14" y="36" fontSize="6" fontWeight="800" fill="#00875A" textAnchor="middle">ZERO-DEFECT</text>
    </g>

    {/* Bottom Telemetry Bar */}
    <g transform="translate(20, 58)">
      <rect width="200" height="18" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
      <circle cx="12" cy="9" r="3.5" fill="#00C881" />
      <text x="20" y="12" fontSize="6.5" fontWeight="700" fill="#0B2653">Automated Coverage: 99.8% • Flaky Rate: 0.0%</text>
    </g>
  </svg>
);

/**
 * 7. Not Sure — Visual Metaphor: Interactive Architectural Consultation & Pathway Matrix
 */
export const StrategicAdvisorVisual: React.FC = () => (
  <svg viewBox="0 0 240 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="85" rx="8" fill="#F8FAFD" stroke="#E2E8F0" strokeWidth="1" />

    {/* Central Diagnostic Compass */}
    <g transform="translate(18, 14)">
      <circle cx="28" cy="28" r="24" fill="#0B2653" fillOpacity="0.06" stroke="#0B2653" strokeWidth="1.5" />
      <circle cx="28" cy="28" r="14" fill="#0B2653" />
      <text x="28" y="33" fontSize="14" fontWeight="900" fill="#FFFFFF" textAnchor="middle">?</text>
      <path d="M28 4V14M28 42V52M4 28H14M42 28H52" stroke="#EC1C24" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Branching Architectural Options */}
    <g transform="translate(80, 10)">
      {/* Branch 1 */}
      <rect x="0" y="0" width="145" height="18" rx="4" fill="#FFFFFF" stroke="#0B2653" strokeWidth="1" />
      <circle cx="10" cy="9" r="3" fill="#EC1C24" />
      <text x="18" y="12" fontSize="6.5" fontWeight="800" fill="#0B2653">Dedicated Pod vs. Staff Augmentation</text>

      {/* Branch 2 */}
      <rect x="0" y="23" width="145" height="18" rx="4" fill="#FFFFFF" stroke="#00875A" strokeWidth="1" />
      <circle cx="10" cy="9" r="3" fill="#00875A" />
      <text x="18" y="12" fontSize="6.5" fontWeight="800" fill="#00875A">Architecture Feasibility & Tech Sizing</text>

      {/* Branch 3 */}
      <rect x="0" y="46" width="145" height="18" rx="4" fill="#0B2653" />
      <circle cx="10" cy="9" r="3" fill="#00C881" />
      <text x="18" y="12" fontSize="6.5" fontWeight="800" fill="#FFFFFF">30-Min Diagnostic with Senior Architect</text>
    </g>
  </svg>
);
