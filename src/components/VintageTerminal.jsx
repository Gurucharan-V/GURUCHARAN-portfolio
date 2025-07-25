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
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Boot sequence messages (realistic fake boot)
  const bootMessages = [
    'BIOS Version 2.0.1',
    'Copyright (C) 1985-2024 Phoenix Technologies Ltd.',
    'All Rights Reserved.',
    '',
    'Phoenix - AwardBIOS v6.00PG',
    'An Energy Star Ally',
    'Copyright (C) 1984-2024 Phoenix Technologies Ltd.',
    '',
    'CPU: Intel(R) Core(TM) i7-12700K @ 3.60GHz',
    'Memory Test: 32768K OK',
    'Memory: 32768K Base Memory, 0K Extended Memory',
    '',
    'Detecting IDE drives...',
    'Primary Master: WDC WD1003FZEX-00K3CA0 1000.2GB',
    'Primary Slave: None',
    'Secondary Master: None',
    'Secondary Slave: None',
    '',
    'Detecting SCSI drives...',
    'SCSI Device 0: None',
    '',
    'Initializing USB Controllers...',
    'USB Controller 1: Intel(R) USB 3.0 eXtensible Host Controller',
    'USB Controller 2: Intel(R) USB 3.0 eXtensible Host Controller',
    '',
    'Loading Operating System...',
    '',
    'GRUB version 2.06',
    'Minimal BASH-like line editing is supported.',
    'For the first word, TAB lists possible command completions.',
    'Anywhere else TAB lists possible device or file completions.',
    '',
    'grub> boot',
    '',
    'Loading Linux kernel...',
    'Loading initial ramdisk...',
    '',
    'Linux version 5.15.0-generic (buildd@lgw01-amd64-038)',
    'Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-generic root=UUID=12345678-1234-1234-1234-123456789012 ro quiet splash',
    '',
    'Dentry cache hash table entries: 2097152 (order: 12, 16777216 bytes, linear)',
    'Inode-cache hash table entries: 1048576 (order: 11, 8388608 bytes, linear)',
    'mem auto-init: stack:byref_all, heap:byref_all, heap:init_all',
    'Memory: 32040960K/33554432K available (16384K kernel code, 3120K rwdata, 6304K rodata, 16384K init, 16384K bss, 1513472K reserved, 0K cma-reserved)',
    'SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=16, Nodes=1',
    'Kernel/User page tables isolation: enabled',
    'CPU: Physical Processor ID: 0',
    'CPU: Processor Core ID: 0',
    'CPU: L1 Data cache: 32K, L1 Instruction cache: 32K',
    'CPU: L2 cache: 256K',
    'CPU: L3 cache: 24576K',
    '',
    'Loading modules...',
    '[   0.123456] Loading module: ext4',
    '[   0.234567] Loading module: xfs',
    '[   0.345678] Loading module: btrfs',
    '[   0.456789] Loading module: overlay',
    '',
    'Mounting root filesystem...',
    '[   1.234567] EXT4-fs (sda1): mounted filesystem with ordered data mode. Opts: (null)',
    '',
    'Starting system services...',
    '[   2.345678] systemd[1]: systemd 249.11-0ubuntu3.6 running in system mode',
    '[   2.456789] systemd[1]: Detected virtualization kvm.',
    '[   2.567890] systemd[1]: Detected architecture x86-64.',
    '',
    'Initializing network...',
    '[   3.678901] e1000e: Intel(R) PRO/1000 Network Driver',
    '[   3.789012] e1000e: Copyright(c) 1999-2015 Intel Corporation.',
    '[   3.890123] e1000e 0000:00:1f.6: Intel(R) PRO/1000 Network Connection',
    '',
    'Loading user environment...',
    '[   4.901234] systemd[1]: Started User Manager for UID 1000.',
    '[   4.912345] systemd[1]: Starting Session 1 of user guest.',
    '',
    'System boot complete.',
    '',
    'Welcome to VINTAGE TERMINAL v1.0',
    'Type "help" for available commands.',
    ''
  ];

  // Available commands (no contact, github, linkedin, resume, or portfolio info)
  const commands = {
    help: () => [
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
      ''
    ],
    clear: () => {
      setTerminalOutput([]);
      return [];
    },
    ls: () => {
      const projectList = projectsData.map((project, index) => 
        `${index + 1}. ${project.title}`
      );
      return ['Projects:', ...projectList, ''];
    },
    cat: (args) => {
      if (!args || args.length === 0) {
        return ['Usage: cat [project_number]', 'Example: cat 1', ''];
      }
      const projectIndex = parseInt(args[0]) - 1;
      if (projectIndex >= 0 && projectIndex < projectsData.length) {
        const project = projectsData[projectIndex];
        return [
          `Project: ${project.title}`,
          `Duration: ${project.duration}`,
          `Institution: ${project.institution}`,
          '',
          'Description:',
          project.description,
          '',
          'Skills:',
          project.skills.join(', '),
          ''
        ];
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
      const arr = projectsData.map(project => ({
        project: project.title,
        skills: project.skills
      }));
      return [JSON.stringify(arr, null, 2), ''];
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
    ]
  };

  // Boot sequence effect
  useEffect(() => {
    if (isBooting) {
      let messageIndex = 0;
      const bootInterval = setInterval(() => {
        if (messageIndex < bootMessages.length) {
          setTerminalOutput(prev => [...prev, bootMessages[messageIndex]]);
          messageIndex++;
        } else {
          setIsBooting(false);
          clearInterval(bootInterval);
        }
      }, 200);
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
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setTimeout(() => {
        window.history.back();
      }, 1000);
    } else {
      setTerminalOutput(prev => [...prev, `Command not found: ${command}`, 'Type "help" for available commands.', '']);
    }

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);
  };

  // List of available command names for autocompletion
  const commandList = Object.keys(commands);

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
    <div className="vintage-terminal">
      <div className="terminal-screen">
        <div className="scan-lines"></div>
        <div className="terminal-content" ref={terminalRef}>
          {terminalOutput.map((line, index) => (
            <div key={index} className="terminal-line">
              {line}
            </div>
          ))}
          {!isBooting && (
            <div className="command-line">
              <span className="prompt">guest@vintage:~$ </span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyPress}
                className="command-input"
                autoFocus
              />
              <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>█</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VintageTerminal; 