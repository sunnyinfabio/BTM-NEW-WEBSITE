import React, { useEffect, useRef, useState, useCallback } from 'react';

interface TechNode {
  id: string;
  name: string;
  category: string;
  description: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  color: string;
  bgColor: string;
  iconText: string;
  connections: string[];
}

const TECH_NODES: TechNode[] = [
  {
    id: 'product',
    name: 'Product Strategy',
    category: 'Full-Lifecycle',
    description: 'Autonomous end-to-end product architecture, UI/UX & roadmap execution.',
    x: 50,
    y: 50,
    color: '#EC1C24', // BTM Red (Center Core)
    bgColor: 'rgba(236, 28, 36, 0.12)',
    iconText: '★',
    connections: ['ai', 'cloud', 'data', 'engineering', 'mobile', 'web'],
  },
  {
    id: 'ai',
    name: 'AI & Intelligence',
    category: 'IDR • LLM • RAG',
    description: 'Deep learning document parsing, NLP agents & automated OCR pipelines.',
    x: 50,
    y: 16,
    color: '#6F42C1', // Purple
    bgColor: 'rgba(111, 66, 193, 0.12)',
    iconText: 'AI',
    connections: ['product', 'cloud', 'data'],
  },
  {
    id: 'cloud',
    name: 'Cloud Infrastructure',
    category: 'AWS • Azure • GCP',
    description: 'Multi-region VPC microservices, Kubernetes clusters & auto-scaling.',
    x: 82,
    y: 28,
    color: '#00875A', // Emerald Green
    bgColor: 'rgba(0, 135, 90, 0.12)',
    iconText: '☁',
    connections: ['product', 'ai', 'data'],
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    category: 'Big Data • Kafka',
    description: 'High-throughput real-time stream ingestion and sub-10ms query engines.',
    x: 82,
    y: 72,
    color: '#0B2653', // Navy
    bgColor: 'rgba(11, 38, 83, 0.1)',
    iconText: '⚡',
    connections: ['product', 'cloud', 'engineering'],
  },
  {
    id: 'engineering',
    name: 'Senior Engineering',
    category: 'Top 1% Talent',
    description: 'Dedicated pods & vetted senior developers ramped up in 48 hours.',
    x: 50,
    y: 84,
    color: '#00C881', // Bright Emerald
    bgColor: 'rgba(0, 200, 129, 0.12)',
    iconText: '⚙',
    connections: ['product', 'data', 'mobile'],
  },
  {
    id: 'mobile',
    name: 'Mobile Systems',
    category: 'iOS • Android',
    description: 'Native Swift/Kotlin and cross-platform React Native / Flutter applications.',
    x: 18,
    y: 72,
    color: '#0B2653', // Navy
    bgColor: 'rgba(11, 38, 83, 0.1)',
    iconText: '📱',
    connections: ['product', 'engineering', 'web'],
  },
  {
    id: 'web',
    name: 'Modern Web Apps',
    category: 'React • TypeScript',
    description: 'Ultra-fast enterprise SaaS portals, Next.js web applications & APIs.',
    x: 18,
    y: 28,
    color: '#0284C7', // Electric Blue
    bgColor: 'rgba(2, 132, 199, 0.12)',
    iconText: '🌐',
    connections: ['product', 'mobile', 'ai'],
  },
];

export const HeroNetwork3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const hoveredNode = TECH_NODES.find((n) => n.id === hoveredNodeId) || null;

  // Real-time interactive canvas animation for flowing data particles & pulsing rings
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Handle high DPI
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

    // Particle flow state along connection vectors
    const particles = Array.from({ length: 28 }, (_, i) => ({
      pairIndex: i % 12,
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.006,
      size: 2 + Math.random() * 2,
    }));

    // Pre-calculate line connections
    const linePairs: { from: TechNode; to: TechNode }[] = [];
    const seen = new Set<string>();

    TECH_NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        const key = [node.id, targetId].sort().join('-');
        if (!seen.has(key)) {
          seen.add(key);
          const target = TECH_NODES.find((n) => n.id === targetId);
          if (target) {
            linePairs.push({ from: node, to: target });
          }
        }
      });
    });

    const render = () => {
      time += 0.02;
      const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

      ctx.clearRect(0, 0, width, height);

      // Center coordinates
      const cx = width / 2;
      const cy = height / 2;

      // 1. Draw Subtle Concentric Orbital Background Rings
      [75, 130, 185].forEach((radius, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(11, 38, 83, ${0.04 + Math.sin(time + idx) * 0.015})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 2. Draw Connection Lines
      linePairs.forEach((pair) => {
        const x1 = (pair.from.x / 100) * width;
        const y1 = (pair.from.y / 100) * height;
        const x2 = (pair.to.x / 100) * width;
        const y2 = (pair.to.y / 100) * height;

        const isHighlight =
          hoveredNodeId === pair.from.id || hoveredNodeId === pair.to.id;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = isHighlight
          ? 'rgba(236, 28, 36, 0.6)'
          : 'rgba(11, 38, 83, 0.15)';
        ctx.lineWidth = isHighlight ? 2 : 1;
        ctx.stroke();
      });

      // 3. Draw Flowing Energy Packets on Connection Lines
      particles.forEach((p) => {
        const pair = linePairs[p.pairIndex % linePairs.length];
        if (!pair) return;

        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const x1 = (pair.from.x / 100) * width;
        const y1 = (pair.from.y / 100) * height;
        const x2 = (pair.to.x / 100) * width;
        const y2 = (pair.to.y / 100) * height;

        const px = x1 + (x2 - x1) * p.progress;
        const py = y1 + (y2 - y1) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = hoveredNodeId ? '#EC1C24' : '#00C881';
        ctx.shadowColor = '#00C881';
        ctx.shadowBlur = 6;
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
      className={`relative w-full h-full select-none ${className}`}
      style={{ minHeight: '380px', position: 'relative' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      {/* Background HTML5 Animated Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Interactive HTML Node Elements */}
      {TECH_NODES.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const isCore = node.id === 'product';

        return (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredNodeId(node.id)}
            onMouseLeave={() => setHoveredNodeId(null)}
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: isHovered ? 20 : 10,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Outer Pulsing Glow */}
            <div
              style={{
                width: isCore ? '64px' : '52px',
                height: isCore ? '64px' : '52px',
                borderRadius: '50%',
                backgroundColor: node.bgColor,
                border: `2px solid ${node.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isHovered
                  ? `0 0 20px ${node.color}66, 0 8px 16px rgba(11,38,83,0.15)`
                  : '0 4px 12px rgba(11, 38, 83, 0.08)',
                transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.25s ease',
                background: '#FFFFFF',
              }}
            >
              <span
                style={{
                  fontSize: isCore ? '1.15rem' : '0.9rem',
                  fontWeight: 900,
                  color: node.color,
                }}
              >
                {node.iconText}
              </span>
            </div>

            {/* Label Below Node */}
            <div
              style={{
                marginTop: '6px',
                background: isHovered ? node.color : '#FFFFFF',
                color: isHovered ? '#FFFFFF' : '#0B2653',
                border: `1px solid ${isHovered ? node.color : '#E2E8F0'}`,
                borderRadius: '20px',
                padding: '2px 8px',
                fontSize: '0.7rem',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 6px rgba(11, 38, 83, 0.06)',
                transition: 'all 0.2s ease',
              }}
            >
              {node.name}
            </div>
          </div>
        );
      })}

      {/* Floating Hover Tooltip */}
      {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            left: `${mousePos.x}px`,
            top: `${mousePos.y - 12}px`,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            zIndex: 40,
            background: '#0B2653',
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            maxWidth: '240px',
            boxShadow: '0 12px 28px rgba(11, 38, 83, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{hoveredNode.name}</span>
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: 800,
                color: '#00C881',
                background: 'rgba(0, 200, 129, 0.15)',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {hoveredNode.category}
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#CAD7E8', margin: 0, lineHeight: 1.4 }}>
            {hoveredNode.description}
          </p>
        </div>
      )}
    </div>
  );
};
