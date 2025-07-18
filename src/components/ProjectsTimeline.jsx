import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: 'GURUCHARAN V', link: '/about.html' },
  { id: 2, title: 'EDUCATION', link: '/edu-exp.html' },
  { id: 3, title: 'EXPERIENCE', link: '/edu-exp.html' },
  { id: 4, title: 'PROJECTS', link: '/projects.html' },
  { id: 5, title: 'LINKEDIN', link: 'https://www.linkedin.com/in/gurucharanvem/' },
  { id: 6, title: 'GITHUB', link: 'https://github.com/Gurucharan-V' },
  { id: 7, title: 'CONTACT', link: '/contact.html' },
  { id: 8, title: 'RESUME' },
  { id: 9, title: 'SKILLS' },
];

const ProjectItem = ({ project, index }) => {
  return (
    <motion.div
      className="mb-2 md:mb-4 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, margin: '-30px' }}
    >
      <h2
        className="no-outline text-white text-6xl sm:text-9xl md:text-[10rem] lg:text-[14rem] font-black leading-none cursor-pointer transform -skew-x-24 md:-skew-x-24 transition-all duration-150 outline-none group-hover:text-transparent group-hover:[-webkit-text-stroke:4px_white] focus:text-transparent focus:[-webkit-text-stroke:4px_white] text-right"
        tabIndex={0}
        style={{ WebkitTextStroke: '0px white' }}
        onMouseEnter={e => {
          e.target.style.color = 'transparent';
          e.target.style.WebkitTextStroke = '4px white';
          e.target.style.textShadow = 'none';
        }}
        onMouseLeave={e => {
          e.target.style.color = '#fff';
          e.target.style.WebkitTextStroke = '0px white';
          e.target.style.textShadow = 'none';
        }}
        onFocus={e => {
          e.target.style.color = 'transparent';
          e.target.style.WebkitTextStroke = '4px white';
          e.target.style.textShadow = 'none';
        }}
        onBlur={e => {
          e.target.style.color = '#fff';
          e.target.style.WebkitTextStroke = '0px white';
          e.target.style.textShadow = 'none';
        }}
      >
        {project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="no-outline" style={{ color: 'inherit', textDecoration: 'none' }}>{project.title}</a>
        ) : (
          project.title
        )}
      </h2>
    </motion.div>
  );
};

const ProjectsTimeline = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 0]);

  return (
    <section
      ref={containerRef}
      className="w-full flex flex-col items-end bg-background overflow-visible minimal-padding pr-8"
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
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsTimeline; 