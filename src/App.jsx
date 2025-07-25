import { useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import About from './components/About';
import Projects from './components/Projects';

import Hero from './components/Hero';
import ProjectsTimeline from './components/ProjectsTimeline';
import WorkList from './components/WorkList';
import CustomCursor from './components/CustomCursor';
import MyStory from './components/MyStory';
import EduExp from './components/EduExp';

const AppContent = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const isProjectsPage = location.pathname === '/projects';

  // Scroll to top on route change
  useEffect(() => {
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0 });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <>
      {!isProjectsPage && <CustomCursor />}
      <main id="main-content" role="main" tabIndex={-1} className="outline-none focus:outline-none relative" data-scroll-container>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProjectsTimeline />
              <WorkList />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/my-story" element={<MyStory />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/edu-exp" element={<EduExp />} />
        </Routes>
      </main>
    </>
  );
};

const App = () => {
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Make Lenis globally available
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App; 