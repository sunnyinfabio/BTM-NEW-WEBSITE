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
    color: 0xec1c24, // BTM Red
    connections: ['web', 'mobile', 'cloud', 'engineering', 'ai'],
  },
  {
    id: 'ai',
    name: 'AI & ML',
    category: 'Intelligence',
    description: 'Enterprise AI, NLP, RPA & predictive document models',
    position: [0, 22, -4],
    color: 0x0b2653, // BTM Navy
    connections: ['data', 'product', 'cloud'],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    category: 'Infrastructure',
    description: 'Scalable AWS, Azure & Google Cloud microservices',
    position: [24, 12, -6],
    color: 0x00c881, // BTM Green
    connections: ['product', 'engineering', 'data'],
  },
  {
    id: 'data',
    name: 'Data',
    category: 'Analytics',
    description: 'High-throughput analytics, Big Data & enterprise SQL',
    position: [22, -14, 2],
    color: 0x0e2b5c, // BTM Deep Blue
    connections: ['ai', 'cloud', 'engineering'],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    category: 'Top 1% Talent',
    description: 'Pre-vetted senior software engineers & dedicated pods',
    position: [0, -20, 4],
    color: 0x00c881, // BTM Green
    connections: ['product', 'web', 'mobile', 'data'],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    category: 'iOS & Android',
    description: 'Native & cross-platform React Native / Flutter apps',
    position: [-22, -12, 6],
    color: 0x0b2653, // BTM Navy
    connections: ['product', 'engineering', 'web'],
  },
  {
    id: 'web',
    name: 'Web Apps',
    category: 'Modern Web',
    description: 'High-performance React, TypeScript & full-stack web portals',
    position: [-24, 14, -2],
    color: 0x0e2b5c, // BTM Deep Blue
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
      const geo = new THREE.SphereGeometry((node.id === 'product' ? 3.4 : 2.6) * nodeScale, 24, 24);
      const mat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.95,
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
        opacity: 0.18,
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

    linePairs.forEach(([start, end]) => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([start, end]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x0b2653,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      linesGroup.add(line);
    });

    // Ambient floating particles
    const particleCount = isMobile ? 35 : 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 120;
      particlePos[i + 1] = (Math.random() - 0.5) * 100;
      particlePos[i + 2] = (Math.random() - 0.5) * 60;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00c881,
      size: isMobile ? 1.2 : 1.8,
      transparent: true,
      opacity: 0.45,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    networkGroup.add(particleSystem);

    // Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -((event.clientY - rect.top) / height) * 2 + 1;

      mouse.x = x;
      mouse.y = y;

      targetRotationY = x * 0.4;
      targetRotationX = -y * 0.3;

      // Raycast for node hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeObjects);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const nodeData = hitMesh.userData.nodeData as TechNode;
        setHoveredNode(nodeData);
        setTooltipPos({
          x: event.clientX - rect.left + 15,
          y: event.clientY - rect.top - 20,
        });
        document.body.style.cursor = 'pointer';
      } else {
        setHoveredNode(null);
        document.body.style.cursor = 'default';
      }
    };

    container.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation towards target with slow idle drift
      networkGroup.rotation.y += (targetRotationY + Math.sin(elapsedTime * 0.3) * 0.15 - networkGroup.rotation.y) * 0.05;
      networkGroup.rotation.x += (targetRotationX + Math.cos(elapsedTime * 0.2) * 0.1 - networkGroup.rotation.x) * 0.05;

      // Pulse nodes slightly
      Object.keys(nodeMeshes).forEach((id, idx) => {
        const mesh = nodeMeshes[id];
        const glow = glowMeshes[id];
        const scaleOffset = Math.sin(elapsedTime * 2 + idx) * 0.08 + 1;
        mesh.scale.set(scaleOffset, scaleOffset, scaleOffset);
        if (glow) {
          glow.scale.set(scaleOffset * 1.05, scaleOffset * 1.05, scaleOffset * 1.05);
          glow.rotation.y += 0.005;
        }
      });

      // Slowly rotate particle field
      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div
        className={`flex items-center justify-center h-full w-full bg-slate-50 rounded-xl border border-slate-200 text-slate-700 text-sm ${className}`}
      >
        <span className="font-semibold text-slate-800">BTM Interactive Capability Matrix (Active)</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full select-none ${className}`}>
      {/* Interactive Tooltip on Node Hover */}
      {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            pointerEvents: 'none',
            zIndex: 30,
            transform: 'translate(-50%, -100%)',
          }}
          className="bg-[#0B2653]/95 backdrop-blur-md border border-white/20 p-3 rounded-lg shadow-xl text-white max-w-xs transition-all duration-75"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold text-sm text-white font-primary">{hoveredNode.name}</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
              {hoveredNode.category}
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-snug">{hoveredNode.description}</p>
        </div>
      )}
    </div>
  );
};
