const Header = () => (
  <header className="w-full py-6 px-8 flex items-center justify-between bg-background border-b border-border" role="banner">
    <a href="#main-content" className="sr-only focus:not-sr-only absolute left-4 top-4 bg-primary text-background px-4 py-2 rounded transition-all duration-200 z-50">Skip to main content</a>
    <div className="text-2xl font-bold text-primary tracking-tight">
      <span style={{ display: 'block' }}>GURUCHARAN</span>
      <span style={{ display: 'block' }}>VEMURU</span>
    </div>
    <nav className="flex gap-8" aria-label="Main navigation">
      <a href="#work" className="text-secondary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1" aria-label="Work section">Work</a>
      <a href="#contact" className="text-secondary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1" aria-label="Contact section">Contact</a>
    </nav>
  </header>
);

export default Header; 