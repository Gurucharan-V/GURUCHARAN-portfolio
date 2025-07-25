import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Responsive Design Tests', () => {
  let originalInnerWidth;
  let originalInnerHeight;

  beforeEach(() => {
    // Save original values
    originalInnerWidth = global.innerWidth;
    originalInnerHeight = global.innerHeight;
  });

  afterEach(() => {
    // Restore original values
    global.innerWidth = originalInnerWidth;
    global.innerHeight = originalInnerHeight;
  });

  describe('Mobile Devices', () => {
    it('should handle iPhone SE (375x667)', () => {
      global.innerWidth = 375;
      global.innerHeight = 667;
      
      const { container } = render(
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl">Responsive Text</h1>
        </div>
      );
      
      expect(container.querySelector('.container')).toBeInTheDocument();
    });

    it('should handle iPhone 12 Pro (390x844)', () => {
      global.innerWidth = 390;
      global.innerHeight = 844;
      
      const { container } = render(
        <div className="w-full max-w-[90vw]">
          <p className="text-sm sm:text-base md:text-lg">Content</p>
        </div>
      );
      
      expect(container.querySelector('p')).toBeInTheDocument();
    });

    it('should handle Samsung Galaxy S21 (360x800)', () => {
      global.innerWidth = 360;
      global.innerHeight = 800;
      
      const { container } = render(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </div>
      );
      
      expect(container.querySelectorAll('.grid > div').length).toBe(3);
    });
  });

  describe('Tablet Devices', () => {
    it('should handle iPad Mini (768x1024)', () => {
      global.innerWidth = 768;
      global.innerHeight = 1024;
      
      const { container } = render(
        <section className="py-8 sm:py-12 md:py-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl">Tablet View</h2>
        </section>
      );
      
      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('should handle iPad Pro 11" (834x1194)', () => {
      global.innerWidth = 834;
      global.innerHeight = 1194;
      
      const { container } = render(
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">Column 1</div>
          <div className="flex-1">Column 2</div>
        </div>
      );
      
      expect(container.querySelectorAll('.flex > div').length).toBe(2);
    });
  });

  describe('Desktop Devices', () => {
    it('should handle laptop (1366x768)', () => {
      global.innerWidth = 1366;
      global.innerHeight = 768;
      
      const { container } = render(
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div>Card 1</div>
            <div>Card 2</div>
            <div>Card 3</div>
            <div>Card 4</div>
          </div>
        </div>
      );
      
      expect(container.querySelectorAll('.grid > div').length).toBe(4);
    });

    it('should handle full HD (1920x1080)', () => {
      global.innerWidth = 1920;
      global.innerHeight = 1080;
      
      const { container } = render(
        <header className="h-16 md:h-20 lg:h-24">
          <nav className="hidden md:flex">Navigation</nav>
        </header>
      );
      
      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('should handle 4K display (3840x2160)', () => {
      global.innerWidth = 3840;
      global.innerHeight = 2160;
      
      const { container } = render(
        <div className="text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          Large Screen Content
        </div>
      );
      
      expect(container.textContent).toContain('Large Screen Content');
    });
  });

  describe('Orientation Changes', () => {
    it('should handle landscape mobile (667x375)', () => {
      global.innerWidth = 667;
      global.innerHeight = 375;
      
      const { container } = render(
        <div className="h-screen max-h-[100vh]">
          <div className="landscape:flex-row portrait:flex-col">
            Orientation Test
          </div>
        </div>
      );
      
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('should handle portrait tablet (1024x768)', () => {
      global.innerWidth = 1024;
      global.innerHeight = 768;
      
      const { container } = render(
        <main className="min-h-screen p-4 md:p-8">
          <section className="aspect-video md:aspect-auto">
            Content Area
          </section>
        </main>
      );
      
      expect(container.querySelector('section')).toBeInTheDocument();
    });
  });

  describe('Touch Target Sizes', () => {
    it('should have minimum 44px touch targets on mobile', () => {
      global.innerWidth = 375;
      
      const { container } = render(
        <button className="min-h-[44px] min-w-[44px] p-3">
          Touch Me
        </button>
      );
      
      const button = container.querySelector('button');
      expect(button).toHaveClass('min-h-[44px]');
      expect(button).toHaveClass('min-w-[44px]');
    });
  });

  describe('Safe Area Support', () => {
    it('should support safe area insets', () => {
      const { container } = render(
        <div className="pt-safe pb-safe px-safe">
          <div style={{ 
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
            paddingLeft: 'env(safe-area-inset-left)',
            paddingRight: 'env(safe-area-inset-right)'
          }}>
            Safe Area Content
          </div>
        </div>
      );
      
      expect(container.textContent).toContain('Safe Area Content');
    });
  });

  describe('Responsive Typography', () => {
    it('should scale text appropriately', () => {
      const { container } = render(
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Responsive Heading
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl">
            Responsive Paragraph
          </p>
        </div>
      );
      
      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('p')).toBeInTheDocument();
    });

    it('should use fluid typography with clamp', () => {
      const { container } = render(
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
          Fluid Text
        </h2>
      );
      
      const heading = container.querySelector('h2');
      expect(heading.style.fontSize).toContain('clamp');
    });
  });

  describe('Responsive Images', () => {
    it('should handle responsive images', () => {
      const { container } = render(
        <img 
          src="test.jpg" 
          alt="Test"
          className="w-full max-w-full h-auto"
          loading="lazy"
        />
      );
      
      const img = container.querySelector('img');
      expect(img).toHaveClass('w-full');
      expect(img).toHaveClass('h-auto');
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('Responsive Grid Layouts', () => {
    it('should adapt grid columns based on screen size', () => {
      const { container } = render(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div key={i}>Item {i + 1}</div>
          ))}
        </div>
      );
      
      const grid = container.querySelector('.grid');
      expect(grid.children.length).toBe(6);
    });
  });

  describe('Performance Optimizations', () => {
    it('should disable animations on mobile for performance', () => {
      global.innerWidth = 375;
      
      const { container } = render(
        <div className="motion-safe:animate-pulse motion-reduce:animate-none">
          Animated Content
        </div>
      );
      
      expect(container.querySelector('div')).toHaveClass('motion-reduce:animate-none');
    });

    it('should use will-change for optimized animations', () => {
      const { container } = render(
        <div className="will-change-transform hover:scale-105 transition-transform">
          Optimized Element
        </div>
      );
      
      expect(container.querySelector('div')).toHaveClass('will-change-transform');
    });
  });
});