import { useState } from 'react';
import slpLogo from '../assets/slp_logo.png';
import andaLogo from '../assets/anda_logo.jpg';
import tradeLogo from '../assets/trade_logo.png';

interface CaseStudy {
  projectId: string;
  sector: string;
  role: string;
  challenge: string;
  design: string;
  development: string;
  features: string[];
}

interface ArchiveProject {
  id: string;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
  liveUrl: string;
  caseStudyUrl: string;
  url: string;
  theme: 'dark' | 'grid';
  mockupTitle: string;
  mockupSubtitle: string;
  mockupIcon: string;
  caseStudy: CaseStudy;
  primaryActionType: 'live_preview' | 'request_sample';
}

export const Projects = () => {
  const [view, setView] = useState<'featured' | 'archive'>('featured');
  const [archiveIndex, setArchiveIndex] = useState<number>(0);
  const [showCaseStudy, setShowCaseStudy] = useState<boolean>(false);

  const archiveProjects: ArchiveProject[] = [
    {
      id: 'ARCH_01',
      category: 'WEB APP PLATFORM',
      title: 'SLP - Savings And Loan at Pitogo',
      description: 'A savings and loan web application that manages loan requests, savings accounts, online payments, AI-powered customer support, and real-time notifications—secure, simple, and always accessible.',
      bullets: [
        'Spring Boot REST API backend',
        'Loan & Savings account management',
        'AI customer support fallback chain'
      ],
      tags: ['Spring Boot', 'PostgreSQL', 'Redis', 'Groq'],
      liveUrl: 'https://savingsandloan.online',
      caseStudyUrl: '#',
      url: 'HTTPS://SAVINGSANDLOAN.ONLINE',
      theme: 'dark',
      mockupTitle: 'SLP - Savings And Loan at Pitogo',
      mockupSubtitle: 'A savings and loan web application that manages loan requests, savings accounts, online payments, AI-powered customer support, and real-time notifications—secure, simple, and always accessible.',
      mockupIcon: '🕊️',
      caseStudy: {
        projectId: '01',
        sector: 'FINTECH_WEB',
        role: 'BACKEND_DEVELOPER',
        challenge: 'Building a Spring Boot REST API backend for Paluwagan, supporting loan management, savings accounts, online payments, AI-powered customer support, and real-time notifications.',
        design: 'Layered architecture (Controller, Service, Repository) for maintainability, with a multi-provider AI fallback chain for resilient customer support.',
        development: 'Built core API endpoints, then expanded into payment integration and notifications. Tested every endpoint in Postman for request/response and edge-case behavior. Implemented a resilient AI fallback chain across multiple Groq keys and Gemini, with JWT access and refresh tokens stored in HttpOnly cookies.',
        features: [
          'Database: PostgreSQL + JPA',
          'Caching: Redis',
          'AI support: Groq + Gemini fallback',
          'Security: JWT + refresh token (HttpOnly cookies)'
        ]
      },
      primaryActionType: 'live_preview'
    },
    {
      id: 'ARCH_02',
      category: 'MOBILE APP',
      title: 'ANDA',
      description: 'Your personal vault for managing loans, repayments, and collections — anytime, anywhere.',
      bullets: [
        'Cross-platform borrower ledger UI',
        'Offline-first SQLite data storage',
        'Google Maps GPS route tracking'
      ],
      tags: ['Flutter', 'SQLite', 'Google Maps SDK', 'Biometric auth'],
      liveUrl: 'mailto:jlb.ramboy@gmail.com?subject=Inquiry%20about%20ANDA%20Sample%20App',
      caseStudyUrl: '#',
      url: 'HTTPS://ANDA.APP',
      theme: 'grid',
      mockupTitle: 'ANDA',
      mockupSubtitle: 'Keep track of borrower payments, loans, and collections.',
      mockupIcon: '🐱',
      caseStudy: {
        projectId: '02',
        sector: 'FINTECH_MOBILE',
        role: 'FULL-STACK_DEVELOPER',
        challenge: 'Managing borrower loans, repayment schedules, and collection routes was scattered across notebooks and spreadsheets for informal lenders. ANDA brings loan tracking, route planning, and cashflow monitoring into a single mobile app.',
        design: 'Built with Flutter for a single cross-platform codebase across Android and iOS, with SQLite as the local database so the app stays fully functional offline. Since all data is stored on-device, a manual backup and import system was designed to protect users from data loss due to device changes — allowing them to export their data as a file and restore it at any time. Google Maps SDK powers pin-based stop planning and live GPS tracking during collections. Security included a login system with fingerprint authentication, giving users quick and secure access to sensitive lending and cashflow data.',
        development: 'Designed the SQLite schema and UI for managing borrowers, loan records, and repayment tracking, including late penalties and partial/full payments. Integrated Google Maps for pin-based collection stops and live GPS route tracking. Built login with fingerprint authentication to secure access to lending and cashflow data. Built the cashflow logic and weekly profit-vs-expense charts, plus an editable expense tracker. Implemented database backup by serializing the SQLite file into a shareable export, and built the import logic to validate and restore the database from a user-selected file. Designed an intuitive UI to replace the informal lender\'s traditional notebooks and spreadsheets, allowing them to manage their lending operations digitally with minimal learning curve.',
        features: [
          'Cross-platform: Android & iOS',
          'Offline-first with SQLite',
          'Live GPS collection route tracking',
          'Loan status: active, overdue, paid',
          'Custom late penalties & waivers',
          'Login + fingerprint authentication',
          'Weekly profit vs. expense charts'
        ]
      },
      primaryActionType: 'request_sample'
    },
    {
      id: 'ARCH_03',
      category: 'DESKTOP APPLICATION',
      title: 'E-Trade',
      description: 'POS system with employee monitoring & admin oversight.',
      bullets: [
        'Transactions, inventory, and sales tracking',
        'Employee performance & attendance monitoring',
        'Administrative oversight & data updates'
      ],
      tags: ['Java', 'JavaFX', 'MySQL'],
      liveUrl: 'mailto:jlb.ramboy@gmail.com?subject=Inquiry%20about%20E-Trade%20Sample%20App',
      caseStudyUrl: '#',
      url: 'HTTPS://TRADE.POS/DESKTOP',
      theme: 'dark',
      mockupTitle: 'E-Trade - Desktop POS',
      mockupSubtitle: 'A POS system built for managing business operations.',
      mockupIcon: '⚙️',
      caseStudy: {
        projectId: '03',
        sector: 'BUSINESS_OPERATIONS',
        role: 'JAVA_DEVELOPER',
        challenge: 'A POS system built for managing business operations, combining transaction processing with employee and administrator functionalities into one platform for both daily operations and managerial oversight.',
        design: 'Built with a modular design, separating the platform into two main core modules: the POS system for transactions, inventory, and sales tracking; and the Employee monitoring system to log performance, attendance, and cashier activity.',
        development: 'Designed and implemented an intuitive login and dashboard navigation interface. Developed dedicated cashier and inventory modules for employee management, and built administrative oversight screens to monitor business performance, update cashier records, and analyze sales logs.',
        features: [
          'Simple navigation — intuitive login and dashboard system',
          'Employee management — dedicated cashier & inventory modules',
          'Administrative oversight — monitor performance & update records',
          'POS transaction processing & sales tracking',
          'Inventory management & cashier controls',
          'Employee performance & activity log monitoring',
          'Administrative dashboards for business insights'
        ]
      },
      primaryActionType: 'request_sample'
    }
  ];

  const currentProject = archiveProjects[archiveIndex];

  const handleProjectChange = (nextIndex: number) => {
    setArchiveIndex(nextIndex);
    setShowCaseStudy(false); // Reset case study view when project changes
  };

  if (view === 'archive') {
    return (
      <div className={`section-view-container archive-container theme-${currentProject.theme}`}>
        {/* Responsive Header Row */}
        <div className="archive-header-row">
          <span className="archive-header-title">05 — EXTENDED_ARCHIVE</span>

          <div className="archive-header-actions">
            <button
              onClick={() => {
                setView('featured');
                setShowCaseStudy(false);
              }}
              className="projects-header-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                padding: 0,
                color: 'var(--primary)',
                fontWeight: 600
              }}
            >
              ← BACK TO FEATURED
            </button>

            <div className="archive-controls">
              <span className="archive-status-badge desktop-only" style={{ marginRight: '5px' }}>STATUS: ACTIVE</span>
              <button
                onClick={() => handleProjectChange((archiveIndex - 1 + archiveProjects.length) % archiveProjects.length)}
                className="archive-nav-btn"
                title="Previous Project"
              >
                ◀
              </button>
              <span className="archive-page-indicator mono" style={{ fontSize: '0.85rem', minWidth: '45px', textAlign: 'center' }}>
                {String(archiveIndex + 1).padStart(2, '0')} / {String(archiveProjects.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => handleProjectChange((archiveIndex + 1) % archiveProjects.length)}
                className="archive-nav-btn"
                title="Next Project"
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Detail Panel Grid */}
        <div className={`archive-panel theme-${currentProject.theme}`} style={{ borderBottom: showCaseStudy ? 'none' : '1px solid var(--border-color)' }}>

          {/* Left Side: Info & Actions (Hidden on mobile if case study is active) */}
          <div className={`archive-details ${showCaseStudy ? 'hide-on-mobile' : ''}`}>
            <span className="archive-category" style={{ color: currentProject.theme === 'dark' ? 'var(--accent)' : 'var(--primary)' }}>
              // {currentProject.category}
            </span>
            <h2 className="archive-title">
              {currentProject.title}
            </h2>
            <p className="archive-desc">
              {currentProject.description}
            </p>

            {/* Checklist */}
            <ul className="archive-bullets">
              {currentProject.bullets.map((bullet, idx) => (
                <li key={idx} className="archive-bullet-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="archive-bullet-icon"
                    style={{ color: currentProject.theme === 'dark' ? 'var(--accent)' : 'var(--primary)' }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="archive-tags">
              {currentProject.tags.map((tag) => (
                <span key={tag} className="archive-tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="archive-actions">
              <a
                href={currentProject.liveUrl}
                target={currentProject.primaryActionType === 'request_sample' ? undefined : "_blank"}
                rel={currentProject.primaryActionType === 'request_sample' ? undefined : "noopener noreferrer"}
                className="btn-archive-primary"
              >
                {currentProject.primaryActionType === 'request_sample' ? 'REQUEST SAMPLE' : 'LIVE PREVIEW ↗'}
              </a>
              <button
                onClick={() => setShowCaseStudy(!showCaseStudy)}
                className="btn-archive-secondary"
              >
                {showCaseStudy ? 'HIDE CASE STUDY' : 'READ CASE STUDY'}
              </button>
            </div>
          </div>

          {/* Mobile Case Study Content: swaps layout in place inside the card on mobile */}
          {showCaseStudy && (
            <div className="archive-details case-study-mobile-content show-only-on-mobile">
              <div className="case-study-header" style={{ marginBottom: '20px' }}>
                <span>[ PROJECT_ID: {currentProject.caseStudy.projectId} ]</span>
                <span>[ ROLE: {currentProject.caseStudy.role} ]</span>
              </div>

              <div className="case-study-divider"></div>

              <div className="case-study-cols" style={{ gap: '20px' }}>
                <div className="case-study-col">
                  <span className="case-study-col-title">01 // THE CHALLENGE</span>
                  <p className="case-study-col-text">{currentProject.caseStudy.challenge}</p>
                </div>
                <div className="case-study-col">
                  <span className="case-study-col-title">02 // DESIGN APPROACH</span>
                  <p className="case-study-col-text">{currentProject.caseStudy.design}</p>
                </div>
                <div className="case-study-col">
                  <span className="case-study-col-title">03 // DEVELOPMENT PROCESS</span>
                  <p className="case-study-col-text">{currentProject.caseStudy.development}</p>
                </div>
              </div>

              <div className="case-study-divider" style={{ marginBottom: '20px' }}></div>

              <h3 className="case-study-features-title">KEY_FEATURES</h3>
              <div className="case-study-features-grid" style={{ gridTemplateColumns: '1fr', gap: '10px', marginBottom: '25px' }}>
                {currentProject.caseStudy.features.map((feature, idx) => (
                  <div key={idx} className="case-study-feature-card">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="case-study-feature-icon"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="case-study-feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowCaseStudy(false)}
                className="btn-archive-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                HIDE CASE STUDY
              </button>
            </div>
          )}

          {/* Right Side: Device/Browser Mockup (hidden on mobile) */}
          <div className="archive-visual">
            <div className="browser-mockup">
              {/* Window Header */}
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="browser-dot red"></div>
                  <div className="browser-dot yellow"></div>
                  <div className="browser-dot green"></div>
                </div>
                <div className="browser-url-bar">
                  {currentProject.url}
                </div>
              </div>

              {/* Window Content */}
              <div className="browser-viewport">
                <div className="viewport-bg-text-1">03 — experience</div>
                <div className="viewport-bg-text-2">FULL HISTORY ➔</div>
                <div className="viewport-bg-large-title">Enterprise Care Management</div>

                {/* Secondary card (rotated in background) */}
                <div className="viewport-card-secondary">
                  <div style={{ height: '8px', width: '40%', backgroundColor: currentProject.theme === 'dark' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)', marginBottom: '6px' }}></div>
                  <div style={{ height: '6px', width: '80%', backgroundColor: currentProject.theme === 'dark' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}></div>
                </div>

                {/* Main floating card / SLP, ANDA, and TRADE Custom Viewport Mockup */}
                {currentProject.id === 'ARCH_01' ? (
                  <div className="slp-mockup-card">
                    <div className="slp-logo-area">
                      <img src={slpLogo} alt="SLP Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div className="slp-info-area">
                      <span className="slp-mockup-title">SLP - Savings And Loan at Pitogo</span>
                      <p className="slp-mockup-desc">
                        A savings and loan web application that manages loan requests, savings accounts, online payments, AI-powered customer support, and real-time notifications—secure, simple, and always accessible.
                      </p>
                      <div className="slp-mockup-buttons">
                        <span className="slp-mockup-btn">
                          <span style={{ marginRight: '4px' }}>🌐</span> Visit Website
                        </span>
                        <span className="slp-mockup-btn">
                          <span style={{ marginRight: '4px' }}>➔</span> Open App
                        </span>
                      </div>
                    </div>
                  </div>
                ) : currentProject.id === 'ARCH_02' ? (
                  <div className="slp-mockup-card">
                    <div className="slp-logo-area" style={{ backgroundColor: '#fffcf6' }}>
                      <img src={andaLogo} alt="ANDA Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div className="slp-info-area">
                      <span className="slp-mockup-title">ANDA</span>
                      <p className="slp-mockup-desc">
                        A mobile ledger application designed for efficient financial tracking, loan management, and collection route planning—simple, offline-first, and secure.
                      </p>
                      <div className="slp-mockup-buttons">
                        <span className="slp-mockup-btn">
                          <span style={{ marginRight: '4px' }}>📱</span> Open App
                        </span>
                      </div>
                    </div>
                  </div>
                ) : currentProject.id === 'ARCH_03' ? (
                  <div className="slp-mockup-card">
                    <div className="slp-logo-area" style={{ border: 'none', backgroundColor: '#ffffff' }}>
                      <img src={tradeLogo} alt="TRADE Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div className="slp-info-area">
                      <span className="slp-mockup-title">E-Trade - Desktop POS</span>
                      <p className="slp-mockup-desc">
                        A POS system built for managing business operations, combining transaction processing with employee and administrator functionalities into one platform.
                      </p>
                      <div className="slp-mockup-buttons">
                        <span className="slp-mockup-btn">
                          <span style={{ marginRight: '4px' }}>💻</span> Open App
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="viewport-card">
                    <div className="card-icon-box">
                      {currentProject.mockupIcon}
                    </div>
                    <div className="card-content-box" style={{ width: '100%' }}>
                      <span className="card-title">{currentProject.mockupTitle}</span>
                      <span className="card-desc">
                        {currentProject.mockupSubtitle}
                      </span>
                      <div className="card-badges">
                        <div className="card-badge-dummy"></div>
                        <div className="card-badge-dummy"></div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="viewport-footer">
                  <span>RENDER_MODE: PRODUCTION</span>
                  <span>v1.0.24</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Expandable Case Study Dropdown */}
        {showCaseStudy && (
          <div className="case-study-panel hide-on-mobile">
            {/* Header info bar */}
            <div className="case-study-header">
              <span className="case-study-header-item">[ PROJECT_ID: {currentProject.caseStudy.projectId} ]</span>
              <span className="case-study-header-item">[ ROLE: {currentProject.caseStudy.role} ]</span>
            </div>

            <div className="case-study-divider"></div>

            {/* Three column descriptions */}
            <div className="case-study-cols">
              <div className="case-study-col">
                <span className="case-study-col-title">01 // THE CHALLENGE</span>
                <p className="case-study-col-text">{currentProject.caseStudy.challenge}</p>
              </div>
              <div className="case-study-col">
                <span className="case-study-col-title">02 // DESIGN APPROACH</span>
                <p className="case-study-col-text">{currentProject.caseStudy.design}</p>
              </div>
              <div className="case-study-col">
                <span className="case-study-col-title">03 // DEVELOPMENT PROCESS</span>
                <p className="case-study-col-text">{currentProject.caseStudy.development}</p>
              </div>
            </div>

            <div className="case-study-divider" style={{ marginBottom: '25px' }}></div>

            {/* Key Features Section */}
            <h3 className="case-study-features-title">KEY_FEATURES</h3>
            <div className="case-study-features-grid">
              {currentProject.caseStudy.features.map((feature, idx) => (
                <div key={idx} className="case-study-feature-card">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="case-study-feature-icon"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="case-study-feature-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="section-view-container">
      {/* Top Header Row matching the designs */}
      <div className="projects-header-new">
        <span className="projects-header-title">01 — PROJECTS</span>

        {/* Switch View Button */}
        <button
          onClick={() => setView('archive')}
          className="projects-header-link"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            padding: 0,
            color: 'var(--primary)',
            fontWeight: 600
          }}
        >
          ALL PROJECTS ➔
        </button>
      </div>

      {/* Grid containing the two redesigned projects */}
      <div className="projects-grid-new">
        {/* Project 1: SLP */}
        <div className="project-card-new">
          <div className="project-info-box">
            {/* Responsive Badge/Date row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="project-pill-badge">
                  <span className="desktop-only" style={{ marginRight: '4px' }}>🌐</span>WEB APP
                </div>
              </div>
              <span className="mono mobile-only" style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>
                2023
              </span>
            </div>

            <h3 className="project-title-new">SLP – Savings and Loan</h3>

            <p className="project-desc-new">
              A comprehensive web-based platform for managing savings and loan operations at Pitogo.
            </p>

            {/* Desktop Button */}
            <a
              href="https://github.com/juliusramboy/vault_app"
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn desktop-only"
            >
              VISIT WEB APP
            </a>

            {/* Mobile Button */}
            <a
              href="https://github.com/juliusramboy/vault_app"
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn mobile-only"
              style={{ width: '100%', textAlign: 'center', display: 'block' }}
            >
              VISIT WEB APP ↗
            </a>
          </div>

          <div className="project-visual-box">
            <div className="tilted-card tilt-left">
              <div className="tilted-icon-container" style={{ overflow: 'hidden', padding: 0 }}>
                <img src={slpLogo} alt="SLP Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span className="tilted-title">SLP_PITOGO</span>
              <span className="tilted-version">v1.2.0_STABLE</span>
            </div>
          </div>
        </div>

        {/* Project 2: ANDA */}
        <div className="project-card-new">
          <div className="project-info-box">
            {/* Responsive Badge/Date row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="project-pill-badge">
                  <span className="desktop-only" style={{ marginRight: '4px' }}>📱</span>MOBILE APP
                </div>
              </div>
              <span className="mono mobile-only" style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>
                2022
              </span>
            </div>

            <h3 className="project-title-new">ANDA</h3>

            <p className="project-desc-new">
              A mobile ledger application designed for efficient financial tracking and management.
            </p>

            {/* Desktop Button */}
            <a
              href="mailto:jlb.ramboy@gmail.com?subject=Inquiry%20about%20ANDA%20Sample%20App"
              className="project-action-btn desktop-only"
            >
              EMAIL FOR SAMPLE
            </a>

            {/* Mobile Button */}
            <a
              href="mailto:jlb.ramboy@gmail.com?subject=Inquiry%20about%20ANDA%20Sample%20App"
              className="project-action-btn mobile-only outline-btn-mobile"
              style={{ width: '100%', textAlign: 'center', display: 'block' }}
            >
              EMAIL FOR SAMPLE ↗
            </a>
          </div>

          <div className="project-visual-box">
            <div className="tilted-card tilt-right">
              <div className="tilted-icon-container" style={{ overflow: 'hidden', padding: 0 }}>
                <img src={andaLogo} alt="ANDA Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span className="tilted-title">ANDA</span>
              <span className="tilted-version">v0.9.4_BETA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
