import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Database,
  Cloud,
  Globe,
  Smartphone,
  Server,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';
import { Badge, Button, GradientText } from '../ui';
import './techUniverse.css';

export type TechNodeId = 'ai' | 'cloud' | 'data' | 'web' | 'mobile' | 'backend';

interface TechUniverseNode {
  id: TechNodeId;
  name: string;
  category: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  coreStack: { name: string; desc: string }[];
  standards: string[];
  ctaLabel: string;
  nodeCoordinates: { x: number; y: number }; // percentage on graph
}

const TECH_NODES: Record<TechNodeId, TechUniverseNode> = {
  ai: {
    id: 'ai',
    name: 'AI & Machine Learning',
    category: 'Intelligence & Automation',
    tagline: 'Production AI models, custom LLM fine-tuning & autonomous agent systems',
    description:
      'We engineer production-ready AI pipelines tailored to enterprise data. From proprietary document extraction (IDR) to grounded RAG vector stores and self-governing agents.',
    icon: <Sparkles size={22} />,
    accentColor: '#C084FC',
    coreStack: [
      { name: 'LLM Integration', desc: 'Custom fine-tuned foundation models & API bridges (OpenAI, Claude, Llama 3)' },
      { name: 'RAG Architecture', desc: 'Vector embeddings with Pinecone, Qdrant & pgvector for zero-hallucination queries' },
      { name: 'Autonomous Agents', desc: 'Multi-step reasoning loops with LangChain, LlamaIndex & tool orchestration' },
      { name: 'Machine Learning (ML)', desc: 'PyTorch, TensorFlow, Scikit-learn predictive modeling & anomaly detection' },
      { name: 'Computer Vision & IDR', desc: 'BTM Intelligent Document Recognition, OCR text parsing & layout analysis' },
    ],
    standards: [
      'Strict VPC data privacy (zero customer data training)',
      'Human-in-the-loop validation triggers',
      'Optimized token inference latency (<250ms streaming)',
    ],
    ctaLabel: 'Explore AI Engineering →',
    nodeCoordinates: { x: 50, y: 15 },
  },
  cloud: {
    id: 'cloud',
    name: 'Cloud & Infrastructure',
    category: 'Enterprise Cloud',
    tagline: 'High-availability AWS, Azure & GCP multi-cloud infrastructure',
    description:
      'Cloud-native architectures engineered for 99.999% reliability. We build automated CI/CD pipelines, container orchestration, and serverless backends.',
    icon: <Cloud size={22} />,
    accentColor: '#38BDF8',
    coreStack: [
      { name: 'Amazon Web Services (AWS)', desc: 'Lambda, ECS/EKS, S3, RDS, CloudFront & DynamoDB serverless systems' },
      { name: 'Microsoft Azure', desc: 'Azure App Services, AKS, Azure SQL, CosmosDB & enterprise active directory' },
      { name: 'Google Cloud (GCP)', desc: 'Google Kubernetes Engine (GKE), BigQuery, Cloud Run & Pub/Sub' },
      { name: 'DevOps & CI/CD', desc: 'Automated GitHub Actions, Jenkins pipelines, Terraform IaC & Docker containers' },
      { name: 'Kubernetes & Docker', desc: 'Production microservice cluster orchestration with zero-downtime rolling updates' },
    ],
    standards: [
      'Infrastructure as Code (Terraform / CloudFormation)',
      'Automated zero-downtime canary deployments',
      'SOC2, HIPAA & ISO-27001 compliant cloud hardening',
    ],
    ctaLabel: 'Explore Cloud & DevOps →',
    nodeCoordinates: { x: 80, y: 38 },
  },
  data: {
    id: 'data',
    name: 'Data & Analytics',
    category: 'Data Engineering',
    tagline: 'High-throughput SQL, distributed NoSQL & real-time streaming engines',
    description:
      'Modern data architectures built for low-latency querying and massive concurrent throughput across enterprise financial, health, and operational systems.',
    icon: <Database size={22} />,
    accentColor: '#10B981',
    coreStack: [
      { name: 'MS SQL Server & Oracle', desc: 'High-performance relational data modeling, query indexing & stored procedures' },
      { name: 'PostgreSQL & MySQL', desc: 'Cloud-managed ACID relational databases with automated sharding & read replicas' },
      { name: 'MongoDB & Redis', desc: 'Sub-millisecond NoSQL document caching and real-time session storage' },
      { name: 'Apache Kafka & Streams', desc: 'Event-driven pub/sub streaming pipelines handling millions of events/sec' },
      { name: 'Tableau & PowerBI', desc: 'Executive intelligence dashboards, SSRS reports & financial analytics' },
    ],
    standards: [
      'End-to-end data encryption at rest and in transit',
      'Continuous automated database backup & replication',
      'Sub-50ms query optimization for heavy OLAP/OLTP loads',
    ],
    ctaLabel: 'Explore Data Architecture →',
    nodeCoordinates: { x: 20, y: 38 },
  },
  backend: {
    id: 'backend',
    name: 'Core Backend & APIs',
    category: 'Enterprise Engineering',
    tagline: 'Mission-critical Java, .NET Core, Python & microservice systems',
    description:
      'The foundational backbone of enterprise software. Built by veterans of Wall Street trading systems with strict adherence to architectural resilience.',
    icon: <Server size={22} />,
    accentColor: '#3B82F6',
    coreStack: [
      { name: 'Java & Spring Boot', desc: 'Enterprise microservices, Spring Security, Hibernate & high-concurrency threads' },
      { name: '.NET Core & C#', desc: 'High-performance ASP.NET Core web APIs, Entity Framework & Windows microservices' },
      { name: 'Python & Django/FastAPI', desc: 'High-speed RESTful microservices, asynchronous workers & backend algorithms' },
      { name: 'Node.js & TypeScript', desc: 'Event-driven Express/NestJS APIs with robust typing and rapid throughput' },
      { name: 'gRPC & WebSockets', desc: 'Low-latency binary microservice communication & bi-directional live sockets' },
    ],
    standards: [
      'Microservice domain-driven design (DDD)',
      '100% unit test coverage for core business logic',
      'Strict API versioning & OpenAPI / Swagger governance',
    ],
    ctaLabel: 'Explore Core Backend →',
    nodeCoordinates: { x: 50, y: 55 },
  },
  web: {
    id: 'web',
    name: 'Web Applications',
    category: 'Modern Web Engineering',
    tagline: 'High-performance React, TypeScript, Next.js & enterprise web portals',
    description:
      'Responsive, lightning-fast web applications designed with modern component design systems, accessibility compliance, and state management.',
    icon: <Globe size={22} />,
    accentColor: '#06B6D4',
    coreStack: [
      { name: 'React & Next.js', desc: 'Server-side rendering, static generation, React Server Components & App Router' },
      { name: 'TypeScript & JavaScript', desc: 'Type-safe frontend codebases preventing runtime bugs across large teams' },
      { name: 'Angular & Vue.js', desc: 'Enterprise single-page applications with modular component architecture' },
      { name: 'Progressive Web Apps (PWA)', desc: 'Offline-first caching, push notifications & desktop installable web apps' },
      { name: 'Tailwind & Vanilla CSS Tokens', desc: 'Pixel-perfect, lightweight, WCAG AA/AAA compliant responsive design' },
    ],
    standards: [
      'Sub-1.2s Core Web Vitals performance benchmarks',
      '100% WCAG AA/AAA accessibility compliance',
      'Device-agnostic responsiveness from mobile to 4K displays',
    ],
    ctaLabel: 'Explore Web Engineering →',
    nodeCoordinates: { x: 30, y: 78 },
  },
  mobile: {
    id: 'mobile',
    name: 'Mobile Systems',
    category: 'iOS & Android Mobility',
    tagline: 'Native and cross-platform mobile apps engineered for fluid performance',
    description:
      'Enterprise mobile solutions built for speed, offline synchronization, and seamless store deployment across iOS App Store and Google Play.',
    icon: <Smartphone size={22} />,
    accentColor: '#F59E0B',
    coreStack: [
      { name: 'React Native', desc: 'Single codebase powering native 60fps iOS and Android applications' },
      { name: 'Flutter & Dart', desc: 'High-fidelity cross-platform UI with custom Skia rendering' },
      { name: 'Native iOS (Swift)', desc: 'Deep iOS integration, Apple Pay, FaceID, widgets & background fetch' },
      { name: 'Native Android (Kotlin)', desc: 'Material Design 3, Jetpack Compose & Android background services' },
      { name: 'Enterprise Mobility Management', desc: 'MDM integration, biometric authentication & secure offline encrypted stores' },
    ],
    standards: [
      '60 FPS smooth gesture animations',
      'Biometric hardware security integration (FaceID / Fingerprint)',
      'Automated CI/CD App Store & Google Play distribution',
    ],
    ctaLabel: 'Explore Mobile Systems →',
    nodeCoordinates: { x: 70, y: 78 },
  },
};

export interface TechUniverseSectionProps {
  onTechExploreClick?: (techData: TechUniverseNode) => void;
}

export const TechUniverseSection: React.FC<TechUniverseSectionProps> = ({ onTechExploreClick }) => {
  const [activeNodeId, setActiveNodeId] = useState<TechNodeId>('ai');

  const activeNode = TECH_NODES[activeNodeId];

  const nodeOrder: TechNodeId[] = ['ai', 'cloud', 'data', 'backend', 'web', 'mobile'];

  return (
    <section className="btm-techuniverse-root" id="tech-universe">
      <div className="btm-techuniverse-container">
        {/* Section Header */}
        <div className="btm-techuniverse-header">
          <Badge variant="cyan" dot className="mb-3">
            Connected Technical Capabilities
          </Badge>
          <h2 className="btm-techuniverse-title">
            Explore our <span style={{ color: '#EC1C24' }}>Technology Universe</span>
          </h2>
          <p className="btm-techuniverse-subtitle">
            Select any domain node in our connected ecosystem to progressively inspect our frameworks, toolchains, and delivery standards.
          </p>

          {/* Interactive Navigation Pills */}
          <div className="btm-universe-chips-row">
            {nodeOrder.map((id) => {
              const node = TECH_NODES[id];
              const isSelected = activeNodeId === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`btm-universe-chip ${isSelected ? 'active' : ''}`}
                  onClick={() => setActiveNodeId(id)}
                >
                  <span style={{ color: isSelected ? '#FFFFFF' : node.accentColor }}>{node.icon}</span>
                  <span>{node.name.split('&')[0].trim()}</span>
                  {isSelected && <span className="btm-chip-indicator">●</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Interactive Experience: Left Visual Node Matrix / Right Progressive Drawer */}
        <div className="btm-universe-main-grid">
          {/* Left Column: Visual Interactive Node Map */}
          <div className="btm-universe-constellation-box">
            <div className="btm-constellation-header">
              <span className="btm-constellation-status">
                <span className="btm-live-node-dot" />
                <span>Active Node: <strong className="text-[#0B2653]">{activeNode.name}</strong></span>
              </span>
              <span className="btm-constellation-hint">Click any node to reveal specs</span>
            </div>

            {/* SVG Interactive Constellation Diagram */}
            <div className="btm-constellation-diagram">
              <svg className="btm-constellation-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Connection Lines */}
                {/* AI to Cloud */}
                <line x1="50" y1="15" x2="80" y2="38" className="btm-constellation-line" />
                {/* AI to Data */}
                <line x1="50" y1="15" x2="20" y2="38" className="btm-constellation-line" />
                {/* Data to Backend */}
                <line x1="20" y1="38" x2="50" y2="55" className="btm-constellation-line" />
                {/* Cloud to Backend */}
                <line x1="80" y1="38" x2="50" y2="55" className="btm-constellation-line" />
                {/* Backend to Web */}
                <line x1="50" y1="55" x2="30" y2="78" className="btm-constellation-line" />
                {/* Backend to Mobile */}
                <line x1="50" y1="55" x2="70" y2="78" className="btm-constellation-line" />
                {/* Web to Mobile */}
                <line x1="30" y1="78" x2="70" y2="78" className="btm-constellation-line" />
              </svg>

              {/* Interactive Node Anchors */}
              {nodeOrder.map((id) => {
                const node = TECH_NODES[id];
                const isSelected = activeNodeId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    className={`btm-constellation-node-btn ${isSelected ? 'selected' : ''}`}
                    style={{
                      left: `${node.nodeCoordinates.x}%`,
                      top: `${node.nodeCoordinates.y}%`,
                    }}
                    onClick={() => setActiveNodeId(id)}
                    aria-label={`Select ${node.name}`}
                  >
                    <div
                      className="btm-node-icon-circle"
                      style={{
                        borderColor: isSelected ? node.accentColor : 'var(--border)',
                        color: node.accentColor,
                        boxShadow: isSelected ? `0 0 20px ${node.accentColor}88` : 'none',
                      }}
                    >
                      {node.icon}
                    </div>
                    <span className="btm-node-floating-label">{node.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Left Box Footer Telemetry */}
            <div className="btm-constellation-footer">
              <div className="flex items-center justify-between text-xs text-[#51668A] font-semibold pt-3 border-t border-[#E2E8F0]">
                <span>⚡ 6 Connected Core Stacks</span>
                <span>•</span>
                <span>🔒 Strict Enterprise VPC</span>
                <span>•</span>
                <span>⏱ 48h Pod Match</span>
              </div>
            </div>
          </div>

          {/* Right Column: Progressive Disclosure Detail Panel */}
          <div className="btm-universe-detail-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                className="btm-detail-panel-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Header */}
                <div className="btm-detail-header">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: activeNode.accentColor }}
                    />
                    <span className="btm-detail-cat" style={{ color: activeNode.accentColor }}>
                      {activeNode.category}
                    </span>
                  </div>
                  <h3 className="btm-detail-title">{activeNode.name}</h3>
                  <p className="btm-detail-tagline">{activeNode.tagline}</p>
                </div>

                {/* Core Stack Breakdown */}
                <div className="btm-detail-stack-section">
                  <h4 className="btm-detail-section-heading">Core Frameworks & Tools:</h4>
                  <div className="btm-detail-stack-list">
                    {activeNode.coreStack.map((item, sIdx) => (
                      <div key={sIdx} className="btm-stack-item-card">
                        <div className="btm-stack-name-row">
                          <CheckCircle2 size={14} className="text-[#00C881] shrink-0" />
                          <strong className="text-[#0B2653] text-sm">{item.name}</strong>
                        </div>
                        <p className="btm-stack-desc">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality & Security Standards */}
                <div className="btm-detail-standards-section">
                  <h4 className="btm-detail-section-heading">Engineering & Security Standards:</h4>
                  <div className="btm-standards-checklist">
                    {activeNode.standards.map((std, idx) => (
                      <div key={idx} className="btm-standard-item">
                        <Cpu size={13} className="text-sky-500 shrink-0" />
                        <span>{std}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="btm-detail-footer-action">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => onTechExploreClick?.(activeNode)}
                    icon={<ArrowRight size={16} />}
                  >
                    {activeNode.ctaLabel}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
