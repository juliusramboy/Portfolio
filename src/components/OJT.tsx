
interface JobEntry {
  role: string;
  company: string;
  duration: string;
  description: string;
  tags: string[];
}

interface MobileJobEntry {
  badge: string;
  isSolidBadge: boolean;
  year: string;
  company: string;
  role: string;
  description: string;
}

export const OJT = () => {
  const desktopJobs: JobEntry[] = [
    {
      role: 'Backend Developer Intern',
      company: 'Exakt Medical Services Corp. | Kapitolyo, Pasig',
      duration: 'August 2025 – December 2025',
      description: 'Assisted in developing and testing RESTful API endpoints using Spring Boot across multiple modules (Patient Registration, Medical Records, and Patient Consultation), performed manual testing via Postman, resolved bugs, and wrote database queries to ensure backend reliability and data integrity.',
      tags: ['Spring Boot', 'Java', 'Postman', 'MySQL', 'Git']
    }
  ];

  const mobileJobs: MobileJobEntry[] = [
    {
      badge: 'INTERN',
      isSolidBadge: true,
      year: '2025',
      company: 'Exakt Medical Services Corp.',
      role: 'Backend Developer Intern',
      description: 'Assisted in developing and testing RESTful API endpoints using Spring Boot across multiple modules (Patient Registration, Medical Records, and Patient Consultation), performed manual testing via Postman, resolved bugs, and wrote database queries to ensure backend reliability and data integrity.'
    }
  ];

  return (
    <div className="section-view-container">
      {/* Header Row */}
      <div className="projects-header-new">
        <span className="projects-header-title">03 — EXPERIENCE</span>
      </div>

      {/* Desktop Experience List */}
      <div className="desktop-only" style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginTop: '20px' }}>
        {desktopJobs.map((job, idx) => (
          <div 
            key={idx} 
            style={{ 
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '40px'
            }}
          >
            <div className="timeline-header-block" style={{ marginBottom: '10px' }}>
              <h3 className="timeline-title" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                {job.role}
              </h3>
              <span className="timeline-date" style={{ color: 'var(--secondary)' }}>
                {job.duration}
              </span>
            </div>

            <div 
              className="mono" 
              style={{ 
                fontSize: '0.85rem', 
                color: 'var(--tertiary)', 
                marginBottom: '18px' 
              }}
            >
              {job.company}
            </div>

            <p 
              className="timeline-desc" 
              style={{ 
                fontSize: '1rem', 
                lineHeight: '1.6', 
                color: 'var(--secondary)', 
                marginBottom: '20px',
                maxWidth: '750px'
              }}
            >
              {job.description}
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
              {job.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="mono"
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    padding: '4px 10px', 
                    fontSize: '0.7rem', 
                    color: 'var(--secondary)' 
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Experience List */}
      <div className="mobile-only" style={{ display: 'none', flexDirection: 'column', gap: '30px', marginTop: '25px' }}>
        {mobileJobs.map((job, idx) => (
          <div 
            key={idx} 
            style={{ 
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '30px',
              fontFamily: 'var(--font-sans)'
            }}
          >
            {/* Badge & Year Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span 
                className="mono"
                style={{ 
                  backgroundColor: 'var(--primary)',
                  color: 'var(--bg-main)',
                  border: 'none',
                  padding: '4px 10px',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}
              >
                {job.badge}
              </span>
              <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>
                {job.year}
              </span>
            </div>

            {/* Company Name */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
              {job.company}
            </h3>

            {/* Role Subtitle */}
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>
              {job.role}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--secondary)' }}>
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
