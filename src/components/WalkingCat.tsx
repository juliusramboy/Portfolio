import React from 'react';

export const WalkingCat: React.FC = () => {
  return (
    <div className="cat-walking-track">
      <style>{`
        .cat-walking-track {
          position: relative;
          width: 240px;
          height: 34px;
          margin-bottom: 2px;
        }

        .cat-container {
          position: absolute;
          bottom: -3px; /* Align cat feet with the line */
          left: 0;
          width: 48px;
          height: 36px;
          animation: cat-move 12s infinite linear;
        }

        .cat-svg {
          width: 48px;
          height: 36px;
          overflow: visible;
        }

        /* Set transform-origin for legs to rotate around their top joint */
        .leg-front-right { transform-origin: 31px 23.5px; animation: leg-tap 12s infinite linear; }
        .leg-front-left { transform-origin: 28px 23.5px; animation: leg-swing-left 12s infinite linear; }
        .leg-back-right { transform-origin: 20px 23.5px; animation: leg-swing-right 12s infinite linear; }
        .leg-back-left { transform-origin: 17px 23.5px; animation: leg-swing-left 12s infinite linear; }

        .cat-tail {
          transform-origin: 15px 20px;
          animation: tail-wag 2s infinite ease-in-out;
        }

        /* Animations */
        @keyframes cat-move {
          /* Walk right */
          0% {
            transform: translateX(0) scaleX(1);
          }
          35% {
            transform: translateX(175px) scaleX(1);
          }
          /* Tap paw (standing still) */
          37% {
            transform: translateX(175px) scaleX(1);
          }
          57% {
            transform: translateX(175px) scaleX(1);
          }
          /* Turn around */
          60% {
            transform: translateX(175px) scaleX(-1);
          }
          /* Walk left */
          95% {
            transform: translateX(0) scaleX(-1);
          }
          100% {
            transform: translateX(0) scaleX(1);
          }
        }

        @keyframes leg-swing-left {
          /* Walking right */
          0% { transform: rotate(-25deg); }
          5% { transform: rotate(25deg); }
          10% { transform: rotate(-25deg); }
          15% { transform: rotate(25deg); }
          20% { transform: rotate(-25deg); }
          25% { transform: rotate(25deg); }
          30% { transform: rotate(-25deg); }
          35% { transform: rotate(0deg); }
          
          /* Standing still */
          60% { transform: rotate(0deg); }
          
          /* Walking left */
          65% { transform: rotate(-25deg); }
          70% { transform: rotate(25deg); }
          75% { transform: rotate(-25deg); }
          80% { transform: rotate(25deg); }
          85% { transform: rotate(-25deg); }
          90% { transform: rotate(25deg); }
          95% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes leg-swing-right {
          /* Walking right */
          0% { transform: rotate(25deg); }
          5% { transform: rotate(-25deg); }
          10% { transform: rotate(25deg); }
          15% { transform: rotate(-25deg); }
          20% { transform: rotate(25deg); }
          25% { transform: rotate(-25deg); }
          30% { transform: rotate(25deg); }
          35% { transform: rotate(0deg); }
          
          /* Standing still */
          60% { transform: rotate(0deg); }
          
          /* Walking left */
          65% { transform: rotate(25deg); }
          70% { transform: rotate(-25deg); }
          75% { transform: rotate(25deg); }
          80% { transform: rotate(-25deg); }
          85% { transform: rotate(25deg); }
          90% { transform: rotate(-25deg); }
          95% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes leg-tap {
          /* Walking right */
          0% { transform: rotate(25deg); }
          5% { transform: rotate(-25deg); }
          10% { transform: rotate(25deg); }
          15% { transform: rotate(-25deg); }
          20% { transform: rotate(25deg); }
          25% { transform: rotate(-25deg); }
          30% { transform: rotate(25deg); }
          
          /* Standing still */
          35% { transform: rotate(0deg); }
          38% { transform: rotate(0deg); }
          
          /* Paw Tapping */
          41% { transform: rotate(-55deg); }
          44% { transform: rotate(5deg); }
          47% { transform: rotate(-55deg); }
          50% { transform: rotate(5deg); }
          53% { transform: rotate(-55deg); }
          56% { transform: rotate(0deg); }
          60% { transform: rotate(0deg); }
          
          /* Walking left */
          65% { transform: rotate(25deg); }
          70% { transform: rotate(-25deg); }
          75% { transform: rotate(25deg); }
          80% { transform: rotate(-25deg); }
          85% { transform: rotate(25deg); }
          90% { transform: rotate(-25deg); }
          95% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes tail-wag {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
      `}</style>
      <div className="cat-container">
        <svg viewBox="0 0 48 36" className="cat-svg">
          {/* Tail */}
          <path
            className="cat-tail"
            d="M 14,20 C 10,18 8,12 11,8 C 12,6 14,8 13,10 C 11,13 13,17 15,19"
            fill="none"
            stroke="var(--secondary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Back Left Leg */}
          <line
            className="cat-leg leg-back-left"
            x1="18"
            y1="23.5"
            x2="18"
            y2="31"
            stroke="var(--secondary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Back Right Leg */}
          <line
            className="cat-leg leg-back-right"
            x1="20"
            y1="23.5"
            x2="20"
            y2="31"
            stroke="var(--primary)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          
          {/* Body */}
          <ellipse
            cx="25"
            cy="20"
            rx="10"
            ry="6.5"
            fill="var(--bg-main)"
            stroke="var(--primary)"
            strokeWidth="2"
          />
          
          {/* Front Left Leg */}
          <line
            className="cat-leg leg-front-left"
            x1="28"
            y1="23.5"
            x2="28"
            y2="31"
            stroke="var(--secondary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Front Right Leg (Tapping Leg) */}
          <line
            className="cat-leg leg-front-right"
            x1="31"
            y1="23.5"
            x2="31"
            y2="31"
            stroke="var(--primary)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          
          {/* Head */}
          <circle
            cx="34"
            cy="13.5"
            r="5"
            fill="var(--bg-main)"
            stroke="var(--primary)"
            strokeWidth="2"
          />
          
          {/* Ears */}
          <polygon
            points="30.5,10.5 30.5,5 33.5,9.5"
            fill="var(--bg-main)"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <polygon
            points="35,9.5 38,5 38,10.5"
            fill="var(--bg-main)"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Ear details (pink/accent) */}
          <polygon
            points="31.5,9.5 31.5,7 33,9"
            fill="var(--accent)"
            opacity="0.6"
          />
          <polygon
            points="36,9 37,7 37,9.5"
            fill="var(--accent)"
            opacity="0.6"
          />
          
          {/* Eyes */}
          <circle cx="32.5" cy="12.5" r="0.75" fill="var(--primary)" />
          <circle cx="35.5" cy="12.5" r="0.75" fill="var(--primary)" />
          
          {/* Snout/Nose */}
          <polygon points="34,13.5 33.5,14.5 34.5,14.5" fill="var(--accent)" />
          
          {/* Whiskers */}
          <line x1="30" y1="14.5" x2="26" y2="14.5" stroke="var(--secondary)" strokeWidth="0.5" />
          <line x1="30" y1="15.5" x2="27" y2="16.5" stroke="var(--secondary)" strokeWidth="0.5" />
          <line x1="38" y1="14.5" x2="42" y2="14.5" stroke="var(--secondary)" strokeWidth="0.5" />
          <line x1="38" y1="15.5" x2="41" y2="16.5" stroke="var(--secondary)" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
};
