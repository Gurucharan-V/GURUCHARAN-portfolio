import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../../App'

// Mock all child components to avoid complex dependencies
vi.mock('../../components/Hero', () => ({
  default: () => <div data-testid="hero">Hero Component</div>
}))

vi.mock('../../components/ProjectsTimeline', () => ({
  default: () => <div data-testid="projects-timeline">Projects Timeline</div>
}))

vi.mock('../../components/WorkList', () => ({
  default: () => <div data-testid="work-list">Work List</div>
}))

vi.mock('../../components/About', () => ({
  default: () => <div data-testid="about">About Component</div>
}))

vi.mock('../../components/MyStory', () => ({
  default: () => <div data-testid="my-story">My Story Component</div>
}))

vi.mock('../../components/Projects', () => ({
  default: () => <div data-testid="projects">Projects Component</div>
}))

vi.mock('../../components/EduExp', () => ({
  default: () => <div data-testid="edu-exp">Education & Experience</div>
}))

vi.mock('../../components/CustomCursor', () => ({
  default: () => <div data-testid="custom-cursor">Custom Cursor</div>
}))

describe('App Component', () => {
  afterEach(() => {
    // Clean up any global state
    if (window.lenis) {
      window.lenis = undefined
    }
    // Reset the window.lenis property
    Object.defineProperty(window, 'lenis', {
      writable: true,
      configurable: true,
      value: undefined,
    })
  })

  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('browser-router')).toBeInTheDocument()
  })

  it('renders browser router wrapper', () => {
    render(<App />)
    expect(screen.getByTestId('browser-router')).toBeInTheDocument()
  })

  it('renders routes container', () => {
    render(<App />)
    expect(screen.getByTestId('routes')).toBeInTheDocument()
  })

  it('renders route elements', () => {
    render(<App />)
    const routes = screen.getAllByTestId('route')
    expect(routes.length).toBeGreaterThan(0)
  })

  it('renders custom cursor components', () => {
    render(<App />)
    const cursors = screen.getAllByTestId('custom-cursor')
    expect(cursors.length).toBeGreaterThan(0)
  })

  it('has correct app structure', () => {
    render(<App />)
    
    // Check that the main app structure is present
    expect(screen.getByTestId('browser-router')).toBeInTheDocument()
    expect(screen.getByTestId('routes')).toBeInTheDocument()
    const routes = screen.getAllByTestId('route')
    expect(routes.length).toBeGreaterThan(0)
  })

  it('renders all required components', () => {
    render(<App />)
    
    // Check that mocked components are rendered
    const cursors = screen.getAllByTestId('custom-cursor')
    expect(cursors.length).toBeGreaterThan(0)
  })
}) 