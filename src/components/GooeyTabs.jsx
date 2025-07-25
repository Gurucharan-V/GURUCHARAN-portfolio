import React from 'react';
import uwmLogo from './uwm.png';
import nbkrLogo from './nbkr.png';

const GooeyTabs = ({ education }) => {
  // Helper to select the right image
  const getImage = (degree) => {
    if (/master/i.test(degree)) return uwmLogo;
    if (/bachelor/i.test(degree)) return nbkrLogo;
    return null;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 md:p-8 font-sans text-xs sm:text-sm md:text-base bg-transparent">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {education.map((edu, index) => (
          <div
            key={index}
            className="bg-surface rounded-lg p-6 shadow-lg border border-border flex items-center justify-between"
          >
            {/* Card content on the left */}
            <div className="flex-1 space-y-2 pr-4">
              <div className="text-2xl md:text-3xl font-bold mb-2">{edu.degree}</div>
              <div className="text-lg md:text-xl font-medium mb-1">{edu.institution}</div>
              <div className="text-sm text-secondary mb-2">{edu.period}</div>
              <div className="text-base mb-1">{edu.description}</div>
              {edu.concentration && (
                <div className="text-base text-secondary mb-1">Concentration: {edu.concentration}</div>
              )}
              {edu.gpa && (
                <div className="text-base text-secondary">GPA: {edu.gpa}</div>
              )}
            </div>
            {/* Image on the right */}
            {getImage(edu.degree) && (
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-white border border-black/10 rounded">
                <img
                  src={getImage(edu.degree)}
                  alt={/master/i.test(edu.degree) ? 'UWM logo' : 'NBKR logo'}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GooeyTabs; 