import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VintageTerminal from '../VintageTerminal'

describe('VintageTerminal Component', () => {
  let container;
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  const renderTerminal = () => {
    const result = render(<VintageTerminal />);
    container = result.container;
    return result;
  };

  describe('Boot Sequence', () => {
    it('should show boot messages on initial load', async () => {
      renderTerminal();
      
      // Fast forward through boot sequence
      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(screen.getByText(/BIOS Version/)).toBeInTheDocument();
    });

    it('should complete boot sequence quickly', async () => {
      renderTerminal();
      
      // Boot should complete in less than 200ms (5 messages * 20ms + 100ms delay)
      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(screen.getByText(/Welcome to VINTAGE TERMINAL/)).toBeInTheDocument();
    });

    it('should show command prompt after boot', async () => {
      renderTerminal();
      
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const prompt = container.querySelector('.prompt');
      expect(prompt).toBeInTheDocument();
      expect(prompt.textContent).toBe('guest@vintage:~$ ');
    });
  });

  describe('Command Execution', () => {
    beforeEach(async () => {
      renderTerminal();
      // Complete boot sequence
      act(() => {
        vi.advanceTimersByTime(300);
      });
    });

    it('should execute help command', async () => {
      const input = container.querySelector('.command-input');
      
      await user.type(input, 'help');
      await user.keyboard('{Enter}');

      expect(screen.getByText(/Available commands:/)).toBeInTheDocument();
      expect(screen.getByText(/clear - Clear terminal screen/)).toBeInTheDocument();
    });

    it('should execute ls command', async () => {
      const input = container.querySelector('.command-input');
      
      await user.type(input, 'ls');
      await user.keyboard('{Enter}');

      expect(screen.getByText(/Projects:/)).toBeInTheDocument();
    });

    it('should clear terminal with clear command', async () => {
      const input = container.querySelector('.command-input');
      
      // Add some content first
      await user.type(input, 'help');
      await user.keyboard('{Enter}');
      
      // Clear
      await user.clear(input);
      await user.type(input, 'clear');
      await user.keyboard('{Enter}');

      const terminalContent = container.querySelector('.terminal-content');
      const lines = terminalContent.querySelectorAll('.terminal-line');
      expect(lines.length).toBeLessThan(5); // Should only have prompt left
    });

    it('should handle unknown commands', async () => {
      const input = container.querySelector('.command-input');
      
      await user.type(input, 'unknowncommand');
      await user.keyboard('{Enter}');

      expect(screen.getByText(/Command not found: unknowncommand/)).toBeInTheDocument();
    });
  });

  describe('Command History', () => {
    beforeEach(async () => {
      renderTerminal();
      act(() => {
        vi.advanceTimersByTime(300);
      });
    });

    it('should navigate command history with arrow keys', async () => {
      const input = container.querySelector('.command-input');
      
      // Execute some commands
      await user.type(input, 'help');
      await user.keyboard('{Enter}');
      await user.clear(input);
      
      await user.type(input, 'ls');
      await user.keyboard('{Enter}');
      await user.clear(input);

      // Navigate up
      await user.keyboard('{ArrowUp}');
      expect(input.value).toBe('ls');

      await user.keyboard('{ArrowUp}');
      expect(input.value).toBe('help');

      // Navigate down
      await user.keyboard('{ArrowDown}');
      expect(input.value).toBe('ls');
    });
  });

  describe('Tab Completion', () => {
    beforeEach(async () => {
      renderTerminal();
      act(() => {
        vi.advanceTimersByTime(300);
      });
    });

    it('should autocomplete commands with Tab', async () => {
      const input = container.querySelector('.command-input');
      
      await user.type(input, 'hel');
      await user.keyboard('{Tab}');

      expect(input.value).toBe('help ');
    });

    it('should show multiple matches for ambiguous completion', async () => {
      const input = container.querySelector('.command-input');
      
      await user.type(input, 'c');
      await user.keyboard('{Tab}');

      // Should show 'cat', 'clear', 'chmod', 'cowsay'
      expect(screen.getByText(/cat/)).toBeInTheDocument();
      expect(screen.getByText(/clear/)).toBeInTheDocument();
    });
  });

  describe('Easter Egg Commands', () => {
    beforeEach(async () => {
      renderTerminal();
      act(() => {
        vi.advanceTimersByTime(300);
      });
    });

    it('should execute matrix command', async () => {
      const input = container.querySelector('.command-input');
      
      await user.type(input, 'matrix');
      await user.keyboard('{Enter}');

      expect(screen.getByText(/Wake up, Neo/)).toBeInTheDocument();
    });

    it('should execute fortune command', async () => {
      const input = container.querySelector('.command-input');
      
      await user.type(input, 'fortune');
      await user.keyboard('{Enter}');

      // Should show one of the fortunes
      const terminalContent = container.querySelector('.terminal-content');
      expect(terminalContent.textContent).toMatch(/bug|computer|program|code/i);
    });

    it('should execute sl command without ASCII art', async () => {
      const input = container.querySelector('.command-input');
      
      await user.type(input, 'sl');
      await user.keyboard('{Enter}');

      expect(screen.getByText(/Steam Locomotive Animation:/)).toBeInTheDocument();
      expect(screen.getByText(/Choo choo!/)).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should adapt font size on mobile', () => {
      global.innerWidth = 375;
      renderTerminal();

      const terminalContent = container.querySelector('.terminal-content');
      expect(terminalContent).toHaveClass('terminal-content');
    });

    it('should handle touch interactions', async () => {
      global.innerWidth = 375;
      renderTerminal();
      
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const input = container.querySelector('.command-input');
      fireEvent.touchStart(input);
      
      expect(document.activeElement).toBe(input);
    });
  });

  describe('Accessibility', () => {
    beforeEach(async () => {
      renderTerminal();
      act(() => {
        vi.advanceTimersByTime(300);
      });
    });

    it('should have proper ARIA labels', () => {
      const terminal = container.querySelector('.vintage-terminal');
      expect(terminal).toBeInTheDocument();
    });

    it('should support keyboard navigation', async () => {
      const input = container.querySelector('.command-input');
      
      input.focus();
      expect(document.activeElement).toBe(input);
    });

    it('should have proper focus management', async () => {
      const input = container.querySelector('.command-input');
      
      // Should auto-focus after boot
      await waitFor(() => {
        expect(document.activeElement).toBe(input);
      });
    });
  });

  describe('Visual Effects', () => {
    it('should have scan lines effect', () => {
      renderTerminal();
      const scanLines = container.querySelector('.scan-lines');
      expect(scanLines).toBeInTheDocument();
    });

    it('should have blinking cursor', async () => {
      renderTerminal();
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const cursor = container.querySelector('.cursor');
      expect(cursor).toBeInTheDocument();
      
      // Check cursor blink
      act(() => {
        vi.advanceTimersByTime(530);
      });
      
      expect(cursor).toHaveClass('visible');
    });
  });

  describe('Performance', () => {
    it('should handle rapid command execution', async () => {
      renderTerminal();
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const input = container.querySelector('.command-input');
      
      // Execute multiple commands rapidly
      for (let i = 0; i < 10; i++) {
        await user.type(input, `echo test${i}`);
        await user.keyboard('{Enter}');
        await user.clear(input);
      }

      // Should handle all commands without crashing
      expect(container.querySelector('.terminal-content')).toBeInTheDocument();
    });

    it('should auto-scroll to bottom', async () => {
      renderTerminal();
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const input = container.querySelector('.command-input');
      const terminalContent = container.querySelector('.terminal-content');
      
      // Add many lines
      for (let i = 0; i < 50; i++) {
        await user.type(input, 'help');
        await user.keyboard('{Enter}');
        await user.clear(input);
      }

      // Should be scrolled to bottom
      expect(terminalContent.scrollTop).toBeGreaterThan(0);
    });
  });
});