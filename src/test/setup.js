import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Lenis module completely
vi.mock('lenis', () => ({
  default: vi.fn().mockImplementation(() => ({
    raf: vi.fn(),
    destroy: vi.fn(),
    scrollTo: vi.fn(),
    options: {
      wrapper: {
        scrollTo: vi.fn(),
      }
    }
  }))
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Create a proper requestAnimationFrame mock that doesn't cause infinite loops
let rafId = 0
const rafCallbacks = new Map()

const mockRequestAnimationFrame = vi.fn((callback) => {
  rafId++
  rafCallbacks.set(rafId, callback)
  // Don't actually call the callback to prevent infinite loops
  return rafId
})

const mockCancelAnimationFrame = vi.fn((id) => {
  rafCallbacks.delete(id)
})

// Mock requestAnimationFrame globally
global.requestAnimationFrame = mockRequestAnimationFrame
global.cancelAnimationFrame = mockCancelAnimationFrame

// Also mock on window object
Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: mockRequestAnimationFrame,
})

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: mockCancelAnimationFrame,
})

// Mock Lenis for smooth scrolling
const mockLenis = {
  raf: vi.fn(),
  destroy: vi.fn(),
  scrollTo: vi.fn(),
  options: {
    wrapper: {
      scrollTo: vi.fn(),
    }
  }
}

global.Lenis = vi.fn().mockImplementation(() => mockLenis)

// Mock window.lenis
Object.defineProperty(window, 'lenis', {
  writable: true,
  configurable: true,
  value: mockLenis,
})

// Mock Three.js and related libraries
vi.mock('three', () => ({
  default: {
    Scene: vi.fn(),
    PerspectiveCamera: vi.fn(),
    WebGLRenderer: vi.fn(() => ({
      setSize: vi.fn(),
      render: vi.fn(),
      domElement: document.createElement('canvas'),
    })),
    BoxGeometry: vi.fn(),
    MeshBasicMaterial: vi.fn(),
    Mesh: vi.fn(),
  },
  Scene: vi.fn(),
  PerspectiveCamera: vi.fn(),
  WebGLRenderer: vi.fn(),
  BoxGeometry: vi.fn(),
  MeshBasicMaterial: vi.fn(),
  Mesh: vi.fn(),
}))

// Mock React Three Fiber
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => children,
  useFrame: vi.fn(),
  useThree: vi.fn(() => ({
    camera: {},
    scene: {},
    gl: { domElement: document.createElement('canvas') },
  })),
}))

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  useGLTF: vi.fn(),
  Text: () => null,
}))

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    span: 'span',
    button: 'button',
    a: 'a',
  },
  useScroll: vi.fn(() => ({
    scrollYProgress: { get: vi.fn(() => 0) },
  })),
  useTransform: vi.fn(() => ({ get: vi.fn(() => 0) })),
  AnimatePresence: ({ children }) => children,
}))

// Mock GSAP
vi.mock('gsap', () => ({
  to: vi.fn(),
  from: vi.fn(),
  fromTo: vi.fn(),
  timeline: vi.fn(() => ({
    to: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
  })),
}))

// Mock React Router with proper BrowserRouter
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    BrowserRouter: ({ children }) => {
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'browser-router' }, children)
    },
    Routes: ({ children }) => {
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'routes' }, children)
    },
    Route: ({ element }) => {
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'route' }, element)
    },
    useLocation: vi.fn(() => ({ pathname: '/' })),
    useNavigate: vi.fn(() => vi.fn()),
  }
})

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
}

// Clean up after each test
afterEach(() => {
  rafCallbacks.clear()
  rafId = 0
}) 