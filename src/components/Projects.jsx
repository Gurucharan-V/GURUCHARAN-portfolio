import { Link } from 'react-router-dom';
import HeroText from './HeroText';

const Projects = () => (
  <main className="max-w-3xl mx-auto p-8 bg-background text-white font-sans min-h-screen flex flex-col items-center justify-center">
    <HeroText text="PROJECTS" />
    <section className="space-y-6 mt-8">
      <div>
        <h2 className="text-2xl font-semibold">Portfolio Website</h2>
        <p>A modern, interactive portfolio to showcase my work, skills, and experience. Built with React, Tailwind CSS, and Vite.</p>
        <a href="https://github.com/Gurucharan-V/GURUCHARAN-portfolio" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Digital Art Gallery</h2>
        <p>An online gallery to display my digital artwork, featuring smooth animations and a responsive layout.</p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Interactive Resume</h2>
        <p>A creative, interactive resume built as a web app, allowing users to explore my skills and experience in a fun way.</p>
      </div>
    </section>
    <Link to="/" className="text-primary hover:underline block mt-8">Back to Home</Link>
  </main>
);

export default Projects; 