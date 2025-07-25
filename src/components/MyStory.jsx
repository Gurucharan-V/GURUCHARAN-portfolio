import { Link } from 'react-router-dom';

const MyStory = () => {
  return (
    <main className="w-full bg-black text-white font-sans min-h-screen">
      {/* Main Content Section */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
          <div className="space-y-12">
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-white">
              My Story
            </h1>
            
            <div className="space-y-8 max-w-3xl mx-auto">
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a passionate software engineer who thrives on turning complex problems into elegant, user-friendly solutions. With a strong foundation in both frontend and backend development, I bring ideas to life through clean code and innovative thinking.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                My journey in technology is driven by curiosity and a commitment to continuous learning. I specialize in modern web technologies, creating responsive applications that not only meet technical requirements but also deliver exceptional user experiences.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Every project is an opportunity to push boundaries and explore new possibilities in the digital landscape. I believe in writing code that not only works but also tells a story of innovation and creativity.
              </p>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link 
                to="/" 
                className="inline-flex items-center px-8 py-4 bg-white text-black text-sm font-bold tracking-wider uppercase hover:bg-gray-100 transition-all duration-300"
              >
                Back to Home
              </Link>
              <Link 
                to="/projects" 
                className="inline-flex items-center px-8 py-4 border border-white text-white text-sm font-bold tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300"
              >
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyStory; 