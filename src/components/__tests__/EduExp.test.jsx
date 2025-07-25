import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import EduExp from '../EduExp'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    img: ({ ...props }) => <img {...props} />,
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
  }),
  useInView: () => true,
  useScroll: () => ({
    scrollYProgress: { value: 0 },
  }),
  useTransform: (value, input, output) => ({ value: output[0] }),
}))

// Mock GlareHover component
vi.mock('../GlareHover', () => ({
  default: ({ children, ...props }) => <div data-testid="glare-hover" {...props}>{children}</div>
}))

// Mock CustomCursor component
vi.mock('../CustomCursor', () => ({
  default: () => <div data-testid="custom-cursor">Cursor</div>
}))

// Mock fetch for eduexp.json
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        id: 1,
        type: "education",
        institution: "Test University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        period: "2020 - 2024",
        description: "Test description",
        achievements: ["Achievement 1", "Achievement 2"],
        logo: "test-logo.png"
      },
      {
        id: 2,
        type: "experience",
        institution: "Test Company",
        position: "Software Engineer",
        period: "2024 - Present",
        description: "Work description",
        achievements: ["Work achievement 1", "Work achievement 2"],
        logo: "company-logo.png"
      }
    ])
  })
)

describe('EduExp Component', () => {
  const renderEduExp = () => {
    return render(
      <BrowserRouter>
        <EduExp />
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
    global.innerWidth = 1024
    global.innerHeight = 768
  })

  describe('Rendering', () => {
    it('should render without crashing', async () => {
      const { container } = renderEduExp()
      await waitFor(() => {
        expect(container).toBeTruthy()
      })
    })

    it('should render custom cursor', async () => {
      renderEduExp()
      await waitFor(() => {
        expect(screen.getByTestId('custom-cursor')).toBeInTheDocument()
      })
    })

    it('should render the main heading', async () => {
      renderEduExp()
      await waitFor(() => {
        expect(screen.getByText('Education & Experience')).toBeInTheDocument()
      })
    })

    it('should load and display education data', async () => {
      renderEduExp()
      await waitFor(() => {
        expect(screen.getByText('Test University')).toBeInTheDocument()
        expect(screen.getByText('Bachelor of Science')).toBeInTheDocument()
      })
    })

    it('should load and display experience data', async () => {
      renderEduExp()
      await waitFor(() => {
        expect(screen.getByText('Test Company')).toBeInTheDocument()
        expect(screen.getByText('Software Engineer')).toBeInTheDocument()
      })
    })
  })

  describe('Data Loading', () => {
    it('should handle loading state', async () => {
      renderEduExp()
      // Should initially show loading or empty state
      expect(screen.queryByText('Loading...')).toBeNull() // Component doesn't show explicit loading
    })

    it('should handle fetch errors gracefully', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Fetch failed'))
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      renderEduExp()
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled()
      })
      
      consoleSpy.mockRestore()
    })

    it('should handle empty data', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([])
      })
      
      renderEduExp()
      await waitFor(() => {
        expect(screen.getByText('Education & Experience')).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Behavior', () => {
    it('should adapt layout for mobile', async () => {
      global.innerWidth = 375
      global.innerHeight = 667
      
      renderEduExp()
      await waitFor(() => {
        const container = screen.getByTestId('custom-cursor').parentElement
        expect(container).toBeInTheDocument()
      })
    })

    it('should adapt layout for tablet', async () => {
      global.innerWidth = 768
      global.innerHeight = 1024
      
      renderEduExp()
      await waitFor(() => {
        expect(screen.getByText('Education & Experience')).toBeInTheDocument()
      })
    })

    it('should handle landscape orientation', async () => {
      global.innerWidth = 667
      global.innerHeight = 375
      
      renderEduExp()
      await waitFor(() => {
        expect(screen.getByText('Education & Experience')).toBeInTheDocument()
      })
    })
  })

  describe('Interactions', () => {
    it('should have hover effects on cards', async () => {
      renderEduExp()
      await waitFor(() => {
        const cards = screen.getAllByTestId('glare-hover')
        expect(cards.length).toBeGreaterThan(0)
        
        fireEvent.mouseEnter(cards[0])
        expect(cards[0]).toHaveClass('group')
      })
    })

    it('should handle scroll animations', async () => {
      renderEduExp()
      await waitFor(() => {
        const container = document.querySelector('.min-h-screen')
        expect(container).toBeInTheDocument()
        
        // Simulate scroll
        fireEvent.scroll(window, { target: { scrollY: 100 } })
      })
    })

    it('should display achievements when available', async () => {
      renderEduExp()
      await waitFor(() => {
        expect(screen.getByText('Achievement 1')).toBeInTheDocument()
        expect(screen.getByText('Achievement 2')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', async () => {
      renderEduExp()
      await waitFor(() => {
        const h1 = screen.getByRole('heading', { level: 1 })
        expect(h1).toHaveTextContent('Education & Experience')
      })
    })

    it('should have proper semantic structure', async () => {
      const { container } = renderEduExp()
      await waitFor(() => {
        expect(container.querySelector('main')).toBeInTheDocument()
        expect(container.querySelector('section')).toBeInTheDocument()
      })
    })

    it('should have alt text for images', async () => {
      renderEduExp()
      await waitFor(() => {
        const images = screen.getAllByRole('img')
        images.forEach(img => {
          expect(img).toHaveAttribute('alt')
        })
      })
    })

    it('should be keyboard navigable', async () => {
      renderEduExp()
      await waitFor(() => {
        const cards = screen.getAllByTestId('glare-hover')
        cards.forEach(card => {
          expect(card).toHaveAttribute('tabIndex', '0')
        })
      })
    })
  })

  describe('Visual Elements', () => {
    it('should display institution logos', async () => {
      renderEduExp()
      await waitFor(() => {
        const logos = screen.getAllByRole('img')
        expect(logos.length).toBeGreaterThan(0)
        expect(logos[0]).toHaveAttribute('src', expect.stringContaining('logo'))
      })
    })

    it('should show period/duration', async () => {
      renderEduExp()
      await waitFor(() => {
        expect(screen.getByText('2020 - 2024')).toBeInTheDocument()
        expect(screen.getByText('2024 - Present')).toBeInTheDocument()
      })
    })

    it('should differentiate education and experience cards', async () => {
      renderEduExp()
      await waitFor(() => {
        const educationCard = screen.getByText('Bachelor of Science').closest('[data-testid="glare-hover"]')
        const experienceCard = screen.getByText('Software Engineer').closest('[data-testid="glare-hover"]')
        
        expect(educationCard).toBeInTheDocument()
        expect(experienceCard).toBeInTheDocument()
      })
    })
  })

  describe('Performance', () => {
    it('should load data only once', async () => {
      renderEduExp()
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith('/eduexp.json')
      })
    })

    it('should handle large datasets', async () => {
      const largeData = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        type: i % 2 === 0 ? "education" : "experience",
        institution: `Institution ${i}`,
        degree: `Degree ${i}`,
        period: `202${i % 10} - Present`,
        description: `Description ${i}`,
        achievements: [`Achievement ${i}`],
        logo: `logo${i}.png`
      }))
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(largeData)
      })
      
      const { container } = renderEduExp()
      await waitFor(() => {
        expect(container.querySelectorAll('[data-testid="glare-hover"]').length).toBe(50)
      })
    })
  })

  describe('Error States', () => {
    it('should handle network errors', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'))
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      renderEduExp()
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error loading education data:', expect.any(Error))
      })
      
      consoleSpy.mockRestore()
    })

    it('should handle malformed data', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, institution: "Test" } // Missing required fields
        ])
      })
      
      renderEduExp()
      await waitFor(() => {
        expect(screen.getByText('Test')).toBeInTheDocument()
      })
    })
  })
})