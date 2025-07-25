import React, { useState } from 'react';
import HeroText from './HeroText';

const EduExp = () => {
  const [activeSection, setActiveSection] = useState('education');

  const educationData = [
    {
      degree: "MASTER OF SCIENCE (MS) - INFORMATION TECHNOLOGY (STEM)",
      institution: "UNIVERSITY OF WISCONSIN-MILWAUKEE",
      period: "Sep 2023 - May 2025",
      description: "Completed a 30-credit program focused on ML, data systems, cybersecurity, and cloud technologies.",
      concentration: "AI, Data Analytics, Business Intelligence",
      gpa: "3.87/4.0",
      logo: "UWM"
    },
    {
      degree: "BACHELOR OF TECHNOLOGY (BTECH) - COMPUTER SCIENCE & ENGINEERING",
      institution: "NBKR INSTITUTE OF SCIENCE AND TECHNOLOGY",
      period: "Sep 2018 - May 2022",
      description: "Comprehensive program covering core computer science principles and modern software development.",
      concentration: "Data Structures, Algorithms, Operating Systems, OOP, Computer Networks, DBMS",
      gpa: "8.7/10",
      logo: "NBKR"
    }
  ];

  const experienceData = [
    {
      title: "SOFTWARE ENGINEER",
      company: "TECH COMPANY",
      period: "2023 - Present",
      location: "Milwaukee, WI",
      description: "Developed full-stack applications using modern technologies."
    },
    {
      title: "DEVELOPER INTERN",
      company: "STARTUP",
      period: "2022 - 2023",
      location: "Remote",
      description: "Worked on frontend development and user experience improvements."
    }
  ];

  return (
    <main className="relative min-h-screen bg-background text-white font-sans overflow-hidden">
      {/* Subtle background overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-16 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-24 right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Sliding Container */}
      <div className={`relative z-10 h-screen flex transition-transform duration-700 ease-in-out ${
        activeSection === 'education' ? 'translate-x-0' : '-translate-x-[calc(100vw-280px)]'
      }`}>
        
        {/* Education Section - Full Width */}
        <div className="w-screen h-full flex-shrink-0">
          <div className="flex h-full">
            {/* Education Heading */}
            <div className="w-1/2 flex items-start pt-16 md:pt-24 lg:pt-32 pl-4 md:pl-8 lg:pl-12">
              <HeroText text="EDUCATION" className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl" />
            </div>
            
            {/* Education Content */}
            <div className="w-1/2 flex flex-col justify-center pr-8 md:pr-16 lg:pr-24">
              <div className="space-y-8">
                {educationData.map((edu, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                      <span className="text-white font-bold text-xs">{edu.logo}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-bold text-primary leading-tight">{edu.degree}</h3>
                      <p className="text-base font-medium text-white/90">{edu.institution}</p>
                      <p className="text-sm text-secondary">{edu.period}</p>
                      <p className="text-sm text-white/80 leading-relaxed">{edu.description}</p>
                      {edu.concentration && (
                        <p className="text-xs text-secondary">Concentration: {edu.concentration}</p>
                      )}
                      {edu.gpa && (
                        <p className="text-xs text-secondary">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section - Full Width */}
        <div className="w-screen h-full flex-shrink-0">
          <div className="flex h-full">
            {/* Experience Heading */}
            <div className="w-1/2 flex items-start pt-16 md:pt-24 lg:pt-32 pl-4 md:pl-8 lg:pl-12">
              <HeroText text="EXPERIENCE" className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl" />
            </div>
            
            {/* Experience Content */}
            <div className="w-1/2 flex flex-col justify-center pr-8 md:pr-16 lg:pr-24">
              <div className="space-y-6">
                {experienceData.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-bold text-primary">{exp.title}</h3>
                    <p className="text-base font-medium text-white/90">{exp.company}</p>
                    <p className="text-sm text-secondary">{exp.period} — {exp.location}</p>
                    <p className="text-sm text-white/80 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Navigation - Changes based on active section */}
      {activeSection === 'education' && (
        <div className="fixed right-0 top-0 h-full w-16 bg-black/20 backdrop-blur-sm border-l border-white/10 flex items-center justify-center z-30">
          <button
            onClick={() => setActiveSection('experience')}
            className="writing-mode-vertical transform rotate-90 text-lg font-bold text-white/60 hover:text-white transition-all duration-300"
          >
            EXPERIENCE
          </button>
        </div>
      )}
      
      {activeSection === 'experience' && (
        <div className="fixed left-0 top-0 h-full w-16 bg-black/20 backdrop-blur-sm border-r border-white/10 flex items-center justify-center z-30">
          <button
            onClick={() => setActiveSection('education')}
            className="writing-mode-vertical transform rotate-90 text-lg font-bold text-white/60 hover:text-white transition-all duration-300"
          >
            EDUCATION
          </button>
        </div>
      )}
    </main>
  );
};

export default EduExp; 