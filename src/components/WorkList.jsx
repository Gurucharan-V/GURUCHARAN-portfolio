import React from "react";

const workItems = [
  { name: "GURUCHARAN V" },
  { name: "EDUCATION" },
  { name: "EXPERIENCE" },
  { name: "PROJECTS" },
  { name: "LINKEDIN", link: "https://www.linkedin.com/in/gurucharanvem/" },
  { name: "GITHUB", link: "https://github.com/Gurucharan-V" },
  { name: "CONTACT" },
  { name: "RESUME" },
  { name: "SKILLS" },
];

export default function WorkList() {
  return (
    <div>
      {workItems.map((item) => (
        <h1 key={item.name} style={{ fontWeight: 900, fontSize: '2.5rem', margin: '0.5em 0', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
          {item.link ? (
            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{item.name}</a>
          ) : (
            item.name
          )}
        </h1>
      ))}
    </div>
  );
} 