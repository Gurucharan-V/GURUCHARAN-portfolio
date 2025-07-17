// ===================================
// Command Definitions Module
// ===================================

const IS_MOBILE = window.matchMedia('(max-width: 768px)').matches;

export const COMMANDS = {
    help: () => {
         // NEW: Added a data-attribute to make the disabled snake command stylable with CSS
         const snakeCmd = IS_MOBILE ? `<span data-disabled="true">snake</span>` : `<span>snake</span>`;
         return `<p>Available commands:</p><div class="command-grid"><span>about</span><span>skills</span><span>projects</span><span>social</span><span>contact</span>${snakeCmd}<span>clear</span><span>sudo su</span><span>kill</span></div>`;
    },
    // The actual logic for these commands is in script.js because they modify state or the DOM.
    // These entries are here so the commands are recognized by the system.
    sound: () => `<p>Usage: sound [on|off]</p>`,
    theme: (args) => {
        const themeName = args[0];
        const THEME_LIST = ['dark', 'light', 'matrix'];
        if (themeName && THEME_LIST.includes(themeName)) return `<p>Theme set to ${themeName}.</p>`;
        return `<p>Theme '${themeName}' not found. Available: ${THEME_LIST.join(', ')}.</p>`;
    },
    kill: () => `<p style="color: #bf616a;">Access denied. This command requires root privileges.<br>Hint: Gain root access with 'sudo su'.</p>`,
    
    // Static commands that just return HTML
    hello: `<p>Greetings, fellow traveler of the digital cosmos!</p>`,
    about: `<p>Hi, I'm Islem! A software developer with a passion for creating beautiful and functional web applications.</p>`,
    skills: `<p>My technical skills include:<ul><li><strong>Languages:</strong> JavaScript, TypeScript, Python, HTML/CSS</li><li><strong>Frameworks:</strong> React, Next.js, Node.js, Express</li><li><strong>Tools:</strong> Git, Docker, Webpack, Vercel</li></ul>`,
    projects: `<p>Key Projects:</p><ul><li><strong>LiveTerm Portfolio:</strong> This interactive terminal! (<a href='https://github.com/cveinnt/LiveTerm' target='_blank'>Repo</a>)</li><li><strong>Project Two:</strong> A full-stack e-commerce platform with a custom CMS.</li><li><strong>Project Three:</strong> A real-time chat application using WebSockets.</li></ul>`,
    social: `<p>Find me on:</p><ul><li><a href="https://github.com/islem-maboud" target="_blank" class="social-link"><span class="pixel-icon">[G]</span> github.com/islem-maboud</a></li><li><a href="https://linkedin.com/in/islem-maboud" target="_blank" class="social-link"><span class="pixel-icon">[L]</span> linkedin.com/in/islem-maboud</a></li></ul>`,
    contact: `<p>Get in touch via email: <a href="mailto:islem.maboud@gmail.com">islem.maboud@gmail.com</a></p>`,
    sudo: (args) => args.length === 0 ? `<p>sudo: missing operand</p>` : `<p>Permission denied: user welcome is not in the sudoers file. This incident will be reported.</p>`,
};

export const ALIASES = { 'ls': 'help', 'cat': 'about', 'hi': 'hello' };