import React, { useState, useEffect, createContext, useContext } from 'react';

// Breakpoint context
const BreakpointContext = createContext();

// Breakpoint definitions
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Custom hook to use breakpoints
export const useBreakpoint = () => {
  const context = useContext(BreakpointContext);
  if (!context) {
    throw new Error('useBreakpoint must be used within ResponsiveProvider');
  }
  return context;
};

// Responsive Provider Component
export const ResponsiveProvider = ({ children }) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('xs');
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  // Determine current breakpoint
  const getBreakpoint = (width) => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  // Update dimensions and device info
  const updateDimensions = () => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setDimensions({ width, height });
    setCurrentBreakpoint(getBreakpoint(width));
    setIsMobile(width < breakpoints.md);
    setIsTablet(width >= breakpoints.md && width < breakpoints.lg);
    setIsDesktop(width >= breakpoints.lg);
    setOrientation(width > height ? 'landscape' : 'portrait');
  };

  // Check for touch device
  const checkTouch = () => {
    setIsTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  useEffect(() => {
    updateDimensions();
    checkTouch();

    // Debounced resize handler
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const value = {
    currentBreakpoint,
    dimensions,
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    orientation,
    breakpoints,
    // Helper functions
    isBreakpoint: (bp) => currentBreakpoint === bp,
    isAbove: (bp) => dimensions.width >= breakpoints[bp],
    isBelow: (bp) => dimensions.width < breakpoints[bp],
    isBetween: (min, max) => dimensions.width >= breakpoints[min] && dimensions.width < breakpoints[max],
  };

  return (
    <BreakpointContext.Provider value={value}>
      {children}
    </BreakpointContext.Provider>
  );
};

// Responsive component that only renders on certain breakpoints
export const Responsive = ({ 
  children, 
  only, 
  above, 
  below, 
  between,
  showOnMobile = true,
  showOnTablet = true,
  showOnDesktop = true,
}) => {
  const { 
    currentBreakpoint, 
    isAbove, 
    isBelow, 
    isBetween,
    isMobile,
    isTablet,
    isDesktop,
  } = useBreakpoint();

  // Check specific breakpoint
  if (only && currentBreakpoint !== only) {
    return null;
  }

  // Check above breakpoint
  if (above && !isAbove(above)) {
    return null;
  }

  // Check below breakpoint
  if (below && !isBelow(below)) {
    return null;
  }

  // Check between breakpoints
  if (between && !isBetween(between[0], between[1])) {
    return null;
  }

  // Check device type visibility
  if (!showOnMobile && isMobile) return null;
  if (!showOnTablet && isTablet) return null;
  if (!showOnDesktop && isDesktop) return null;

  return <>{children}</>;
};

// Mobile-only component
export const MobileOnly = ({ children }) => {
  const { isMobile } = useBreakpoint();
  return isMobile ? <>{children}</> : null;
};

// Tablet-only component
export const TabletOnly = ({ children }) => {
  const { isTablet } = useBreakpoint();
  return isTablet ? <>{children}</> : null;
};

// Desktop-only component
export const DesktopOnly = ({ children }) => {
  const { isDesktop } = useBreakpoint();
  return isDesktop ? <>{children}</> : null;
};

// Touch-only component
export const TouchOnly = ({ children }) => {
  const { isTouch } = useBreakpoint();
  return isTouch ? <>{children}</> : null;
};

// Non-touch-only component
export const NonTouchOnly = ({ children }) => {
  const { isTouch } = useBreakpoint();
  return !isTouch ? <>{children}</> : null;
};

// Orientation-specific components
export const LandscapeOnly = ({ children }) => {
  const { orientation } = useBreakpoint();
  return orientation === 'landscape' ? <>{children}</> : null;
};

export const PortraitOnly = ({ children }) => {
  const { orientation } = useBreakpoint();
  return orientation === 'portrait' ? <>{children}</> : null;
};

// Responsive container with automatic padding and margins
export const ResponsiveContainer = ({ 
  children, 
  className = '',
  maxWidth = '7xl',
  padding = true,
  center = true,
}) => {
  const { isMobile, isTablet } = useBreakpoint();
  
  const containerClasses = [
    'w-full',
    center && 'mx-auto',
    maxWidth && `max-w-${maxWidth}`,
    padding && (isMobile ? 'px-4' : isTablet ? 'px-6' : 'px-8'),
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

// Responsive grid component
export const ResponsiveGrid = ({ 
  children, 
  className = '',
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, '2xl': 6 },
  gap = { xs: 4, sm: 4, md: 6, lg: 8 },
}) => {
  const { currentBreakpoint } = useBreakpoint();
  
  const gridCols = cols[currentBreakpoint] || cols.xs;
  const gridGap = gap[currentBreakpoint] || gap.xs;
  
  const gridClasses = [
    'grid',
    `grid-cols-${gridCols}`,
    `gap-${gridGap}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

// Responsive text component
export const ResponsiveText = ({ 
  children, 
  className = '',
  size = { xs: 'sm', sm: 'base', md: 'lg', lg: 'xl', xl: '2xl' },
  as: Component = 'p',
}) => {
  const { currentBreakpoint } = useBreakpoint();
  
  const textSize = size[currentBreakpoint] || size.xs;
  const textClasses = [
    `text-${textSize}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={textClasses}>
      {children}
    </Component>
  );
};

export default ResponsiveProvider;