import React from 'react';

const heroTextClass =
  'no-outline text-white text-6xl sm:text-9xl md:text-[10rem] lg:text-[14rem] font-black leading-none cursor-pointer transform -skew-x-24 md:-skew-x-24 transition-all duration-150 outline-none text-right';

const HeroText = ({ text, className = '' }) => (
  <h1
    className={`${heroTextClass} ${className}`}
    tabIndex={0}
    style={{ WebkitTextStroke: '0px white' }}
    onMouseEnter={e => {
      e.target.style.color = 'transparent';
      e.target.style.WebkitTextStroke = '4px white';
      e.target.style.textShadow = 'none';
    }}
    onMouseLeave={e => {
      e.target.style.color = '#fff';
      e.target.style.WebkitTextStroke = '0px white';
      e.target.style.textShadow = 'none';
    }}
    onFocus={e => {
      e.target.style.color = 'transparent';
      e.target.style.WebkitTextStroke = '4px white';
      e.target.style.textShadow = 'none';
    }}
    onBlur={e => {
      e.target.style.color = '#fff';
      e.target.style.WebkitTextStroke = '0px white';
      e.target.style.textShadow = 'none';
    }}
  >
    {text}
  </h1>
);

export default HeroText; 