import React from 'react';

export interface IndustryChallenge {
  id: string;
  title: string;
  oneLiner: string;
  problem: string;
  btmCapability: string;
  technology: string[];
  actionLabel: string;
}

export interface IndustrySolutionArea {
  title: string;
  desc: string;
  highlights: string[];
}

export interface IndustryCaseStudyRef {
  title: string;
  category: string;
  tagline: string;
  metrics: string[];
  techStack: string[];
}

export interface IndustryDetailData {
  slug: string;
  name: string;
  eyebrow: string;
  heroHeadline: string;
  heroSubtitle: string;
  imageUrl: string;
  imageAlt: string;
  themeColor: string;
  accentColor: string;
  badgeLabel: string;
  challenges: IndustryChallenge[];
  solutionAreas: IndustrySolutionArea[];
  capabilitiesSummary: string[];
  verifiedTechnologies: string[];
  proofSection: {
    hasVerifiedCase: boolean;
    caseStudy?: IndustryCaseStudyRef;
    relatedCapabilities?: { title: string; desc: string }[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const INDUSTRY_DETAILS: Record<string, IndustryDetailData> = {
  'capital-market': {
    slug: 'capital-market',
    name: 'Capital Market',
    eyebrow: 'CAPITAL MARKETS & QUANTITATIVE ENGINEERING',
    heroHeadline: 'Build technology for markets that never stop moving.',
    heroSubtitle: 'Deploy high-throughput quantitative pricing engines, derivative valuation models, and low-latency financial systems engineered with Wall Street pedigree.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Capital market trading floor screens with quantitative analytics and financial market telemetry',
    themeColor: '#0B2653',
    accentColor: '#00C881',
    badgeLabel: 'Wall Street Leadership Heritage',
    challenges: [
      {
        id: 'trading-platforms',
        title: 'Trading & Market Execution Platforms',
        oneLiner: 'Low-latency order routing, FIX protocol connectivity & algorithmic execution.',
        problem: 'Execution latency and system jitter cause slippage and missed fills across fragmented liquidity venues.',
        btmCapability: 'Distributed low-latency microservices + C++/Java execution bridges + ultra-fast message bus.',
        technology: ['Java', 'C++', 'FIX Protocol', 'Kafka', 'Redis'],
        actionLabel: 'Explore Trading Architecture',
      },
      {
        id: 'risk-valuation',
        title: 'Real-Time Risk & Derivative Valuation',
        oneLiner: 'Intra-day yield curve construction, Greeks calculation & portfolio stress testing.',
        problem: 'Legacy batch risk engines take hours to compute portfolio risk, exposing institutions to sudden intra-day volatility.',
        btmCapability: 'Distributed pricing grids + parallel GPU compute + real-time mathematical valuation models.',
        technology: ['Python Quant', '.NET Core', 'SQL Server', 'C++', 'Redis'],
        actionLabel: 'Explore Risk Engines',
      },
      {
        id: 'compliance-audit',
        title: 'Regulatory Reporting & Trade Auditing',
        oneLiner: 'Automated MiFID II, Dodd-Frank & Basel III transaction reporting.',
        problem: 'Manual compliance reconciliation across multi-asset trading desks creates regulatory fines and audit exposure.',
        btmCapability: 'Immutable transaction logging + automated rule-based compliance engines + scheduled regulatory filing bridges.',
        technology: ['Java', 'Spring Boot', 'SQL Server', 'PostgreSQL'],
        actionLabel: 'Explore Compliance Systems',
      },
      {
        id: 'structured-finance',
        title: 'Structured Finance & Bond Structuring',
        oneLiner: 'CMBS/RMBS waterfall modeling, loan-level credit risk & bond cash flow analytics.',
        problem: 'Complex asset-backed securitization deals require bespoke mathematical modeling with zero margin for calculation error.',
        btmCapability: 'Wall Street veteran-governed quantitative financial engineering + automated cash flow waterfall algorithms.',
        technology: ['Java', '.NET', 'SQL Server', 'Python'],
        actionLabel: 'Explore Structured Finance Pod',
      },
      {
        id: 'data-modernization',
        title: 'High-Frequency Financial Data Modernization',
        oneLiner: 'Time-series market data streaming, historical tick repositories & microservices.',
        problem: 'Relational database bottlenecks stall real-time tick analysis and quantitative backtesting pipelines.',
        btmCapability: 'Event-driven message pipelines + distributed time-series caches + cloud microservices.',
        technology: ['Kafka', 'Redis', 'Python', 'AWS', 'Docker'],
        actionLabel: 'Explore Data Architecture',
      },
    ],
    solutionAreas: [
      {
        title: 'Quantitative Valuation & Pricing Grids',
        desc: 'Sub-10ms mathematical engines computing yield curves, Greeks, and fixed income derivatives on distributed grids.',
        highlights: ['50M+ daily calculations', 'Parallel compute optimization', 'Mortgage cash flow waterfalls'],
      },
      {
        title: 'Algorithmic Execution & Order Routing',
        desc: 'Low-latency FIX protocol adapters, smart liquidity aggregation, and high-frequency messaging bridges.',
        highlights: ['FIX 4.2 / 4.4 / 5.0 bridges', 'Sub-millisecond messaging', 'Direct exchange connectivity'],
      },
      {
        title: 'Regulatory Telemetry & Audit Integrity',
        desc: 'Automated MiFID II, Dodd-Frank, and Basel III reporting with tamper-proof transaction log immutability.',
        highlights: ['Immutable audit trails', 'Automated trade reconstruction', 'Zero calculation discrepancy'],
      },
    ],
    capabilitiesSummary: [
      'Dedicated Agile Pods governed by Goldman Sachs & Lehman Brothers alumni',
      'High-throughput fixed income & quantitative valuation models',
      'Sub-10ms calculation latency on distributed compute grids',
      '100% strict NDA and enterprise IP protection',
    ],
    verifiedTechnologies: ['Java', '.NET Core', 'C++', 'Python', 'SQL Server', 'Kafka', 'Redis', 'AWS', 'Azure'],
    proofSection: {
      hasVerifiedCase: true,
      caseStudy: {
        title: 'Fixed-Income Analytics Engine',
        category: 'Capital Markets / Quantitative Finance',
        tagline: 'High-throughput valuation, credit derivatives & mortgage-backed structuring engine processing 50M+ computations daily with <10ms latency.',
        metrics: ['50M+ Daily Computations', '<10ms Valuation Latency', '100% Mathematical Audit Match'],
        techStack: ['Java', '.NET Core', 'SQL Server', 'Redis', 'Kafka'],
      },
    },
    seo: {
      title: 'Capital Market Technology & Quantitative Engineering | BTM Outsourcing',
      description: 'Deploy high-throughput quantitative pricing engines, fixed income risk analytics, and algorithmic trading systems governed by Wall Street technology veterans.',
      keywords: 'capital market technology, quantitative finance engineering, fixed income analytics, bond structuring software, low latency trading',
    },
  },

  'retail': {
    slug: 'retail',
    name: 'Retail',
    eyebrow: 'OMNICHANNEL COMMERCE & RETAIL SYSTEMS',
    heroHeadline: 'Commerce technology engineered for scale and speed.',
    heroSubtitle: 'Bridge in-store and digital channels with sub-50ms checkout pipelines, unified inventory sync, and resilient offline-first point of sale.',
    imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Modern retail point of sale store environment with omnichannel commerce technology',
    themeColor: '#0B2653',
    accentColor: '#EC1C24',
    badgeLabel: 'Sub-50ms Peak Checkout Speed',
    challenges: [
      {
        id: 'omnichannel-pos',
        title: 'Unified Point-of-Sale (POS) & Store Systems',
        oneLiner: 'Cloud-native register software with offline-first transaction resilience.',
        problem: 'In-store registers freeze during internet outages, causing customer friction and lost retail sales.',
        btmCapability: 'Offline-first React/Node.js POS architecture + local encrypted transaction queue + automatic cloud sync.',
        technology: ['React', 'Node.js', 'Redis', 'PostgreSQL', 'Docker'],
        actionLabel: 'Explore POS Architecture',
      },
      {
        id: 'inventory-sync',
        title: 'Real-Time Distributed Inventory Visibility',
        oneLiner: 'Live stock synchronization across e-commerce, regional depots & physical stores.',
        problem: 'Discrepancies between digital catalog inventory and store shelves cause stockouts and canceled customer orders.',
        btmCapability: 'High-throughput event streaming + distributed Redis caching + automated warehouse inventory balancing.',
        technology: ['Kafka', 'Redis', 'Node.js', 'Go', 'AWS'],
        actionLabel: 'Explore Inventory Systems',
      },
      {
        id: 'checkout-scale',
        title: 'Sub-50ms High-Concurrency Checkout',
        oneLiner: 'Auto-scaling checkout pipelines designed for flash sales and holiday spikes.',
        problem: 'Traffic surges during promotions overload monolithic cart and payment gateways, driving cart abandonment.',
        btmCapability: 'Microservice checkout decomposition + asynchronous payment orchestration + auto-scaling Kubernetes clusters.',
        technology: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
        actionLabel: 'Explore Checkout Engines',
      },
      {
        id: 'retail-analytics',
        title: 'Customer Analytics & Unified Loyalty',
        oneLiner: 'Omnichannel customer data profiles, dynamic pricing & promotion rule engines.',
        problem: 'Customer purchase histories are siloed between online carts and store registers, preventing personalized offers.',
        btmCapability: 'Centralized customer data platform (CDP) + real-time promotion calculation engines.',
        technology: ['Python', 'PostgreSQL', 'Redis', 'GraphQL'],
        actionLabel: 'Explore Retail Analytics',
      },
    ],
    solutionAreas: [
      {
        title: 'Cloud POS & In-Store Systems',
        desc: 'Offline-first point-of-sale register software with local encrypted SQLite queuing and automatic cloud reconciliation.',
        highlights: ['1,500+ store registers synced', 'Offline-first durability', 'Instant receipt & payment flow'],
      },
      {
        title: 'Distributed Inventory Microservices',
        desc: 'Event-driven stock synchronization across digital stores, regional fulfillment hubs, and physical retail floors.',
        highlights: ['Sub-second inventory updates', 'Safety stock buffers', 'Automated depot transfer logic'],
      },
      {
        title: 'High-Throughput Checkout Architecture',
        desc: 'Asynchronous cart and payment gateway pipelines maintaining sub-50ms response times during peak holiday spikes.',
        highlights: ['99.999% peak availability', 'Sub-50ms transaction latency', 'Automated surge scaling'],
      },
    ],
    capabilitiesSummary: [
      'High-availability POS systems with offline-first synchronization',
      'Sub-50ms checkout latency under heavy peak concurrency',
      'Real-time inventory visibility across 1,500+ retail store locations',
      '100% strict NDA and enterprise IP protection',
    ],
    verifiedTechnologies: ['React', 'TypeScript', 'Node.js', 'Go', 'GraphQL', 'Redis', 'PostgreSQL', 'AWS'],
    proofSection: {
      hasVerifiedCase: true,
      caseStudy: {
        title: 'High-Throughput Omni-Channel POS',
        category: 'Retail & E-Commerce',
        tagline: 'Sub-50ms checkout processing, omni-channel inventory sync & offline-first point of sale supporting 1,500+ store registers.',
        metrics: ['<50ms Checkout Speed', '99.999% Peak Uptime', '1,500+ Stores Synced'],
        techStack: ['React', 'Node.js', 'Redis', 'PostgreSQL', 'AWS'],
      },
    },
    seo: {
      title: 'Retail Technology & Omnichannel Commerce Engineering | BTM Outsourcing',
      description: 'Build sub-50ms checkout pipelines, offline-first cloud POS architectures, and real-time inventory synchronization systems for enterprise retail brands.',
      keywords: 'retail technology, omnichannel pos software, retail inventory sync, ecommerce checkout architecture, retail digital transformation',
    },
  },

  'pharma': {
    slug: 'pharma',
    name: 'Pharma',
    eyebrow: 'PHARMACEUTICAL INFORMATICS & COMPLIANCE',
    heroHeadline: 'Accelerate discovery and trials with compliant data engineering.',
    heroSubtitle: 'Streamline clinical trial operations, automate document parsing, and maintain rigorous 21 CFR Part 11 FDA compliance.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Pharmaceutical research laboratory with automated clinical data analytics and scientific instrumentation',
    themeColor: '#0B2653',
    accentColor: '#6F42C1',
    badgeLabel: '21 CFR Part 11 Verified Standards',
    challenges: [
      {
        id: 'document-idr',
        title: 'Clinical Protocol & Document Parsing (IDR)',
        oneLiner: 'Deep learning OCR and layout extraction over unstructured trial documents.',
        problem: 'Manual verification of complex multi-page protocols and lab certificates delays trial onboarding by weeks.',
        btmCapability: 'BTM Intelligent Document Recognition (IDR) + NLP clause extraction + automated discrepancy flagging.',
        technology: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'AWS'],
        actionLabel: 'Explore Document IDR Pod',
      },
      {
        id: 'ctms-data',
        title: 'Clinical Trial Management (CTMS) Data Hubs',
        oneLiner: 'Centralized patient cohort tracking, site milestone monitoring & EDC data ingestion.',
        problem: 'Trial data scattered across independent investigator sites makes real-time safety and milestone tracking impossible.',
        btmCapability: 'Unified cloud CTMS platform + multi-tenant investigator portals + automated milestone alerts.',
        technology: ['React', 'Node.js', 'PostgreSQL', 'AWS Healthcare'],
        actionLabel: 'Explore CTMS Architecture',
      },
      {
        id: 'gxp-compliance',
        title: 'GxP & 21 CFR Part 11 Audit Integrity',
        oneLiner: 'Cryptographically signed audit logs, e-signatures & FDA submission preparation.',
        problem: 'Auditing failures and missing electronic record verification lead to delayed drug approval cycles.',
        btmCapability: 'Immutable tamper-proof audit trails + 21 CFR Part 11 compliant e-signature workflows.',
        technology: ['Python', 'Java', 'PostgreSQL', 'Docker'],
        actionLabel: 'Explore Compliance Systems',
      },
      {
        id: 'lims-integration',
        title: 'Laboratory Information Systems (LIMS)',
        oneLiner: 'Automated sample tracking, assay result ingestion & instrument telemetry.',
        problem: 'Manual transfer of sample data from laboratory instruments creates human transcription error risks.',
        btmCapability: 'Instrument communication bridges + automated assay data validation pipelines.',
        technology: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
        actionLabel: 'Explore LIMS Integration',
      },
    ],
    solutionAreas: [
      {
        title: 'Intelligent Document Recognition (IDR)',
        desc: 'Deep learning OCR and layout analysis extracting structured data from unstructured clinical protocols and lab reports.',
        highlights: ['99.2% OCR extraction accuracy', '2M+ documents parsed', '85% faster review velocity'],
      },
      {
        title: 'Clinical Trial Systems & EDC Pipelines',
        desc: 'Centralized clinical trial management systems ingesting electronic data capture (EDC) from multi-center trials.',
        highlights: ['Multi-site cohort management', 'Real-time safety telemetry', 'Automated anomaly flagging'],
      },
      {
        title: '21 CFR Part 11 & GxP Verification',
        desc: 'Cryptographically verified electronic records, dual-custody approval workflows, and immutable FDA submission logs.',
        highlights: ['100% compliance audit pass', 'Role-based authorization', 'Tamper-proof e-signatures'],
      },
    ],
    capabilitiesSummary: [
      '99.2% OCR extraction accuracy on unstructured clinical documents',
      '85% faster protocol review and discrepancy reconciliation cycles',
      'Full GxP and FDA 21 CFR Part 11 compliance verification',
      '100% strict NDA and enterprise IP protection',
    ],
    verifiedTechnologies: ['Python', 'PyTorch', 'FastAPI', 'React', 'Java', 'PostgreSQL', 'Docker', 'AWS'],
    proofSection: {
      hasVerifiedCase: true,
      caseStudy: {
        title: 'Intelligent Document Recognition (IDR)',
        category: 'Pharma & AI Analytics',
        tagline: 'Deep learning OCR, contract clause parsing & automated discrepancy reconciliation processing 2M+ complex documents.',
        metrics: ['99.2% OCR Accuracy', '85% Faster Cycle Time', '2M+ Documents Parsed'],
        techStack: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'AWS'],
      },
    },
    seo: {
      title: 'Pharmaceutical Software Engineering & Clinical Data Systems | BTM Outsourcing',
      description: 'Engineer 21 CFR Part 11 compliant clinical trial platforms, automated document IDR parsing engines, and laboratory data systems for pharma leaders.',
      keywords: 'pharma software engineering, clinical trial data systems, 21 cfr part 11 software, pharma document idr, clinical analytics platforms',
    },
  },

  'healthcare': {
    slug: 'healthcare',
    name: 'Healthcare',
    eyebrow: 'HIPAA-COMPLIANT HEALTHCARE PLATFORMS',
    heroHeadline: 'Technology for better healthcare experiences.',
    heroSubtitle: 'Deliver HIPAA-compliant patient care, seamless EHR/EMR interoperability, and reliable WebRTC teleconsultations.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Digital healthcare telemedicine platform with medical health analytics and patient portal',
    themeColor: '#0B2653',
    accentColor: '#00875A',
    badgeLabel: '100% HIPAA & SOC2 Type II Certified',
    challenges: [
      {
        id: 'patient-experience',
        title: 'Patient Experience',
        oneLiner: 'Intuitive patient scheduling, biometric login, automated reminders & care messaging.',
        problem: 'Clunky patient portals drive high call center volume, missed appointments, and patient frustration.',
        btmCapability: 'Patient-first web & mobile apps + automated SMS/email reminders + biometric authentication.',
        technology: ['React', 'React Native', 'TypeScript', 'Node.js', 'PostgreSQL'],
        actionLabel: 'Discuss Patient Experience',
      },
      {
        id: 'healthcare-data',
        title: 'Healthcare Data',
        oneLiner: 'Secure encrypted clinical data storage, audit trails & HIPAA cloud compliance.',
        problem: 'Managing petabytes of sensitive patient records without violating HIPAA privacy or security rules.',
        btmCapability: 'HIPAA-compliant AWS/Azure VPC architecture + encrypted at-rest and in-transit storage + immutable access logs.',
        technology: ['PostgreSQL', 'AWS HIPAA VPC', 'Docker', 'Python', 'Redis'],
        actionLabel: 'Discuss Healthcare Data',
      },
      {
        id: 'interoperability',
        title: 'Interoperability',
        oneLiner: 'HL7, FHIR & SMART-on-FHIR connectors bridging Epic, Cerner & provider systems.',
        problem: 'Siloed hospital EHR systems prevent clinical data sharing across specialized provider networks.',
        btmCapability: 'SMART-on-FHIR protocol bridges + HL7 v2/v3 message parsers + master patient identity matching.',
        technology: ['Python', 'Java', 'FastAPI', 'PostgreSQL', 'Docker'],
        actionLabel: 'Discuss Interoperability',
      },
      {
        id: 'analytics',
        title: 'Analytics',
        oneLiner: 'Clinical outcome analytics, patient cohort trends & operational hospital intelligence.',
        problem: 'Lack of real-time clinical dashboards prevents leadership from tracking treatment outcomes and resource utilization.',
        btmCapability: 'Real-time clinical BI pipelines + predictive bed allocation models + automated regulatory reporting.',
        technology: ['Python', 'TimescaleDB', 'PostgreSQL', 'Kafka', 'React'],
        actionLabel: 'Discuss Healthcare Analytics',
      },
      {
        id: 'digital-health',
        title: 'Digital Health',
        oneLiner: 'WebRTC teleconsultations, remote patient monitoring (RPM) & IoT vitals ingestion.',
        problem: 'Video dropouts and high latency during virtual consultations compromise clinical diagnosis quality.',
        btmCapability: 'Scalable WebRTC video engines + adaptive bitrate streaming + encrypted remote vitals telemetry.',
        technology: ['React', 'WebRTC', 'Python', 'MQTT', 'AWS'],
        actionLabel: 'Discuss Digital Health',
      },
    ],
    solutionAreas: [
      {
        title: 'Telemedicine & Clinical WebRTC',
        desc: 'HIPAA-compliant high-definition WebRTC video engines with adaptive bitrate streaming and in-consultation clinical charting.',
        highlights: ['99.99% video uptime SLA', 'End-to-end encrypted sessions', 'Sub-second connection latency'],
      },
      {
        title: 'EHR / FHIR Health Data Bridges',
        desc: 'Bi-directional interoperability connecting EHR platforms (Epic, Cerner) using HL7 and SMART-on-FHIR REST protocols.',
        highlights: ['FHIR R4 compliant schemas', 'Master patient index matching', 'Secure audit logging'],
      },
      {
        title: 'Patient Experience & Portals',
        desc: 'Self-service patient scheduling, lab diagnostic results viewing, e-prescriptions, and biometric authenticated access.',
        highlights: ['250,000+ active patients', '100% HIPAA & SOC2 Type II', 'Multi-channel notifications'],
      },
    ],
    capabilitiesSummary: [
      '250,000+ active patients supported on production platforms',
      '99.99% teleconsultation uptime with sub-second video latency',
      '100% HIPAA and SOC2 Type II compliance audit verification',
      '100% strict NDA and enterprise IP protection',
    ],
    verifiedTechnologies: ['React', 'Python', 'WebRTC', 'Node.js', 'Java', 'PostgreSQL', 'AWS HIPAA VPC'],
    proofSection: {
      hasVerifiedCase: true,
      caseStudy: {
        title: 'Healthcare Patient Platform',
        category: 'Healthcare & Telemedicine',
        tagline: 'HIPAA-compliant telehealth, EHR integration & patient portal system supporting over 250,000 active patients.',
        metrics: ['250,000+ Active Patients', '99.99% Video SLA', '100% HIPAA Certified'],
        techStack: ['React', 'Python', 'AWS HIPAA', 'PostgreSQL', 'WebRTC'],
      },
    },
    seo: {
      title: 'Healthcare Software Engineering & HIPAA Telehealth Systems | BTM Outsourcing',
      description: 'Build HIPAA-compliant telemedicine platforms, HL7/FHIR EHR interoperability bridges, and secure patient portals with dedicated senior engineering pods.',
      keywords: 'healthcare software engineering, hipaa compliant telehealth, fhir ehr integration, digital health platforms, medical software development',
    },
  },

  'fmcg': {
    slug: 'fmcg',
    name: 'FMCG',
    eyebrow: 'SUPPLY CHAIN & FAST-MOVING CONSUMER GOODS',
    heroHeadline: 'Predictive supply chains for consumer brands that move fast.',
    heroSubtitle: 'Optimize multi-echelon inventory, eliminate stockouts with predictive machine learning, and streamline distributor ordering.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Modern FMCG automated warehouse and supply chain distribution facility',
    themeColor: '#0B2653',
    accentColor: '#F5AC00',
    badgeLabel: '3.4x Demand Forecasting Precision',
    challenges: [
      {
        id: 'demand-forecasting',
        title: 'Predictive Demand Forecasting ML',
        oneLiner: 'Machine learning time-series models factoring in promotions, seasonality & weather.',
        problem: 'Volatile consumer demand fluctuations cause depot stockouts and millions in wasted perishable stock.',
        btmCapability: 'Custom ML forecasting pipelines + automated ERP replenishment triggers + variance tracking.',
        technology: ['Python ML', 'PyTorch', 'PostgreSQL', 'Docker', 'GCP'],
        actionLabel: 'Explore Forecasting Pod',
      },
      {
        id: 'distributor-portals',
        title: 'Automated Distributor B2B Portals',
        oneLiner: 'Self-service replenishment ordering with real-time credit check & warehouse routing.',
        problem: 'Manual paper-based ordering from regional distributors creates fulfillment delays and billing discrepancies.',
        btmCapability: 'Cloud B2B ordering portals + ERP billing synchronization + automated credit validation.',
        technology: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        actionLabel: 'Explore B2B Portals',
      },
      {
        id: 'wms-logistics',
        title: 'Warehouse Operations & Dispatch Optimization',
        oneLiner: 'Automated pick-pack-ship orchestration, barcode scanning & cross-docking.',
        problem: 'Warehouse bottlenecks delay order dispatch times and inflate per-unit handling costs.',
        btmCapability: 'Microservice warehouse management (WMS) + barcode scanner mobile apps + automated loading logic.',
        technology: ['React Native', 'Node.js', 'Redis', 'PostgreSQL'],
        actionLabel: 'Explore WMS Architecture',
      },
      {
        id: 'telematics-iot',
        title: 'Fleet Tracking & Cold Chain Telemetry',
        oneLiner: 'Live GPS location, route optimization & temperature sensor monitoring.',
        problem: 'Unmonitored temperature spikes during freight transit spoil refrigerated food and beverage products.',
        btmCapability: 'High-frequency IoT sensor ingestion + geofencing alerts + real-time delivery dashboards.',
        technology: ['Kafka', 'Python', 'MQTT', 'React', 'GCP'],
        actionLabel: 'Explore Fleet Telemetry',
      },
    ],
    solutionAreas: [
      {
        title: 'Machine Learning Demand Forecasting',
        desc: 'Advanced time-series forecasting algorithms incorporating promotional calendars, distributor sell-through, and regional seasonality.',
        highlights: ['3.4x forecasting precision', '22% depot stockout reduction', 'Automated replenishment orders'],
      },
      {
        title: 'B2B Distributor Self-Service Portals',
        desc: 'High-volume ordering platforms with real-time credit checks, instant stock reservation, and automated ERP sync.',
        highlights: ['Direct ERP accounting sync', 'Automated multi-depot allocation', 'Self-service invoice tracking'],
      },
      {
        title: 'Connected Logistics & Telematics',
        desc: 'IoT sensor streaming for fleet routing, driver hours compliance, and temperature-controlled cold chain validation.',
        highlights: ['10,000+ assets tracked live', '<250ms GPS latency', '18% fuel cost savings'],
      },
    ],
    capabilitiesSummary: [
      '3.4x demand forecasting accuracy reducing inventory write-offs',
      '22% regional depot stockout reduction with automated replenishment',
      'Real-time IoT telemetry across 10,000+ logistics and pallet movements',
      '100% strict NDA and enterprise IP protection',
    ],
    verifiedTechnologies: ['Python', 'PyTorch', 'React', 'Node.js', 'Kafka', 'PostgreSQL', 'Docker', 'GCP'],
    proofSection: {
      hasVerifiedCase: true,
      caseStudy: {
        title: 'Autonomous Fleet & Telematics Hub',
        category: 'Logistics & Supply Chain',
        tagline: 'Real-time GPS route optimization, warehouse sync & predictive fleet telemetry tracking 10,000+ connected assets with <250ms latency.',
        metrics: ['10,000+ Connected Vehicles', '<250ms GPS Sync', '18% Fuel Cost Reduction'],
        techStack: ['React', 'Node.js', 'IoT / MQTT', 'Python', 'PostgreSQL'],
      },
    },
    seo: {
      title: 'FMCG Supply Chain & Demand Forecasting Software | BTM Outsourcing',
      description: 'Build predictive demand forecasting ML pipelines, distributor B2B portals, and warehouse logistics tracking systems for FMCG enterprises.',
      keywords: 'fmcg supply chain software, predictive demand forecasting ml, distributor ordering portal, warehouse logistics software, consumer goods software engineering',
    },
  },

  'oil-and-gas': {
    slug: 'oil-and-gas',
    name: 'Oil & Gas',
    eyebrow: 'INDUSTRIAL ENERGY & PREDICTIVE TELEMETRY',
    heroHeadline: 'Protect critical energy infrastructure with industrial telemetry.',
    heroSubtitle: 'Ingest high-frequency SCADA sensor streams, detect equipment anomalies before failures happen, and digitize field safety operations.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Industrial oil and gas facility, energy pipelines and automated predictive monitoring infrastructure',
    themeColor: '#0B2653',
    accentColor: '#0B2653',
    badgeLabel: '40% Unplanned Downtime Reduction',
    challenges: [
      {
        id: 'predictive-maintenance',
        title: 'Predictive Equipment Maintenance & Anomaly Detection',
        oneLiner: 'Time-series vibration & thermal drift detection preventing turbine and pump shutdowns.',
        problem: 'Unexpected equipment failure in remote refineries causes millions in lost production and hazardous emergency shutdowns.',
        btmCapability: 'Edge machine learning anomaly detectors + continuous vibration telemetry + automated work-order alerts.',
        technology: ['Python IoT', 'TimescaleDB', 'C++', 'Azure IoT'],
        actionLabel: 'Explore Maintenance Pod',
      },
      {
        id: 'scada-ingestion',
        title: 'High-Frequency SCADA & PLC Ingestion Bridges',
        oneLiner: 'OPC-UA and MQTT streaming ingestion capturing 100,000+ sensor signals per second.',
        problem: 'Legacy field controllers produce isolated sensor data that cannot be analyzed centrally in real time.',
        btmCapability: 'Industrial edge gateways + high-throughput Kafka streaming + centralized cloud telemetry lake.',
        technology: ['Kafka', 'C++', 'MQTT', 'Docker', 'Azure'],
        actionLabel: 'Explore SCADA Bridges',
      },
      {
        id: 'digital-twin',
        title: 'Pipeline & Facility Digital Twin Modeling',
        oneLiner: 'Real-time 3D simulation of pressure thresholds, flow dynamics & thermal stress.',
        problem: 'Field engineers cannot safely test pipeline operating parameters without risking real-world over-pressurization.',
        btmCapability: 'Mathematical digital twin simulations + real-time sensor feedback sync + what-if scenario testing.',
        technology: ['Python', 'Three.js / WebGL', 'React', 'TimescaleDB'],
        actionLabel: 'Explore Digital Twins',
      },
      {
        id: 'field-safety',
        title: 'Remote Field Safety & Environmental Compliance',
        oneLiner: 'Automated emergency shutdown logging, personnel geofencing & emission monitoring.',
        problem: 'Manual safety audit rounds in hazardous industrial zones endanger staff and result in delayed leak detection.',
        btmCapability: 'Real-time hazard telemetry dashboards + automated regulatory environmental compliance logs.',
        technology: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
        actionLabel: 'Explore Safety Systems',
      },
    ],
    solutionAreas: [
      {
        title: 'Predictive Equipment Health & Anomaly ML',
        desc: 'Edge computing ML models analyzing time-series vibration, pressure, and thermal signals to forecast equipment failure before it occurs.',
        highlights: ['40% unplanned downtime reduction', 'Sub-second anomaly alert trigger', 'Automated work-order generation'],
      },
      {
        title: 'SCADA & Industrial Edge Ingestion',
        desc: 'Industrial protocol adapters (OPC-UA, Modbus, MQTT) ingesting continuous high-frequency telemetry into central cloud data lakes.',
        highlights: ['100,000+ sensor streams/sec', 'Ruggedized edge deployment', 'Zero packet loss architecture'],
      },
      {
        title: 'Digital Twin & Simulation Modeling',
        desc: 'Interactive 3D facility simulation engines allowing engineers to model pressure spikes, valve shutdowns, and pipeline stress in real time.',
        highlights: ['Real-time sensor sync', 'Scenario stress simulation', 'Visual risk heatmaps'],
      },
    ],
    capabilitiesSummary: [
      '40% reduction in unplanned facility equipment downtime',
      '100,000+ sensor data streams processed per second with sub-second alert dispatch',
      'Ruggedized edge computing architectures compatible with legacy SCADA/PLC controllers',
      '100% strict NDA and enterprise IP protection',
    ],
    verifiedTechnologies: ['C++', 'Python IoT', 'TimescaleDB', 'Kafka', 'React', 'MQTT', 'Azure IoT Edge'],
    proofSection: {
      hasVerifiedCase: true,
      caseStudy: {
        title: 'Connected Vehicle Telematics & Industrial Monitoring',
        category: 'Automotive & Industrial IoT',
        tagline: 'High-frequency telemetry ingestion, battery/asset health monitoring & predictive anomaly detection across connected industrial hardware.',
        metrics: ['100,000+ Sensor Streams', '<1s Anomaly Alert Dispatch', '40% Downtime Drop'],
        techStack: ['Angular', 'Python', 'Kafka', 'TimescaleDB', 'Docker'],
      },
    },
    seo: {
      title: 'Oil & Gas Software Engineering & SCADA Telemetry | BTM Outsourcing',
      description: 'Build predictive maintenance IoT platforms, high-frequency SCADA ingestion bridges, and digital twin models for oil and gas infrastructure.',
      keywords: 'oil and gas software engineering, predictive maintenance scada, energy telemetry software, industrial iot software development, digital twin pipeline software',
    },
  },
};
