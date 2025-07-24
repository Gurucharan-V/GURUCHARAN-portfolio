import FlowingMenu from './FlowingMenu';

const FlowingMenuDemo = () => {
  return (
    <main className="min-h-screen bg-background text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">FlowingMenu Component Demo</h1>
          <p className="text-lg text-gray-400">
            A smooth animated menu with dropdown functionality
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Hover over items to see the flowing animation • Click to expand content
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Default Menu</h2>
          <FlowingMenu />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Custom Items</h2>
          <FlowingMenu items={['Experience', 'Skills', 'Projects', 'Contact']} />
        </div>

        <div className="mt-16 p-6 bg-surface border border-border rounded">
          <h3 className="text-xl font-semibold mb-3">Features:</h3>
          <ul className="space-y-2 text-gray-400">
            <li>• Smooth GSAP animations on hover</li>
            <li>• Edge detection for directional animations</li>
            <li>• Expandable dropdown content</li>
            <li>• Monochromatic professional design</li>
            <li>• Fully responsive layout</li>
            <li>• Accessible keyboard navigation</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default FlowingMenuDemo;