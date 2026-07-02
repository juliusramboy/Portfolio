export const Home = () => {
  return (
    <div className="split-layout">
      {/* Left grid block */}
      <div className="grid-block">
        <h1 className="main-title cursor-blink">
          Julius Lorenzo<br />Ramboy
        </h1>

        <div className="sys-msg-container">
          <span className="sys-badge">SYS_MSG</span>
          <p className="sys-text">
            I'm a Junior Java developer. I build modern web & mobile apps with a focus on scalable architecture and user experience.
          </p>
        </div>

        <div className="status-container">
          <span className="status-tag">&lt;current_status&gt;</span> Currently building things that solve real problems, one feature at a time. <span className="status-tag">&lt;/current_status&gt;</span>
        </div>

        <div className="links-grid">
          <a href="https://github.com/juliusramboy" target="_blank" rel="noopener noreferrer" className="links-grid-item">
            <span>GITHUB ↗</span>
          </a>
          <a href="https://www.linkedin.com/in/julius-ramboy" target="_blank" rel="noopener noreferrer" className="links-grid-item">
            <span>LINKEDIN ↗</span>
          </a>
          <a href="mailto:jlb.ramboy@gmail.com" className="links-grid-item">
            <span>EMAIL ↗</span>
          </a>
        </div>
      </div>

      {/* Right plain block */}
      <div className="plain-block" style={{ padding: '20px' }}>
        <div className="avatar-card">
          <img src="/profile1.png" alt="Julius Lorenzo Ramboy" className="avatar-image" />
        </div>
      </div>
    </div>
  );
};
