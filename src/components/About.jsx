import { Link } from 'react-router-dom';
import DiscordStatus from './DiscordStatus';
import FlowingMenu from './FlowingMenu';

const About = () => (
  <main className="max-w-4xl mx-auto p-8 bg-background text-white font-sans min-h-screen">
    <div className="mb-12 text-center">
      <h1 className="text-5xl font-bold mb-4">About Me</h1>
      <p className="text-lg text-gray-400">Learn more about my journey, skills, and values</p>
    </div>
    
    <div className="mb-12">
      <FlowingMenu />
    </div>
    
    <div className="text-center">
      <Link to="/" className="text-primary hover:underline inline-block px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition-all">
        Back to Home
      </Link>
    </div>
    
    <DiscordStatus />
  </main>
);

export default About; 