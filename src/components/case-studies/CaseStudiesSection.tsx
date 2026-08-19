import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse,
  Coins,
  Truck,
  FileSearch,
  Cloud,
  Car,
  ShoppingCart,
  Radio,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Badge, GradientText } from '../ui';
import { CaseStudyModal, type CaseStudyData } from './CaseStudyModal';
import './caseStudies.css';

const CASE_STUDIES: CaseStudyData[] = [
  {
    id: 'healthcare-platform',
    category: 'HEALTHCARE',
    title: 'Healthcare Patient Platform',
    tagline: 'HIPAA-compliant telehealth, EHR integration & patient portal system',
    techStack: ['React', 'Python', 'AWS', 'PostgreSQL', 'Docker'],
    imageGradient: 'linear-gradient(135deg, #064e3b 0%, #0d121a 100%)',
    imageAccentIcon: <HeartPulse size={36} color="#34d399" />,
    heroHeadline: 'Scaling Secure Digital Health Infrastructure for 250,000+ Active Patients',
    challenge:
      'A leading healthcare provider required a unified, HIPAA-compliant patient consultation and EHR record synchronization platform capable of handling real-time video consults with zero security vulnerabilities.',
    solution:
      'BTM deployed a dedicated pod of 6 senior full-stack engineers and QA specialists. We engineered a HIPAA-audited microservices architecture on AWS with encrypted patient records, WebRTC teleconsultations, and automated HL7/FHIR integrations.',
    teamComposition: [
      '1 Senior Solutions Architect',
      '2 Full-Stack React / Python Engineers',
      '1 Cloud DevOps / HIPAA Security Specialist',
      '1 Automated QA Engineer',
      '1 Agile Scrum Master',
    ],
    outcomes: [
      '100% HIPAA and SOC2 security compliance certified',
      '4× reduction in patient onboarding latency',
      '99.99% teleconsultation uptime across web and mobile',
      'Integrated real-time lab test results with zero data discrepancies',
    ],
    metrics: [
      { label: 'Patient Uptime', value: '99.99%' },
      { label: 'Latency Reduction', value: '4×' },
      { label: 'Active Users', value: '250K+' },
    ],
  },
  {
    id: 'fixed-income-analytics',
    category: 'FINTECH',
    title: 'Fixed-Income Analytics Engine',
    tagline: 'High-throughput valuation, credit derivatives & mortgage-backed structuring',
    techStack: ['Java', '.NET Core', 'SQL Server', 'Microservices', 'Tableau'],
    imageGradient: 'linear-gradient(135deg, #78350f 0%, #0d121a 100%)',
    imageAccentIcon: <Coins size={36} color="#fbbf24" />,
    heroHeadline: 'Enterprise Financial Analytics & Risk Engine Engineered by Wall Street Veterans',
    challenge:
      'A financial institution needed to calculate complex risk metrics across thousands of CMBS, RMBS, and fixed income derivatives in near real-time without database contention.',
    solution:
      'Leveraging BTM leadership’s deep fixed-income background (Goldman Sachs & Lehman Brothers alumni), we architected a distributed calculation engine in Java and .NET Core with multi-threaded financial modeling and BI dashboards.',
    teamComposition: [
      '1 Financial Domain Architect',
      '3 Senior Backend Engineers (.NET Core & Java)',
      '1 Big Data / SQL Optimization Specialist',
      '1 QA Automation Engineer',
    ],
    outcomes: [
      '10× acceleration in complex derivative valuation runs',
      'Sub-second portfolio risk metric calculations',
      '100% mathematical audit accuracy across financial regulatory standards',
    ],
    metrics: [
      { label: 'Valuation Speed', value: '10×' },
      { label: 'Daily Computations', value: '50M+' },
      { label: 'Audit Accuracy', value: '100%' },
    ],
  },
  {
    id: 'autonomous-logistics',
    category: 'LOGISTICS',
    title: 'Autonomous Fleet & Telematics Hub',
    tagline: 'Real-time GPS route optimization, warehouse sync & predictive fleet telemetry',
    techStack: ['React', 'Node.js', 'IoT / MQTT', 'PostgreSQL', 'Redis'],
    imageGradient: 'linear-gradient(135deg, #1e3a8a 0%, #0d121a 100%)',
    imageAccentIcon: <Truck size={36} color="#60a5fa" />,
    heroHeadline: 'Real-Time Global Telematics Tracking & Smart Route Optimization',
    challenge:
      'Managing 10,000+ active cross-border freight vehicles with disparate IoT GPS trackers resulting in delayed tracking and inefficient fuel consumption.',
    solution:
      'Engineered an event-driven IoT ingestion pipeline using MQTT, Node.js, and Redis caching. Developed interactive dispatcher dashboards in React with automated turn-by-turn route rerouting algorithms.',
    teamComposition: [
      '1 IoT / Cloud Infrastructure Architect',
      '2 Frontend React / Mapbox Specialists',
      '2 Backend Node.js / Stream Engineers',
      '1 Embedded QA Specialist',
    ],
    outcomes: [
      'Sub-second GPS telemetry synchronization from 10,000+ connected vehicles',
      '18% reduction in annual fleet fuel expenditures',
      'Zero message drop under peak holiday logistics throughput',
    ],
    metrics: [
      { label: 'Connected Fleet', value: '10K+' },
      { label: 'Fuel Saved', value: '18%' },
      { label: 'Data Latency', value: '<250ms' },
    ],
  },
  {
    id: 'document-idr-ai',
    category: 'AI / ML',
    title: 'Intelligent Document Recognition (IDR)',
    tagline: 'Deep learning OCR, contract clause parsing & automated discrepancy reconciliation',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'OCR', 'AWS Textract'],
    imageGradient: 'linear-gradient(135deg, #581c87 0%, #0d121a 100%)',
    imageAccentIcon: <FileSearch size={36} color="#c084fc" />,
    heroHeadline: 'Extracting High-Accuracy Structured Insights from Millions of Complex PDFs',
    challenge:
      'Manual human inspection of legal contracts and financial invoices caused severe operational bottlenecks and high error rates.',
    solution:
      'Built BTM’s proprietary Intelligent Document Recognition pipeline combining deep learning layout analysis, OCR text extraction, and domain-tuned NLP models with human-in-the-loop validation.',
    teamComposition: [
      '1 Senior AI / Machine Learning Scientist',
      '2 Python / ML Pipeline Engineers',
      '1 Full-Stack UI Integration Developer',
      '1 Model Evaluation QA Specialist',
    ],
    outcomes: [
      '99.2% extraction accuracy across unstructured multi-page documents',
      '85% reduction in invoice processing cycle times',
      'Over 2 million documents ingested with automated compliance tagging',
    ],
    metrics: [
      { label: 'Extraction Accuracy', value: '99.2%' },
      { label: 'Time Saved', value: '85%' },
      { label: 'Documents Parsed', value: '2M+' },
    ],
  },
  {
    id: 'enterprise-saas-cloud',
    category: 'ENTERPRISE SAAS',
    title: 'Multi-Tenant B2B SaaS Suite',
    tagline: 'Scalable multi-tenant cloud architecture, automated billing & role-based RBAC',
    techStack: ['React', 'TypeScript', 'Go', 'AWS Lambda', 'DynamoDB'],
    imageGradient: 'linear-gradient(135deg, #065f46 0%, #0d121a 100%)',
    imageAccentIcon: <Cloud size={36} color="#34d399" />,
    heroHeadline: 'Zero-Downtime Multi-Tenant Cloud Migration for B2B Enterprise Growth',
    challenge:
      'A legacy monolithic platform was unable to support multi-tenant data isolation and struggled with scalability during high-concurrency peak hours.',
    solution:
      'Architected a serverless microservices platform on AWS using Go and React with tenant-isolated database schemas, Stripe enterprise billing integration, and fine-grained role-based access controls.',
    teamComposition: [
      '1 Enterprise Cloud Architect',
      '2 Frontend React / TypeScript Engineers',
      '2 Backend Go / Microservice Developers',
      '1 Automated QA Engineer',
    ],
    outcomes: [
      'Zero downtime during migration of 500+ enterprise accounts',
      '60% reduction in monthly cloud infrastructure hosting costs',
      'Sub-50ms average global API response times',
    ],
    metrics: [
      { label: 'Hosting Cost Cut', value: '60%' },
      { label: 'API Response', value: '<50ms' },
      { label: 'Migration Downtime', value: '0 hrs' },
    ],
  },
  {
    id: 'automotive-telematics',
    category: 'AUTOMOTIVE',
    title: 'Connected Vehicle Telematics Portal',
    tagline: 'Next-gen dealer diagnostics, battery telemetry & predictive vehicle maintenance',
    techStack: ['Angular', 'Python', 'Kafka', 'Docker', 'TimescaleDB'],
    imageGradient: 'linear-gradient(135deg, #1e293b 0%, #0d121a 100%)',
    imageAccentIcon: <Car size={36} color="#94a3b8" />,
    heroHeadline: 'Predictive Vehicle Maintenance & Real-Time EV Battery Telemetry',
    challenge:
      'Automotive manufacturer required an intelligent telemetry portal for electric vehicles to predict battery degradation and notify service centers before roadside breakdowns occurred.',
    solution:
      'Created a streaming data pipeline with Apache Kafka and TimescaleDB, accompanied by an interactive Angular diagnostics portal for authorized automotive dealerships.',
    teamComposition: [
      '1 Automotive Telemetry Architect',
      '2 Python / Data Pipeline Engineers',
      '2 Angular UI Developers',
      '1 Security & Compliance QA Engineer',
    ],
    outcomes: [
      'Predictive diagnostic alerts triggered 48 hours prior to component failure',
      'Processed 100M+ real-time vehicle sensor events daily',
      'Seamless multi-country dealership rollout across 12 countries',
    ],
    metrics: [
      { label: 'Sensor Events / Day', value: '100M+' },
      { label: 'Breakdown Deflection', value: '35%' },
      { label: 'Countries Live', value: '12' },
    ],
  },
  {
    id: 'retail-pos-platform',
    category: 'RETAIL / E-COMMERCE',
    title: 'High-Throughput Omni-Channel POS',
    tagline: 'Sub-50ms checkout processing, omni-channel inventory & offline-first sync',
    techStack: ['React', 'Node.js', 'Redis', 'MongoDB', 'PWA'],
    imageGradient: 'linear-gradient(135deg, #831843 0%, #0d121a 100%)',
    imageAccentIcon: <ShoppingCart size={36} color="#f472b6" />,
    heroHeadline: 'Ultra-Reliable Retail Checkout Processing with Offline-First Resiliency',
    challenge:
      'Retail chain experienced severe revenue losses due to point-of-sale network timeouts and mismatched warehouse inventory during peak flash sale events.',
    solution:
      'Engineered an offline-first Progressive Web App (PWA) POS engine with local IndexedDB queuing, instant Redis transaction caching, and multi-warehouse stock synchronization.',
    teamComposition: [
      '1 Retail E-Commerce Architect',
      '2 React PWA / Offline Sync Engineers',
      '2 Backend Node.js / Database Developers',
      '1 Performance & Load Testing QA',
    ],
    outcomes: [
      'Zero lost transactions during network connectivity blackouts',
      'Sub-50ms average checkout processing speed',
      '300% surge in concurrent transaction handling capacity',
    ],
    metrics: [
      { label: 'Transaction Speed', value: '<50ms' },
      { label: 'Transaction Loss', value: '0%' },
      { label: 'Capacity Increase', value: '300%' },
    ],
  },
  {
    id: 'telecom-billing-analytics',
    category: 'TELECOMMUNICATIONS',
    title: 'Telecom Real-Time Analytics & Billing',
    tagline: 'High-volume CDR event rating, subscriber dashboards & 5G network telemetry',
    techStack: ['Java', 'Spring Boot', 'gRPC', 'Kubernetes', 'Cassandra'],
    imageGradient: 'linear-gradient(135deg, #0f172a 0%, #070a0f 100%)',
    imageAccentIcon: <Radio size={36} color="#38bdf8" />,
    heroHeadline: 'Processing Millions of High-Frequency Call Detail Records (CDR) per Second',
    challenge:
      'Telecommunications operator needed to rate and audit millions of high-frequency data usage events in real-time with zero discrepancy.',
    solution:
      'Engineered a cloud-native gRPC and Spring Boot rating engine on Kubernetes with distributed Cassandra storage and low-latency balance auditing.',
    teamComposition: [
      '1 Telecom Core Architect',
      '3 Senior Java / Spring Boot Engineers',
      '1 Kubernetes DevOps Specialist',
      '1 Load & Stress Test QA Lead',
    ],
    outcomes: [
      'Processed 5M+ CDR events per second with sub-10ms rating latency',
      '99.999% carrier-grade operational reliability',
      'Automated fraud and anomalous billing spike detection',
    ],
    metrics: [
      { label: 'Events / Second', value: '5M+' },
      { label: 'Carrier Uptime', value: '99.999%' },
      { label: 'Rating Latency', value: '<10ms' },
    ],
  },
];

export interface CaseStudiesSectionProps {
  onDiscussCaseClick?: (caseStudy: CaseStudyData) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onDiscussCaseClick }) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudyData | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredCases =
    activeFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category.toLowerCase().includes(activeFilter.toLowerCase()));

  const filterCategories = [
    { id: 'all', label: 'All Work (8)' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'fintech', label: 'Fintech' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'ai', label: 'AI & Data' },
    { id: 'enterprise', label: 'Enterprise SaaS' },
  ];

  return (
    <section className="btm-work-root" id="work-showcase">
      <div className="btm-work-container">
        {/* Section Header */}
        <div className="btm-work-header">
          <Badge variant="primary" dot className="mb-3">
            Selected Engineering Proof
          </Badge>
          <h2 className="btm-work-title">
            Engineered for <GradientText>Enterprise Scale & Impact</GradientText>
          </h2>
          <p className="btm-work-subtitle">
            Explore 8 production architectures built by BTM across healthcare, fintech, AI, logistics, and cloud platforms.
          </p>

          {/* Filter Pills */}
          <div className="btm-work-filter-wrap">
            {filterCategories.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`btm-filter-pill ${activeFilter === f.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Visual Case Study Cards Grid */}
        <div className="btm-case-cards-grid">
          {filteredCases.map((cs, idx) => (
            <motion.div
              key={cs.id}
              className="btm-case-card"
              onClick={() => setSelectedCase(cs)}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              {/* Project Image Banner */}
              <div className="btm-card-image-box" style={{ background: cs.imageGradient }}>
                <div className="btm-card-image-scrim" />
                <div className="btm-card-icon-float">{cs.imageAccentIcon}</div>
                <span className="btm-card-category-tag">{cs.category}</span>
              </div>

              {/* Card Body */}
              <div className="btm-card-details">
                <h3 className="btm-card-project-title">{cs.title}</h3>
                <p className="btm-card-project-tagline">{cs.tagline}</p>

                {/* Tech Stack List */}
                <div className="btm-card-tech-row">
                  <span className="btm-card-tech-text">{cs.techStack.slice(0, 3).join(' • ')}</span>
                </div>

                {/* Action Trigger */}
                <div className="btm-card-footer-trigger">
                  <span className="btm-view-case-btn">View Case →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Screen Deep-Dive Case Study Modal */}
      <CaseStudyModal
        caseStudy={selectedCase}
        isOpen={Boolean(selectedCase)}
        onClose={() => setSelectedCase(null)}
        onDiscussProjectClick={(caseData) => {
          setSelectedCase(null);
          onDiscussCaseClick?.(caseData);
        }}
      />
    </section>
  );
};
