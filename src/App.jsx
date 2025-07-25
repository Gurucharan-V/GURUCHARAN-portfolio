import { useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import About from './components/About';
import Projects from './components/Projects';

import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsTimeline from './components/ProjectsTimeline';
import Footer from './components/Footer';
import WorkList from './components/WorkList';
import CustomCursor from './components/CustomCursor';
import MyStory from './components/MyStory';
import EduExp from './components/EduExp';

const AppContent = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const isProjectsPage = location.pathname === '/projects';

  return (
    <>
      {!isProjectsPage && <CustomCursor />}
      {!isAboutPage && !isProjectsPage && <Header />}
      <main id="main-content" role="main" tabIndex={-1} className="outline-none focus:outline-none">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProjectsTimeline />
              <WorkList />
              <Footer />
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App; 