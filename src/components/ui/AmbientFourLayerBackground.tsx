import React, { useEffect, useRef } from 'react';
import './ambientBackground.css';

export const AmbientFourLayerBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const auroraContainer = auroraRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let targetScrollProgress = 0;
    let smoothScrollProgress = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Dynamic Pool of Nodes (Supports expansion in Technology Section)
    const maxNodes = window.innerWidth < 768 ? 24 : 44;
    const nodes = Array.from({ length: maxNodes }, (_, i) => {
      // Structured target coordinates (Isometric grid for Industries Section)
      const cols = 6;
      const row = Math.floor(i / cols);
      const col = i % cols;
      const structX = 12 + col * 15 + (row % 2 === 0 ? 4 : -4);
      const structY = 15 + row * 16;

      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        originX: Math.random() * 100,
        originY: Math.random() * 100,
        structX,
        structY,
        vx: (Math.random() - 0.5) * 0.035,
        vy: (Math.random() - 0.5) * 0.035,
        radius: 2 + Math.random() * 1.5,
        tier: i < 18 ? 'hero' : i < 30 ? 'standard' : 'tech-dense',
      };
    });

    // Particle Packets pool
    const packetCount = 28;
    const dataPackets = Array.from({ length: packetCount }, () => ({
      fromNode: 0,
      toNode: 1,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.005,
      size: 2.2,
      active: true,
    }));

    const render = () => {
      time += 0.015;
      smoothScrollProgress += (targetScrollProgress - smoothScrollProgress) * 0.07;
      const p = smoothScrollProgress;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      // ────────────────────────────────────────────────────────
      // SCROLL-REACTIVE ENVIRONMENT PARAMETERS
      // ────────────────────────────────────────────────────────
      // Section stages:
      // 0.0 - 0.18: Hero (Visible: Aurora + Mesh + Particles)
      // 0.18 - 0.38: Solution Section (Softer background for card readability)
      // 0.38 - 0.58: Industries (Mesh becomes structured lattice)
      // 0.58 - 0.76: Technology (More nodes & dense constellation links)
      // 0.76 - 0.88: Case Studies (Particles become softer & serene)
      // 0.88 - 1.0: Final CTA (Network converges towards center CTA)

      let auroraOpacity = 0.75;
      let meshAlpha = 0.16;
      let particleBrightness = 0.95;
      let particleGlow = 8;
      let structureBias = 0.0;
      let nodeActiveRatio = 0.65; // ~28 nodes in Hero
      let convergence = 0.0;
      let waveOpacity = 0.035;

      if (p < 0.18) {
        // Hero: High visibility
        auroraOpacity = 0.85;
        meshAlpha = 0.18;
        particleBrightness = 1.0;
        particleGlow = 9;
        nodeActiveRatio = 0.65;
        structureBias = 0.0;
      } else if (p >= 0.18 && p < 0.38) {
        // Solution Section: Softer for focus on interactive cards
        const sub = (p - 0.18) / 0.2;
        auroraOpacity = 0.85 - sub * 0.45; // drops to 0.40
        meshAlpha = 0.18 - sub * 0.1; // drops to 0.08
        particleBrightness = 1.0 - sub * 0.55;
        particleGlow = 4;
        nodeActiveRatio = 0.5;
        structureBias = 0.0;
      } else if (p >= 0.38 && p < 0.58) {
        // Industries: Structured lattice
        const sub = (p - 0.38) / 0.2;
        auroraOpacity = 0.4 + sub * 0.25;
        meshAlpha = 0.08 + sub * 0.07;
        structureBias = sub * 0.75; // morphs into structured mesh
        particleBrightness = 0.65 + sub * 0.2;
        particleGlow = 6;
        nodeActiveRatio = 0.65;
      } else if (p >= 0.58 && p < 0.76) {
        // Technology: More nodes appear & dense constellation
        const sub = (p - 0.58) / 0.18;
        auroraOpacity = 0.65 + sub * 0.15;
        meshAlpha = 0.15 + sub * 0.08; // deepens to 0.23
        nodeActiveRatio = 0.65 + sub * 0.35; // scales to 100% all 44 nodes!
        structureBias = 0.75 - sub * 0.65; // returns to organic cosmos
        particleBrightness = 1.0;
        particleGlow = 10;
        waveOpacity = 0.05;
      } else if (p >= 0.76 && p < 0.88) {
        // Case Studies: Particles become softer & calmer
        const sub = (p - 0.76) / 0.12;
        auroraOpacity = 0.55 - sub * 0.15;
        meshAlpha = 0.16 - sub * 0.06;
        nodeActiveRatio = 0.7;
        particleBrightness = 0.8 - sub * 0.45; // softer particles
        particleGlow = 2;
        waveOpacity = 0.025;
      } else {
        // Final CTA: Convergence toward CTA center
        const sub = (p - 0.88) / 0.12;
        convergence = sub;
        auroraOpacity = 0.45 + sub * 0.35;
        meshAlpha = 0.12 + sub * 0.12;
        particleBrightness = 0.5 + sub * 0.5;
        particleGlow = 12 * sub;
        nodeActiveRatio = 0.85;
      }

      // Update Aurora Container Opacity
      if (auroraContainer) {
        auroraContainer.style.opacity = `${auroraOpacity}`;
      }

      // ────────────────────────────────────────────────────────
      // LAYER 4: Light Waves
      // ────────────────────────────────────────────────────────
      [0, 1, 2].forEach((waveIdx) => {
        ctx.beginPath();
        const baseHeight = height * (0.2 + waveIdx * 0.32);
        const waveSpeed = time * 0.35 + waveIdx * 1.4;
        const waveAmplitude = 16 + waveIdx * 8;
        const waveFrequency = 0.0028 + waveIdx * 0.001;

        ctx.moveTo(0, baseHeight + Math.sin(waveSpeed) * waveAmplitude);

        for (let x = 0; x < width; x += 12) {
          const y =
            baseHeight +
            Math.sin(x * waveFrequency + waveSpeed) * waveAmplitude +
            Math.cos(x * waveFrequency * 0.5 + waveSpeed * 0.6) * (waveAmplitude * 0.45);
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(0, 200, 129, ${waveOpacity + Math.sin(time + waveIdx) * 0.01})`;
        ctx.lineWidth = 1.8 + waveIdx * 0.6;
        ctx.stroke();
      });

      // ────────────────────────────────────────────────────────
      // LAYER 2: Digital Mesh with Scroll Structure & Convergence
      // ────────────────────────────────────────────────────────
      const activeCount = Math.floor(nodes.length * nodeActiveRatio);
      const activeConnections: { p1: { x: number; y: number }; p2: { x: number; y: number } }[] = [];

      // CTA Convergence target point (center bottom where CTA card sits)
      const ctaTargetX = width * 0.5;
      const ctaTargetY = height * 0.72;

      for (let i = 0; i < activeCount; i++) {
        const node = nodes[i];

        // Free drift
        node.originX += node.vx;
        node.originY += node.vy;
        if (node.originX < 0 || node.originX > 100) node.vx *= -1;
        if (node.originY < 0 || node.originY > 100) node.vy *= -1;

        // Structured blend (Industries phase)
        let currentX = node.originX * (1 - structureBias) + node.structX * structureBias;
        let currentY = node.originY * (1 - structureBias) + node.structY * structureBias;

        // Convergence blend (Final CTA phase)
        let px = (currentX / 100) * width;
        let py = (currentY / 100) * height;

        if (convergence > 0) {
          px = px * (1 - convergence * 0.6) + ctaTargetX * (convergence * 0.6);
          py = py * (1 - convergence * 0.6) + ctaTargetY * (convergence * 0.6);
        }

        node.x = (px / width) * 100;
        node.y = (py / height) * 100;

        // Draw connections
        const maxDist = width < 768 ? 130 : 175;
        for (let j = i + 1; j < activeCount; j++) {
          const node2 = nodes[j];
          const x2 = (node2.x / 100) * width;
          const y2 = (node2.y / 100) * height;

          const dist = Math.hypot(x2 - px, y2 - py);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * meshAlpha;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(11, 38, 83, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            activeConnections.push({ p1: { x: px, y: py }, p2: { x: x2, y: y2 } });
          }
        }

        // Draw node points
        ctx.beginPath();
        ctx.arc(px, py, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(11, 38, 83, ${meshAlpha * 1.5})`;
        ctx.fill();
      }

      // ────────────────────────────────────────────────────────
      // LAYER 3: Data Particles with Reactive Brightness & Velocity
      // ────────────────────────────────────────────────────────
      if (activeConnections.length > 0 && particleBrightness > 0.05) {
        dataPackets.forEach((dp, idx) => {
          const conn = activeConnections[idx % activeConnections.length];
          if (!conn) return;

          dp.progress += dp.speed * (p >= 0.76 && p < 0.88 ? 0.6 : 1.0);
          if (dp.progress > 1) dp.progress = 0;

          const px = conn.p1.x + (conn.p2.x - conn.p1.x) * dp.progress;
          const py = conn.p1.y + (conn.p2.y - conn.p1.y) * dp.progress;

          ctx.beginPath();
          ctx.arc(px, py, dp.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 200, 129, ${particleBrightness})`;

          if (particleGlow > 0) {
            ctx.shadowColor = '#00C881';
            ctx.shadowBlur = particleGlow;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`btm-ambient-atmosphere-root ${className}`} aria-hidden="true">
      {/* LAYER 1: Aurora Glow with Scroll-Reactive Opacity */}
      <div ref={auroraRef} className="btm-aurora-glow-layer">
        <div className="btm-aurora-blob blue" />
        <div className="btm-aurora-blob purple" />
        <div className="btm-aurora-blob cyan" />
      </div>

      {/* LAYERS 2, 3, 4: Dynamic Scroll-Reactive Canvas */}
      <canvas ref={canvasRef} className="btm-atmosphere-canvas" />
    </div>
  );
};
