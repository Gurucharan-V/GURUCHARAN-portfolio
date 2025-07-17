import { useRef } from 'react';

import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Diagonal scroll: y = up, x = left
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const x = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-end justify-center overflow-hidden bg-background pb-32"
    >
      {/* Subtle Monochrome Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl will-change-transform" />
        <div className="absolute bottom-24 right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl will-change-transform" />
        <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 will-change-transform" />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 gpu-accelerated"
        style={{ y, x, opacity }}
        initial={{ opacity: 0, y: 40, x: 0 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Main Title with slant and outline hover effect */}
        <h1
          className="text-white text-7xl sm:text-10xl md:text-[12rem] lg:text-[16rem] font-black leading-none cursor-pointer transform -skew-x-24 md:-skew-x-24 transition-all duration-150 outline-none mx-auto max-w-full select-none group"
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
          <span style={{ display: 'block' }}>GURUCHARAN</span>
          <span style={{ display: 'block' }}>VEMURU</span>
        </h1>
      </motion.div>
    </section>
  );
};

export default Hero; 