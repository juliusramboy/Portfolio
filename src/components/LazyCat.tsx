import React, { useState, useEffect } from 'react';

export const LazyCat: React.FC = () => {
  const [status, setStatus] = useState<'resting' | 'startled' | 'hidden' | 'returning'>('resting');
  const [bubbleText, setBubbleText] = useState<string | null>(null);

  // Web Audio API Synthesized Meow Sound
  const playMeowSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // Create oscillator for meow pitch
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      osc.type = 'triangle'; // triangle wave gives a softer, vocal sound

      // Meow pitch contour: starts at 320Hz, rises to 520Hz, then drops to 360Hz
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(360, now + 0.4);

      // Bandpass filter to make it sound nasal/vocal ("meow")
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      filter.frequency.exponentialRampToValueAtTime(900, now + 0.4);
      filter.Q.value = 1.8;

      // Volume envelope: fade in quickly, fade out smoothly
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.start(now);
      osc.stop(now + 0.42);
    } catch (e) {
      console.error('AudioContext meow error:', e);
    }
  };

  const handleScratch = () => {
    if (status !== 'resting') return;
    playMeowSound();

    const purrs = ['Meow! 🐾', '*Purr* 💤', 'Mrrph?', '~yawn~ 🥱', 'Scratch more! 🐱'];
    const randomPurr = purrs[Math.floor(Math.random() * purrs.length)];
    setBubbleText(randomPurr);
  };

  const handleClick = () => {
    if (status !== 'resting') return;

    // Startle the cat
    setStatus('startled');
    setBubbleText('!?! 🙀');

    // Play a meow sound
    playMeowSound();

    // Run away after 350ms
    setTimeout(() => {
      setStatus('hidden');
    }, 350);
  };

  // Auto return effect
  useEffect(() => {
    if (status === 'hidden') {
      const timer = setTimeout(() => {
        setStatus('returning');
      }, 4000); // stay hidden for 4s
      return () => clearTimeout(timer);
    } else if (status === 'returning') {
      const timer = setTimeout(() => {
        setStatus('resting');
        setBubbleText(null);
      }, 1500); // 1.5s return duration
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Clear bubble text helper
  useEffect(() => {
    if (bubbleText && status === 'resting') {
      const timer = setTimeout(() => {
        setBubbleText(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [bubbleText, status]);

  return (
    <div
      className={`lazy-cat-wrapper ${status}`}
      onClick={handleClick}
      onMouseEnter={handleScratch}
      title={status === 'resting' ? "Hover to scratch/pet, click to scare" : undefined}
    >
      <style>{`
        .lazy-cat-wrapper {
          position: absolute;
          right: 25px;
          bottom: 15px;
          width: 54px;
          height: 36px;
          cursor: pointer;
          z-index: 110;
          user-select: none;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s;
        }

        .lazy-cat-wrapper.resting:hover {
          transform: scale(1.05);
        }

        .lazy-cat-wrapper.startled {
          transform: translateY(-8px) scale(1.05);
          animation: cat-shake 0.15s infinite alternate;
        }

        .lazy-cat-wrapper.hidden {
          transform: translateX(120px) scaleX(1);
          opacity: 0;
          pointer-events: none;
        }

        .lazy-cat-wrapper.returning {
          transform: translateX(0) scaleX(-1); /* mirror when walking back */
          opacity: 1;
          pointer-events: none;
          transition: transform 1.5s ease-in-out, opacity 0.5s;
        }

        .lazy-cat-svg {
          width: 54px;
          height: 36px;
          overflow: visible;
        }

        .lazy-cat-tail {
          transform-origin: 13px 22px;
          animation: lazy-tail-wag 3s infinite ease-in-out;
        }

        .lazy-cat-wrapper.returning .lazy-cat-tail {
          animation: lazy-tail-wag 0.8s infinite ease-in-out;
        }

        .lazy-cat-bubble {
          position: absolute;
          bottom: 38px;
          right: 4px;
          background-color: var(--bg-alt);
          border: 1px solid var(--border-color);
          color: var(--primary);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-family: var(--font-mono);
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          pointer-events: none;
          animation: bubble-pop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 120;
        }

        .lazy-cat-bubble::after {
          content: '';
          position: absolute;
          bottom: -5px;
          right: 18px;
          border-width: 5px 5px 0;
          border-style: solid;
          border-color: var(--bg-alt) transparent;
          display: block;
          width: 0;
        }

        .lazy-cat-bubble::before {
          content: '';
          position: absolute;
          bottom: -6px;
          right: 18px;
          border-width: 6px 6px 0;
          border-style: solid;
          border-color: var(--border-color) transparent;
          display: block;
          width: 0;
          z-index: -1;
        }

        @keyframes cat-shake {
          0% { transform: translateY(-8px) translateX(-2px) scale(1.05); }
          100% { transform: translateY(-8px) translateX(2px) scale(1.05); }
        }

        @keyframes lazy-tail-wag {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(12deg); }
        }

        @keyframes bubble-pop {
          0% { transform: scale(0.6) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Speech Bubble */}
      {bubbleText && (
        <div className="lazy-cat-bubble">
          {bubbleText}
        </div>
      )}

      {/* Cat SVG */}
      <svg viewBox="0 0 54 36" className="lazy-cat-svg">
        {/* Tail */}
        <path
          className="lazy-cat-tail"
          d="M 12,24 C 8,24 6,18 9,14 C 10,12 12,14 11,16 C 9,19 11,22 13,22"
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Paws */}
        <ellipse cx="34" cy="24.5" rx="3.5" ry="1.5" fill="var(--bg-main)" stroke="var(--primary)" strokeWidth="1.8" />
        <ellipse cx="30" cy="24.5" rx="3.5" ry="1.5" fill="var(--bg-main)" stroke="var(--primary)" strokeWidth="1.8" />

        {/* Body */}
        <ellipse
          cx="22"
          cy="20"
          rx="12"
          ry="7.5"
          fill="var(--bg-main)"
          stroke="var(--primary)"
          strokeWidth="2"
        />

        {/* Head */}
        <circle
          cx="32.5"
          cy="17.5"
          r="5.5"
          fill="var(--bg-main)"
          stroke="var(--primary)"
          strokeWidth="2"
        />

        {/* Ears */}
        <polygon points="28,14 28,9 31,13" fill="var(--bg-main)" stroke="var(--primary)" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="34,13 37,9 37,14" fill="var(--bg-main)" stroke="var(--primary)" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Ear interior accent */}
        <polygon points="29,13 29,11 30,12.5" fill="var(--accent)" opacity="0.6" />
        <polygon points="35,12.5 36,11 36,13" fill="var(--accent)" opacity="0.6" />

        {/* Eyes (Sleeping vs Startled) */}
        {status === 'startled' ? (
          <>
            <circle cx="31" cy="17" r="1" fill="var(--primary)" />
            <circle cx="34" cy="17" r="1" fill="var(--primary)" />
          </>
        ) : (
          <>
            {/* Sleeping curved closed eyes */}
            <path d="M 29.5,17.5 Q 31,19 32,17.5" fill="none" stroke="var(--primary)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 33,17.5 Q 34.5,19 35.5,17.5" fill="none" stroke="var(--primary)" strokeWidth="1.2" strokeLinecap="round" />
          </>
        )}

        {/* Snout/Nose */}
        <polygon points="32.5,19 32,20 33,20" fill="var(--accent)" />

        {/* Whiskers */}
        <line x1="28.5" y1="19" x2="25" y2="19" stroke="var(--secondary)" strokeWidth="0.5" />
        <line x1="28.5" y1="20" x2="25.5" y2="21" stroke="var(--secondary)" strokeWidth="0.5" />
        <line x1="36.5" y1="19" x2="40" y2="19" stroke="var(--secondary)" strokeWidth="0.5" />
        <line x1="36.5" y1="20" x2="39.5" y2="21" stroke="var(--secondary)" strokeWidth="0.5" />
      </svg>
    </div>
  );
};
