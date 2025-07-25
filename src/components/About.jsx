import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import signatureImage from './signature.png';
import LightRays from './LightRays';

const About = () => {
  useEffect(() => {
    // Use Lenis smooth scrolling to scroll to top
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0 });
    } else {
      // Fallback to regular scroll if Lenis is not available
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans relative overflow-hidden" style={{ fontFamily: '"Rozha One", serif' }}>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center" style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/* Light Rays Effect - Desktop Only */}
        <div className="hidden md:block" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
        
        {/* Mobile Light Effect - CSS-based fallback */}
        <div className="block md:hidden absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-radial from-white/8 to-transparent"></div>
          <div className="absolute top-1/4 left-1/3 w-full h-24 bg-gradient-radial from-white/6 to-transparent" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-full h-20 bg-gradient-radial from-white/4 to-transparent" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="text-center relative z-10" style={{ textAlign: 'center', width: '100%', maxWidth: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-2"
            style={{ textAlign: 'center' }}
          >
            <motion.h1 
              className="group text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black text-white leading-none tracking-tight cursor-pointer inline-block" 
              style={{ 
                textAlign: 'center', 
                fontFamily: '"Rozha One", serif',
                WebkitTextStroke: '0px white'
              }}
            >
              <span className="hero-outline">गुरुचरण</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Professional Overview Section */}
      <section className="relative min-h-screen bg-black flex items-start justify-start pt-16 pl-8 pr-8 pb-16" style={{ fontFamily: '"Rozha One", serif' }}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none tracking-tight" style={{ fontFamily: '"Rozha One", serif' }}>
              PROFESSIONAL OVERVIEW
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-loose text-left max-w-6xl" style={{ fontFamily: '"Rozha One", serif', textAlign: 'left' }}>
              <span className="block md:hidden">
                I'm Gurucharan Vemuru, a software developer with a Master's degree in Information Technology from UWM. I specialize in React, React Native, JavaScript, and Python development. I practice data structures and algorithms on LeetCode and focus on creating clean, maintainable code.
              </span>
              <span className="hidden md:block">
                I'm Gurucharan Vemuru, a software developer with a strong foundation in computer science and a Master's degree in Information Technology from the University of Wisconsin-Milwaukee. I specialize in full-stack web and mobile development using React, React Native, JavaScript, and Python. I consistently sharpen my problem-solving skills by practicing data structures and algorithms on LeetCode. My work includes projects in accessibility, system optimization, and cross-platform development. I approach every project with a focus on clarity, performance, and clean, maintainable code.
              </span>
            </p>
            <div className="flex gap-8 items-center">
              <a 
                href="https://leetcode.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl text-white hover:text-white/70 transition-all duration-300 cursor-pointer underline focus:outline-none"
                style={{ fontFamily: '"Rozha One", serif' }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                LeetCode
              </a>
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl text-white hover:text-white/70 transition-all duration-300 cursor-pointer underline focus:outline-none"
                style={{ fontFamily: '"Rozha One", serif' }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl text-white hover:text-white/70 transition-all duration-300 cursor-pointer underline focus:outline-none"
                style={{ fontFamily: '"Rozha One", serif' }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Growth Through Community Section */}
      <section className="relative min-h-screen bg-black flex items-start justify-start pt-16 pl-8 pr-8 pb-16" style={{ fontFamily: '"Rozha One", serif' }}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none tracking-tight" style={{ fontFamily: '"Rozha One", serif' }}>
              GROWTH THROUGH COMMUNITY AND CONTRIBUTIONS
            </h3>
            <div className="space-y-6">
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-loose text-left max-w-6xl" style={{ fontFamily: '"Rozha One", serif', textAlign: 'left' }}>
                <span className="block md:hidden">
                  I actively engage in tech communities through Namaste Dev Discord and led web development at NBKRIST. I volunteered with UWM SET Program tutoring K-12 students. At UWM, I earned a 3.87 GPA, Dean's Honor List recognition, and won first place in the Valorant tournament. These experiences taught me mentorship, teamwork, and strategic thinking.
                </span>
                <span className="hidden md:block">
                  I actively engage in tech communities to learn, collaborate, and give back. As a member of the Namaste Dev Discord, I help peers with React and Node.js while learning through teaching. At NBKRIST, I led web development for Techvyuha, organizing student-led tech events. I volunteered with the UWM SET Program, tutoring K-12 students twice a week in various subjects. This experience taught me the value of mentorship, empathy, and communication. At UWM, I earned a 3.87 GPA and was recognized on the Dean's Honor List for two consecutive semesters. My dedication also earned me a Dean's Scholarship from the Lubar College of Business. Outside academics, I competed in UWM's Valorant Basement Bash Tournament and won first place. This achievement reflected my strategic thinking, teamwork, and composure under pressure. Through community, mentorship, and competition, I've grown both personally and professionally.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beyond the Code Section */}
      <section className="relative min-h-screen bg-black flex items-start justify-start pt-16 pl-8 pr-8 pb-16" style={{ fontFamily: '"Rozha One", serif' }}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none tracking-tight" style={{ fontFamily: '"Rozha One", serif' }}>
              BEYOND THE CODE
            </h4>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-loose text-left max-w-6xl" style={{ fontFamily: '"Rozha One", serif', textAlign: 'left' }}>
              <span className="block md:hidden">
                Beyond coding, I pursue creative interests in videography and video editing at UWM Recreation Center. Photography is another passion where I explore composition and storytelling. I enjoy drawing inspiration from movies and cinematography. As a dedicated gamer, I won first place in UWM's Valorant tournament. These activities keep me focused and bring fresh creativity to my development work.
              </span>
              <span className="hidden md:block">
                Beyond my technical background, I actively pursue creative and competitive interests. I have hands-on experience in videography and video editing at the UWM Recreation Center. Photography is another passion where I explore composition, lighting, and storytelling. I enjoy drawing creative inspiration from movies and cinematography. As a dedicated gamer, I won first place in the Valorant tournament at UWM's Basement Bash. These activities keep me focused, sharp, and collaborative. They also bring fresh perspective and creativity into my work as a developer.
              </span>
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center md:text-right w-full"
            >
              <img 
                src={signatureImage} 
                alt="Gurucharan Vemuru Signature" 
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl w-auto h-auto mx-auto md:ml-auto md:mr-0 transform -rotate-20"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About; 




