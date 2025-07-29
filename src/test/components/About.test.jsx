import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from '../../components/About'

// Mock LightRays component
vi.mock('../../components/LightRays', () => ({
  default: ({ raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, noiseAmount, distortion, className }) => (
    <div 
      data-testid="light-rays"
      data-rays-origin={raysOrigin}
      data-rays-color={raysColor}
      data-rays-speed={raysSpeed}
      data-light-spread={lightSpread}
      data-ray-length={rayLength}
      data-follow-mouse={followMouse}
      data-mouse-influence={mouseInfluence}
      data-noise-amount={noiseAmount}
      data-distortion={distortion}
      className={className}
    >
      Light Rays Effect
    </div>
  )
}))



describe('About Component', () => {
  it('renders without crashing', () => {
    render(<About />)
    expect(screen.getByText('गुरुचरण')).toBeInTheDocument()
  })

  it('renders the main title in Devanagari script', () => {
    render(<About />)
    const title = screen.getByText('गुरुचरण').closest('h1')
    
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('group')
    expect(title).toHaveClass('text-[8rem]')
    expect(title).toHaveClass('font-black')
    expect(title).toHaveClass('text-white')
  })

  it('renders light rays effect for desktop', () => {
    render(<About />)
    const lightRays = screen.getByTestId('light-rays')
    
    expect(lightRays).toBeInTheDocument()
    expect(lightRays).toHaveAttribute('data-rays-origin', 'top-center')
    expect(lightRays).toHaveAttribute('data-rays-color', '#ffffff')
    expect(lightRays).toHaveAttribute('data-rays-speed', '1.5')
    expect(lightRays).toHaveAttribute('data-light-spread', '0.8')
    expect(lightRays).toHaveAttribute('data-ray-length', '1.2')
    expect(lightRays).toHaveAttribute('data-follow-mouse', 'true')
    expect(lightRays).toHaveAttribute('data-mouse-influence', '0.1')
    expect(lightRays).toHaveAttribute('data-noise-amount', '0.1')
    expect(lightRays).toHaveAttribute('data-distortion', '0.05')
    expect(lightRays).toHaveClass('custom-rays')
  })

  it('renders professional overview section', () => {
    render(<About />)
    expect(screen.getByText('PROFESSIONAL OVERVIEW')).toBeInTheDocument()
  })

  it('renders professional description text', () => {
    render(<About />)
    
    // Check for multiple text elements (mobile and desktop versions)
    const textElements = screen.getAllByText(/I'm Gurucharan Vemuru, a software developer/)
    expect(textElements.length).toBeGreaterThan(0)
    
    const degreeElements = screen.getAllByText(/Master's degree in Information Technology from UWM/)
    expect(degreeElements.length).toBeGreaterThan(0)
    
    const skillsElements = screen.getAllByText(/React, React Native, JavaScript, and Python/)
    expect(skillsElements.length).toBeGreaterThan(0)
  })

  it('has correct main container structure', () => {
    render(<About />)
    const main = screen.getByRole('main')
    
    expect(main).toHaveClass('min-h-screen')
    expect(main).toHaveClass('bg-black')
    expect(main).toHaveClass('text-white')
    expect(main).toHaveClass('font-sans')
    expect(main).toHaveClass('relative')
    expect(main).toHaveClass('overflow-hidden')
  })

  it('has correct hero section structure', () => {
    render(<About />)
    const heroSection = screen.getByText('गुरुचरण').closest('section')
    
    expect(heroSection).toHaveClass('relative')
    expect(heroSection).toHaveClass('h-screen')
    expect(heroSection).toHaveClass('flex')
    expect(heroSection).toHaveClass('items-center')
    expect(heroSection).toHaveClass('justify-center')
  })

  it('has correct professional overview section structure', () => {
    render(<About />)
    const overviewSection = screen.getByText('PROFESSIONAL OVERVIEW').closest('section')
    
    expect(overviewSection).toHaveClass('relative')
    expect(overviewSection).toHaveClass('min-h-screen')
    expect(overviewSection).toHaveClass('bg-black')
    expect(overviewSection).toHaveClass('flex')
    expect(overviewSection).toHaveClass('items-start')
    expect(overviewSection).toHaveClass('justify-start')
  })

  it('renders LeetCode link', () => {
    render(<About />)
    
    const leetcodeLink = screen.getByText('LeetCode')
    
    expect(leetcodeLink).toBeInTheDocument()
    expect(leetcodeLink).toHaveAttribute('href', 'https://leetcode.com/u/Gurucharan_Vemuru/')
    expect(leetcodeLink).toHaveAttribute('target', '_blank')
    expect(leetcodeLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has correct responsive text sizing for title', () => {
    render(<About />)
    const title = screen.getByText('गुरुचरण').closest('h1')
    
    expect(title).toHaveClass('text-[8rem]')
    expect(title).toHaveClass('sm:text-[12rem]')
    expect(title).toHaveClass('md:text-[16rem]')
    expect(title).toHaveClass('lg:text-[20rem]')
    expect(title).toHaveClass('xl:text-[24rem]')
  })

  it('has correct font family styling', () => {
    render(<About />)
    const main = screen.getByRole('main')
    
    expect(main).toHaveStyle({ fontFamily: '"Rozha One", serif' })
  })

  it('renders mobile light effect fallback', () => {
    render(<About />)
    
    // Check for mobile-specific gradient elements
    const mobileGradients = document.querySelectorAll('.block.md\\:hidden')
    expect(mobileGradients.length).toBeGreaterThan(0)
  })

  it('has correct text alignment and spacing', () => {
    render(<About />)
    const titleContainer = screen.getByText('गुरुचरण').closest('h1').parentElement.parentElement
    
    expect(titleContainer).toHaveClass('text-center')
    expect(titleContainer).toHaveClass('relative')
    expect(titleContainer).toHaveClass('z-10')
  })
}) 