import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Projects from '../../components/Projects'

// Mock VintageTerminal component
vi.mock('../../components/VintageTerminal', () => ({
  default: () => <div data-testid="vintage-terminal">Vintage Terminal</div>
}))

// Mock ProjectsMobile component
vi.mock('../../components/ProjectsMobile', () => ({
  default: () => <div data-testid="projects-mobile">Projects Mobile</div>
}))

describe('Projects Component', () => {
  const originalInnerWidth = window.innerWidth

  beforeEach(() => {
    // Mock window resize event
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024, // Desktop width
    })
  })

  afterEach(() => {
    // Restore original width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })
  })

  it('renders VintageTerminal on desktop', () => {
    render(<Projects />)
    expect(screen.getByTestId('vintage-terminal')).toBeInTheDocument()
    expect(screen.queryByTestId('projects-mobile')).not.toBeInTheDocument()
  })

  it('renders ProjectsMobile on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375, // Mobile width
    })

    render(<Projects />)
    expect(screen.getByTestId('projects-mobile')).toBeInTheDocument()
    expect(screen.queryByTestId('vintage-terminal')).not.toBeInTheDocument()
  })

  it('switches between components on resize', () => {
    const { rerender } = render(<Projects />)
    
    // Initially desktop
    expect(screen.getByTestId('vintage-terminal')).toBeInTheDocument()
    expect(screen.queryByTestId('projects-mobile')).not.toBeInTheDocument()

    // Switch to mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })

    // Trigger resize event
    window.dispatchEvent(new Event('resize'))
    
    rerender(<Projects />)
    
    expect(screen.getByTestId('projects-mobile')).toBeInTheDocument()
    expect(screen.queryByTestId('vintage-terminal')).not.toBeInTheDocument()
  })

  it('handles window resize events', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    
    const { unmount } = render(<Projects />)
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('renders without crashing', () => {
    render(<Projects />)
    expect(screen.getByTestId('vintage-terminal')).toBeInTheDocument()
  })
}) 