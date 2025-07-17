import { COMMANDS, ALIASES } from './commands.js';

document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // 1. Constants & State
    // ===================================
    const IS_MOBILE = window.matchMedia('(max-width: 768px)').matches;
    const THEME_LIST = ['dark', 'light', 'matrix'];
    const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    const MY_ACTUAL_WEBSITE_URL = 'https://github.com/cveinnt/LiveTerm'; 
    const ASCII_ART = `
███    ██  ██████  ████████     ██    ██  ██████  ██    ██ ██████                                                                
████   ██ ██    ██    ██         ██  ██  ██    ██ ██    ██ ██   ██                                                               
██ ██  ██ ██    ██    ██          ████   ██    ██ ██    ██ ██████                                                                
██  ██ ██ ██    ██    ██           ██    ██    ██ ██    ██ ██   ██                                                               
██   ████  ██████     ██           ██     ██████   ██████  ██   ██                                                               
                                                                                                                                 
                                                                                                                                 
 █████  ██    ██ ███████ ██████   █████   ██████  ███████     ███████ ███    ██  ██████  ██ ███    ██ ███████ ███████ ██████  ██ 
██   ██ ██    ██ ██      ██   ██ ██   ██ ██       ██          ██      ████   ██ ██       ██ ████   ██ ██      ██      ██   ██ ██ 
███████ ██    ██ █████   ██████  ███████ ██   ███ █████       █████   ██ ██  ██ ██   ███ ██ ██ ██  ██ █████   █████   ██████  ██ 
██   ██  ██  ██  ██      ██   ██ ██   ██ ██    ██ ██          ██      ██  ██ ██ ██    ██ ██ ██  ██ ██ ██      ██      ██   ██    
██   ██   ████   ███████ ██   ██ ██   ██  ██████  ███████     ███████ ██   ████  ██████  ██ ██   ████ ███████ ███████ ██   ██ ██ 
                                                                                                                                 
                                                                                                                                 
`;

    const state = { commandHistory: [], historyIndex: -1, isGameActive: false, currentThemeIndex: 0, soundEnabled: false, konamiIndex: 0, isAdmin: false };

    // ===================================
    // 2. DOM, Audio, and Helper Functions
    // ===================================
    const screen = document.getElementById('screen');
    const landingPage = document.getElementById('landing-page');
    const returnBtn = document.getElementById('return-to-terminal');
    const content = document.getElementById('content');
    const input = document.getElementById('command-input');
    const themeToggle = document.getElementById('theme-toggle');
    const dialogOverlay = document.getElementById('mobile-dialog-overlay');
    let header, historyContainer;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // Removed unused variable 'sleep'

    function playSound(type) {
        if (!state.soundEnabled || !audioContext) return;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        if (type === 'click') {
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.05);
        } else if (type === 'beep') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);
        }
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // ===================================
    // 3. Core Logic
    // ===================================
    function processCommand(command) {
        if (!command) return;
        state.commandHistory.push(command);
        state.historyIndex = state.commandHistory.length;
        const [cmd, ...args] = command.toLowerCase().split(' ');
        const alias = ALIASES[cmd] || cmd;
        displayPrompt(command);
        
        // --- Special Command Handling ---
        if (command.toLowerCase() === 'sudo su') {
            state.isAdmin = true;
            createOutput(`<p style="color: var(--prompt-user-color);">Root access granted. You are now the administrator.</p>`);
        } else if (alias === 'kill') {
            if (state.isAdmin) {
                createOutput(`<p style="color: #bf616a;">Shutting down terminal...</p>`);
                screen.classList.add('killed');
                landingPage.classList.remove('hidden');
                setTimeout(() => { landingPage.classList.add('visible'); }, 100);
            } else {
                createOutput(COMMANDS.kill());
            }
        } else if (alias === 'clear') {
            historyContainer.innerHTML = '';
        } else if (alias === 'sound') {
            if (args[0] === 'on') { state.soundEnabled = true; createOutput(`<p>Sound enabled.</p>`); }
            else if (args[0] === 'off') { state.soundEnabled = false; createOutput(`<p>Sound disabled.</p>`); }
            else createOutput(COMMANDS.sound());
        } else if (alias === 'theme') {
            const output = COMMANDS.theme(args);
            const themeName = args[0];
            document.body.className = '';
            if (themeName && THEME_LIST.includes(themeName)) {
                if (themeName === 'light') document.body.classList.add('light-theme');
                else if (themeName !== 'dark') document.body.classList.add(`theme-${themeName}`);
            }
            createOutput(output);
        } else if (alias === 'snake') {
            if (IS_MOBILE) createOutput(`<p>The 'snake' command is disabled on mobile devices.</p>`);
            else {
                handleSnakeGame();
                createOutput(`<p>Starting Snake... Use arrow keys to move. Press 'Q' to quit.</p>`);
            }
        } else if (COMMANDS[alias]) {
            const commandFunc = COMMANDS[alias];
            const output = typeof commandFunc === 'function' ? commandFunc(args) : commandFunc;
            if (output) createOutput(output);
        } else {
            playSound('beep');
            createOutput(handleUnknownCommand(alias));
        }
        input.value = '';
        scrollToBottom();
    }
    
    function cycleTheme() {
        state.currentThemeIndex = (state.currentThemeIndex + 1) % THEME_LIST.length;
        const newTheme = THEME_LIST[state.currentThemeIndex];
        document.body.className = '';
        if (newTheme === 'light') document.body.classList.add('light-theme');
        else if (newTheme !== 'dark') document.body.classList.add(`theme-${newTheme}`);
    }

    function handleUnknownCommand(command) {
        let suggestion = '';
        let minDistance = Infinity;
        const allCommands = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)];
        for (const c of allCommands) {
            const distance = levenshteinDistance(command, c);
            if (distance <= 2 && distance < minDistance) {
                suggestion = c;
                minDistance = distance;
            }
        }
        let errorMsg = `<p>Command not found: '${command}'.</p>`;
        if (suggestion) errorMsg += `<p>Did you mean: <span class="command-suggestion" data-command="${suggestion}">${suggestion}</span>?</p>`;
        return errorMsg;
    }
    
    function displayPrompt(command) {
        const promptLine = document.createElement('div');
        promptLine.innerHTML = `<div class="input-line"><span class="prompt-user">welcome@portfolio:</span><span class="prompt-path">~</span>$ ${command}</div>`;
        historyContainer.appendChild(promptLine);
    }
    function createOutput(html) {
        const outputElement = document.createElement('div');
        outputElement.innerHTML = html;
        historyContainer.appendChild(outputElement);
        scrollToBottom();
    }
    function scrollToBottom() { content.scrollTop = content.scrollHeight; }
    function handleSnakeGame() {
        state.isGameActive = true;
        input.disabled = true;
        const colors = { foodColor: getComputedStyle(document.documentElement).getPropertyValue('--prompt-user-color'), snakeColor: getComputedStyle(document.documentElement).getPropertyValue('--prompt-path-color') };
        // TODO: Define or import launchSnakeGame if needed
        launchSnakeGame(historyContainer, colors, (score, canvas, wasQuit) => {
            if (wasQuit) createOutput(`<p>Game exited.</p>`);
            else createOutput(`<p>Game Over! Final score: ${score}. <span id="retry-btn">[ Retry ]</span></p>`);
            state.isGameActive = false;
            input.disabled = false;
            input.focus();
        });
    }

    async function startTerminal() {
        header = document.createElement('div');
        header.id = 'header';
        historyContainer = document.createElement('div');
        historyContainer.id = 'history-container';
        content.appendChild(header);
        content.appendChild(historyContainer);

        // Header content (will not be cleared)
        header.innerHTML = `<p><span>Last login:</span> ${new Date().toUTCString()}</p>`;
        const pWelcome = document.createElement('p');
        pWelcome.textContent = "Welcome to my portfolio! Type 'help' to begin.";
        header.appendChild(pWelcome);

        // Initial history content (will be cleared)
        const art = document.createElement('pre');
        art.className = 'ascii-art';
        art.textContent = ASCII_ART.trim();
        historyContainer.appendChild(art); // MOVED to historyContainer
        
        input.focus();
    }
    
    function initializeMobileDialog() {
        if (IS_MOBILE && dialogOverlay) {
            dialogOverlay.classList.remove('hidden');
            const closeBtn = document.getElementById('dialog-close-btn');
            const closeDialog = () => dialogOverlay.classList.add('hidden');
            const dialogTimeout = setTimeout(closeDialog, 10000);
            closeBtn.addEventListener('click', () => { clearTimeout(dialogTimeout); closeDialog(); });
        }
    }
    
    function levenshteinDistance(a, b) {
        const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
        for (let i = 0; i <= a.length; i += 1) { matrix[0][i] = i; }
        for (let j = 0; j <= b.length; j += 1) { matrix[j][0] = j; }
        for (let j = 1; j <= b.length; j += 1) {
            for (let i = 1; i <= a.length; i += 1) {
                const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + indicator);
            }
        }
        return matrix[b.length][a.length];
    }

    // ===================================
    // 5. Event Listeners
    // ===================================
    screen.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('command-suggestion')) {
            input.value = target.dataset.command;
            processCommand(target.dataset.command);
        } else if (target.parentElement?.classList.contains('command-grid') && target.tagName === 'SPAN') {
             if (target.dataset.disabled === 'true') {
                 return;
             }
             const command = target.textContent.trim().split(' ')[0];
             input.value = command;
             processCommand(command);
        } else if (target.id === 'retry-btn') {
            target.parentElement.remove();
            handleSnakeGame();
        } else if (target.tagName !== 'A' && target.tagName !== 'BUTTON') {
             input.focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (state.isGameActive) return;
        playSound('click');
        const key = e.key;
        if (key === KONAMI_CODE[state.konamiIndex]) {
            state.konamiIndex++;
            if (state.konamiIndex === KONAMI_CODE.length) {
                createOutput(`<p>Konami code activated! Redirecting...</p>`);
                setTimeout(() => { window.location.href = MY_ACTUAL_WEBSITE_URL; }, 1000);
                state.konamiIndex = 0;
                return;
            }
        } else {
            state.konamiIndex = 0;
        }
        if (key === 'Enter') {
            e.preventDefault();
            processCommand(input.value.trim());
        } else if (key === 'ArrowUp') {
            e.preventDefault();
            if (state.historyIndex > 0) input.value = state.commandHistory[--state.historyIndex];
        } else if (key === 'ArrowDown') {
            e.preventDefault();
            if (state.historyIndex < state.commandHistory.length - 1) {
                input.value = state.commandHistory[++state.historyIndex];
            } else {
                state.historyIndex = state.commandHistory.length;
                input.value = '';
            }
        }
    });

    themeToggle.addEventListener('click', cycleTheme);
    returnBtn.addEventListener('click', () => {
        landingPage.classList.remove('visible');
        setTimeout(() => {
            landingPage.classList.add('hidden');
            screen.style.display = 'flex'; 
            setTimeout(() => {
                screen.classList.remove('killed');
                input.focus();
            }, 50); 
        }, 500);
    });

    initializeMobileDialog();
    startTerminal();
});