// App.jsx
// Test version to ensure basic React is working

import React from 'react';

/**
 * App Component - Test Version
 * Simple landing page to verify React is working before adding 3D
 */
export default function App() {
  return (
    <main style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Hero Content */}
      <div style={{
        textAlign: 'center',
        color: 'white',
        textShadow: '2px 2px 8px rgba(0,0,0,0.7)'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
          fontWeight: 'bold',
          margin: 0,
          padding: 0,
          letterSpacing: '0.1em'
        }}>
          Gurucharan Vemuru
        </h1>
        
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          margin: '1rem 0 0 0',
          opacity: 0.9,
          fontWeight: '300'
        }}>
          Portfolio
        </p>

        <p style={{
          fontSize: '1rem',
          margin: '2rem 0 0 0',
          opacity: 0.7
        }}>
          React is working! 3D model coming next...
        </p>
      </div>
    </main>
  );
}