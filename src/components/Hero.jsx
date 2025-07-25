import React, { useEffect, useState } from "react";
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import Silk from './Silk';

const HERO_TEXT = "NOT YOUR AVERAGE ENGINEER";

export default function Hero() {
  const containerRef = React.useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  // Diagonal scroll: y = up, x = left
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const x = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden bg-background"
    >
      {/* Silk Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <motion.div
        className="relative z-10 text-center gpu-accelerated w-full"
        style={{ y, x, opacity }}
        initial={{ opacity: 0, y: 40, x: 0 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1
          className="group uppercase text-white text-[8vw] sm:text-[10vw] md:text-[12vw] lg:text-[15vw] font-black leading-none transform sm:-skew-x-18 md:-skew-x-24 transition-all duration-300 outline-none select-none break-words whitespace-normal inline-block mx-auto"
          style={{ WebkitTextStroke: '0px white' }}
        >
          <span className="hero-outline">NOT YOUR</span>{' '}
          <span className="hero-fill">AVERAGE ENGINEER</span>
        </h1>
      </motion.div>
    </section>
  );
} 