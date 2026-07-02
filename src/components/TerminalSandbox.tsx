import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, RotateCcw } from 'lucide-react';

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
  component?: React.ReactNode;
}

// Playable retro Snake Game component
interface SnakeGameProps {
  theme: 'system' | 'green' | 'amber' | 'cyber' | 'dark';
}

const SnakeGame = ({ theme }: SnakeGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const dirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const snakeRef = useRef<{ x: number; y: number }[]>([
    { x: 10, y: 8 },
    { x: 9, y: 8 },
    { x: 8, y: 8 },
  ]);
  const foodRef = useRef<{ x: number; y: number }>({ x: 5, y: 5 });

  const getColors = () => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    switch (theme) {
      case 'amber': return { snake: '#FFB000', food: '#FF5533', bg: '#0b0600', grid: '#1a0e00' };
      case 'cyber': return { snake: '#00F0FF', food: '#FF007F', bg: '#0b0114', grid: '#25053a' };
      case 'dark': return { snake: '#8a8a93', food: '#ffffff', bg: '#0c0c0e', grid: '#1c1c22' };
      case 'green': return { snake: '#00FF66', food: '#ff3333', bg: '#050505', grid: '#0d1f11' };
      default: // 'system' (portfolio theme)
        return {
          snake: '#5C27FE', // neon purple accent
          food: '#FF3333',
          bg: isDarkMode ? '#111115' : '#fcfcfc',
          grid: isDarkMode ? '#22222a' : '#e2e2e2'
        };
    }
  };

  const colors = getColors();

  const spawnFood = () => {
    const gridWidth = 20;
    const gridHeight = 15;
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight),
      };
      const onSnake = snakeRef.current.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    foodRef.current = newFood;
  };

  const startGame = () => {
    snakeRef.current = [
      { x: 10, y: 8 },
      { x: 9, y: 8 },
      { x: 8, y: 8 },
    ];
    dirRef.current = { x: 1, y: 0 };
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    spawnFood();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      const curDir = dirRef.current;
      let newDir = curDir;
      let prevent = false;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (curDir.y === 0) { newDir = { x: 0, y: -1 }; prevent = true; }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (curDir.y === 0) { newDir = { x: 0, y: 1 }; prevent = true; }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (curDir.x === 0) { newDir = { x: -1, y: 0 }; prevent = true; }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (curDir.x === 0) { newDir = { x: 1, y: 0 }; prevent = true; }
          break;
      }

      if (prevent) {
        e.preventDefault();
      }
      dirRef.current = newDir;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridWidth = 20;
    const gridHeight = 15;
    const cellWidth = canvas.width / gridWidth;
    const cellHeight = canvas.height / gridHeight;

    const updateGame = () => {
      const head = { ...snakeRef.current[0] };
      const dir = dirRef.current;
      head.x += dir.x;
      head.y += dir.y;

      // Bounds check
      if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
        setGameOver(true);
        setIsPlaying(false);
        return;
      }

      // Self-collision check
      const collided = snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y);
      if (collided) {
        setGameOver(true);
        setIsPlaying(false);
        return;
      }

      snakeRef.current.unshift(head);

      // Food check
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore(prev => {
          const next = prev + 10;
          if (next > highScore) setHighScore(next);
          return next;
        });
        spawnFood();
      } else {
        snakeRef.current.pop();
      }
    };

    const drawGame = () => {
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle grid
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= gridWidth; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellWidth, 0);
        ctx.lineTo(i * cellWidth, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j <= gridHeight; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * cellHeight);
        ctx.lineTo(canvas.width, j * cellHeight);
        ctx.stroke();
      }

      // Draw food
      ctx.fillStyle = colors.food;
      ctx.beginPath();
      ctx.arc(
        foodRef.current.x * cellWidth + cellWidth / 2,
        foodRef.current.y * cellHeight + cellHeight / 2,
        Math.min(cellWidth, cellHeight) / 3.5,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw snake
      snakeRef.current.forEach((seg, idx) => {
        ctx.fillStyle = colors.snake;
        ctx.fillRect(
          seg.x * cellWidth + 1,
          seg.y * cellHeight + 1,
          cellWidth - 2,
          cellHeight - 2
        );

        if (idx === 0) {
          ctx.fillStyle = '#000000';
          const eyeSize = 2;
          const dir = dirRef.current;
          if (dir.y !== 0) {
            ctx.fillRect(seg.x * cellWidth + 4, seg.y * cellHeight + cellHeight / 2 - 1, eyeSize, eyeSize);
            ctx.fillRect(seg.x * cellWidth + cellWidth - 6, seg.y * cellHeight + cellHeight / 2 - 1, eyeSize, eyeSize);
          } else {
            ctx.fillRect(seg.x * cellWidth + cellWidth / 2 - 1, seg.y * cellHeight + 4, eyeSize, eyeSize);
            ctx.fillRect(seg.x * cellWidth + cellWidth / 2 - 1, seg.y * cellHeight + cellHeight - 6, eyeSize, eyeSize);
          }
        }
      });
    };

    const interval = setInterval(() => {
      updateGame();
      drawGame();
    }, Math.max(140 - score * 1.5, 60));

    drawGame();
    return () => clearInterval(interval);
  }, [isPlaying, gameOver, colors, score]);

  const handleMobileMove = (x: number, y: number) => {
    if (!isPlaying || gameOver) return;
    const curDir = dirRef.current;
    if (x !== 0 && curDir.x !== 0) return;
    if (y !== 0 && curDir.y !== 0) return;
    dirRef.current = { x, y };
  };

  return (
    <div
      style={{
        margin: '12px 0',
        border: `1px solid ${colors.snake}`,
        padding: '12px',
        borderRadius: '4px',
        backgroundColor: '#000000',
        maxWidth: '430px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '0.8rem'
        }}
        className="mono"
      >
        <span>SCORE: {score}</span>
        <span>HIGH: {highScore}</span>
      </div>

      <div style={{ position: 'relative', width: '100%', paddingBottom: '75%', height: 0 }}>
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: colors.bg,
            border: `1px solid ${colors.grid}`,
            borderRadius: '2px'
          }}
        />

        {(!isPlaying || gameOver) && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.85)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: colors.snake
            }}
            className="mono"
          >
            {gameOver && <span style={{ fontSize: '1.1rem', marginBottom: '8px', color: colors.food, fontWeight: 'bold' }}>GAME OVER</span>}
            <button
              onClick={startGame}
              style={{
                padding: '6px 14px',
                border: `1px solid ${colors.snake}`,
                color: colors.snake,
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {gameOver ? <RotateCcw size={14} /> : <Play size={14} />}
              <span>{gameOver ? 'RETRY' : 'PLAY SNAKE'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile controller arrows */}
      <div
        style={{
          marginTop: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        <button
          onClick={() => handleMobileMove(0, -1)}
          style={{ width: '40px', height: '36px', border: `1px solid ${colors.snake}`, color: colors.snake, background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}
        >
          ▲
        </button>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={() => handleMobileMove(-1, 0)}
            style={{ width: '40px', height: '36px', border: `1px solid ${colors.snake}`, color: colors.snake, background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}
          >
            ◀
          </button>
          <button
            onClick={() => handleMobileMove(1, 0)}
            style={{ width: '40px', height: '36px', border: `1px solid ${colors.snake}`, color: colors.snake, background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}
          >
            ▶
          </button>
        </div>
        <button
          onClick={() => handleMobileMove(0, 1)}
          style={{ width: '40px', height: '36px', border: `1px solid ${colors.snake}`, color: colors.snake, background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}
        >
          ▼
        </button>
      </div>
    </div>
  );
};

export const TerminalSandbox = () => {
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [isClean, setIsClean] = useState(true);
  const [command, setCommand] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [theme, setTheme] = useState<'system' | 'green' | 'amber' | 'cyber' | 'dark'>('system');

  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [history, isClean]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Save to shell command history
    setCmdHistory(prev => [trimmed, ...prev.filter(c => c !== trimmed)]);
    setHistoryIdx(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newEntries: LogEntry[] = [
      { type: 'input', text: `visitor@juls-portfolio:~$ ${trimmed}` }
    ];

    // Reset clean welcome screen if any command is typed
    if (isClean) {
      setIsClean(false);
    }

    switch (mainCmd) {
      case 'help':
      case 'man':
        newEntries.push({
          type: 'output',
          text: `Available system binaries:
  ls          - List project directories/files
  cat [file]  - Read detailed specs of a project file
  whoami      - Print developer summary info
  neofetch    - Show system statistics & ASCII banner
  snake       - Launch retro playable snake game inside viewport
  socials     - Display developer web links
  email       - Trigger default mail client
  theme [val] - Change visual shell skins ('system', 'green', 'amber', 'cyber', 'dark')
  uname -a    - Print operating system kernel information
  clear       - Wipe output log and restore welcome dashboard`
        });
        break;

      case 'ls':
      case 'dir':
        newEntries.push({
          type: 'output',
          text: `total 3
-rwxr-xr-x 1 juls engineering 4096 Jul 2 14:18 slp_pitogo.sh
-rwxr-xr-x 1 juls engineering 2048 Jul 2 14:18 anda.apk
-rwxr-xr-x 1 juls engineering 1024 Jul 2 14:18 etrade_pos.jar`
        });
        break;

      case 'cat':
        const file = args[0]?.toLowerCase();
        if (!file) {
          newEntries.push({ type: 'error', text: 'usage: cat [filename] (e.g. cat slp_pitogo.sh)' });
        } else if (file === 'slp_pitogo.sh') {
          newEntries.push({
            type: 'output',
            text: `[FILE: slp_pitogo.sh]
Category   : WEB APP PLATFORM
Title      : SLP - Savings And Loan at Pitogo
Stack      : Spring Boot, PostgreSQL, Redis, Groq AI
Description: A comprehensive system managing online savings accounts, active loan schedules, real-time fallback AI customer chats, and cookie-based secure authentications.`
          });
        } else if (file === 'anda.apk') {
          newEntries.push({
            type: 'output',
            text: `[FILE: anda.apk]
Category   : MOBILE APP
Title      : ANDA
Stack      : Flutter, SQLite, Google Maps SDK, Biometrics
Description: Offline-first cross-platform borrower ledger UI with customized waivers, automated weekly profit calculations, live collection routes, and biometric finger logging.`
          });
        } else if (file === 'etrade_pos.jar') {
          newEntries.push({
            type: 'output',
            text: `[FILE: etrade_pos.jar]
Category   : DESKTOP APPLICATION
Title      : E-Trade
Stack      : Java, JavaFX, MySQL
Description: Modular retail POS sales system with embedded cashier attendance trackers and administrator dashboard analytical interfaces.`
          });
        } else {
          newEntries.push({ type: 'error', text: `cat: ${args[0]}: No such file or directory` });
        }
        break;

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: `juls (Julius Ramboy) - Full-Stack Developer & Robotics Tinkerer.`
        });
        break;

      case 'neofetch':
        const ascii = `
      _ _  _ _    
     | | |/ | |   
  _  | | /| | |   
 | |_| |/ | | |   
  \\___/___|_|_|   
`;
        newEntries.push({
          type: 'output',
          text: `${ascii}
juls@juls-portfolio
-------------------
OS: Ubuntu 22.04.4 LTS x86_64
Kernel: Linux 5.15.0-91-generic
Uptime: 2 hours, 31 mins
Shell: bash 5.1.16
Resolution: Responsive Viewport
UI Theme: Retro Terminal (Phosphor ${theme.toUpperCase()})
CPU: Intel i7-12700H (20) @ 4.700GHz
Memory: 16GB / 32GB (50%)
Active Tech: React, TypeScript, Spring Boot, Flutter, SQLite`
        });
        break;

      case 'uname':
        if (args[0] === '-a') {
          newEntries.push({
            type: 'output',
            text: 'Linux juls-portfolio 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux'
          });
        } else {
          newEntries.push({ type: 'output', text: 'Linux' });
        }
        break;

      case 'snake':
        newEntries.push({
          type: 'success',
          text: 'Spawning playable retro Snake game...',
          component: <SnakeGame theme={theme} />
        });
        break;

      case 'socials':
        newEntries.push({
          type: 'output',
          text: `[LINKS]
- Github   : https://github.com/juliusramboy
- LinkedIn : https://www.linkedin.com/in/julius-ramboy
- Email    : jlb.ramboy@gmail.com`
        });
        break;

      case 'email':
        newEntries.push({ type: 'success', text: 'Spawning secure system client mail dispatch...' });
        setTimeout(() => {
          window.location.href = 'mailto:jlb.ramboy@gmail.com?subject=Transmission%20from%20Portfolio%20Terminal';
        }, 300);
        break;

      case 'clear':
        setHistory([]);
        setIsClean(true);
        setCommand('');
        return;

      case 'theme':
        const targetTheme = args[0]?.toLowerCase();
        if (['system', 'green', 'amber', 'cyber', 'dark'].includes(targetTheme)) {
          setTheme(targetTheme as any);
          newEntries.push({ type: 'success', text: `Shell theme shifted to: '${targetTheme.toUpperCase()}'` });
        } else {
          newEntries.push({ type: 'error', text: `theme: usage: theme [system | green | amber | cyber | dark]` });
        }
        break;

      case 'sudo':
        newEntries.push({ type: 'error', text: 'sudo: permission denied. Visitor incident logged in /var/log/auth.log' });
        break;

      default:
        newEntries.push({
          type: 'error',
          text: `bash: ${mainCmd}: command not found. Try 'help' for binaries.`
        });
        break;
    }

    setHistory(prev => [...prev, ...newEntries]);
    setCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(command);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryIdx(nextIdx);
          setCommand(cmdHistory[nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = historyIdx - 1;
      if (nextIdx >= 0) {
        setHistoryIdx(nextIdx);
        setCommand(cmdHistory[nextIdx]);
      } else {
        setHistoryIdx(-1);
        setCommand('');
      }
    }
  };

  const executeShortcut = (cmd: string) => {
    handleCommand(cmd);
    focusInput();
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'green': return 'terminal-theme-green';
      case 'amber': return 'terminal-theme-amber';
      case 'cyber': return 'terminal-theme-cyber';
      case 'dark': return 'terminal-theme-dark';
      default: return 'terminal-theme-system';
    }
  };

  return (
    <div className="section-view-container" style={{ borderBottom: 'none' }}>
      <div className="section-header">
        <h2 className="section-title">Terminal Console</h2>
        <span className="section-subtitle">SYS_PORT_LOG: INTERACTIVE_SHELL</span>
      </div>

      {/* Touch chips */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '15px',
          alignItems: 'center'
        }}
      >
        <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--secondary)', marginRight: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={12} /> BINARY SHORTCUTS:
        </span>
        {['help', 'ls', 'whoami', 'neofetch', 'snake', 'socials', 'clear'].map((btnCmd) => (
          <button
            key={btnCmd}
            onClick={() => executeShortcut(btnCmd)}
            className="mono"
            style={{
              padding: '4px 10px',
              fontSize: '0.72rem',
              backgroundColor: 'var(--bg-alt)',
              border: '1px solid var(--border-color)',
              color: 'var(--primary)',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.2s',
              fontWeight: 500
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.backgroundColor = 'var(--bg-main)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.backgroundColor = 'var(--bg-alt)';
            }}
          >
            {btnCmd}
          </button>
        ))}
      </div>

      {/* Terminal Viewport */}
      <div
        className={`terminal-console-wrapper ${getThemeClass()}`}
        onClick={focusInput}
        style={{
          border: '1px solid var(--border-color)',
          borderRadius: '4px',
          padding: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          lineHeight: '1.45',
          cursor: 'text',
          position: 'relative',
          height: '450px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.85)'
        }}
      >
        <div className="crt-overlay"></div>

        <div
          ref={viewportRef}
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            marginBottom: '10px',
            paddingRight: '5px'
          }}
        >
          {/* Welcome Screen Splash (visible when terminal is clean) */}
          {isClean && (
            <div style={{ marginBottom: '15px' }} className="terminal-welcome-splash">
              <div>Welcome to terminal console you can interface (Ubuntu 22.04 LTS)</div>
              <br />
              <div>For work, collabs & everything else, reach me at</div>
              <div><a href="mailto:jlb.ramboy@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>jlb.ramboy@gmail.com</a></div>
              <br />
              <div>Active projects: 3. Type '<span style={{ fontWeight: 'bold' }}>ls</span>' to list files or '<span style={{ fontWeight: 'bold' }}>cat [filename]</span>' to read details.</div>
              <div>Type '<span style={{ fontWeight: 'bold' }}>snake</span>' to launch retro snake game.</div>
              <div>Type '<span style={{ fontWeight: 'bold' }}>help</span>' to see a list of utility commands.</div>
              <div style={{ margin: '10px 0', borderBottom: '1px dashed currentColor', opacity: 0.3 }}></div>
            </div>
          )}

          {/* History elements */}
          {history.map((entry, idx) => (
            <div key={idx} style={{ marginBottom: '8px', whiteSpace: 'pre-wrap' }}>
              {entry.type === 'input' && (
                <span className="terminal-log-input">{entry.text}</span>
              )}
              {entry.type === 'output' && (
                <span className="terminal-log-output">{entry.text}</span>
              )}
              {entry.type === 'error' && (
                <span className="terminal-log-error">{entry.text}</span>
              )}
              {entry.type === 'success' && (
                <span className="terminal-log-success">{entry.text}</span>
              )}
              {entry.component && (
                <div style={{ width: '100%' }}>{entry.component}</div>
              )}
            </div>
          ))}
        </div>

        {/* Input prompt with visual cursor bug fix */}
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
          <span className="terminal-prompt-label" style={{ marginRight: '8px', whiteSpace: 'nowrap' }}>
            <span className="desktop-only">visitor@juls-portfolio:~$</span>
            <span className="mobile-only" style={{ display: 'none' }}>juls:~$</span>
          </span>
          <div style={{ display: 'inline-flex', position: 'relative', flexGrow: 1, alignItems: 'center', overflow: 'hidden' }}>
            {/* Visual Text rendering */}
            <span style={{ whiteSpace: 'pre', color: 'inherit' }}>{command}</span>
            {/* Blinking Cursor immediately adjacent to text */}
            <span className="terminal-custom-cursor">_</span>

            {/* Invisible Input Overlay */}
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'transparent',
                caretColor: 'transparent',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
              autoFocus
              autoComplete="off"
              spellCheck="false"
              id="terminal-input-element"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
