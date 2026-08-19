import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroCanvasProps {
  particleCount?: number;
  className?: string;
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({
  particleCount = 75,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Node points geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 120;
      positions[i + 1] = (Math.random() - 0.5) * 80;
      positions[i + 2] = (Math.random() - 0.5) * 60;

      speeds[i] = (Math.random() - 0.5) * 0.04;
      speeds[i + 1] = (Math.random() - 0.5) * 0.04;
      speeds[i + 2] = (Math.random() - 0.5) * 0.04;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material
    const material = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 1.8,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Line connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    const linesGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(lineMesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / container.clientHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera parallax
      targetX += (mouseX * 10 - targetX) * 0.05;
      targetY += (mouseY * 8 - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(scene.position);

      // Update positions
      const posArray = geometry.attributes.position.array as Float32Array;
      const linePositions: number[] = [];

      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] += speeds[i];
        posArray[i + 1] += speeds[i + 1];
        posArray[i + 2] += speeds[i + 2];

        // Bounds bounce
        if (Math.abs(posArray[i]) > 60) speeds[i] *= -1;
        if (Math.abs(posArray[i + 1]) > 40) speeds[i + 1] *= -1;
        if (Math.abs(posArray[i + 2]) > 30) speeds[i + 2] *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Connect nearby nodes
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 400) {
            linePositions.push(
              posArray[i * 3],
              posArray[i * 3 + 1],
              posArray[i * 3 + 2],
              posArray[j * 3],
              posArray[j * 3 + 1],
              posArray[j * 3 + 2]
            );
          }
        }
      }

      linesGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      particles.rotation.y += 0.0008;
      lineMesh.rotation.y += 0.0008;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      linesGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [particleCount]);

  return (
    <div
      ref={containerRef}
      className={`btm-three-canvas-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
