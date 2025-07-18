const Header = () => (
  <header className="w-full py-6 px-8 flex items-center justify-between bg-background border-b border-border" role="banner">
    <a href="#main-content" className="sr-only focus:not-sr-only absolute left-4 top-4 bg-primary text-background px-4 py-2 rounded transition-all duration-200 z-50">Skip to main content</a>
    <div className="text-2xl font-bold text-primary tracking-tight">
      <a href="/about.html" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>GURUCHARAN</a>
      <a href="/about.html" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>VEMURU</a>
    </div>
  </header>
);

export default Header; 