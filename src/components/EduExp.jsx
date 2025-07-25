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
    <main className="relative w-screen h-screen bg-background text-white font-sans overflow-hidden">
      {/* Subtle background overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-16 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-24 right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full">
        
        {/* Education Section */}
        <div className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
          activeSection === 'education' ? 'translate-x-0' : '-translate-x-[85%]'
        }`}>
          <div className="flex h-full">
            {/* Left Side - Education Heading */}
            <div className="w-1/2 flex items-start pt-16 md:pt-24 lg:pt-32 pl-4 md:pl-8 lg:pl-12 overflow-hidden">
              <div className="transform -skew-x-12">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none">
                  EDUCATION
                </h1>
              </div>
            </div>
            
            {/* Right Side - Education Content */}
            <div className="w-1/2 flex flex-col justify-center px-4 md:px-8 lg:px-12 overflow-y-auto">
              <div className="space-y-6 py-8">
                {educationData.map((edu, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    {/* Logo */}
                    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                      <span className="text-white font-bold text-xs">{edu.logo}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-1">
                      <h3 className="text-base md:text-lg font-bold text-primary leading-tight">{edu.degree}</h3>
                      <p className="text-sm md:text-base font-medium text-white/90">{edu.institution}</p>
                      <p className="text-xs md:text-sm text-secondary">{edu.period}</p>
                      <p className="text-xs md:text-sm text-white/80 leading-relaxed">{edu.description}</p>
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

        {/* Experience Section */}
        <div className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
          activeSection === 'experience' ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex h-full">
            {/* Left Side - Experience Heading */}
            <div className="w-1/2 flex items-start pt-16 md:pt-24 lg:pt-32 pl-4 md:pl-8 lg:pl-12 overflow-hidden">
              <div className="transform -skew-x-12">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none">
                  EXPERIENCE
                </h1>
              </div>
            </div>
            
            {/* Right Side - Experience Content */}
            <div className="w-1/2 flex flex-col justify-center px-4 md:px-8 lg:px-12 overflow-y-auto">
              <div className="space-y-6 py-8">
                {experienceData.map((exp, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="text-base md:text-lg font-bold text-primary">{exp.title}</h3>
                    <p className="text-sm md:text-base font-medium text-white/90">{exp.company}</p>
                    <p className="text-xs md:text-sm text-secondary">{exp.period} — {exp.location}</p>
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side Footer Bar - Now with both navigation options */}
        <div className="absolute right-0 top-0 h-full w-16 bg-black/20 backdrop-blur-sm border-l border-white/10 flex flex-col items-center justify-center space-y-8">
          <button
            onClick={() => setActiveSection('education')}
            className={`writing-mode-vertical transform rotate-90 text-sm font-bold transition-all duration-300 ${
              activeSection === 'education' 
                ? 'text-primary' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            EDUCATION
          </button>
          <button
            onClick={() => setActiveSection('experience')}
            className={`writing-mode-vertical transform rotate-90 text-sm font-bold transition-all duration-300 ${
              activeSection === 'experience' 
                ? 'text-primary' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            EXPERIENCE
          </button>
        </div>
      </div>
    </main>
  );
};

export default EduExp; 