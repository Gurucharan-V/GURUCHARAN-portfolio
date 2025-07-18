import { Link } from 'react-router-dom';
import HeroText from './HeroText';

const Contact = () => (
  <main className="max-w-xl mx-auto p-8 bg-background text-white font-sans min-h-screen flex flex-col items-center justify-center">
    <HeroText text="CONTACT" />
    <p className="mb-6 text-lg mt-8">Feel free to reach out for collaborations, freelance work, or just to say hi!</p>
    <form className="space-y-4" action="mailto:hello@example.com" method="POST" encType="text/plain">
      <div>
        <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
        <input type="text" id="name" name="name" required className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
        <input type="email" id="email" name="email" required className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label htmlFor="message" className="block mb-1 font-semibold">Message</label>
        <textarea id="message" name="message" rows={4} required className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
      </div>
      <button type="submit" className="bg-primary text-background px-6 py-2 rounded font-semibold hover:bg-primary-dark transition">Send</button>
    </form>
    <div className="mt-8 text-lg">
      <p>Email: <a href="mailto:hello@example.com" className="text-primary hover:underline">hello@example.com</a></p>
      <p>GitHub: <a href="https://github.com/Gurucharan-V" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Gurucharan-V</a></p>
      <p>LinkedIn: <a href="https://www.linkedin.com/in/gurucharanvem/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">gurucharanvem</a></p>
    </div>
    <Link to="/" className="text-primary hover:underline block mt-8">Back to Home</Link>
  </main>
);

export default Contact; 