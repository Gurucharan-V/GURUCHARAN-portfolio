import { useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import CenterUnderline from './CenterUnderline';
import ComesInGoesOutUnderline from './ComesInGoesOutUnderline';
import GoesOutComesInUnderline from './GoesOutComesInUnderline';


const projects = [
  { id: 1, title: 'GURUCHARAN V', link: '/about' },
  { id: 2, title: 'EDUCATION', link: '/edu-exp#education' },
  { id: 3, title: 'EXPERIENCE', link: '/edu-exp#experience' },
  { id: 4, title: 'PROJECTS', link: '/projects' },
  { id: 5, title: 'LINKEDIN', link: 'https://www.linkedin.com/in/gurucharanvem/' },
  { id: 6, title: 'GITHUB', link: 'https://github.com/Gurucharan-V' },
  { id: 7, title: 'RESUME', isResume: true },
  { id: 8, title: 'HIRE ME', isHireMe: true },
];

const ProjectItem = ({ project, index, onHireMeClick, showContactDetails }) => {
  const handleResumeDownload = () => {
    if (project.isResume) {
      const link = document.createElement('a');
      link.href = '/gurucharanResume.pdf';
      link.download = 'Gurucharan_Vemuru_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      className="mb-4 sm:mb-6 md:mb-8 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, margin: '-30px' }}
    >

      <h2
        className="no-outline text-white text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-black leading-none cursor-pointer transform sm:-skew-x-18 md:-skew-x-24 transition-all duration-150 outline-none group-hover:text-transparent focus:text-transparent text-right whitespace-nowrap"
        tabIndex={0}
        style={{ WebkitTextStroke: '0px white' }}
        onMouseEnter={e => {
          e.target.style.color = 'transparent';
          e.target.style.WebkitTextStroke = window.innerWidth < 768 ? '2px white' : '4px white';
          e.target.style.textShadow = 'none';
        }}
        onMouseLeave={e => {
          e.target.style.color = '#fff';
          e.target.style.WebkitTextStroke = '0px white';
          e.target.style.textShadow = 'none';
        }}
        onFocus={e => {
          e.target.style.color = 'transparent';
          e.target.style.WebkitTextStroke = window.innerWidth < 768 ? '2px white' : '4px white';
          e.target.style.textShadow = 'none';
        }}
        onBlur={e => {
          e.target.style.color = '#fff';
          e.target.style.WebkitTextStroke = '0px white';
          e.target.style.textShadow = 'none';
        }}
        onClick={project.isHireMe ? onHireMeClick : project.isResume ? handleResumeDownload : undefined}
      >
        {project.link ? (
          project.link.startsWith('http') ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="no-outline" style={{ color: 'inherit', textDecoration: 'none' }}>{project.title}</a>
          ) : (
            <Link to={project.link.replace('.html', '').replace('/index', '/')} className="no-outline" style={{ color: 'inherit', textDecoration: 'none' }}>{project.title}</Link>
          )
        ) : (
          project.title
        )}
      </h2>
    </motion.div>
  );
};

const ProjectsTimeline = () => {
  const containerRef = useRef();
  const [showContactDetails, setShowContactDetails] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 0]);

  const handleHireMeClick = () => {
    setShowContactDetails(!showContactDetails);
  };

  return (
    <section
      ref={containerRef}
              className="w-full flex flex-col items-end bg-background overflow-visible minimal-padding pr-8 relative pt-64 sm:pt-72 md:pt-80 lg:pt-40"
      id="work"
      aria-labelledby="work-section-title"
    >
      <motion.div
        className="relative transform -skew-x-24 flex flex-col items-end"
        style={{ y }}
      >
        <div className="transform skew-x-24 flex flex-col items-end">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              onHireMeClick={handleHireMeClick}
              showContactDetails={showContactDetails}
            />
          ))}
        </div>
        
        {/* Contact Details Slide Down */}
        <AnimatePresence>
          {showContactDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                duration: 0.08, 
                ease: [0.4, 0, 1, 1] // fast out for enter, fast in for exit
              }}
              className="text-white text-right pr-8 mt-6"
            >
              <div className="space-y-1 sm:space-y-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wider uppercase">LET'S WORK TOGETHER</h3>
                <div className="space-y-0.5 sm:space-y-2">
                  <a 
                    href="mailto:gvemuru1@gmail.com" 
                    className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide block"
                  >
                    <CenterUnderline>gvemuru1@gmail.com</CenterUnderline>
                  </a>
                  <a
                    href="https://github.com/Gurucharan-V"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide block"
                  >
                    <ComesInGoesOutUnderline direction="right">GitHub: Gurucharan-V</ComesInGoesOutUnderline>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gurucharanvem/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide block"
                  >
                    <GoesOutComesInUnderline direction="left">LinkedIn: gurucharanvem</GoesOutComesInUnderline>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ProjectsTimeline; 