import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  FlaskConical,
  Activity,
  Boxes,
  Flame,
} from 'lucide-react';
import { Badge } from '../ui';
import { IndustryCard, type IndustryData } from './IndustryCard';
import { IndustryDetailModal } from './IndustryDetailModal';
import './industryExplorer.css';

const INDUSTRIES: IndustryData[] = [
  {
    id: 'capital-market',
    name: 'Capital Market',
    oneLiner: 'High-throughput valuation, risk analytics & algorithmic execution engines.',
    icon: <TrendingUp size={22} />,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Capital Market trading screens, market charts and quantitative analytics dashboard',
    accentColor: '#0B2653',
    overview: 'Autonomous quantitative engineering and high-frequency risk analytics built by Wall Street technology veterans.',
    challenge: 'Legacy fixed-income valuation and structured finance systems suffer from high latency, siloed risk calculators, and inability to handle multi-million intra-day derivative event streams.',
    approach: 'We deploy specialized quantitative pods that engineer distributed pricing grids, sub-10ms mortgage-backed security (MBS) cash flow engines, and automated regulatory risk reporting.',
    capabilities: [
      { title: 'Fixed Income & Bond Analytics', desc: 'Real-time yield curve calculations, duration, convexity, and spread analytics across multi-asset portfolios.' },
      { title: 'Structured Finance Modeling', desc: 'CMBS/RMBS waterfall cash flow engines, loss simulation algorithms, and loan-level credit risk stress testing.' },
      { title: 'Algorithmic Execution Bridges', desc: 'Low-latency FIX protocol connectivity, order routing engines, and smart liquidity aggregation.' },
      { title: 'Regulatory Compliance Telemetry', desc: 'Automated MiFID II, Dodd-Frank, and Basel III transaction reporting with immutable audit trails.' },
    ],
    metrics: [
      { value: '50M+', label: 'Daily Derivative Computations' },
      { value: '<10ms', label: 'Valuation Grid Latency' },
      { value: '100%', label: 'Mathematical Audit Verification' },
    ],
    techStack: ['Java', '.NET Core', 'C++', 'Python Quant', 'SQL Server', 'Kafka', 'Redis'],
  },
  {
    id: 'retail',
    name: 'Retail',
    oneLiner: 'Omnichannel POS, sub-50ms checkout architectures & real-time inventory sync.',
    icon: <ShoppingBag size={22} />,
    imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Modern retail store, omnichannel commerce technology and digital point of sale',
    accentColor: '#EC1C24',
    overview: 'Next-generation retail commerce and unified point-of-sale platforms engineered for zero-downtime peak transaction surges.',
    challenge: 'Retailers face disconnected physical and digital sales channels, slow legacy point-of-sale sync, and high cart abandonment during holiday traffic spikes.',
    approach: 'We build cloud-native microservices with offline-first POS synchronization, sub-50ms checkout pipelines, and real-time inventory visibility across thousands of store locations.',
    capabilities: [
      { title: 'Omnichannel Cloud POS', desc: 'High-availability retail checkout with offline transaction caching and instant cloud reconciliation.' },
      { title: 'Real-Time Inventory Engine', desc: 'Distributed stock synchronization across digital storefronts, warehouses, and physical retail floors.' },
      { title: 'Dynamic Pricing & Promotions', desc: 'Sub-second rule engines calculating loyalty discounts, multi-buy bundles, and regional tax variations.' },
      { title: 'Headless Commerce Architecture', desc: 'API-first commerce backends powering web, mobile apps, in-store kiosks, and clienteling tablets.' },
    ],
    metrics: [
      { value: '99.999%', label: 'Peak Checkout Uptime' },
      { value: '<50ms', label: 'Transaction Latency' },
      { value: '1,500+', label: 'Stores Synced Real-Time' },
    ],
    techStack: ['React', 'Node.js', 'Go', 'GraphQL', 'Redis', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'pharma',
    name: 'Pharma',
    oneLiner: 'Clinical trial data pipelines, automated IDR document parsing & 21 CFR Part 11 compliance.',
    icon: <FlaskConical size={22} />,
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Pharmaceutical laboratory, scientific drug research and automated clinical analytics',
    accentColor: '#6F42C1',
    overview: 'Automated data intelligence and compliant software systems accelerating drug discovery and clinical trial governance.',
    challenge: 'Pharmaceutical enterprises struggle with manual document reconciliation across hundreds of clinical trial sites, slow regulatory filing cycles, and strict audit compliance standards.',
    approach: 'We engineer automated intelligent document recognition (IDR) engines, GxP/21 CFR Part 11 compliant data audit trails, and multi-tenant trial management platforms.',
    capabilities: [
      { title: 'Clinical Trial Management (CTMS)', desc: 'Centralized patient cohort tracking, site milestone monitoring, and electronic data capture (EDC).' },
      { title: 'Intelligent Protocol Parsing (IDR)', desc: 'Deep learning OCR and layout extraction over unstructured trial protocols and lab certificates.' },
      { title: '21 CFR Part 11 Electronic Records', desc: 'Cryptographically verified e-signatures, audit logs, and FDA compliance lifecycle controls.' },
      { title: 'Lab Information Systems (LIMS)', desc: 'Secure sample tracking, automated assay result ingestion, and instrument telemetry sync.' },
    ],
    metrics: [
      { value: '99.2%', label: 'Document IDR OCR Accuracy' },
      { value: '85%', label: 'Faster Protocol Review Cycles' },
      { value: '100%', label: 'GxP & 21 CFR Part 11 Audit Pass' },
    ],
    techStack: ['Python', 'PyTorch', 'FastAPI', 'React', 'Docker', 'AWS Healthcare Cloud'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    oneLiner: 'HIPAA-compliant telehealth platforms, EHR data interoperability & encrypted patient telemetry.',
    icon: <Activity size={22} />,
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Digital healthcare platform, medical doctor tablet technology and patient care analytics',
    accentColor: '#00875A',
    overview: 'Secure, high-availability digital health platforms engineered with end-to-end encryption and seamless EHR integration.',
    challenge: 'Healthcare systems must bridge legacy Electronic Health Records (Epic, Cerner) while maintaining absolute patient privacy and sub-second video teleconsultation reliability.',
    approach: 'We design HIPAA/SOC2 Type II certified platforms featuring HL7/FHIR protocol interoperability, scalable WebRTC teleconsultations, and encrypted patient care portals.',
    capabilities: [
      { title: 'EHR/EMR Interoperability', desc: 'Bi-directional HL7, FHIR, and SMART-on-FHIR connectors for seamless hospital records exchange.' },
      { title: 'WebRTC Telehealth Systems', desc: 'Ultra-low latency HD video consultations with real-time in-session clinical notes synchronization.' },
      { title: 'Remote Patient Monitoring (RPM)', desc: 'Encrypted telemetry feeds ingesting continuous vitals from wearable and IoT medical hardware.' },
      { title: 'E-Prescription & Pharmacy Sync', desc: 'NCPDP compliant electronic prescription transmission and automated drug interaction checking.' },
    ],
    metrics: [
      { value: '250,000+', label: 'Active Patients Supported' },
      { value: '99.99%', label: 'Telehealth Video SLA' },
      { value: '100%', label: 'HIPAA & SOC2 Type II Certified' },
    ],
    techStack: ['React', 'Python', 'WebRTC', 'Node.js', 'PostgreSQL', 'AWS HIPAA VPC'],
  },
  {
    id: 'fmcg',
    name: 'FMCG',
    oneLiner: 'Demand forecasting ML models, supply chain visibility & warehouse automated distribution.',
    icon: <Boxes size={22} />,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Modern FMCG automated warehouse, supply chain logistics and packaged goods distribution',
    accentColor: '#F5AC00',
    overview: 'End-to-end supply chain visibility and predictive replenishment platforms for global consumer goods brands.',
    challenge: 'Fast-moving consumer goods enterprises face volatile retailer demand swings, distributor visibility black holes, and costly inventory stockouts across regional depots.',
    approach: 'We build predictive demand forecasting ML pipelines, automated distributor ordering portals, and real-time logistics IoT tracking architectures.',
    capabilities: [
      { title: 'Predictive Demand Forecasting', desc: 'Machine learning time-series models factoring in historical sell-through, promotions, and seasonal weather.' },
      { title: 'Distributor & B2B Portals', desc: 'Self-service replenishment portals with real-time credit checking and automated warehouse routing.' },
      { title: 'Warehouse Management (WMS)', desc: 'Automated pick-pack-ship orchestration, barcode scanning, and multi-depot inventory balancing.' },
      { title: 'Supply Chain IoT Telemetry', desc: 'Cold-chain temperature monitoring and live GPS location tracking for perishable consumer shipments.' },
    ],
    metrics: [
      { value: '3.4x', label: 'Demand Forecasting Accuracy' },
      { value: '22%', label: 'Depot Stockout Reduction' },
      { value: '10,000+', label: 'Daily Pallet Movements Tracked' },
    ],
    techStack: ['Python ML', 'React', 'Node.js', 'Kafka', 'PostgreSQL', 'Docker', 'GCP'],
  },
  {
    id: 'oil-gas',
    name: 'Oil & Gas',
    oneLiner: 'Predictive asset maintenance, SCADA pipeline telemetry & remote industrial monitoring.',
    icon: <Flame size={22} />,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Industrial oil and gas infrastructure, energy pipeline monitoring and predictive operations',
    accentColor: '#0B2653',
    overview: 'Industrial IoT analytics and predictive maintenance software platforms protecting critical energy operations.',
    challenge: 'Energy infrastructure operates in harsh, remote environments where equipment failure causes millions in lost production, safety hazards, and environmental risks.',
    approach: 'We engineer high-frequency time-series telemetry pipelines, edge computing anomaly detectors, and SCADA-integrated field management dashboards.',
    capabilities: [
      { title: 'Predictive Equipment Maintenance', desc: 'Vibration and thermal sensor anomaly detection preventing pump, compressor, and turbine failures.' },
      { title: 'SCADA & PLC Edge Ingestion', desc: 'OPC-UA and MQTT high-frequency streaming bridges ingesting thousands of sensor data points per second.' },
      { title: 'Digital Twin Asset Modeling', desc: 'Real-time 3D and mathematical simulations of pipeline pressures, flow rates, and thermal stress.' },
      { title: 'Remote Field Safety Dashboards', desc: 'Automated emergency shutdown telemetry, personnel geofencing, and environmental compliance logging.' },
    ],
    metrics: [
      { value: '40%', label: 'Unplanned Downtime Reduction' },
      { value: '100,000+', label: 'Sensor Streams Ingested/Sec' },
      { value: '<1s', label: 'Anomaly Alert Notification' },
    ],
    techStack: ['C++', 'Python IoT', 'TimescaleDB', 'Kafka', 'React', 'MQTT', 'Azure IoT Edge'],
  },
];

export interface IndustryExplorerProps {
  onConsultIndustryAdvisor?: (industryData: { name: string; category: string; details: string }) => void;
}

export const IndustryExplorer: React.FC<IndustryExplorerProps> = ({
  onConsultIndustryAdvisor,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (industry: IndustryData) => {
    setSelectedIndustry(industry);
    setIsModalOpen(true);
  };

  const handleConsultSectorAdvisor = (industry: IndustryData) => {
    onConsultIndustryAdvisor?.({
      name: `${industry.name} Engineering Pod`,
      category: `${industry.name} Sector Practice`,
      details: `Consulting on ${industry.name} architecture: ${industry.oneLiner}`,
    });
  };

  return (
    <section className="btm-industry-explorer-root" id="industry-explorer">
      <div className="btm-industry-container">
        {/* Section Header */}
        <div className="btm-industry-header">
          <Badge variant="primary" dot className="mb-3">
            INDUSTRIES WE EMPOWER
          </Badge>
          <h2 className="btm-industry-title">
            Technology built around <span style={{ color: '#EC1C24' }}>your industry.</span>
          </h2>
          <p className="btm-industry-subtitle">
            Explore how BTM applies engineering, data and emerging technology to complex industry challenges.
          </p>
        </div>

        {/* The 6 Industry Cards Grid */}
        <div className="btm-industry-grid" role="region" aria-label="Industries we empower">
          {INDUSTRIES.map((industry, idx) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              onClick={() => handleCardClick(industry)}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Interactive Industry Detail Experience Modal */}
      <IndustryDetailModal
        industry={selectedIndustry}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConsultSectorAdvisor={handleConsultSectorAdvisor}
      />
    </section>
  );
};
