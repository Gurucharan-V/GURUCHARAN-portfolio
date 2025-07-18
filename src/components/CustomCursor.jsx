import React, { useEffect, useRef } from 'react';

const SHRINK_SCALE = 0.7;

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const scale = useRef(1);

  // Responsive size (about 1.5 inches)
  const getCursorSize = () => {
    return `clamp(72px, 12vw, 144px)`;
  };

  // Animate cursor position and scale with requestAnimationFrame
  useEffect(() => {
    let animationFrameId;
    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(calc(${mouse.current.x}px - 50%), calc(${mouse.current.y}px - 50%)) scale(${scale.current})`;
      }
      animationFrameId = requestAnimationFrame(updateCursor);
    };
    updateCursor();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Track mouse position
  useEffect(() => {
    const moveCursor = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Shrink on interactive elements
  useEffect(() => {
    const handlePointerOver = (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (["a", "button", "input", "textarea", "select", "label"].includes(tag) || e.target.getAttribute('tabindex')) {
        scale.current = SHRINK_SCALE;
      }
    };
    const handlePointerOut = () => {
      scale.current = 1;
    };
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    return () => {
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  // Style for the custom cursor
  const cursorStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 9999,
    pointerEvents: 'none',
    width: getCursorSize(),
    height: getCursorSize(),
    borderRadius: '50%',
    background: 'transparent',
    backdropFilter: 'invert(1) grayscale(1)',
    WebkitBackdropFilter: 'invert(1) grayscale(1)',
    boxShadow: '0 0 0 2px rgba(255,255,255,0.15)',
    mixBlendMode: 'normal',
    willChange: 'transform',
    transition: 'none', // No transition, all handled in rAF
  };

  return <div ref={cursorRef} style={cursorStyle} />;
};

export default CustomCursor; 