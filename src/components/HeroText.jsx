import React from 'react';

const heroTextClass =
  'no-outline text-6xl sm:text-9xl md:text-[10rem] lg:text-[14rem] font-black leading-none cursor-pointer transform -skew-x-24 md:-skew-x-24 transition-all duration-150 outline-none relative z-10';

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
        e.target.style.WebkitTextStroke = `4px ${strokeColor}`;
      e.target.style.textShadow = 'none';
    }}
    onMouseLeave={e => {
        e.target.style.color = textColor;
        e.target.style.WebkitTextStroke = `0px ${strokeColor}`;
      e.target.style.textShadow = 'none';
    }}
    onFocus={e => {
      e.target.style.color = 'transparent';
        e.target.style.WebkitTextStroke = `4px ${strokeColor}`;
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