import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsMobile from '../../components/ProjectsMobile'

// Mock GlareHover component
vi.mock('../../components/GlareHover', () => ({
  default: ({ children, className }) => (
    <div data-testid="glare-hover" className={className}>
      {children}
    </div>
  )
}))

// Mock projects data
vi.mock('../../components/projects.json', () => ({
  default: [
    {
      title: 'Test Project 1',
      duration: 'Jan 2024 - Mar 2024',
      institution: 'Test University',
      description: 'This is a test project description.',
      skills: ['React', 'JavaScript', 'CSS']
    },
    {
      title: 'Test Project 2',
      duration: 'Apr 2024 - Jun 2024',
      institution: 'Test Company',
      description: 'Another test project description.',
      skills: ['Python', 'Machine Learning', 'TensorFlow']
    }
  ]
}))

describe('ProjectsMobile Component', () => {
  const originalInnerWidth = window.innerWidth

  beforeEach(() => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
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

  it('renders without crashing on mobile', () => {
    render(<ProjectsMobile />)
    expect(screen.getByText('PROJECTS')).toBeInTheDocument()
  })

  it('renders all project cards', () => {
    render(<ProjectsMobile />)
    
    expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    expect(screen.getByText('Test Project 2')).toBeInTheDocument()
    expect(screen.getByText('Test University')).toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
  })

  it('displays project descriptions', () => {
    render(<ProjectsMobile />)
    
    expect(screen.getByText('This is a test project description.')).toBeInTheDocument()
    expect(screen.getByText('Another test project description.')).toBeInTheDocument()
  })

  it('displays project skills', () => {
    render(<ProjectsMobile />)
    
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('CSS')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    // Use getAllByText for elements that appear multiple times
    const machineLearningElements = screen.getAllByText('Machine Learning')
    expect(machineLearningElements.length).toBeGreaterThan(0)
    expect(screen.getByText('TensorFlow')).toBeInTheDocument()
  })

  it('renders skills overview section', () => {
    render(<ProjectsMobile />)
    expect(screen.getByText('SKILLS OVERVIEW')).toBeInTheDocument()
    expect(screen.getByText('Programming')).toBeInTheDocument()
    // Use getAllByText for elements that appear multiple times
    const machineLearningElements = screen.getAllByText('Machine Learning')
    expect(machineLearningElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.getByText('Mobile Development')).toBeInTheDocument()
    expect(screen.getByText('Tools & Tech')).toBeInTheDocument()
    expect(screen.getByText('Soft Skills')).toBeInTheDocument()
  })

  it('has correct section structure', () => {
    render(<ProjectsMobile />)
    
    // Use querySelector to find section elements since they might not have proper roles
    const sections = document.querySelectorAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('renders technologies and skills section', () => {
    render(<ProjectsMobile />)
    
    const techSkillsElements = screen.getAllByText('Technologies & Skills:')
    expect(techSkillsElements.length).toBeGreaterThan(0)
  })

  it('displays skills categories with correct content', () => {
    render(<ProjectsMobile />)
    
    // Check Programming skills
    expect(screen.getByText('Python, JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React, React Native')).toBeInTheDocument()
    expect(screen.getByText('HTML, CSS, SQL')).toBeInTheDocument()
    
    // Check Machine Learning skills
    expect(screen.getByText('TensorFlow, Keras')).toBeInTheDocument()
    expect(screen.getByText('Deep Learning, CNN')).toBeInTheDocument()
    expect(screen.getByText('Data Analysis')).toBeInTheDocument()
  })

  it('uses GlareHover components for project cards', () => {
    render(<ProjectsMobile />)
    
    const glareHovers = screen.getAllByTestId('glare-hover')
    expect(glareHovers.length).toBeGreaterThan(0)
  })

  it('displays project durations', () => {
    render(<ProjectsMobile />)
    
    expect(screen.getByText('Jan 2024 - Mar 2024')).toBeInTheDocument()
    expect(screen.getByText('Apr 2024 - Jun 2024')).toBeInTheDocument()
  })
}) 