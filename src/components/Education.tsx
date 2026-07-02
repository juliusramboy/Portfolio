
interface AcademicEntry {
  year: string;
  degree: string;
  institution: string;
  major?: string;
}

export const Education = () => {
  const educationList: AcademicEntry[] = [
    {
      year: 'Dec 2025',
      degree: 'Bachelor of Science in Information Technology',
      institution: 'ICCT Colleges | Taytay, Rizal',
      major: 'Focus: Software Engineering & Development'
    },
    {
      year: 'Jun 2021',
      degree: 'Information and Communication Technology (ICT)',
      institution: 'ICCT Colleges | Taytay, Rizal',
      major: 'Senior High School — Information & Communications Technology'
    }
  ];

  return (
    <div className="section-view-container">
      {/* Header Row */}
      <div className="projects-header-new">
        <span className="projects-header-title">02 — EDUCATION</span>
      </div>

      {/* Desktop Layout */}
      <div className="desktop-only" style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
        {educationList.map((edu, idx) => (
          <div 
            key={idx} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '24px 0',
              borderBottom: '1px solid var(--border-color)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            <div 
              className="mono" 
              style={{ 
                width: '120px', 
                color: 'var(--tertiary)', 
                fontSize: '0.95rem' 
              }}
            >
              {edu.year}
            </div>

            <div 
              style={{ 
                flexGrow: 1, 
                fontWeight: 600, 
                fontSize: '1.25rem',
                color: 'var(--primary)' 
              }}
            >
              {edu.degree}
            </div>

            <div 
              style={{ 
                color: 'var(--secondary)', 
                fontSize: '1rem',
                textAlign: 'right' 
              }}
            >
              {edu.institution}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Layout (Timeline Style with Square Dots) */}
      <div className="mobile-only" style={{ display: 'none', flexDirection: 'column', marginTop: '25px', paddingLeft: '10px' }}>
        <div style={{ position: 'relative', borderLeft: '2px solid var(--border-color)', paddingLeft: '25px', display: 'flex', flexDirection: 'column', gap: '35px' }}>
          {educationList.map((edu, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              {/* Square Dot on Timeline */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '-32px', 
                  top: '4px', 
                  width: '10px', 
                  height: '10px', 
                  backgroundColor: 'var(--primary)',
                  border: '1px solid var(--primary)'
                }}
              />
              
              {/* Date */}
              <div 
                className="mono" 
                style={{ 
                  fontSize: '0.8rem', 
                  color: 'var(--tertiary)', 
                  marginBottom: '6px' 
                }}
              >
                {edu.year}
              </div>

              {/* Institution */}
              <h4 
                style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 700, 
                  color: 'var(--primary)', 
                  marginBottom: '4px',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                {edu.institution}
              </h4>

              {/* Degree */}
              <div 
                style={{ 
                  fontSize: '0.95rem', 
                  color: 'var(--secondary)', 
                  marginBottom: '4px',
                  fontWeight: 500
                }}
              >
                {edu.degree}
              </div>

              {/* Monospace details */}
              {edu.major && (
                <div 
                  className="mono" 
                  style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--tertiary)',
                    marginTop: '2px'
                  }}
                >
                  {edu.major.startsWith('//') ? edu.major : `// ${edu.major}`}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
