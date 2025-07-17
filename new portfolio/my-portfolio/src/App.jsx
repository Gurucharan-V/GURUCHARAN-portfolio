// App.jsx
// Production-ready portfolio landing page with smooth animations
// Clean, optimized, and accessible design with enhanced user experience

import React, { useState, useEffect } from 'react';

/**
 * App Component
 * Main portfolio landing page with hero section and smooth animations
 * Optimized for performance, accessibility, and SEO
 */
export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  // Trigger entrance animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
        lineHeight: 1.6,
        overflow: 'hidden'
      }}
      role="main"
      aria-label="Portfolio homepage"
    >
      {/* Hero Section with smooth entrance animation */}
      <section 
        style={{
          textAlign: 'center',
          color: 'white',
          maxWidth: '800px',
          padding: '2rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: '0.2s'
        }}
      >
        {/* Main Title with staggered animation */}
        <h1 
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '700',
            margin: '0 0 1rem 0',
            letterSpacing: '0.02em',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '0.4s'
          }}
          role="banner"
        >
          Gurucharan Vemuru
        </h1>
        
        {/* Subtitle with delayed animation */}
        <h2 
          style={{
            fontSize: 'clamp(1.2rem, 4vw, 2rem)',
            fontWeight: '300',
            margin: '0 0 2rem 0',
            opacity: isVisible ? 0.9 : 0,
            color: '#f8f9fa',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '0.6s'
          }}
        >
          Portfolio
        </h2>
        
        {/* Description with smooth fade-in */}
        <p 
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            fontWeight: '400',
            margin: '0 0 3rem 0',
            opacity: isVisible ? 0.8 : 0,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.8,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '0.8s'
          }}
        >
          Welcome to my portfolio. Explore my projects and experience.
        </p>
        
        {/* Call-to-Action with enhanced hover animations */}
        <nav 
          aria-label="Primary navigation"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '1s'
          }}
        >
          <button
            style={{
              backgroundColor: buttonHovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
              color: 'white',
              border: `2px solid ${buttonHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'}`,
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: '500',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(15px)',
              textDecoration: 'none',
              display: 'inline-block',
              transform: buttonHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
              boxShadow: buttonHovered 
                ? '0 8px 25px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)' 
                : '0 4px 15px rgba(0,0,0,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            onFocus={() => setButtonHovered(true)}
            onBlur={() => setButtonHovered(false)}
            aria-label="View my work and projects"
          >
            {/* Button shine effect */}
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: buttonHovered ? '100%' : '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.6s ease-out',
                pointerEvents: 'none'
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>
              View My Work
            </span>
          </button>
        </nav>
      </section>

      {/* Animated background elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '0s'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '70%',
          right: '15%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '2s'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '20%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          animation: 'float 7s ease-in-out infinite',
          animationDelay: '4s'
        }}
      />

      {/* Global animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}