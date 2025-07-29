import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOverLink, setIsOverLink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                            window.innerWidth <= 768 ||
                            'ontouchstart' in window;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Show cursor on all pages, but not on mobile
  const shouldShowCursor = !isMobile;

  useEffect(() => {
    // Don't apply cursor effects on mobile devices
    if (!shouldShowCursor) {
      return;
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsHovering(true);
    };

    const handleMouseUp = () => {
      setIsHovering(false);
    };

    // Handle link hover effects
    const handlePointerOver = (e) => {
      const tag = e.target.tagName.toLowerCase();
      const className = e.target.className || '';
      const hasGroupClass = className.includes('group');
      
      // Check if it's a clickable element or has group class (hero text)
      if (["a", "button", "input", "textarea", "select", "label"].includes(tag) || 
          e.target.getAttribute('tabindex') || 
          e.target.closest('a') || 
          e.target.closest('button') ||
          hasGroupClass) {
        setIsOverLink(true);
      }
    };

    const handlePointerOut = () => {
      setIsOverLink(false);
    };

    // Hide default cursor comprehensively
    document.body.style.cursor = 'none';
    document.body.style.pointerEvents = 'auto';
    
    // Also hide cursor on all elements
    const hideCursorOnAll = () => {
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        el.style.cursor = 'none';
      });
    };
    
    // Hide cursor immediately and on any new elements
    hideCursorOnAll();
    
    // Use MutationObserver to hide cursor on dynamically added elements
    const observer = new MutationObserver(() => {
      hideCursorOnAll();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);

    return () => {
      // Restore default cursor
      document.body.style.cursor = 'auto';
      
      // Restore cursor on all elements
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        el.style.cursor = '';
      });
      
      // Disconnect observer
      observer.disconnect();
      
      // Remove event listeners
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, [shouldShowCursor]);

  // Don't render cursor if not enabled or on mobile
  if (!shouldShowCursor) {
    return null;
  }

  // Use same size for all pages
  const baseSize = 120; // Same size as main website
  const linkSize = baseSize * 0.6; // 60% of base size when over links
  const clickSize = baseSize * 0.8; // 80% of base size when clicking
  
  let currentSize = baseSize;
  if (isOverLink) currentSize = linkSize;
  if (isHovering) currentSize = clickSize;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-opacity duration-200"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        opacity: isVisible ? 1 : 0,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Inverted color circle cursor - Same style as main website */}
      <div
        className="absolute rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          background: 'transparent',
          backdropFilter: 'invert(1) grayscale(1)',
          WebkitBackdropFilter: 'invert(1) grayscale(1)',
          border: '4px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 0 0 6px rgba(255, 255, 255, 0.3)',
          mixBlendMode: 'normal',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

export default CustomCursor; 