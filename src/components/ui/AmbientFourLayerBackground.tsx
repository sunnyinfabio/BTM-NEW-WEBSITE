import React, { useEffect, useRef } from 'react';
import './ambientBackground.css';

export const AmbientFourLayerBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const handleResize = () => {
      const parent = canvas.parentElement || document.body;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Layer 2: Digital Mesh Nodes (Slow drifting coordinates)
    const nodeCount = window.innerWidth < 768 ? 16 : 28;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * 100, // percentage 0-100
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.04, // very slow drift
      vy: (Math.random() - 0.5) * 0.04,
      radius: 2 + Math.random() * 1.5,
    }));

    // Layer 3: Data Particles travelling along network connections
    const dataPackets = Array.from({ length: 18 }, () => ({
      fromNode: Math.floor(Math.random() * nodeCount),
      toNode: Math.floor(Math.random() * nodeCount),
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      size: 2.2,
    }));

    const render = () => {
      time += 0.015;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      // ────────────────────────────────────────────────────────
      // LAYER 4: Subtle Light Waves (Undulating Sine Waves)
      // ────────────────────────────────────────────────────────
      [0, 1, 2].forEach((waveIdx) => {
        ctx.beginPath();
        const baseHeight = height * (0.25 + waveIdx * 0.3);
        const waveSpeed = time * 0.4 + waveIdx * 1.5;
        const waveAmplitude = 18 + waveIdx * 8;
        const waveFrequency = 0.003 + waveIdx * 0.001;

        ctx.moveTo(0, baseHeight + Math.sin(waveSpeed) * waveAmplitude);

        for (let x = 0; x < width; x += 10) {
          const y =
            baseHeight +
            Math.sin(x * waveFrequency + waveSpeed) * waveAmplitude +
            Math.cos(x * waveFrequency * 0.5 + waveSpeed * 0.7) * (waveAmplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(0, 200, 129, ${0.03 + Math.sin(time + waveIdx) * 0.015})`;
        ctx.lineWidth = 2 + waveIdx;
        ctx.stroke();
      });

      // ────────────────────────────────────────────────────────
      // LAYER 2: Digital Mesh (Slowly Drifting Network)
      // ────────────────────────────────────────────────────────
      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > 100) node.vx *= -1;
        if (node.y < 0 || node.y > 100) node.vy *= -1;
      });

      // Connect nearby nodes
      const maxDistance = width < 768 ? 140 : 180;
      const activeConnections: { p1: { x: number; y: number }; p2: { x: number; y: number } }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const x1 = (nodes[i].x / 100) * width;
        const y1 = (nodes[i].y / 100) * height;

        for (let j = i + 1; j < nodes.length; j++) {
          const x2 = (nodes[j].x / 100) * width;
          const y2 = (nodes[j].y / 100) * height;

          const dist = Math.hypot(x2 - x1, y2 - y1);
          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(11, 38, 83, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            activeConnections.push({ p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } });
          }
        }

        // Draw node circles
        ctx.beginPath();
        ctx.arc(x1, y1, nodes[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(11, 38, 83, 0.2)';
        ctx.fill();
      }

      // ────────────────────────────────────────────────────────
      // LAYER 3: Data Particles (Traveling through network lines)
      // ────────────────────────────────────────────────────────
      if (activeConnections.length > 0) {
        dataPackets.forEach((dp, idx) => {
          const conn = activeConnections[idx % activeConnections.length];
          if (!conn) return;

          dp.progress += dp.speed;
          if (dp.progress > 1) dp.progress = 0;

          const px = conn.p1.x + (conn.p2.x - conn.p1.x) * dp.progress;
          const py = conn.p1.y + (conn.p2.y - conn.p1.y) * dp.progress;

          ctx.beginPath();
          ctx.arc(px, py, dp.size, 0, Math.PI * 2);
          ctx.fillStyle = '#00C881';
          ctx.shadowColor = '#00C881';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`btm-ambient-atmosphere-root ${className}`} aria-hidden="true">
      {/* ────────────────────────────────────────────────────────
          LAYER 1: Aurora (Atmospheric Moving Blue/Purple/Cyan)
          ──────────────────────────────────────────────────────── */}
      <div className="btm-aurora-glow-layer">
        <div className="btm-aurora-blob blue" />
        <div className="btm-aurora-blob purple" />
        <div className="btm-aurora-blob cyan" />
      </div>

      {/* ────────────────────────────────────────────────────────
          LAYERS 2, 3, 4: Digital Mesh + Data Particles + Waves
          ──────────────────────────────────────────────────────── */}
      <canvas ref={canvasRef} className="btm-atmosphere-canvas" />
    </div>
  );
};
