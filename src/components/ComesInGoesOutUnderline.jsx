import React from 'react';

const ComesInGoesOutUnderline = ({ children }) => (
  <span className="relative inline-block cursor-pointer group align-middle">
    <span className="relative z-10">{children}</span>
    <span
      className="absolute left-0 right-0 bottom-0 h-0.5 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      style={{ pointerEvents: 'none' }}
    />
  </span>
);

export default ComesInGoesOutUnderline; 