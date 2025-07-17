import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: (<><span style={{  display: 'block' }}>GURUCHARAN</span><span style={{ display: 'block' }}>VEMURU</span></>) },
  { id: 2, title: 'THE BRIGADE' },
  { id: 3, title: 'PUSH' },
  { id: 4, title: 'ONX' },
  { id: 5, title: 'MAPS' },
  { id: 6, title: 'ICONS' },
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
        className="text-white text-6xl sm:text-9xl md:text-[10rem] lg:text-[14rem] font-black leading-none cursor-pointer transform -skew-x-24 md:-skew-x-24 transition-all duration-150 outline-none group-hover:text-transparent group-hover:[-webkit-text-stroke:4px_white] focus:text-transparent focus:[-webkit-text-stroke:4px_white] text-right"
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
        {project.title}
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