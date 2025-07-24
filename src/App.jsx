import { useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import EduExp from './components/EduExp';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsTimeline from './components/ProjectsTimeline';
import Footer from './components/Footer';
import WorkList from './components/WorkList';
import CustomCursor from './components/CustomCursor';
import FlowingMenuDemo from './components/FlowingMenuDemo';

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
      <CustomCursor />
      <Header />
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/edu-exp" element={<EduExp />} />
          <Route path="/flowing-menu-demo" element={<FlowingMenuDemo />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App; 