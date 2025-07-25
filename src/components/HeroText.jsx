import React from 'react';

const heroTextClass =
  'no-outline text-3xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[10rem] 2xl:text-[14rem] font-black leading-none cursor-pointer transform sm:-skew-x-18 md:-skew-x-24 transition-all duration-150 outline-none relative z-10 text-center';

const HeroText = ({ text, className = '', color = 'white' }) => {
  const isBlack = color === 'black';
  const textColor = isBlack ? '#000' : '#fff';
  const strokeColor = isBlack ? '#000' : '#fff';
  
  return (
  <h1
    className={`${heroTextClass} ${className}`}
      style={{ color: textColor, WebkitTextStroke: `0px ${strokeColor}` }}
    tabIndex={0}
    onMouseEnter={e => {
      e.target.style.color = 'transparent';
        e.target.style.WebkitTextStroke = window.innerWidth < 768 ? `2px ${strokeColor}` : `4px ${strokeColor}`;
      e.target.style.textShadow = 'none';
    }}
    onMouseLeave={e => {
        e.target.style.color = textColor;
        e.target.style.WebkitTextStroke = `0px ${strokeColor}`;
      e.target.style.textShadow = 'none';
    }}
    onFocus={e => {
      e.target.style.color = 'transparent';
        e.target.style.WebkitTextStroke = window.innerWidth < 768 ? `2px ${strokeColor}` : `4px ${strokeColor}`;
      e.target.style.textShadow = 'none';
    }}
    onBlur={e => {
        e.target.style.color = textColor;
        e.target.style.WebkitTextStroke = `0px ${strokeColor}`;
      e.target.style.textShadow = 'none';
    }}
  >
    {text}
  </h1>
);
};

export default HeroText; 