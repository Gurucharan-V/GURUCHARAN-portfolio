import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../../components/Hero'

// Mock Silk component
vi.mock('../../components/Silk', () => ({
  default: ({ speed, scale, color, noiseIntensity, rotation }) => (
    <div 
      data-testid="silk-background"
      data-speed={speed}
      data-scale={scale}
      data-color={color}
      data-noise-intensity={noiseIntensity}
      data-rotation={rotation}
    >
      Silk Background
    </div>
  )
}))

describe('Hero Component', () => {
  it('renders without crashing', () => {
    render(<Hero />)
    // The Silk component is lazy loaded, so we check for the main hero text instead
    expect(screen.getByText('NOT YOUR')).toBeInTheDocument()
  })

  it('renders the main hero text', () => {
    render(<Hero />)
    expect(screen.getByText('NOT YOUR')).toBeInTheDocument()
    expect(screen.getByText('AVERAGE ENGINEER')).toBeInTheDocument()
  })

  it('has correct section structure and classes', () => {
    render(<Hero />)
    const section = screen.getByText('NOT YOUR').closest('section')
    
    expect(section).toHaveClass('relative')
    expect(section).toHaveClass('min-h-screen')
    expect(section).toHaveClass('flex')
    expect(section).toHaveClass('items-center')
    expect(section).toHaveClass('justify-center')
    expect(section).toHaveClass('overflow-x-hidden')
    expect(section).toHaveClass('bg-background')
  })

  it('hero text has correct styling classes', () => {
    render(<Hero />)
    const heroText = screen.getByText('NOT YOUR').closest('h1')
    
    expect(heroText).toHaveClass('group')
    expect(heroText).toHaveClass('uppercase')
    expect(heroText).toHaveClass('text-white')
    expect(heroText).toHaveClass('font-black')
    expect(heroText).toHaveClass('leading-none')
  })

  it('renders with responsive text sizing classes', () => {
    render(<Hero />)
    const heroText = screen.getByText('NOT YOUR').closest('h1')
    
    expect(heroText).toHaveClass('text-[8vw]')
    expect(heroText).toHaveClass('sm:text-[10vw]')
    expect(heroText).toHaveClass('md:text-[12vw]')
    expect(heroText).toHaveClass('lg:text-[15vw]')
  })

  it('has correct text structure with spans', () => {
    render(<Hero />)
    
    const outlineSpan = screen.getByText('NOT YOUR')
    const fillSpan = screen.getByText('AVERAGE ENGINEER')
    
    expect(outlineSpan).toHaveClass('hero-outline')
    expect(fillSpan).toHaveClass('hero-fill')
  })

  it('has correct inline styles', () => {
    render(<Hero />)
    const heroText = screen.getByText('NOT YOUR').closest('h1')
    
    expect(heroText).toHaveStyle({ WebkitTextStroke: '0px white' })
  })

  it('has correct transform and transition classes', () => {
    render(<Hero />)
    const heroText = screen.getByText('NOT YOUR').closest('h1')
    
    expect(heroText).toHaveClass('transform')
    expect(heroText).toHaveClass('sm:-skew-x-18')
    expect(heroText).toHaveClass('md:-skew-x-24')
    expect(heroText).toHaveClass('transition-all')
    expect(heroText).toHaveClass('duration-300')
  })

  it('has correct accessibility attributes', () => {
    render(<Hero />)
    const heroText = screen.getByText('NOT YOUR').closest('h1')
    
    expect(heroText).toHaveClass('outline-none')
    expect(heroText).toHaveClass('select-none')
  })
}) 