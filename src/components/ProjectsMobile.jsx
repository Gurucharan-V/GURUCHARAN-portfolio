import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlareHover from './GlareHover';
import projectsData from './projects.json';

const ProjectsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Scroll to top when component mounts
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0 });
    } else {
      window.scrollTo(0, 0);
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If not mobile, don't render this component
  if (!isMobile) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Projects Section */}
      <section className="relative min-h-screen bg-black flex items-start justify-start pt-16 pl-8 pr-8 pb-16">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none tracking-tight uppercase">
              PROJECTS
            </h2>
            
            <div className="space-y-8">
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <GlareHover
                    width="100%"
                    height="auto"
                    background="rgba(255, 255, 255, 0.05)"
                    borderRadius="8px"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    glareColor="#ffffff"
                    glareOpacity={0.3}
                    glareAngle={-45}
                    glareSize={200}
                    transitionDuration={650}
                    className="p-8 backdrop-blur-sm"
                  >
                    <div className="space-y-6">
                      <div className="border-b border-white/20 pb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">
                          {project.title}
                        </h3>
                        <h4 className="text-lg md:text-xl font-semibold text-white/90 leading-tight mb-2">
                          {project.institution}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-white/60 bg-white/5 px-3 py-1 rounded-full w-fit">
                          <span className="font-medium">{project.duration}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          {project.description.split('. ').filter(sentence => sentence.trim().length > 0).map((sentence, index) => (
                            <div key={index} className="flex items-start text-base text-white/90 leading-relaxed">
                              <span className="text-white/60 mr-2 mt-2 flex-shrink-0">•</span>
                              <span>{sentence.trim()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <div className="text-base text-white/80 font-semibold">
                            Technologies & Skills:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90 border border-white/20"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlareHover>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Overview Section */}
      <section className="relative min-h-screen bg-black flex items-start justify-start pt-16 pl-8 pr-8 pb-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none tracking-tight uppercase">
              SKILLS OVERVIEW
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Programming Languages */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <GlareHover
                  width="100%"
                  height="auto"
                  background="rgba(255, 255, 255, 0.05)"
                  borderRadius="8px"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-45}
                  glareSize={200}
                  transitionDuration={650}
                  className="p-6 text-center backdrop-blur-sm"
                >
                  <div className="text-xl font-bold text-white mb-4">
                    Programming
                  </div>
                  <div className="text-base text-white/90 space-y-2">
                    <div>Python, JavaScript</div>
                    <div>React, React Native</div>
                    <div>HTML, CSS, SQL</div>
                  </div>
                </GlareHover>
              </motion.div>

              {/* Machine Learning */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <GlareHover
                  width="100%"
                  height="auto"
                  background="rgba(255, 255, 255, 0.05)"
                  borderRadius="8px"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-45}
                  glareSize={200}
                  transitionDuration={650}
                  className="p-6 text-center backdrop-blur-sm"
                >
                  <div className="text-xl font-bold text-white mb-4">
                    Machine Learning
                  </div>
                  <div className="text-base text-white/90 space-y-2">
                    <div>TensorFlow, Keras</div>
                    <div>Deep Learning, CNN</div>
                    <div>Data Analysis</div>
                  </div>
                </GlareHover>
              </motion.div>

              {/* Web Development */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <GlareHover
                  width="100%"
                  height="auto"
                  background="rgba(255, 255, 255, 0.05)"
                  borderRadius="8px"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-45}
                  glareSize={200}
                  transitionDuration={650}
                  className="p-6 text-center backdrop-blur-sm"
                >
                  <div className="text-xl font-bold text-white mb-4">
                    Web Development
                  </div>
                  <div className="text-base text-white/90 space-y-2">
                    <div>FastAPI, Django</div>
                    <div>REST APIs</div>
                    <div>Responsive Design</div>
                  </div>
                </GlareHover>
              </motion.div>

              {/* Mobile Development */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <GlareHover
                  width="100%"
                  height="auto"
                  background="rgba(255, 255, 255, 0.05)"
                  borderRadius="8px"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-45}
                  glareSize={200}
                  transitionDuration={650}
                  className="p-6 text-center backdrop-blur-sm"
                >
                  <div className="text-xl font-bold text-white mb-4">
                    Mobile Development
                  </div>
                  <div className="text-base text-white/90 space-y-2">
                    <div>React Native</div>
                    <div>Expo SDK</div>
                    <div>iOS & Android</div>
                  </div>
                </GlareHover>
              </motion.div>

              {/* Tools & Technologies */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <GlareHover
                  width="100%"
                  height="auto"
                  background="rgba(255, 255, 255, 0.05)"
                  borderRadius="8px"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-45}
                  glareSize={200}
                  transitionDuration={650}
                  className="p-6 text-center backdrop-blur-sm"
                >
                  <div className="text-xl font-bold text-white mb-4">
                    Tools & Tech
                  </div>
                  <div className="text-base text-white/90 space-y-2">
                    <div>Git, GitHub</div>
                    <div>VS Code, Xcode</div>
                    <div>Docker, AWS</div>
                  </div>
                </GlareHover>
              </motion.div>

              {/* Soft Skills */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <GlareHover
                  width="100%"
                  height="auto"
                  background="rgba(255, 255, 255, 0.05)"
                  borderRadius="8px"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-45}
                  glareSize={200}
                  transitionDuration={650}
                  className="p-6 text-center backdrop-blur-sm"
                >
                  <div className="text-xl font-bold text-white mb-4">
                    Soft Skills
                  </div>
                  <div className="text-base text-white/90 space-y-2">
                    <div>Problem Solving</div>
                    <div>Team Collaboration</div>
                    <div>Communication</div>
                  </div>
                </GlareHover>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsMobile; 