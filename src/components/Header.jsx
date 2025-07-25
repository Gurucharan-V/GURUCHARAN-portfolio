import { Link } from 'react-router-dom';

const Header = () => (
  <header className="w-full py-6 px-8 flex items-center justify-between bg-background border-b border-border" role="banner">
    <a href="#main-content" className="sr-only focus:not-sr-only absolute left-4 top-4 bg-primary text-background px-4 py-2 rounded transition-all duration-200 z-50">Skip to main content</a>
    
    {/* Logo - Left Side */}
    <div className="text-2xl font-bold text-white tracking-tight">
      <Link to="/" className="block text-decoration-none" style={{ textDecoration: 'none', color: 'inherit' }}>
        GV!
      </Link>
    </div>
    
    {/* Navigation Links - Right Side */}
    <nav className="flex items-center space-x-8">
      <Link 
        to="/projects" 
        className="text-sm font-medium tracking-wider uppercase text-white hover:text-primary transition-colors duration-200"
      >
        Work
      </Link>
      <Link 
        to="/contact" 
        className="text-sm font-medium tracking-wider uppercase text-white hover:text-primary transition-colors duration-200"
      >
        Contact
      </Link>
    </nav>
  </header>
);

export default Header; 