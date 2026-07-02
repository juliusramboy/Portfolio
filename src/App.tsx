import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { TerminalSandbox } from './components/TerminalSandbox';
import { Education } from './components/Education';
import { OJT } from './components/OJT';
import { Stack } from './components/Stack';
import { Terminal, Menu, X, SquareTerminal, Sun, Moon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Smooth scroll to a section by its ID
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Use 60px header offset (standard mobile/desktop nav height)
      const headerOffset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  const handleMobileNav = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  // ScrollSpy: observe sections and update active sidebar tab
  useEffect(() => {
    const sectionIds = ['home', 'work', 'education', 'ojt', 'achievements', 'sandbox'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-85px 0px -50% 0px', // Trigger when section occupies the active zone
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="app-container">
      {/* Left Navigation Sidebar */}
      <div className="left-branding-sidebar">
        <div className="purple-line"></div>
        
        {/* Terminal/Home Icon at the top */}
        <button 
          onClick={() => scrollToSection('home')}
          className={`sidebar-nav-item ${activeTab === 'home' ? 'active' : ''}`}
          style={{ 
            marginTop: '10px', 
            transform: 'none', 
            writingMode: 'horizontal-tb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center'
          }}
          title="Terminal Home"
        >
          <Terminal size={18} />
        </button>

        {/* Vertical Navigation Items Centered Vertically */}
        <div className="sidebar-nav-container" style={{ margin: 'auto 0' }}>
          <button 
            onClick={() => scrollToSection('work')}
            className={`sidebar-nav-item ${activeTab === 'work' ? 'active' : ''}`}
          >
            PROJECTS
          </button>
          
          <button 
            onClick={() => scrollToSection('education')}
            className={`sidebar-nav-item ${activeTab === 'education' ? 'active' : ''}`}
          >
            EDUCATION
          </button>
          
          <button 
            onClick={() => scrollToSection('ojt')}
            className={`sidebar-nav-item ${activeTab === 'ojt' ? 'active' : ''}`}
          >
            EXPERIENCE
          </button>
          
          <button 
            onClick={() => scrollToSection('achievements')}
            className={`sidebar-nav-item ${activeTab === 'achievements' ? 'active' : ''}`}
          >
            ACHIEVEMENTS
          </button>
        </div>

        {/* Footer Icons at the bottom of the sidebar */}
        <div className="sidebar-footer-icons" style={{ marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span 
            title="Terminal Sandbox"
            onClick={() => scrollToSection('sandbox')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <SquareTerminal 
              size={18} 
              className="sidebar-footer-icon" 
            />
          </span>
          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--secondary)',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={18} className="sidebar-footer-icon" /> : <Moon size={18} className="sidebar-footer-icon" />}
          </button>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="content-wrapper">
        {/* Mobile Header Bar (Sticky) */}
        <header className="mobile-header mobile-only">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--primary)',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Mobile Menu Drawer Overlay */}
        <div className={`mobile-nav-drawer mobile-only ${mobileMenuOpen ? 'open' : ''}`}>
          <button onClick={() => handleMobileNav('work')} className="mobile-nav-link">PROJECTS</button>
          <button onClick={() => handleMobileNav('education')} className="mobile-nav-link">EDUCATION</button>
           <button onClick={() => handleMobileNav('ojt')} className="mobile-nav-link">EXPERIENCE</button>
          <button onClick={() => handleMobileNav('achievements')} className="mobile-nav-link">ACHIEVEMENTS</button>
          <button onClick={() => handleMobileNav('sandbox')} className="mobile-nav-link">TERMINAL</button>
        </div>

        {/* Top Header Information Panel (Desktop Only) */}
        <header className="top-system-nav">
          <button 
            onClick={() => scrollToSection('home')}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              outline: 'none',
              padding: 0
            }}
            className="user-status mono"
          >
            [USER: JULS]
          </button>
        </header>

        {/* Dynamic Inner Panel Viewport */}
        <main style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <section id="home">
            <Home />
          </section>
          
          <section id="work">
            <Projects />
          </section>

          <section id="stack">
            <Stack />
          </section>
          
          <section id="education">
            <Education />
          </section>
          
          <section id="ojt">
            <OJT />
          </section>
          
          <section id="achievements">
            <Skills />
          </section>
          
          <section id="sandbox">
            <TerminalSandbox />
          </section>

          {/* Footer Component */}
          <footer 
            className="desktop-only"
            style={{ 
              borderTop: '1px solid var(--border-color)', 
              padding: '40px 20px',
              backgroundColor: 'var(--bg-main)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {/* Bottom Footer Details */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '30px'
              }}
            >
              {/* Left Column: Brand & Info */}
              <div>
                <h3 
                  style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontWeight: 900, 
                    fontSize: '1.6rem', 
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                    letterSpacing: '-0.05rem',
                    color: 'var(--primary)'
                  }}
                >
                  jlb.ramboy@gmail.com
                </h3>
                <p style={{ color: 'var(--tertiary)', fontSize: '0.75rem' }}>
                  STAY_HYDRATED // KEEP_BUILDING
                </p>
              </div>

              {/* Right Column: Social Links Grid */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '12px 30px', 
                  fontSize: '0.75rem' 
                }}
              >
                <a href="https://github.com/juliusramboy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                  GITHUB ↗
                </a>
                <a href="https://www.linkedin.com/in/julius-ramboy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                  LINKEDIN ↗
                </a>
                 <a href="mailto:jlb.ramboy@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                  EMAIL ↗
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
