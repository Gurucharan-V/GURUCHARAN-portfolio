import React, { useEffect, useState } from "react";
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Silk from './Silk';
import HeroText from './HeroText';

const HERO_TEXT = "NOT YOUR AVERAGE ENGINEER";

export default function Hero() {
  const containerRef = React.useRef();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Diagonal scroll: y = up, x = left - reduced on mobile
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -60 : -120]);
  const x = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -40 : -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  return (
    <main>
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-background flex items-center justify-center"
        role="region"
        aria-label="Hero section"
      >
        {/* Silk Background */}
        <div className="absolute inset-0 pointer-events-none">
          <Silk
            speed={isMobile ? 2 : 5}
            scale={isMobile ? 0.5 : 1}
            color="#7B7481"
            noiseIntensity={isMobile ? 0.8 : 1.5}
            rotation={0}
          />
        </div>
        
        <motion.div
          className="relative z-10 text-center gpu-accelerated w-full px-4 sm:px-6 md:px-8 will-change-transform"
          style={{ y, x, opacity }}
          initial={{ opacity: 0, y: 40, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <HeroText text={HERO_TEXT} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 sm:mt-12 md:mt-16"
          >
            <Link to="/projects">
              <button
                className="group relative px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 
                         text-sm sm:text-base md:text-lg font-medium text-white 
                         border-2 border-white rounded-full overflow-hidden
                         transition-all duration-300 hover:scale-105
                         min-h-[44px] min-w-[44px] touch-manipulation"
                tabIndex={0}
                aria-label="Explore projects"
              >
                <span className="relative z-10">EXPLORE MY WORK</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 
                              transition-transform duration-300 origin-left" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 
                               group-hover:opacity-100 transition-opacity duration-300 text-black">
                  EXPLORE MY WORK
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
} 