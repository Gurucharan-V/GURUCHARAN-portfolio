import { Link } from 'react-router-dom';
import HeroText from './HeroText';

const EduExp = () => (
  <main className="max-w-3xl mx-auto p-8 bg-background text-white font-sans min-h-screen flex flex-col items-center justify-center gap-16">
    <div>
      <HeroText text="EDUCATION" />
      <ul className="list-disc list-inside text-lg mt-8">
        <li><strong>Bachelor of Technology in Computer Science</strong> - XYZ University (2018–2022)</li>
        <li><strong>Relevant Coursework:</strong> Web Development, UI/UX Design, Data Structures</li>
      </ul>
    </div>
    <div>
      <HeroText text="EXPERIENCE" />
      <ul className="list-disc list-inside text-lg mt-8">
        <li><strong>Frontend Developer</strong> at ABC Tech (2022–Present)<br/>Building modern, performant web apps with React and Tailwind CSS.</li>
        <li><strong>Freelance Digital Artist</strong> (2020–Present)<br/>Creating digital art and interactive experiences for clients worldwide.</li>
      </ul>
    </div>
    <Link to="/" className="text-primary hover:underline block mt-8">Back to Home</Link>
  </main>
);

export default EduExp; 