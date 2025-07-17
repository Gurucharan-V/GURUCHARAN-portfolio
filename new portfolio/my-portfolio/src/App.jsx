// App.jsx
// Production-ready portfolio landing page
// Clean, optimized, and accessible design

import React from 'react';

/**
 * App Component
 * Main portfolio landing page with hero section
 * Optimized for performance, accessibility, and SEO
 */
export default function App() {
  return (
    <main 
      style={{
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: 1.6
      }}
      role="main"
      aria-label="Portfolio homepage"
    >
      {/* Hero Section */}
      <section 
        style={{
          textAlign: 'center',
          color: 'white',
          maxWidth: '800px',
          padding: '2rem'
        }}
      >
        {/* Main Title */}
        <h1 
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '700',
            margin: '0 0 1rem 0',
            letterSpacing: '0.02em',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
          role="banner"
        >
          Gurucharan Vemuru
        </h1>
        
        {/* Subtitle */}
        <h2 
          style={{
            fontSize: 'clamp(1.2rem, 4vw, 2rem)',
            fontWeight: '300',
            margin: '0 0 2rem 0',
            opacity: 0.9,
            color: '#f8f9fa'
          }}
        >
          Portfolio
        </h2>
        
        {/* Description */}
        <p 
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            fontWeight: '400',
            margin: '0 0 3rem 0',
            opacity: 0.8,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.8
          }}
        >
          Welcome to my portfolio. Explore my projects and experience.
        </p>
        
        {/* Call-to-Action */}
        <nav aria-label="Primary navigation">
          <button
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '500',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
            aria-label="View my work and projects"
          >
            View My Work
          </button>
        </nav>
      </section>
    </main>
  );
}