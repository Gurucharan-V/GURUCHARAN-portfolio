import React, { useState, useEffect, useRef } from 'react';
import projectsData from './projects.json';
import './VintageTerminal.css';

const VintageTerminal = () => {
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Boot sequence messages (fast boot)
  const bootMessages = [
    'BIOS Version 2.0.1',
    'Loading kernel...',
    'Mounting filesystems...',
    'System ready.',
    ''
  ];

  // Available commands with easter eggs
  const commands = {
    help: () => {
      const baseCommands = [
        'Available commands:',
        '  help          - Show this help message',
        '  clear         - Clear terminal screen',
        '  ls            - List all projects',
        '  cat [project] - Show project details (e.g., cat 1)',
        '  about         - Show system information',
        '  skills        - Show project/skills table',
        '  exit          - Exit terminal',
        '  scan          - Run system diagnostics',
        '  date          - Show current date and time',
        '  whoami        - Show current user',
        '  sudo          - Execute command as superuser',
        ''
      ];
      
      const easterEggCommands = [
        '  matrix        - Enter the Matrix',
        '  fortune       - Get a random fortune',
        '  cowsay        - Make a cow say something',
        '  sl            - Steam locomotive',
        '  telnet        - Connect to remote host',
        '  ping          - Test network connectivity',
        '  top           - Show system processes',
        '  ps            - Show running processes',
        '  kill          - Terminate processes',
        '  chmod         - Change file permissions',
        '  rm            - Remove files (use with caution!)',
        ''
      ];
      
      return isMobile ? baseCommands : [...baseCommands, ...easterEggCommands];
    },
    clear: () => {
      setTerminalOutput([]);
      return [];
    },
    ls: () => {
      const output = [
        'AVAILABLE PROJECTS',
        '='.repeat(40),
        ''
      ];
      
      projectsData.forEach((project, index) => {
        output.push(`${index + 1}. ${project.title}`);
        output.push(`   Duration: ${project.duration}`);
        output.push(`   Institution: ${project.institution}`);
        output.push(''); // Empty line between projects
      });
      
      output.push(`Total: ${projectsData.length} projects`);
      output.push('Use "cat [number]" to view project details');
      output.push('');
      
      return output;
    },
    cat: (args) => {
      if (!args || args.length === 0) {
        return ['Usage: cat [project_number]', 'Example: cat 1', ''];
      }
      const projectIndex = parseInt(args[0]) - 1;
      if (projectIndex >= 0 && projectIndex < projectsData.length) {
        const project = projectsData[projectIndex];
        
        // Format skills as JSON array
        const formattedSkills = [
          '    "skills": [',
          ...project.skills.map((skill, index) => {
            const isLast = index === project.skills.length - 1;
            return `      "${skill}"${isLast ? '' : ','}`;
          }),
          '    ]'
        ].join('\n');
        
        // Mobile-friendly formatting
        const output = [
          '='.repeat(50),
          `PROJECT ${projectIndex + 1}`,
          '='.repeat(50),
          '',
          '{',
          `  "title": "${project.title}",`,
          `  "duration": "${project.duration}",`,
          `  "institution": "${project.institution}",`,
          '  "description": ',
          `    "${project.description.replace(/"/g, '\\"')}",`,
          '',
          formattedSkills,
          '}',
          '',
          '='.repeat(50),
          ''
        ];
        
        return output;
      }
      return [`Project ${args[0]} not found. Use 'ls' to see available projects.`, ''];
    },
    about: () => [
      'VINTAGE TERMINAL v1.0',
      'Terminal simulation with vintage aesthetics',
      'Green phosphor display with scan lines',
      'CRT monitor simulation enabled',
      '',
      'System specs:',
      '  CPU: Intel i7',
      '  RAM: 32GB',
      '  GPU: RTX',
      '  OS: VINTAGE TERMINAL v1.0',
      ''
    ],
    skills: () => {
      const output = [
        'PROJECT SKILLS OVERVIEW',
        '='.repeat(50),
        ''
      ];
      
      // Create JSON-like structure
      output.push('{');
      
      projectsData.forEach((project, index) => {
        const isLast = index === projectsData.length - 1;
        output.push(`  "project_${index + 1}": {`);
        output.push(`    "title": "${project.title}",`);
        output.push(`    "duration": "${project.duration}",`);
        output.push(`    "institution": "${project.institution}",`);
        output.push('    "skills": [');
        
        // Format skills as JSON array
        project.skills.forEach((skill, skillIndex) => {
          const isLastSkill = skillIndex === project.skills.length - 1;
          output.push(`      "${skill}"${isLastSkill ? '' : ','}`);
        });
        
        output.push('    ]');
        output.push(`  }${isLast ? '' : ','}`);
      });
      
      output.push('}');
      output.push('');
      output.push(`Total Projects: ${projectsData.length}`);
      output.push('');
      
      return output;
    },
    scan: () => [
      'Running system diagnostics...',
      'Scanning memory sectors...',
      'Checking file system integrity...',
      'Verifying network connectivity...',
      'Analyzing performance metrics...',
      '',
      'System Status:',
      '  Memory: 87% available',
      '  CPU: 23% utilization',
      '  Disk: 45% used',
      '  Network: Connected',
      '  Terminal: Operational',
      '',
      'All systems operational.',
      ''
    ],
    date: () => {
      const now = new Date();
      return [
        `Current date and time: ${now.toLocaleString()}`,
        `UTC: ${now.toUTCString()}`,
        `Unix timestamp: ${Math.floor(now.getTime() / 1000)}`,
        ''
      ];
    },
    whoami: () => [
      'Current user: guest',
      'User ID: 1000',
      'Groups: users, guest',
      'Home directory: /home/guest',
      'Shell: /bin/zsh',
      ''
    ],
    sudo: (args) => {
      if (!args || args.length === 0) {
        return ['usage: sudo <command>', 'Try: sudo --help for more information.', ''];
      }
      const command = args.join(' ');
      if (command.includes('su') || command.includes('su -')) {
        return [
          'sudo: su: command not found',
          'sudo: unable to execute su: No such file or directory',
          ''
        ];
      }
      if (command.includes('rm -rf /')) {
        return [
          'sudo: rm: refusing to remove /',
          'sudo: rm: this would delete the entire filesystem',
          'sudo: rm: use --no-preserve-root to override this safety feature',
          ''
        ];
      }
      return [
        '[sudo] password for guest: ',
        '***',
        `sudo: ${command}: command not found`,
        ''
      ];
    },
    fortune: () => {
      const fortunes = [
        'A bug in the hand is better than one as yet undetected.',
        'A computer scientist is someone who fixes things that aren\'t broken.',
        'A journey of a thousand miles begins with a single step.',
        'A program is never less than 90% complete, and never more than 95% complete.',
        'All programs are benign until proven malignant.',
        'Any program that runs right is obsolete.',
        'Computers are like air conditioners. They stop working when you open Windows.',
        'Debugging is twice as hard as writing the code in the first place.',
        'Don\'t comment bad code - rewrite it.',
        'Good programmers write code that humans can understand.',
        'Hardware: The parts of a computer that can be kicked.',
        'If at first you don\'t succeed, call it version 1.0.',
        'If debugging is the process of removing bugs, then programming must be the process of putting them in.',
        'It\'s not a bug - it\'s an undocumented feature.',
        'Life is too short for proprietary software.',
        'Make it work, make it right, make it fast.',
        'Real programmers don\'t comment their code. If it was hard to write, it should be hard to understand.',
        'Software is like entropy: It is difficult to grasp, weighs nothing, and obeys the Second Law of Thermodynamics; i.e., it always increases.',
        'The best way to predict the future is to implement it.',
        'The only way to learn a new programming language is by writing programs in it.',
        'There are two ways to write error-free programs; only the third one works.',
        'Unix is user-friendly. It\'s just very particular about who its friends are.',
        'When in doubt, use brute force.',
        'You can\'t have great software without a great team.',
        'Your most unhappy customers are your greatest source of learning.'
      ];
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      return [
        randomFortune,
        ''
      ];
    },
    cowsay: (args) => {
      const message = args && args.length > 0 ? args.join(' ') : 'Hello from the terminal!';
      return [
        message,
        ''
      ];
    },
    matrix: () => {
      return [
        'Wake up, Neo...',
        'The Matrix has you...',
        'Follow the white rabbit.',
        '',
        'Knock, knock, Neo.',
        '',
        'The Matrix is everywhere. It is all around us. Even now, in this very room.',
        'You can see it when you look out your window or when you turn on your television.',
        'You can feel it when you go to work... when you go to church... when you pay your taxes.',
        'It is the world that has been pulled over your eyes to blind you from the truth.',
        '',
        'That you are a slave, Neo. Like everyone else you were born into bondage.',
        'Into a prison that you cannot taste or see or touch. A prison for your mind.',
        '',
        'Unfortunately, no one can be... told what the Matrix is. You have to see it for yourself.',
        '',
        'This is your last chance. After this, there is no turning back.',
        'You take the blue pill - the story ends, you wake up in your bed and believe whatever you want to believe.',
        'You take the red pill - you stay in Wonderland and I show you how deep the rabbit-hole goes.',
        '',
        'Remember: all I\'m offering is the truth. Nothing more.',
        ''
      ];
    },

    sl: () => {
      return [
        'Steam Locomotive Animation:',
        'Choo choo! The steam locomotive has passed by.',
        'Type "sl" again to see it again!',
        ''
      ];
    },
    ping: (args) => {
      const target = args && args.length > 0 ? args[0] : 'google.com';
      return [
        `PING ${target} (142.250.190.78) 56(84) bytes of data.`,
        '64 bytes from 142.250.190.78: icmp_seq=1 time=15.2 ms',
        '64 bytes from 142.250.190.78: icmp_seq=2 time=14.8 ms',
        '64 bytes from 142.250.190.78: icmp_seq=3 time=16.1 ms',
        '64 bytes from 142.250.190.78: icmp_seq=4 time=15.5 ms',
        '',
        `--- ${target} ping statistics ---`,
        '4 packets transmitted, 4 received, 0% packet loss, time 3003ms',
        'rtt min/avg/max/mdev = 14.800/15.400/16.100/0.500 ms',
        ''
      ];
    },
    top: () => {
      return [
        'top - 14:30:25 up 2 days,  3:15,  1 user,  load average: 0.52, 0.48, 0.45',
        'Tasks: 125 total,   1 running, 124 sleeping,   0 stopped,   0 zombie',
        '%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.3 id,  0.2 wa,  0.0 hi,  0.0 si,  0.0 st',
        'MiB Mem :  32768.0 total,  25216.0 free,   4096.0 used,   3456.0 buff/cache',
        'MiB Swap:   8192.0 total,   8192.0 free,      0.0 used.  28160.0 avail Mem',
        '',
        '    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND',
        '   1234 root      20   0  1234567  12345   1234 S   2.3   0.4   0:15.23 systemd',
        '   1235 root      20   0  1234567  12345   1234 S   1.8   0.3   0:12.45 kthreadd',
        '   1236 root      20   0  1234567  12345   1234 S   1.2   0.2   0:08.12 kworker/0:0',
        '   1237 root      20   0  1234567  12345   1234 S   0.8   0.1   0:05.67 kworker/0:1',
        '   1238 root      20   0  1234567  12345   1234 S   0.5   0.1   0:03.45 kworker/0:2',
        ''
      ];
    },
    ps: () => {
      return [
        '    PID TTY          TIME CMD',
        '   1234 pts/0    00:00:00 bash',
        '   1235 pts/0    00:00:00 ps',
        '   1236 pts/0    00:00:00 top',
        '   1237 pts/0    00:00:00 htop',
        '   1238 pts/0    00:00:00 nano',
        '   1239 pts/0    00:00:00 vim',
        '   1240 pts/0    00:00:00 git',
        '   1241 pts/0    00:00:00 node',
        '   1242 pts/0    00:00:00 npm',
        '   1243 pts/0    00:00:00 python',
        ''
      ];
    },
    kill: (args) => {
      if (!args || args.length === 0) {
        return ['usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]', ''];
      }
      const pid = args[0];
      return [
        `kill: cannot kill process ${pid}: No such process`,
        `kill: cannot kill process ${pid}: Operation not permitted`,
        ''
      ];
    },
    chmod: (args) => {
      if (!args || args.length < 2) {
        return ['usage: chmod [OPTION]... MODE[,MODE]... FILE...', 'Try \'chmod --help\' for more information.', ''];
      }
      return [
        `chmod: changing permissions of '${args[1]}': Operation not permitted`,
        `chmod: cannot access '${args[1]}': No such file or directory`,
        ''
      ];
    },
    rm: (args) => {
      if (!args || args.length === 0) {
        return ['usage: rm [OPTION]... FILE...', 'Try \'rm --help\' for more information.', ''];
      }
      if (args.includes('-rf') && args.includes('/')) {
        return [
          'rm: it is dangerous to operate recursively on \'/\'',
          'rm: use --no-preserve-root to override this safety feature',
          ''
        ];
      }
      return [
        `rm: cannot remove '${args[0]}': No such file or directory`,
        `rm: cannot remove '${args[0]}': Permission denied`,
        ''
      ];
    },
    telnet: (args) => {
      const target = args && args.length > 0 ? args[0] : 'localhost';
      return [
        `Trying ${target}...`,
        `telnet: connect to address ${target}: Connection refused`,
        `telnet: Unable to connect to remote host`,
        ''
      ];
    }
  };

  // Boot sequence effect
  useEffect(() => {
    if (isBooting) {
      setTerminalOutput([]); // Clear output before starting boot
      let messageIndex = 0;
      const bootInterval = setInterval(() => {
        if (messageIndex < bootMessages.length) {
          setTerminalOutput(prev => [...prev, bootMessages[messageIndex]]);
          messageIndex++;
        } else {
          setIsBooting(false);
          clearInterval(bootInterval);
          // After boot, show welcome message
          setTimeout(() => {
            setTerminalOutput(prev => [...prev, '']);
            setTerminalOutput(prev => [...prev, 'Welcome to VINTAGE TERMINAL v1.0']);
            setTerminalOutput(prev => [...prev, 'Type "help" for available commands.']);
            setTerminalOutput(prev => [...prev, '']);
          }, 100);
        }
      }, 20);
    }
  }, [isBooting]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Handle command execution
  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const [command, ...args] = trimmedCmd.split(' ');
    const commandLower = command.toLowerCase();

    // Add command to output
    setTerminalOutput(prev => [...prev, `$ ${trimmedCmd}`]);

    // Check for easter egg commands on mobile
    const easterEggCommands = ['matrix', 'fortune', 'cowsay', 'sl', 'telnet', 'ping', 'top', 'ps', 'kill', 'chmod', 'rm'];
    if (isMobile && easterEggCommands.includes(commandLower)) {
      setTerminalOutput(prev => [...prev, `Command not available on mobile: ${command}`, 'Type "help" for available commands.', '']);
      setCommandHistory(prev => [...prev, trimmedCmd]);
      setHistoryIndex(-1);
      return;
    }

    // Execute command
    if (commands[commandLower]) {
      const output = commands[commandLower](args);
      if (output instanceof Promise) {
        output.then(res => setTerminalOutput(prev => [...prev, ...res]));
      } else {
        setTerminalOutput(prev => [...prev, ...output]);
      }
    } else if (commandLower === 'exit') {
      // Handle exit command
      setTerminalOutput(prev => [...prev, 'Shutting down terminal...', '']);
      
      // Safely handle fullscreen exit with error handling
      const exitFullscreen = async () => {
        try {
          if (document.fullscreenElement && document.exitFullscreen) {
            await document.exitFullscreen();
          } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
            await document.webkitExitFullscreen();
          } else if (document.msFullscreenElement && document.msExitFullscreen) {
            await document.msExitFullscreen();
          }
        } catch (error) {
          console.log('Fullscreen exit failed:', error.message);
        }
      };
      
      exitFullscreen().then(() => {
        setTimeout(() => {
          window.history.back();
        }, 1000);
      });
    } else {
      setTerminalOutput(prev => [...prev, `Command not found: ${command}`, 'Type "help" for available commands.', '']);
    }

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);
  };

  // List of available command names for autocompletion
  const easterEggCommands = ['matrix', 'fortune', 'cowsay', 'sl', 'telnet', 'ping', 'top', 'ps', 'kill', 'chmod', 'rm'];
  const commandList = Object.keys(commands).filter(cmd => !isMobile || !easterEggCommands.includes(cmd));

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Autocomplete logic
      const trimmed = currentCommand.trim();
      if (trimmed.length === 0) return;
      const matches = commandList.filter(cmd => cmd.startsWith(trimmed));
      if (matches.length === 1) {
        setCurrentCommand(matches[0] + ' ');
      } else if (matches.length > 1) {
        setTerminalOutput(prev => [...prev, ...matches]);
      }
    }
  };

  // Focus input on mount
  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isBooting]);

  return (
    <div className="vintage-terminal" data-testid="vintage-terminal">
      <div className="terminal-screen" data-testid="terminal-screen">
        <div className="scan-lines" data-testid="scan-lines"></div>
        <div className="terminal-content" ref={terminalRef} data-testid="terminal-content">
          {terminalOutput.map((line, index) => (
            <div key={index} className="terminal-line" data-testid="terminal-line">
              {line}
            </div>
          ))}
          {!isBooting && (
            <div className="command-line" data-testid="command-line">
              <span className="prompt" data-testid="terminal-prompt">guest@vintage:~$ </span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyPress}
                className="command-input"
                data-testid="command-input"
                autoFocus
              />
              <span className={`cursor ${cursorVisible ? 'visible' : ''}`} data-testid="terminal-cursor">█</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VintageTerminal; 