import React from 'react';

export const CustomSoftwareVisual: React.FC = () => (
  <svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="70" rx="8" fill="rgba(11, 38, 83, 0.04)" />
    <rect x="16" y="14" width="60" height="42" rx="4" fill="#0B2653" fillOpacity="0.1" stroke="#0B2653" strokeWidth="1.5" />
    <path d="M26 26L34 35L26 44" stroke="#EC1C24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="38" y1="44" x2="48" y2="44" stroke="#0B2653" strokeWidth="2" strokeLinecap="round" />
    <rect x="92" y="18" width="55" height="14" rx="3" fill="#0B2653" fillOpacity="0.08" />
    <rect x="92" y="38" width="130" height="8" rx="2" fill="#51668A" fillOpacity="0.2" />
    <rect x="92" y="50" width="90" height="6" rx="2" fill="#51668A" fillOpacity="0.15" />
  </svg>
);

export const StaffAugVisual: React.FC = () => (
  <svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="70" rx="8" fill="rgba(236, 28, 36, 0.04)" />
    <circle cx="40" cy="35" r="16" fill="#EC1C24" fillOpacity="0.12" stroke="#EC1C24" strokeWidth="1.5" />
    <circle cx="85" cy="35" r="16" fill="#0B2653" fillOpacity="0.1" stroke="#0B2653" strokeWidth="1.5" />
    <circle cx="130" cy="35" r="16" fill="#00875A" fillOpacity="0.12" stroke="#00875A" strokeWidth="1.5" />
    <path d="M56 35H69" stroke="#EC1C24" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M101 35H114" stroke="#00875A" strokeWidth="2" strokeDasharray="3 3" />
    <rect x="160" y="24" width="65" height="22" rx="4" fill="#0B2653" fillOpacity="0.08" />
    <text x="192" y="39" fontSize="10" fontWeight="700" fill="#0B2653" textAnchor="middle">TOP 1%</text>
  </svg>
);

export const DedicatedTeamsVisual: React.FC = () => (
  <svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="70" rx="8" fill="rgba(0, 135, 90, 0.04)" />
    <rect x="16" y="16" width="95" height="38" rx="6" fill="#FFFFFF" stroke="#00875A" strokeWidth="1.5" />
    <circle cx="34" cy="35" r="8" fill="#00875A" fillOpacity="0.2" stroke="#00875A" />
    <text x="68" y="32" fontSize="9" fontWeight="800" fill="#0B2653">AGILE POD</text>
    <text x="68" y="44" fontSize="8" fontWeight="600" fill="#00875A">Lead + Devs + QA</text>
    <path d="M120 35H145" stroke="#00875A" strokeWidth="2" strokeLinecap="round" />
    <polygon points="145,31 153,35 145,39" fill="#00875A" />
    <rect x="160" y="16" width="65" height="38" rx="6" fill="#0B2653" fillOpacity="0.06" stroke="#0B2653" strokeWidth="1" />
    <text x="192" y="38" fontSize="9" fontWeight="700" fill="#0B2653" textAnchor="middle">VELOCITY</text>
  </svg>
);

export const EmergingTechVisual: React.FC = () => (
  <svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="70" rx="8" fill="rgba(111, 66, 193, 0.04)" />
    <circle cx="45" cy="35" r="18" fill="#6F42C1" fillOpacity="0.12" stroke="#6F42C1" strokeWidth="1.5" />
    <path d="M45 23V47M33 35H57" stroke="#6F42C1" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="105" cy="22" r="10" fill="#0B2653" fillOpacity="0.1" stroke="#0B2653" />
    <circle cx="105" cy="48" r="10" fill="#00C881" fillOpacity="0.15" stroke="#00C881" />
    <path d="M63 35L95 24" stroke="#6F42C1" strokeWidth="1.5" />
    <path d="M63 35L95 46" stroke="#6F42C1" strokeWidth="1.5" />
    <rect x="135" y="22" width="90" height="26" rx="4" fill="#6F42C1" fillOpacity="0.1" stroke="#6F42C1" />
    <text x="180" y="38" fontSize="9" fontWeight="700" fill="#6F42C1" textAnchor="middle">LLM • RAG • IDR</text>
  </svg>
);

export const ModernizationVisual: React.FC = () => (
  <svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="70" rx="8" fill="rgba(11, 38, 83, 0.04)" />
    <rect x="16" y="16" width="60" height="38" rx="4" fill="#51668A" fillOpacity="0.12" stroke="#51668A" strokeDasharray="3 3" />
    <text x="46" y="38" fontSize="9" fontWeight="600" fill="#51668A" textAnchor="middle">MONOLITH</text>
    <path d="M85 35H110" stroke="#EC1C24" strokeWidth="2" />
    <polygon points="110,31 118,35 110,39" fill="#EC1C24" />
    <rect x="130" y="14" width="45" height="18" rx="3" fill="#0B2653" fillOpacity="0.1" stroke="#0B2653" />
    <rect x="182" y="14" width="45" height="18" rx="3" fill="#00875A" fillOpacity="0.1" stroke="#00875A" />
    <rect x="155" y="38" width="55" height="18" rx="3" fill="#0B2653" fillOpacity="0.1" stroke="#0B2653" />
  </svg>
);

export const QaVisual: React.FC = () => (
  <svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="70" rx="8" fill="rgba(0, 135, 90, 0.04)" />
    <circle cx="40" cy="35" r="16" fill="#00875A" fillOpacity="0.15" stroke="#00875A" strokeWidth="1.5" />
    <path d="M32 35L38 41L49 29" stroke="#00875A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="75" y="18" width="145" height="14" rx="3" fill="#0B2653" fillOpacity="0.08" />
    <rect x="75" y="38" width="95" height="14" rx="3" fill="#00875A" fillOpacity="0.1" />
    <text x="122" y="49" fontSize="8" fontWeight="700" fill="#00875A">100% CI/CD COVERAGE</text>
  </svg>
);

export const StrategicAdvisorVisual: React.FC = () => (
  <svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="240" height="70" rx="8" fill="rgba(11, 38, 83, 0.04)" />
    <circle cx="40" cy="35" r="16" fill="#0B2653" fillOpacity="0.1" stroke="#0B2653" strokeWidth="1.5" />
    <text x="40" y="40" fontSize="14" fontWeight="800" fill="#0B2653" textAnchor="middle">?</text>
    <rect x="75" y="18" width="145" height="14" rx="3" fill="#0B2653" fillOpacity="0.08" />
    <rect x="75" y="38" width="125" height="14" rx="3" fill="#EC1C24" fillOpacity="0.08" />
    <text x="137" y="49" fontSize="8" fontWeight="700" fill="#EC1C24">UNBIASED ARCHITECTURE ROADMAP</text>
  </svg>
);
