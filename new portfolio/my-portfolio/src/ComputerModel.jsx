// ComputerModel.jsx
// 3D Computer Model with Interactive Points using react-three-fiber and drei
// Place scene.gltf in public/3d/scene.gltf

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

/**
 * InteractivePoint Component
 * Renders an interactive marker at a given position on the model.
 * On hover/click, displays a tooltip or triggers an action.
 */
function InteractivePoint({ position, label }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(label)}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color={hovered ? 'orange' : 'deepskyblue'} />
      </mesh>
      {hovered && (
        <Html center style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            whiteSpace: 'nowrap',
          }}>{label}</div>
        </Html>
      )}
    </group>
  );
}

/**
 * ComputerModel Component
 * Loads and displays the 3D model with interactive points.
 */
function ComputerModel() {
  // Load the GLTF model from the public directory
  const gltf = useGLTF('/3d/scene.gltf');

  // Example points: Replace with real positions/labels as needed
  const points = [
    { position: [0.2, 0.1, 0], label: 'USB Port' },
    { position: [-0.2, 0.15, 0.1], label: 'Power Button' },
    { position: [0, 0.3, 0], label: 'Webcam' },
  ];

  return (
    <Canvas camera={{ position: [1, 1, 2], fov: 45 }} style={{ width: '100vw', height: '100vh' }}>
      {/* Ambient and directional lighting for realism */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      {/* Render the loaded GLTF model */}
      <primitive object={gltf.scene} position={[0, 0, 0]} />
      {/* Render interactive points */}
      {points.map((pt, idx) => (
        <InteractivePoint key={idx} position={pt.position} label={pt.label} />
      ))}
      {/* User controls for orbiting the model */}
      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
}

export default ComputerModel;

// Preload the GLTF model for performance
useGLTF.preload('/3d/scene.gltf');