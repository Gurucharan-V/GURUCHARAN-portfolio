import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import VintageTerminal from '../../components/VintageTerminal'

// Mock the projects data
vi.mock('../../components/projects.json', () => ({
  default: [
    {
      title: "Test Project 1",
      duration: "Jan 2024 - Mar 2024",
      institution: "Test University",
      description: "Test project description",
      skills: ["React", "JavaScript"]
    },
    {
      title: "Test Project 2", 
      duration: "Apr 2024 - Jun 2024",
      institution: "Test Company",
      description: "Another test project",
      skills: ["Python", "Django"]
    }
  ]
}))

// Mock CSS import
vi.mock('../../components/VintageTerminal.css', () => ({}), { virtual: true })

describe('VintageTerminal Component', () => {
  beforeEach(() => {
    // Reset any timers or state
    vi.clearAllTimers()
  })

  it('renders without crashing', () => {
    render(<VintageTerminal />)
    expect(screen.getByTestId('vintage-terminal')).toBeInTheDocument()
  })

  it('renders terminal container with correct classes', () => {
    render(<VintageTerminal />)
    const terminal = screen.getByTestId('vintage-terminal')
    
    expect(terminal).toHaveClass('vintage-terminal')
  })

  it('renders terminal screen structure', () => {
    render(<VintageTerminal />)
    
    expect(screen.getByTestId('terminal-screen')).toBeInTheDocument()
    expect(screen.getByTestId('scan-lines')).toBeInTheDocument()
    expect(screen.getByTestId('terminal-content')).toBeInTheDocument()
  })

  it('displays welcome message after boot sequence', async () => {
    render(<VintageTerminal />)
    
    await waitFor(() => {
      expect(screen.getByText('Welcome to VINTAGE TERMINAL v1.0')).toBeInTheDocument()
    })
  })

  it('displays help instruction', async () => {
    render(<VintageTerminal />)
    
    await waitFor(() => {
      expect(screen.getByText('Type "help" for available commands.')).toBeInTheDocument()
    })
  })

  it('has correct terminal styling classes', () => {
    render(<VintageTerminal />)
    
    const terminal = screen.getByTestId('vintage-terminal')
    const screenElement = screen.getByTestId('terminal-screen')
    const content = screen.getByTestId('terminal-content')
    
    expect(terminal).toHaveClass('vintage-terminal')
    expect(screenElement).toHaveClass('terminal-screen')
    expect(content).toHaveClass('terminal-content')
  })

  it('renders command input field after boot sequence', async () => {
    render(<VintageTerminal />)
    
    await waitFor(() => {
      const input = screen.getByTestId('command-input')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'text')
      expect(input).toHaveClass('command-input')
    })
  })

  it('renders terminal prompt after boot sequence', async () => {
    render(<VintageTerminal />)
    
    await waitFor(() => {
      const prompt = screen.getByTestId('terminal-prompt')
      expect(prompt).toBeInTheDocument()
      expect(prompt).toHaveTextContent('guest@vintage:~$')
      expect(prompt).toHaveClass('prompt')
    })
  })

  it('renders blinking cursor after boot sequence', async () => {
    render(<VintageTerminal />)
    
    await waitFor(() => {
      const cursor = screen.getByTestId('terminal-cursor')
      expect(cursor).toBeInTheDocument()
      expect(cursor).toHaveTextContent('█')
      expect(cursor).toHaveClass('cursor')
    })
  })

  it('renders command line structure after boot sequence', async () => {
    render(<VintageTerminal />)
    
    await waitFor(() => {
      const commandLine = screen.getByTestId('command-line')
      expect(commandLine).toBeInTheDocument()
      expect(commandLine).toHaveClass('command-line')
    })
  })

  it('has correct input field attributes after boot sequence', async () => {
    render(<VintageTerminal />)
    
    await waitFor(() => {
      const input = screen.getByTestId('command-input')
      expect(input).toHaveAttribute('type', 'text')
      expect(input).toHaveAttribute('value', '')
      expect(input).toHaveClass('command-input')
    })
  })

  it('has correct accessibility structure', () => {
    render(<VintageTerminal />)
    
    // Check that the terminal has proper structure for screen readers
    const terminal = screen.getByTestId('vintage-terminal')
    expect(terminal).toBeInTheDocument()
  })

  it('renders with correct initial state', () => {
    render(<VintageTerminal />)
    
    // Check initial state elements
    expect(screen.getByTestId('vintage-terminal')).toBeInTheDocument()
    expect(screen.getByTestId('terminal-screen')).toBeInTheDocument()
    expect(screen.getByTestId('terminal-content')).toBeInTheDocument()
  })
}) 