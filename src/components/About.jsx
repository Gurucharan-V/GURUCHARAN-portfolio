import { Link } from 'react-router-dom';
import DiscordStatus from './DiscordStatus';

const About = () => (
  <main className="max-w-2xl mx-auto p-8 bg-background text-white font-sans min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold mb-4">About Me</h1>
    <p className="text-lg leading-relaxed mb-6 mt-8">
      Hello! I'm <strong>Gurucharan V</strong>, a creative developer and digital artist passionate about building beautiful, interactive web experiences. I love blending technology and art to craft unique digital products. My journey in tech has been driven by curiosity, creativity, and a desire to make a positive impact through code and design.
    </p>
    <Link to="/" className="text-primary hover:underline">Back to Home</Link>
    <DiscordStatus />
  </main>
);

export default About; 