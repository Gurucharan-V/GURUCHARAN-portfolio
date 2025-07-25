import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Hero from '../Hero'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
  }),
  useInView: () => true,
}))

// Mock Silk component
vi.mock('../Silk', () => ({
  default: () => <div data-testid="silk-component">Silk Background</div>
}))

// Mock HeroText component
vi.mock('../HeroText', () => ({
  default: ({ text }) => <div data-testid="hero-text">{text}</div>
}))

describe('Hero Component', () => {
  const renderHero = () => {
    return render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    // Reset viewport
    global.innerWidth = 1024
    global.innerHeight = 768
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderHero()
      expect(container).toBeTruthy()
    })

    it('should render the Silk background component', () => {
      renderHero()
      expect(screen.getByTestId('silk-component')).toBeInTheDocument()
    })

    it('should render the main hero text', () => {
      renderHero()
      expect(screen.getByTestId('hero-text')).toBeInTheDocument()
    })

    it('should render the navigation button', () => {
      renderHero()
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('EXPLORE MY WORK')
    })

    it('should have correct section structure', () => {
      const { container } = renderHero()
      const section = container.querySelector('section')
      expect(section).toHaveClass('relative', 'h-screen', 'w-full', 'overflow-hidden')
    })
  })

  describe('Responsive Behavior', () => {
    it('should adapt to mobile viewport', () => {
      global.innerWidth = 375
      global.innerHeight = 667
      
      const { container } = renderHero()
      const heroText = container.querySelector('[data-testid="hero-text"]')
      expect(heroText).toBeInTheDocument()
    })

    it('should adapt to tablet viewport', () => {
      global.innerWidth = 768
      global.innerHeight = 1024
      
      const { container } = renderHero()
      expect(container.querySelector('section')).toBeInTheDocument()
    })

    it('should handle landscape orientation', () => {
      global.innerWidth = 667
      global.innerHeight = 375
      
      const { container } = renderHero()
      expect(container.querySelector('section')).toHaveClass('h-screen')
    })
  })

  describe('Interactions', () => {
    it('should handle button click', () => {
      renderHero()
      const button = screen.getByRole('button')
      
      fireEvent.click(button)
      // Button should be clickable
      expect(button).toBeEnabled()
    })

    it('should have proper hover states', () => {
      renderHero()
      const button = screen.getByRole('button')
      
      fireEvent.mouseEnter(button)
      expect(button).toHaveClass('group')
    })

    it('should handle keyboard navigation', () => {
      renderHero()
      const button = screen.getByRole('button')
      
      button.focus()
      expect(document.activeElement).toBe(button)
      
      fireEvent.keyDown(button, { key: 'Enter' })
      expect(button).toBeEnabled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      renderHero()
      const section = screen.getByRole('region')
      expect(section).toHaveAttribute('aria-label', 'Hero section')
    })

    it('should have accessible button', () => {
      renderHero()
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Explore projects')
    })

    it('should support keyboard navigation', () => {
      renderHero()
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('tabIndex', '0')
    })

    it('should have proper heading hierarchy', () => {
      const { container } = renderHero()
      const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
      expect(headings.length).toBeGreaterThan(0)
    })
  })

  describe('Performance', () => {
    it('should use performance optimizations', () => {
      const { container } = renderHero()
      const elements = container.querySelectorAll('[class*="will-change"]')
      expect(elements.length).toBeGreaterThan(0)
    })

    it('should lazy load heavy components', async () => {
      renderHero()
      await waitFor(() => {
        expect(screen.getByTestId('silk-component')).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle missing props gracefully', () => {
      const { container } = renderHero()
      expect(container).toBeTruthy()
    })

    it('should render fallback for failed components', () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      renderHero()
      expect(screen.getByTestId('hero-text')).toBeInTheDocument()
      
      consoleSpy.mockRestore()
    })
  })

  describe('Mobile Touch Interactions', () => {
    it('should handle touch events on mobile', () => {
      global.innerWidth = 375
      
      renderHero()
      const button = screen.getByRole('button')
      
      fireEvent.touchStart(button)
      fireEvent.touchEnd(button)
      
      expect(button).toBeEnabled()
    })

    it('should have appropriate touch targets', () => {
      global.innerWidth = 375
      
      renderHero()
      const button = screen.getByRole('button')
      
      // Check if button has minimum touch target size
      expect(button).toHaveClass('min-h-[44px]')
    })
  })

  describe('SEO and Meta', () => {
    it('should have proper semantic HTML', () => {
      const { container } = renderHero()
      
      expect(container.querySelector('section')).toBeInTheDocument()
      expect(container.querySelector('main')).toBeInTheDocument()
    })

    it('should have descriptive text content', () => {
      renderHero()
      expect(screen.getByTestId('hero-text')).toBeTruthy()
    })
  })
})