import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LightRays from './LightRays';
import GlareHover from './GlareHover';

const EduExp = () => {
  // Enhanced education and experience data
  const educationData = [
    {
      id: 1,
      institution: "University of Wisconsin–Milwaukee",
      degree: "Master of Science (MS), Information Technology (STEM)",
      period: "Sep 2023 – May 2025",
      gpa: "3.87 / 4.0",
      concentration: "AI, Data Analytics & Business Intelligence",
      highlights: "Completed a 30-credit program with hands-on work in machine learning, predictive analytics, IT strategy, cloud technologies, data management, cybersecurity, and web-based solution development.",
      skills: ["Convolutional Neural Networks (CNN)", "Logistic Regression", "Machine Learning", "Predictive Analytics", "IT Strategy", "Cloud Technologies", "Data Management", "Cybersecurity", "Web Development", "Data Analytics", "Business Intelligence", "Deep Learning", "Neural Networks", "Statistical Analysis", "Database Design", "System Architecture", "API Development", "DevOps", "Agile Methodologies", "Project Management"]
    },
    {
      id: 2,
      institution: "NBKR Institute of Science and Technology",
      degree: "Bachelor of Technology (BTech), Computer Science & Engineering",
      period: "Sep 2018 – May 2022",
      gpa: "8.7 / 10",
      concentration: "Core Computer Science & Engineering",
      highlights: "Comprehensive program covering core computer science principles and modern software development practices.",
      skills: ["Data Structures & Algorithms (DSA)", "Operating Systems (OS)", "Computer Networks", "Object-Oriented Programming (OOP)", "Database Management Systems (DBMS)", "Software Engineering", "Computer Architecture", "Web Technologies", "Programming Languages", "System Design"]
    }
  ];

  const experienceData = [
    {
      id: 1,
      company: "UWM Accessibility Resource Center",
      title: "Student Associate – Assistive Technology & Accessibility Support",
      period: "Sep 2024 – May 2025",
      duration: "9 months",
      location: "Milwaukee County, WI · Hybrid",
      highlights: [
        "Delivered disability support services using assistive technology per ADA and Assistive Technology Act standards.",
        "Managed academic accommodations, web accessibility updates, and exam proctoring.",
        "Contributed to ensuring inclusive access to learning resources."
      ],
      skills: ["Assistive Technology", "ADA Compliance", "Accessibility Standards", "Academic Support", "Web Accessibility", "Exam Proctoring", "Disability Services"]
    },
    {
      id: 2,
      company: "University of Wisconsin–Milwaukee",
      title: "Lead – Procurement Team, Restaurant Operations (Sandburg Docks)",
      period: "Jan 2024 – Aug 2024",
      duration: "8 months",
      location: "Milwaukee, WI",
      highlights: [
        "Led inventory, food orders, and vendor coordination for campus dining.",
        "Ensured cost-effective sourcing and compliance with university standards.",
        "Supervised and trained student staff."
      ],
      skills: ["Procurement Management", "Inventory Management", "Vendor Coordination", "Team Leadership", "Staff Training", "Cost Management", "Compliance"]
    },
    {
      id: 3,
      company: "University of Wisconsin–Milwaukee",
      title: "Procurement Assistant – Restaurant Operations (Sandburg Docks)",
      period: "Sep 2023 – Dec 2023",
      duration: "4 months",
      location: "Milwaukee, WI",
      highlights: [
        "Supported procurement and supply chain operations.",
        "Focused on ordering, tracking, and vendor communication for campus dining."
      ],
      skills: ["Procurement", "Supply Chain", "Order Management", "Vendor Communication", "Inventory Tracking"]
    },
    {
      id: 4,
      company: "Indian Servers – Software Development Company",
      title: "Machine Learning Intern",
      period: "Sep 2021 – Nov 2021",
      duration: "3 months",
      location: "Remote",
      highlights: [
        "Developed ML models including fake news detection using XGBoost.",
        "Integrated MediaPipe for real-time AI tracking.",
        "Applied deep learning techniques to optimize performance."
      ],
      skills: ["TensorFlow", "Machine Learning", "XGBoost", "MediaPipe", "Deep Learning", "AI Model Development", "Real-time Tracking", "Python", "Data Science"]
    },
    {
      id: 5,
      company: "Microsoft",
      title: "Microsoft Student Partner (MSP)",
      period: "Dec 2019 – Apr 2021",
      duration: "1 year 5 months",
      location: "Andhra Pradesh, India · On-site",
      highlights: [
        "Acted as a campus ambassador to promote Microsoft technologies.",
        "Organized workshops on Visual Studio, Office 365, and Microsoft tools.",
        "Built a student tech community and supported peer learning and development."
      ],
      skills: ["Microsoft Technologies", "Visual Studio", "Office 365", "Community Building", "Workshop Organization", "Technical Training", "Student Leadership"]
    }
  ];

  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    
    if (hash) {
      // Wait a bit for the component to render, then scroll to the section
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const lenis = window.lenis;
          if (lenis) {
            lenis.scrollTo(element.offsetTop, { duration: 1 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      // If no hash, scroll to top
      const lenis = window.lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 0 });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans relative overflow-hidden">



      {/* Education Section */}
      <section id="education" className="relative min-h-screen bg-black flex items-start justify-start 
                                         pt-8 sm:pt-12 md:pt-16 
                                         px-4 sm:px-6 md:px-8 
                                         pb-8 sm:pb-12 md:pb-16">
        <div className="container mx-auto max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-10 md:space-y-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 
                         font-black text-white leading-none tracking-tight uppercase
                         break-words">
              EDUCATION
            </h2>
            
            <div className="space-y-8">
              {educationData.map((edu, index) => (
                <motion.div
                  key={edu.id}
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
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                          {edu.institution}
                        </h3>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90 leading-tight mb-2">
                          {edu.degree}
                        </h4>
                        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 text-sm sm:text-base md:text-lg text-white/70">
                          <span>{edu.period}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="font-semibold">GPA: {edu.gpa}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-lg text-white/80">
                          <span className="font-semibold">Concentration:</span> {edu.concentration}
                        </div>
                        <p className="text-lg text-white/90 leading-relaxed">
                          {edu.highlights}
                        </p>
                        <div className="space-y-2">
                          <div className="text-lg text-white/80 font-semibold">
                            Key Skills:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {edu.skills.map((skill, skillIndex) => (
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

      {/* Experience Section */}
      <section id="experience" className="relative min-h-screen bg-black flex items-start justify-start pt-16 pl-8 pr-8 pb-16">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h3 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight uppercase">
              EXPERIENCE
            </h3>
            
            <div className="space-y-8">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={exp.id}
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
                                             <h4 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">
                         {exp.company}
                       </h4>
                       <h5 className="text-lg md:text-xl font-semibold text-white/90 leading-tight mb-2">
                         {exp.title}
                       </h5>
                       <div className="flex flex-wrap gap-4 text-lg text-white/70">
                         <span>{exp.period}</span>
                         <span>•</span>
                         <span>{exp.duration}</span>
                         <span>•</span>
                         <span>{exp.location}</span>
                       </div>
                    </div>
                    
                                         <div className="space-y-4">
                       <div className="space-y-3">
                         <div className="text-lg text-white/80 font-semibold">
                           Highlights:
                         </div>
                         <ul className="space-y-2 pl-4">
                           {exp.highlights.map((highlight, highlightIndex) => (
                             <li key={highlightIndex} className="text-lg text-white/90 leading-relaxed flex items-start">
                               <span className="text-white/60 mr-2 mt-2">•</span>
                               {highlight}
                             </li>
                           ))}
                         </ul>
                       </div>
                       
                       <div className="space-y-2">
                         <div className="text-lg text-white/80 font-semibold">
                           Key Skills:
                         </div>
                         <div className="flex flex-wrap gap-2">
                           {exp.skills.map((skill, skillIndex) => (
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

      {/* Skills & Achievements Section */}
      <section className="relative min-h-screen bg-black flex items-start justify-start pt-16 pl-8 pr-8 pb-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h4 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight uppercase">
              ACHIEVEMENTS & RECOGNITION
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="text-4xl font-bold text-white mb-4">
                    3.87/4.0
                  </div>
                  <div className="text-xl text-white/90">
                    Master's GPA
                  </div>
                </GlareHover>
              </motion.div>

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
                  <div className="text-4xl font-bold text-white mb-4">
                    8.7/10
                  </div>
                  <div className="text-xl text-white/90">
                    Bachelor's GPA
                  </div>
                </GlareHover>
              </motion.div>

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
                  <div className="text-4xl font-bold text-white mb-4">
                    2x
                  </div>
                  <div className="text-xl text-white/90">
                    Dean's Honor List
                  </div>
                </GlareHover>
              </motion.div>

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
                  <div className="text-4xl font-bold text-white mb-4">
                    1st
                  </div>
                  <div className="text-xl text-white/90">
                    Valorant Tournament
                  </div>
                </GlareHover>
              </motion.div>

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
                  <div className="text-4xl font-bold text-white mb-4">
                    MSP
                  </div>
                  <div className="text-xl text-white/90">
                    Microsoft Student Partner
                  </div>
                </GlareHover>
              </motion.div>

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
                  <div className="text-4xl font-bold text-white mb-4">
                    Dean's
                  </div>
                  <div className="text-xl text-white/90">
                    Scholarship Award
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

export default EduExp;
