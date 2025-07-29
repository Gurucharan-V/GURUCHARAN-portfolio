import { useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Lazy load components for code splitting
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Hero = lazy(() => import('./components/Hero'));
const ProjectsTimeline = lazy(() => import('./components/ProjectsTimeline'));
const WorkList = lazy(() => import('./components/WorkList'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const MyStory = lazy(() => import('./components/MyStory'));
const EduExp = lazy(() => import('./components/EduExp'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-white text-xl">Loading...</div>
  </div>
);

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
      {!isProjectsPage && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      <main id="main-content" role="main" tabIndex={-1} className="outline-none focus:outline-none relative" data-scroll-container>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<LoadingSpinner />}>
              <>
                <Hero />
                <ProjectsTimeline />
                <WorkList />
              </>
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<LoadingSpinner />}>
              <About />
            </Suspense>
          } />
          <Route path="/my-story" element={
            <Suspense fallback={<LoadingSpinner />}>
              <MyStory />
            </Suspense>
          } />
          <Route path="/projects" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Projects />
            </Suspense>
          } />
          <Route path="/edu-exp" element={
            <Suspense fallback={<LoadingSpinner />}>
              <EduExp />
            </Suspense>
          } />
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