import React, { useState, useEffect } from 'react';

const HeroText = ({ text, className = '', color = 'white' }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTouch('ontouchstart' in window);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  const isBlack = color === 'black';
  const textColor = isBlack ? '#000' : '#fff';
  const strokeColor = isBlack ? '#000' : '#fff';
  
  // Responsive text sizes
  const heroTextClass = `
    no-outline font-black leading-none cursor-pointer 
    transform transition-all duration-150 outline-none 
    relative z-10 text-center will-change-transform
    ${isMobile ? '-skew-x-12' : '-skew-x-24'}
    text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] xl:text-[6rem] 2xl:text-[8rem]
    max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw]
    px-2 sm:px-4 md:px-6
  `;
  
  const handleInteraction = (e, isHover) => {
    if (isTouch && !isHover) return; // Skip hover effects on touch devices
    
    if (isHover) {
      e.target.style.color = 'transparent';
      e.target.style.WebkitTextStroke = isMobile ? `2px ${strokeColor}` : `4px ${strokeColor}`;
      e.target.style.textShadow = 'none';
    } else {
      e.target.style.color = textColor;
      e.target.style.WebkitTextStroke = `0px ${strokeColor}`;
      e.target.style.textShadow = 'none';
    }
  };
  
  return (
    <h1
      className={`${heroTextClass} ${className}`}
      style={{ color: textColor, WebkitTextStroke: `0px ${strokeColor}` }}
      tabIndex={0}
      onMouseEnter={e => handleInteraction(e, true)}
      onMouseLeave={e => handleInteraction(e, false)}
      onFocus={e => handleInteraction(e, true)}
      onBlur={e => handleInteraction(e, false)}
      onTouchStart={e => handleInteraction(e, true)}
      onTouchEnd={e => handleInteraction(e, false)}
      role="heading"
      aria-level="1"
    >
      {isMobile && text === "NOT YOUR AVERAGE ENGINEER" ? (
        <>
          <span className="block">NOT YOUR</span>
          <span className="block">AVERAGE</span>
          <span className="block">ENGINEER</span>
        </>
      ) : (
        text
      )}
    </h1>
  );
};

export default HeroText; 