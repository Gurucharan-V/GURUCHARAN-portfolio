// ComputerModel.jsx
// Interactive 3D Background Component for Landing Page
// Renders scene.gltf as a mouse-interactive background

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

/**
 * Scene3D Component
 * Loads and renders the 3D model with mouse-following behavior
 */
function Scene3D() {
  const modelRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Load the GLTF model from public directory
  const { scene } = useGLTF('/3d/scene.gltf');

  // Handle mouse movement for interactive rotation
  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMouse({ x, y });
  };

  // Animate model based on mouse position
  useFrame(() => {
    if (modelRef.current) {
      // Smooth rotation based on mouse position
      modelRef.current.rotation.y += (mouse.x * 0.5 - modelRef.current.rotation.y) * 0.05;
      modelRef.current.rotation.x += (mouse.y * 0.3 - modelRef.current.rotation.x) * 0.05;
    }
  });

  // Attach mouse listener to canvas
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={1} 
      position={[0, 0, 0]} 
    />
  );
}

/**
 * ComputerModel Component
 * Main 3D background canvas with lighting and controls
 */
function ComputerModel() {
  return (
    <Canvas
      camera={{ 
        position: [0, 0, 5], 
        fov: 50 
      }}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1
      }}
    >
      {/* Lighting setup for realistic rendering */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
      />
      
      {/* Environment for reflections */}
      <Environment preset="studio" />
      
      {/* 3D Model */}
      <Scene3D />
      
      {/* Mouse controls for manual interaction */}
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
    </Canvas>
  );
}

export default ComputerModel;

// Preload the model for better performance
useGLTF.preload('/3d/scene.gltf');