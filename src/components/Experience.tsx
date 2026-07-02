interface ExperienceItem {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
}

export const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 'LOG_01',
      date: '2024 - PRESENT',
      role: 'Senior Full-Stack Engineer / Consultant',
      company: 'Independent Systems',
      description: 'Architecting secure fintech platforms (including the mobile Vault App) featuring offline-first storage pipelines, robust local encryption, and map telemetry layers. Designing ultra-lightweight custom React micro-frontends with a focus on load performance and modular structure.'
    },
    {
      id: 'LOG_02',
      date: '2022 - 2024',
      role: 'Lead Application Engineer',
      company: 'Nexus Tech Industries',
      description: 'Led a team of three developers building mobile app ecosystems. Restructured state management algorithms, decreasing rendering latency by 45%. Coordinated migrations of legacy RESTful endpoints to Go-based gRPC message systems.'
    },
    {
      id: 'LOG_03',
      date: '2020 - 2022',
      role: 'Junior Full-Stack Developer',
      company: 'ByteGrid Logic',
      description: 'Engineered clean React dashboards with dark mode capabilities. Configured CI/CD workflows using GitHub Actions to deploy containerized services into AWS clusters, maintaining 99.98% system uptime logs.'
    },
    {
      id: 'LOG_04',
      date: '2018 - 2020',
      role: 'System Infrastructure Intern',
      company: 'Est. 2018 Infrastructure',
      description: 'Began building core development systems. Scripted bash tools for automated cron-job folder updates and database diagnostics. Managed Nginx web servers and secured local routers.'
    }
  ];

  return (
    <div className="section-view-container">
      <div className="section-header">
        <h2 className="section-title">Deployment Log</h2>
        <span className="section-subtitle">SYS_PORT_LOG: CAREER_MILESTONES</span>
      </div>

      <div className="timeline">
        {experiences.map((exp) => (
          <div className="timeline-item" key={exp.id}>
            <div className="timeline-dot">{exp.id.split('_')[1]}</div>
            
            <div className="timeline-header-block">
              <div>
                <h3 className="timeline-title">{exp.role}</h3>
                <span className="timeline-company">@ {exp.company}</span>
              </div>
              <span className="timeline-date">{exp.date}</span>
            </div>
            
            <p className="timeline-desc">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
