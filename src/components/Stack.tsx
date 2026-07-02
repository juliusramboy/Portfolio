
export const Stack = () => {
  const desktopStack = [
    'Java',
    'JavaScript',
    'PHP',
    'HTML',
    'CSS',
    'Spring Boot',
    'React Native',
    'MySQL',
    'Firebase',
    'Supabase',
    'Git',
    'GitHub',
    'IntelliJ IDEA',
    'Visual Studio Code',
    'Docker',
    'AWS'
  ];

  const mobileStack = [
    'JAVA',
    'JAVASCRIPT',
    'PHP',
    'HTML',
    'CSS',
    'SPRING BOOT',
    'REACT NATIVE',
    'MYSQL',
    'FIREBASE',
    'SUPABASE',
    'GIT',
    'GITHUB',
    'INTELLIJ IDEA',
    'VS CODE',
    'DOCKER',
    'AWS'
  ];

  return (
    <div className="section-view-container" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '40px' }}>
      {/* Desktop Stack Section */}
      <div className="desktop-only">
        <div className="projects-header-new" style={{ borderBottom: 'none', marginBottom: '15px' }}>
          <span className="projects-header-title" style={{ fontSize: '0.8rem' }}>STACK</span>
          <a href="https://github.com/juliusramboy" target="_blank" rel="noopener noreferrer" className="projects-header-link" style={{ fontSize: '0.8rem' }}>
            VIEW ALL ➔
          </a>
        </div>

        {/* Infinite Marquee Carousel */}
        <div className="marquee-container">
          <div className="marquee-track">
            {[...desktopStack, ...desktopStack, ...desktopStack].map((tech, idx) => (
              <span key={`${tech}-${idx}`} className="marquee-item">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Stack Section */}
      <div className="mobile-only" style={{ display: 'none', flexDirection: 'column' }}>
        <div className="projects-header-new" style={{ borderBottom: 'none', marginBottom: '12px' }}>
          <span className="projects-header-title" style={{ fontSize: '0.8rem', color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>STACK</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {mobileStack.map((tech) => (
            <span 
              key={tech} 
              className="mono"
              style={{ 
                border: '1px solid var(--border-color)', 
                padding: '6px 12px', 
                fontSize: '0.7rem', 
                color: 'var(--primary)',
                backgroundColor: 'var(--bg-main)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
