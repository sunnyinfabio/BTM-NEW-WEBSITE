import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface TechNode {
  id: string;
  name: string;
  category: string;
  description: string;
  position: [number, number, number];
  color: number;
  connections: string[];
}

const TECH_NODES: TechNode[] = [
  {
    id: 'product',
    name: 'Product',
    category: 'Full-Lifecycle',
    description: 'Autonomous end-to-end product architecture & delivery',
    position: [0, 2, 0],
    color: 0x38bdf8, // Electric blue
    connections: ['web', 'mobile', 'cloud', 'engineering', 'ai'],
  },
  {
    id: 'ai',
    name: 'AI & ML',
    category: 'Intelligence',
    description: 'Enterprise AI, NLP, RPA & predictive document models',
    position: [0, 22, -4],
    color: 0xa855f7, // Violet
    connections: ['data', 'product', 'cloud'],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    category: 'Infrastructure',
    description: 'Scalable AWS, Azure & Google Cloud microservices',
    position: [24, 12, -6],
    color: 0x06b6d4, // Cyan
    connections: ['product', 'engineering', 'data'],
  },
  {
    id: 'data',
    name: 'Data',
    category: 'Analytics',
    description: 'High-throughput analytics, Big Data & enterprise SQL',
    position: [22, -14, 2],
    color: 0x10b981, // Emerald
    connections: ['ai', 'cloud', 'engineering'],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    category: 'Top 1% Talent',
    description: 'Pre-vetted senior software engineers & dedicated pods',
    position: [0, -20, 4],
    color: 0x3b82f6, // Primary Blue
    connections: ['product', 'web', 'mobile', 'data'],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    category: 'iOS & Android',
    description: 'Native & cross-platform React Native / Flutter apps',
    position: [-22, -12, 6],
    color: 0x38bdf8, // Electric blue
    connections: ['product', 'engineering', 'web'],
  },
  {
    id: 'web',
    name: 'Web Apps',
    category: 'Modern Web',
    description: 'High-performance React, TypeScript & full-stack web portals',
    position: [-24, 14, -2],
    color: 0x06b6d4, // Cyan
    connections: ['product', 'mobile', 'cloud'],
  },
];

export const HeroNetwork3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = window.innerWidth < 768;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 85 : 70;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for nodes & lines
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Create Nodes (Meshes)
    const nodeMeshes: { [id: string]: THREE.Mesh } = {};
    const glowMeshes: { [id: string]: THREE.Mesh } = {};
    const nodeObjects: THREE.Object3D[] = [];

    TECH_NODES.forEach((node) => {
      const nodeScale = isMobile ? 0.75 : 1;
      const geo = new THREE.SphereGeometry((node.id === 'product' ? 3.2 : 2.5) * nodeScale, 24, 24);
      const mat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.9,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...node.position);
      mesh.userData = { nodeData: node };
      networkGroup.add(mesh);
      nodeMeshes[node.id] = mesh;
      nodeObjects.push(mesh);

      // Outer soft glow halo
      const glowGeo = new THREE.SphereGeometry((node.id === 'product' ? 5.2 : 4.2) * nodeScale, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.22,
        wireframe: true,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.position.copy(mesh.position);
      networkGroup.add(glowMesh);
      glowMeshes[node.id] = glowMesh;
    });

    // Create Connection Lines
    const linePairs: [THREE.Vector3, THREE.Vector3, number][] = [];
    const addedConnections = new Set<string>();

    TECH_NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        const key = [node.id, targetId].sort().join('-');
        if (!addedConnections.has(key)) {
          addedConnections.add(key);
          const targetNode = TECH_NODES.find((n) => n.id === targetId);
          if (targetNode) {
            linePairs.push([
              new THREE.Vector3(...node.position),
              new THREE.Vector3(...targetNode.position),
              node.color,
            ]);
          }
        }
      });
    });

    const linesGroup = new THREE.Group();
    networkGroup.add(linesGroup);

    linePairs.forEach(([start, end, color]) => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([start, end]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      linesGroup.add(line);
    });

    // Ambient floating particles around the network
    const ambientCount = isMobile ? 35 : 70;
    const ambientGeo = new THREE.BufferGeometry();
    const ambientPositions = new Float32Array(ambientCount * 3);
    for (let i = 0; i < ambientCount * 3; i += 3) {
      ambientPositions[i] = (Math.random() - 0.5) * 80;
      ambientPositions[i + 1] = (Math.random() - 0.5) * 80;
      ambientPositions[i + 2] = (Math.random() - 0.5) * 40;
    }
    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
    const ambientMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 1.2,
      transparent: true,
      opacity: 0.4,
    });
    const ambientPoints = new THREE.Points(ambientGeo, ambientMat);
    networkGroup.add(ambientPoints);

    // Raycasting & Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -(((e.clientY - rect.top) / container.clientHeight) * 2 - 1);
      mouse.x = x;
      mouse.y = y;

      targetRotationY = x * 0.25;
      targetRotationX = -y * 0.2;

      // Tooltip position in DOM
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    container.addEventListener('pointermove', onPointerMove);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation with mouse damping
      networkGroup.rotation.y += (targetRotationY - networkGroup.rotation.y) * 0.05;
      networkGroup.rotation.x += (targetRotationX - networkGroup.rotation.x) * 0.05;

      // Gentle continuous ambient breathing
      const idleAngle = elapsedTime * 0.25;
      networkGroup.position.y = Math.sin(idleAngle) * 1.5;

      // Pulse halos
      Object.keys(glowMeshes).forEach((id, idx) => {
        const gm = glowMeshes[id];
        const scalePulse = 1 + Math.sin(elapsedTime * 2 + idx * 0.8) * 0.08;
        gm.scale.set(scalePulse, scalePulse, scalePulse);
      });

      // Raycast test
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeObjects);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const data = hit.userData.nodeData as TechNode;
        setHoveredNode(data);
        hit.scale.lerp(new THREE.Vector3(1.35, 1.35, 1.35), 0.2);
        document.body.style.cursor = 'pointer';
      } else {
        setHoveredNode(null);
        nodeObjects.forEach((obj) => {
          obj.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        });
        document.body.style.cursor = 'default';
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      document.body.style.cursor = 'default';
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      style={{ minHeight: '440px', position: 'relative' }}
    >
      {/* Fallback for environments where WebGL is unsupported */}
      {!hasWebGL && (
        <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
          <div className="w-16 h-16 rounded-full border border-blue-500/30 flex items-center justify-center mb-3">
            <span className="text-blue-400 font-bold text-xl">BTM</span>
          </div>
          <p className="text-sm font-semibold text-slate-200">Connected Engineering Matrix</p>
          <p className="text-xs text-slate-500 mt-1">AI • Cloud • Data • Product • Web • Mobile</p>
        </div>
      )}

      {/* Interactive Tooltip Badge on Node Hover */}
      {hoveredNode && (
        <div
          className="absolute pointer-events-none z-30 transition-all duration-150"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 80}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div
            style={{
              background: 'rgba(13, 18, 26, 0.95)',
              border: '1px solid rgba(59, 130, 246, 0.5)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(37, 99, 235, 0.35)',
              borderRadius: '12px',
              padding: '0.625rem 1rem',
              backdropFilter: 'blur(12px)',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: `#${hoveredNode.color.toString(16).padStart(6, '0')}`,
                  display: 'inline-block',
                }}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F8FAFC' }}>
                {hoveredNode.name}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                {hoveredNode.category}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0, maxWidth: '220px', whiteSpace: 'normal', lineHeight: 1.3 }}>
              {hoveredNode.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
