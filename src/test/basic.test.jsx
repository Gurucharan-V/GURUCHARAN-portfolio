import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Simple test component
const TestComponent = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <button>Click me</button>
    </div>
  )
}

describe('Basic Test', () => {
  it('renders a simple component', () => {
    render(<TestComponent />)
    
    expect(screen.getByText('Hello World')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has correct heading', () => {
    render(<TestComponent />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Hello World')
  })
}) 