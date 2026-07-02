import { Medal, Users } from 'lucide-react';

interface Achievement {
  title: string;
  date: string;
  subtitle: string;
  isGreyed?: boolean;
}

interface MobileAchievement {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const Skills = () => {
  const achievements: Achievement[] = [
    {
      title: "1st Place — Robotics Competition",
      date: 'Lead Developer',
      subtitle: 'Inter-school Robotics Tournament'
    },
    {
      title: 'Treasurer',
      date: '2023 - 2025',
      subtitle: 'Computer Explorer Society of ICCT Colleges (Taytay Campus)'
    }
  ];

  const mobileAchievements: MobileAchievement[] = [
    {
      icon: <Medal size={20} />,
      title: "1ST PLACE — ROBOTICS COMPETITION",
      description: "Programmed an amphibious robotic vehicle using Arduino to automate movement and sensor response, winning 1st place in an inter-school robotics competition."
    },
    {
      icon: <Users size={20} />,
      title: "TREASURER — COMPUTER EXPLORER SOCIETY",
      description: "Managed the budget for campus events, allocated funds for technical seminars, and audited financial logs for student activities at ICCT Colleges Taytay campus."
    }
  ];

  return (
    <div className="section-view-container">
      {/* Header Row */}
      <div className="projects-header-new">
        <span className="projects-header-title desktop-only">04 — ACHIEVEMENTS & EXTRACURRICULARS</span>
        <span className="projects-header-title mobile-only" style={{ display: 'none' }}>04 — ACHIEVEMENTS</span>
      </div>

      {/* Desktop Achievements Layout */}
      <div 
        className="desktop-only"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px', 
          marginTop: '20px',
          marginBottom: '50px'
        }}
      >
        {achievements.map((ach, idx) => (
          <div 
            key={idx} 
            style={{ 
              border: '1px solid var(--border-color)', 
              padding: '24px 30px',
              backgroundColor: 'var(--bg-main)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '130px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 
                style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 700, 
                  color: 'var(--primary)',
                  lineHeight: '1.3'
                }}
              >
                {ach.title}
              </h3>
              <span 
                className="mono" 
                style={{ 
                  fontSize: '0.8rem', 
                  color: 'var(--tertiary)',
                  marginLeft: '15px',
                  whiteSpace: 'nowrap'
                }}
              >
                {ach.date}
              </span>
            </div>
            
            <div 
              style={{ 
                color: 'var(--secondary)', 
                fontSize: '0.95rem',
                marginTop: '10px'
              }}
            >
              {ach.subtitle}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Achievements Layout (Vertical Stack with Icons and Grid backgrounds) */}
      <div 
        className="mobile-only"
        style={{ 
          display: 'none', 
          flexDirection: 'column', 
          gap: '20px', 
          marginTop: '20px',
          marginBottom: '40px'
        }}
      >
        {mobileAchievements.map((ach, idx) => (
          <div 
            key={idx} 
            style={{ 
              border: '1px solid var(--border-color)', 
              padding: '25px',
              backgroundColor: 'var(--bg-main)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundImage: 'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            <div style={{ color: 'var(--primary)' }}>
              {ach.icon}
            </div>
            
            <h3 
              className="mono"
              style={{ 
                fontSize: '0.9rem', 
                fontWeight: 700, 
                color: 'var(--primary)',
                letterSpacing: '0.05rem'
              }}
            >
              {ach.title}
            </h3>
            
            <p 
              style={{ 
                color: 'var(--secondary)', 
                fontSize: '0.9rem',
                lineHeight: '1.45'
              }}
            >
              {ach.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
