import React, { useEffect, useRef, useState, useCallback } from 'react';

interface TechNode {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  description: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  color: string;
  accentBg: string;
  icon: string;
  connections: string[];
}

const CORE_NODES: TechNode[] = [
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    shortLabel: 'AI',
    category: 'LLMs • RAG • IDR',
    description: 'Autonomous document parsing, deep learning OCR & domain AI agents.',
    x: 50,
    y: 18,
    color: '#6F42C1', // Purple
    accentBg: 'rgba(111, 66, 193, 0.12)',
    icon: '✨',
    connections: ['core', 'data', 'cloud'],
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    shortLabel: 'DATA',
    category: 'Kafka • Real-Time Stream',
    description: 'High-throughput stream processing, data lakes & low-latency analytics.',
    x: 20,
    y: 50,
    color: '#0284C7', // Electric Blue
    accentBg: 'rgba(2, 132, 199, 0.12)',
    icon: '⚡',
    connections: ['core', 'ai', 'engineering'],
  },
  {
    id: 'core',
    name: 'BTM Product Nexus',
    shortLabel: 'PLATFORM',
    category: 'Full-Lifecycle Architecture',
    description: 'Enterprise systems engineering, API orchestration & SLA governance.',
    x: 50,
    y: 50,
    color: '#EC1C24', // BTM Brand Red
    accentBg: 'rgba(236, 28, 36, 0.14)',
    icon: '❖',
    connections: ['ai', 'data', 'cloud', 'engineering'],
  },
  {
    id: 'cloud',
    name: 'Cloud Infrastructure',
    shortLabel: 'CLOUD',
    category: 'AWS • Azure • Kubernetes',
    description: 'Multi-region VPC architectures, microservices & zero-downtime CI/CD.',
    x: 80,
    y: 50,
    color: '#00875A', // Emerald
    accentBg: 'rgba(0, 135, 90, 0.12)',
    icon: '☁',
    connections: ['core', 'ai', 'engineering'],
  },
  {
    id: 'engineering',
    name: 'Senior Engineering',
    shortLabel: 'ENGINEERING',
    category: 'Top 1% Vetted Pods',
    description: 'Dedicated agile pods (Java, .NET, Python, React) ramped in 48 hours.',
    x: 50,
    y: 82,
    color: '#00C881', // Vibrant Green
    accentBg: 'rgba(0, 200, 129, 0.12)',
    icon: '⚙',
    connections: ['core', 'data', 'cloud'],
  },
];

export const HeroNetwork3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const hoveredNode = CORE_NODES.find((n) => n.id === hoveredNodeId) || null;

  // Mouse Parallax Effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxOffset({
      x: xRatio * 14,
      y: yRatio * 14,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setParallaxOffset({ x: 0, y: 0 });
    setHoveredNodeId(null);
  }, []);

  // Real-time interactive canvas for flowing energy particles and laser connection tracks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Particle flow packets along connection tracks
    const connectionPairs = [
      { from: 0, to: 2 }, // AI <-> Core
      { from: 1, to: 2 }, // DATA <-> Core
      { from: 3, to: 2 }, // CLOUD <-> Core
      { from: 4, to: 2 }, // ENG <-> Core
      { from: 0, to: 1 }, // AI <-> DATA
      { from: 0, to: 3 }, // AI <-> CLOUD
      { from: 4, to: 1 }, // ENG <-> DATA
      { from: 4, to: 3 }, // ENG <-> CLOUD
    ];

    const particles = Array.from({ length: 24 }, (_, i) => ({
      pairIndex: i % connectionPairs.length,
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.007,
      size: 2.2 + Math.random() * 1.5,
    }));

    const render = () => {
      time += 0.02;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Orbital Background Ring behind Core
      const coreX = (50 / 100) * width;
      const coreY = (50 / 100) * height;

      ctx.beginPath();
      ctx.arc(coreX, coreY, 90 + Math.sin(time) * 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(11, 38, 83, 0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Draw Connection Lines
      connectionPairs.forEach((pair) => {
        const fromNode = CORE_NODES[pair.from];
        const toNode = CORE_NODES[pair.to];

        const x1 = (fromNode.x / 100) * width;
        const y1 = (fromNode.y / 100) * height;
        const x2 = (toNode.x / 100) * width;
        const y2 = (toNode.y / 100) * height;

        const isHighlighted =
          hoveredNodeId &&
          (hoveredNodeId === fromNode.id || hoveredNodeId === toNode.id);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = isHighlighted
          ? 'rgba(0, 200, 129, 0.45)'
          : 'rgba(11, 38, 83, 0.12)';
        ctx.lineWidth = isHighlighted ? 2 : 1;
        ctx.stroke();
      });

      // 3. Flowing Data Particles
      particles.forEach((p) => {
        const pair = connectionPairs[p.pairIndex];
        const fromNode = CORE_NODES[pair.from];
        const toNode = CORE_NODES[pair.to];

        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const x1 = (fromNode.x / 100) * width;
        const y1 = (fromNode.y / 100) * height;
        const x2 = (toNode.x / 100) * width;
        const y2 = (toNode.y / 100) * height;

        const isHoveredTrack =
          hoveredNodeId &&
          (hoveredNodeId === fromNode.id || hoveredNodeId === toNode.id);

        // 3. Flowing Data Particles with Dynamic Node-Matched Spectrum Colors
        const particleColor = isHoveredTrack
          ? '#EC1C24'
          : p.pairIndex % 4 === 0
          ? '#8B5CF6' // Vibrant Purple (AI)
          : p.pairIndex % 4 === 1
          ? '#0284C7' // Electric Sky Blue (Data)
          : p.pairIndex % 4 === 2
          ? '#00C881' // Vibrant Emerald (Engineering)
          : '#06B6D4'; // Cyan (Cloud)

        const curX = x1 + (x2 - x1) * p.progress;
        const curY = y1 + (y2 - y1) * p.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.shadowColor = particleColor;
        ctx.shadowBlur = isHoveredTrack ? 14 : 9;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [hoveredNodeId]);

  return (
    <div
      ref={containerRef}
      className={`btm-floating-tech-core-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Canvas Layer for dynamic lines & particles */}
      <canvas ref={canvasRef} className="btm-core-canvas" />

      {/* Floating Interactive Glowing Nodes with Parallax */}
      <div
        className="btm-core-nodes-plane"
        style={{
          transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {CORE_NODES.map((node) => {
          const isHovered = hoveredNodeId === node.id;
          const isNexus = node.id === 'core';

          return (
            <div
              key={node.id}
              className={`btm-tech-node-anchor ${isHovered ? 'hovered' : ''} ${isNexus ? 'nexus' : ''}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              tabIndex={0}
              role="button"
              aria-label={`${node.name} Technology Node`}
            >
              {/* Outer Glow Halo Ring */}
              <div
                className="btm-node-glow-ring"
                style={{
                  borderColor: isHovered ? node.color : `${node.color}33`,
                  boxShadow: isHovered
                    ? `0 0 28px ${node.color}99, inset 0 0 14px ${node.color}66`
                    : `0 0 10px ${node.color}22`,
                }}
              />

              {/* Node Orb */}
              <div
                className="btm-node-orb"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: node.color,
                  color: node.color,
                }}
              >
                <span className="btm-node-icon">{node.icon}</span>
              </div>

              {/* Node Floating Pill Label */}
              <div
                className="btm-node-label-pill"
                style={{
                  color: isHovered ? '#FFFFFF' : 'var(--brand-navy)',
                  backgroundColor: isHovered ? node.color : '#FFFFFF',
                  borderColor: isHovered ? node.color : 'var(--border)',
                  boxShadow: isHovered ? `0 4px 14px ${node.color}55` : 'var(--shadow-sm)',
                }}
              >
                <span>{node.shortLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Node Context Popover Tooltip */}
      {hoveredNode && (
        <div
          className="btm-node-tooltip"
          style={{
            borderColor: hoveredNode.color,
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: hoveredNode.color }}
            />
            <span
              className="text-[10px] font-extrabold uppercase tracking-wider"
              style={{ color: hoveredNode.color }}
            >
              {hoveredNode.category}
            </span>
          </div>
          <h4 className="text-xs font-bold text-[#0B2653] leading-tight mb-0.5">
            {hoveredNode.name}
          </h4>
          <p className="text-[11px] text-[#51668A] leading-snug">
            {hoveredNode.description}
          </p>
        </div>
      )}
    </div>
  );
};
