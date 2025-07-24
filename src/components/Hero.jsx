import React, { useEffect, useState } from "react";

import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';

const HERO_TEXT = "NOT YOUR AVERAGE ENGINEER";

export default function Hero() {
  const containerRef = React.useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Diagonal scroll: y = up, x = left
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const x = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  // Split text for three spans
  const FIRST_LINE = "NOT YOUR";
  const SECOND_LINE = "AVERAGE";
  const THIRD_LINE = "ENGINEER";

  const [outlinedIndices, setOutlinedIndices] = useState({});

  useEffect(() => {
    const pickRandomIndices = (line) => {
      // Pick 5 random unique indices to outline in the line
      const indices = new Set();
      while (indices.size < 5 && line.length > 0) {
        const idx = Math.floor(Math.random() * line.length);
        if (line[idx] !== " ") indices.add(idx);
      }
      return Array.from(indices);
    };
    const updateAll = () => {
      setOutlinedIndices({
        1: pickRandomIndices(FIRST_LINE),
        2: pickRandomIndices(SECOND_LINE),
        3: pickRandomIndices(THIRD_LINE),
      });
    };
    updateAll();
    const interval = setInterval(updateAll, 3000);
    return () => clearInterval(interval);
  }, []);

  function renderLine(line, indices, key) {
    return (
      <span style={{ display: 'block' }} key={key}>
        {line.split("").map((char, idx) =>
          char === " " ? (
            <span key={idx}>&nbsp;</span>
          ) : indices && indices.includes(idx) ? (
            <span key={idx} style={{ color: 'transparent', WebkitTextStroke: '1.5px white' }}>{char}</span>
          ) : (
            <span key={idx}>{char}</span>
          )
        )}
      </span>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-end justify-center overflow-x-hidden bg-background pb-32"
    >
      {/* Subtle Monochrome Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl will-change-transform" />
        <div className="absolute bottom-24 right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl will-change-transform" />
        <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 will-change-transform" />
      </div>
      <motion.div
        className="relative z-10 text-center px-6 gpu-accelerated"
        style={{ y, x, opacity }}
        initial={{ opacity: 0, y: 40, x: 0 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1
          className="uppercase text-white text-[12vw] font-black leading-none cursor-pointer transform -skew-x-24 md:-skew-x-24 transition-all duration-150 outline-none mx-auto w-full max-w-full select-none group break-words whitespace-normal mb-24"
          tabIndex={0}
          style={{ WebkitTextStroke: '0px white' }}
          onClick={() => window.location.href = '/about'}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') window.location.href = '/about'; }}
        >
          {renderLine(FIRST_LINE, outlinedIndices[1], 1)}
          {renderLine(SECOND_LINE, outlinedIndices[2], 2)}
          {renderLine(THIRD_LINE, outlinedIndices[3], 3)}
        </h1>
      </motion.div>
    </section>
  );
} 