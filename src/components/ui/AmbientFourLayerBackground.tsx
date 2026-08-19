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

    // Mouse Tracking for subtle cursor reaction in Hero
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Optimized Dynamic Pool of Nodes for 60fps performance
    const isMobile = window.innerWidth < 768;
    const maxNodes = isMobile ? 18 : 42;
    const nodes = Array.from({ length: maxNodes }, (_, i) => {
      const cols = 6;
      const row = Math.floor(i / cols);
      const col = i % cols;
      const structX = 10 + col * 16 + (row % 2 === 0 ? 4 : -4);
      const structY = 14 + row * 16;

      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        originX: Math.random() * 100,
        originY: Math.random() * 100,
        structX,
        structY,
        vx: (Math.random() - 0.5) * 0.032,
        vy: (Math.random() - 0.5) * 0.032,
        radius: 2 + Math.random() * 1.5,
      };
    });

    // Particle Packets pool
    const packetCount = 32;
    const dataPackets = Array.from({ length: packetCount }, () => ({
      fromNode: 0,
      toNode: 1,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      size: 2.2,
    }));

    const render = () => {
      if (!isTabVisible) {
        animId = requestAnimationFrame(render);
        return;
      }
      time += 0.015;
      smoothScrollProgress += (targetScrollProgress - smoothScrollProgress) * 0.07;
      const p = smoothScrollProgress;

      // Mouse smooth interpolation
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      // ────────────────────────────────────────────────────────
      // HERO = 100% INTENSITY vs REST OF WEBSITE = 35–45%
      // ────────────────────────────────────────────────────────
      let auroraOpacity = 0.95; // 100% in Hero
      let meshAlpha = 0.28;     // 100% in Hero
      let particleBrightness = 1.0;
      let particleGlow = 12;
      let waveOpacity = 0.055;
      let structureBias = 0.0;
      let nodeActiveRatio = 0.85;
      let activePacketRatio = 1.0;
      let convergence = 0.0;

      if (p < 0.15) {
        // ── HERO: 100% Maximum Spectacle ──
        auroraOpacity = 0.95;
        meshAlpha = 0.28;
        particleBrightness = 1.0;
        particleGlow = 12;
        waveOpacity = 0.055;
        nodeActiveRatio = 0.85;
        activePacketRatio = 1.0;
        structureBias = 0.0;
      } else if (p >= 0.15 && p < 0.35) {
        // ── TRANSITION TO REST OF SITE (Drops to 35-40%) ──
        const sub = (p - 0.15) / 0.2;
        auroraOpacity = 0.95 - sub * 0.58; // drops to 0.37
        meshAlpha = 0.28 - sub * 0.19;     // drops to 0.09
        particleBrightness = 1.0 - sub * 0.6; // drops to 0.40
        particleGlow = 12 - sub * 8;       // drops to 4
        waveOpacity = 0.055 - sub * 0.035; // drops to 0.02
        nodeActiveRatio = 0.85 - sub * 0.3; // drops to 0.55
        activePacketRatio = 1.0 - sub * 0.6; // drops to 0.40
      } else if (p >= 0.35 && p < 0.58) {
        // ── INDUSTRIES (Structured 40% Intensity) ──
        const sub = (p - 0.35) / 0.23;
        auroraOpacity = 0.38 + sub * 0.07;
        meshAlpha = 0.10 + sub * 0.04;
        structureBias = sub * 0.7;
        particleBrightness = 0.45 + sub * 0.15;
        particleGlow = 4;
        waveOpacity = 0.022;
        nodeActiveRatio = 0.65;
        activePacketRatio = 0.45;
      } else if (p >= 0.58 && p < 0.76) {
        // ── TECHNOLOGY UNIVERSE (45% Density Expansion) ──
        const sub = (p - 0.58) / 0.18;
        auroraOpacity = 0.45 + sub * 0.1;
        meshAlpha = 0.14 + sub * 0.06;
        nodeActiveRatio = 0.65 + sub * 0.35; // all nodes appear
        structureBias = 0.7 - sub * 0.6;
        particleBrightness = 0.6 + sub * 0.25;
        particleGlow = 6;
        waveOpacity = 0.03;
        activePacketRatio = 0.65;
      } else if (p >= 0.76 && p < 0.88) {
        // ── CASE STUDIES (35% Softer & Serene) ──
        const sub = (p - 0.76) / 0.12;
        auroraOpacity = 0.42 - sub * 0.07;
        meshAlpha = 0.12 - sub * 0.04; // drops to 0.08
        particleBrightness = 0.5 - sub * 0.2; // soft 0.3
        particleGlow = 2;
        waveOpacity = 0.018;
        nodeActiveRatio = 0.6;
        activePacketRatio = 0.35;
      } else {
        // ── FINAL CTA (Convergence) ──
        const sub = (p - 0.88) / 0.12;
        convergence = sub;
        auroraOpacity = 0.38 + sub * 0.32;
        meshAlpha = 0.10 + sub * 0.12;
        particleBrightness = 0.4 + sub * 0.4;
        particleGlow = 3 + sub * 8;
        nodeActiveRatio = 0.8;
        activePacketRatio = 0.6;
      }

      // Sync Aurora Container Opacity
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

        ctx.strokeStyle = `rgba(0, 200, 129, ${waveOpacity + Math.sin(time + waveIdx) * 0.008})`;
        ctx.lineWidth = 1.8 + waveIdx * 0.6;
        ctx.stroke();
      });

      // ────────────────────────────────────────────────────────
      // LAYER 2: Digital Mesh + Cursor Reaction in Hero
      // ────────────────────────────────────────────────────────
      const activeCount = Math.floor(nodes.length * nodeActiveRatio);
      const activeConnections: { p1: { x: number; y: number }; p2: { x: number; y: number } }[] = [];

      const ctaTargetX = width * 0.5;
      const ctaTargetY = height * 0.72;

      for (let i = 0; i < activeCount; i++) {
        const node = nodes[i];

        // Free drift
        node.originX += node.vx;
        node.originY += node.vy;
        if (node.originX < 0 || node.originX > 100) node.vx *= -1;
        if (node.originY < 0 || node.originY > 100) node.vy *= -1;

        // Structured blend
        let currentX = node.originX * (1 - structureBias) + node.structX * structureBias;
        let currentY = node.originY * (1 - structureBias) + node.structY * structureBias;

        let px = (currentX / 100) * width;
        let py = (currentY / 100) * height;

        // Subtle Cursor Reaction (Active primarily in Hero screen)
        if (p < 0.2 && mouseX > 0) {
          const distToMouse = Math.hypot(px - mouseX, py - mouseY);
          if (distToMouse < 220 && distToMouse > 0) {
            const force = (1 - distToMouse / 220) * 22 * (1 - p / 0.2);
            px += ((px - mouseX) / distToMouse) * force;
            py += ((py - mouseY) / distToMouse) * force;
          }
        }

        // Convergence blend (Final CTA)
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
            ctx.lineWidth = p < 0.15 ? 1.2 : 1;
            ctx.stroke();

            activeConnections.push({ p1: { x: px, y: py }, p2: { x: x2, y: y2 } });
          }
        }

        // Draw node points
        ctx.beginPath();
        ctx.arc(px, py, node.radius * (p < 0.15 ? 1.15 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(11, 38, 83, ${meshAlpha * 1.5})`;
        ctx.fill();
      }

      // ────────────────────────────────────────────────────────
      // HERO SPECIAL: Brighter Central Nexus Node (Active in Hero)
      // ────────────────────────────────────────────────────────
      if (p < 0.22) {
        const heroCoreAlpha = 1 - p / 0.22;
        const coreX = width * 0.68;
        const coreY = height * 0.46;

        // Core central pulse node
        ctx.beginPath();
        ctx.arc(coreX, coreY, 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 129, ${0.9 * heroCoreAlpha})`;
        ctx.shadowColor = '#00C881';
        ctx.shadowBlur = 18 * heroCoreAlpha;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Outer ambient halo ring
        ctx.beginPath();
        ctx.arc(coreX, coreY, 20 + Math.sin(time * 2.5) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 200, 129, ${0.35 * heroCoreAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // ────────────────────────────────────────────────────────
      // LAYER 3: Data Particles (Traveling along mesh)
      // ────────────────────────────────────────────────────────
      const activePacketLimit = Math.floor(dataPackets.length * activePacketRatio);
      if (activeConnections.length > 0 && particleBrightness > 0.05) {
        for (let idx = 0; idx < activePacketLimit; idx++) {
          const dp = dataPackets[idx];
          const conn = activeConnections[idx % activeConnections.length];
          if (!conn) continue;

          dp.progress += dp.speed * (p >= 0.76 && p < 0.88 ? 0.6 : 1.0);
          if (dp.progress > 1) dp.progress = 0;

          const px = conn.p1.x + (conn.p2.x - conn.p1.x) * dp.progress;
          const py = conn.p1.y + (conn.p2.y - conn.p1.y) * dp.progress;

          ctx.beginPath();
          ctx.arc(px, py, dp.size * (p < 0.15 ? 1.2 : 1), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 200, 129, ${particleBrightness})`;

          if (particleGlow > 0) {
            ctx.shadowColor = '#00C881';
            ctx.shadowBlur = particleGlow;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`btm-ambient-atmosphere-root ${className}`} aria-hidden="true">
      {/* LAYER 1: Aurora Glow */}
      <div ref={auroraRef} className="btm-aurora-glow-layer">
        <div className="btm-aurora-blob blue" />
        <div className="btm-aurora-blob purple" />
        <div className="btm-aurora-blob cyan" />
      </div>

      {/* LAYERS 2, 3, 4: Dynamic Canvas */}
      <canvas ref={canvasRef} className="btm-atmosphere-canvas" />
    </div>
  );
};
