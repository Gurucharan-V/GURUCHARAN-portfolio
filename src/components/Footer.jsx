const Footer = () => (
  <footer className="w-full py-8 px-8 flex flex-col md:flex-row items-center justify-between bg-background border-t border-border mt-24" role="contentinfo">
    <a href="#main-content" className="sr-only focus:not-sr-only absolute left-4 top-4 bg-primary text-background px-4 py-2 rounded transition-all duration-200 z-50">Skip to main content</a>
    <div className="text-secondary text-sm">&copy; {new Date().getFullYear()} GURUCHARAN VEMURU. All rights reserved.</div>
    <div className="flex gap-6 mt-4 md:mt-0">
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors duration-200" aria-label="GitHub (opens in new tab)">GitHub</a>
      <a href="mailto:hello@example.com" className="text-secondary hover:text-primary transition-colors duration-200" aria-label="Email">Email</a>
    </div>
  </footer>
);

export default Footer; 