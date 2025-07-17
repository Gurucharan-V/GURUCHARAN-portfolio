// App.jsx
// Landing Page with Interactive 3D Background
// Features "Gurucharan Vemuru" title overlaid on mouse-interactive 3D model

import React from 'react';
import ComputerModel from './ComputerModel';

/**
 * App Component
 * Landing page with interactive 3D background and hero title
 */
export default function App() {
  return (
    <main style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0,
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Interactive 3D Background */}
      <ComputerModel />
      
      {/* Hero Content - Title overlaid on 3D background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 10,
        color: 'white',
        textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
        userSelect: 'none'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
          fontWeight: 'bold',
          margin: 0,
          padding: 0,
          fontFamily: '"Arial", "Helvetica", sans-serif',
          letterSpacing: '0.1em'
        }}>
          Gurucharan Vemuru
        </h1>
        
        {/* Optional subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          margin: '1rem 0 0 0',
          opacity: 0.9,
          fontWeight: '300'
        }}>
          Portfolio
        </p>
      </div>
      
      {/* Instructions for user interaction */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '0.9rem',
        textAlign: 'center',
        zIndex: 10
      }}>
        Move your mouse to interact with the 3D model
      </div>
    </main>
  );
}