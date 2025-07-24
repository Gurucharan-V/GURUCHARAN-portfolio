import React, { useState } from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

// Dropdown content for each section
const dropdownContent = {
  'Who I Am': {
    content: "I'm Gurucharan V, a creative developer and digital artist focused on building beautiful, interactive web experiences. I blend technology and art to craft unique digital products that leave lasting impressions.",
    details: [
      "Full-stack developer with expertise in React, Node.js, and modern web technologies",
      "Experience in 3D graphics, WebGL, and creative coding",
      "Strong background in UI/UX design and user experience optimization"
    ]
  },
  'What I Do': {
    content: "I specialize in creating immersive digital experiences that push the boundaries of web technology. From complex web applications to interactive 3D experiences, I bring ideas to life with code.",
    details: [
      "Web Development: React, Next.js, TypeScript, Node.js",
      "3D & Graphics: Three.js, WebGL, GLSL shaders",
      "Creative Coding: GSAP animations, Canvas API, generative art"
    ]
  },
  'My Journey': {
    content: "My path in technology began with curiosity about how things work. From tinkering with code to building full-scale applications, every project has been a stepping stone in my continuous learning journey.",
    details: [
      "Started coding at age 16, self-taught through online resources",
      "Completed multiple internships at tech startups",
      "Contributed to open-source projects and developer communities"
    ]
  },
  'My Values': {
    content: "I believe in creating technology that matters. Every line of code should serve a purpose, every design should enhance user experience, and every project should make a positive impact.",
    details: [
      "Quality over quantity - writing clean, maintainable code",
      "User-first approach - prioritizing accessibility and performance",
      "Continuous learning - staying updated with latest technologies"
    ]
  },
  // Additional content for custom items
  'Experience': {
    content: "With years of hands-on experience in web development, I've worked on diverse projects ranging from e-commerce platforms to interactive data visualizations.",
    details: [
      "Lead developer on multiple client projects",
      "Expertise in performance optimization and scalability",
      "Mentored junior developers and conducted code reviews"
    ]
  },
  'Skills': {
    content: "My technical skill set spans across frontend, backend, and creative technologies, allowing me to build complete solutions from concept to deployment.",
    details: [
      "Frontend: React, Vue, Angular, HTML5, CSS3, JavaScript/TypeScript",
      "Backend: Node.js, Python, PostgreSQL, MongoDB, REST APIs",
      "Tools: Git, Docker, AWS, Figma, Adobe Creative Suite"
    ]
  },
  'Projects': {
    content: "I've built a variety of projects that showcase my ability to combine technical expertise with creative vision.",
    details: [
      "Interactive 3D portfolio websites",
      "Real-time collaboration tools",
      "Data visualization dashboards"
    ]
  },
  'Contact': {
    content: "I'm always open to discussing new opportunities, collaborations, or just having a conversation about technology and design.",
    details: [
      "Email: gurucharan@example.com",
      "LinkedIn: linkedin.com/in/gurucharanvem",
      "GitHub: github.com/Gurucharan-V"
    ]
  }
};

function FlowingMenu({ items = Object.keys(dropdownContent).slice(0, 4) }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemClick = (text) => {
    setExpandedItem(expandedItem === text ? null : text);
  };

  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem 
            key={idx} 
            text={item}
            isExpanded={expandedItem === item}
            onClick={() => handleItemClick(item)}
            dropdownData={dropdownContent[item] || {
              content: `Learn more about ${item}`,
              details: [`More information about ${item} coming soon...`]
            }}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ text, isExpanded, onClick, dropdownData }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);
  const dropdownRef = React.useRef(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  React.useEffect(() => {
    if (dropdownRef.current) {
      if (isExpanded) {
        gsap.set(dropdownRef.current, { height: 'auto', opacity: 1 });
        const height = dropdownRef.current.offsetHeight;
        gsap.fromTo(dropdownRef.current, 
          { height: 0, opacity: 0 },
          { height, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
      } else {
        gsap.to(dropdownRef.current, { 
          height: 0, 
          opacity: 0, 
          duration: 0.4, 
          ease: 'power2.in' 
        });
      }
    }
  }, [isExpanded]);

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current || isExpanded) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current || isExpanded) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{text}</span>
      <div className="marquee__dot" />
    </React.Fragment>
  ));

  return (
    <div className={`menu__item ${isExpanded ? 'expanded' : ''}`} ref={itemRef}>
      <button
        className="menu__item-link"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
        <span className="menu__item-arrow">{isExpanded ? '−' : '+'}</span>
      </button>
      
      <div className="menu__dropdown" ref={dropdownRef}>
        <div className="menu__dropdown-content">
          <p className="menu__dropdown-main">{dropdownData?.content}</p>
          <ul className="menu__dropdown-details">
            {dropdownData?.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;