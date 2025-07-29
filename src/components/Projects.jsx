import { useState, useEffect, Suspense, lazy } from 'react';
import VintageTerminal from './VintageTerminal';
import ProjectsMobile from './ProjectsMobile';

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Render mobile version for mobile devices
  if (isMobile) {
    return <ProjectsMobile />;
  }

  // Render terminal for desktop
  return <VintageTerminal />;
};

export default Projects; 