import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Send, Terminal } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) {
      setConsoleLogs((prev) => [...prev, 'ERR: Fields cannot be empty. Connection aborted.']);
      return;
    }

    setStatus('sending');
    setConsoleLogs([
      'Initializing connection to mail system...',
      'Packing message envelope payload...',
      `Generating mailto command for Subject: ${formData.subject}`
    ]);

    setTimeout(() => {
      setConsoleLogs((prev) => [...prev, 'Encrypting data payload using RSA-2048...']);
    }, 600);

    setTimeout(() => {
      setConsoleLogs((prev) => [...prev, 'Opening default local system mail client...']);
    }, 1200);

    setTimeout(() => {
      const mailtoUrl = `mailto:jlb.ramboy@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
      window.location.href = mailtoUrl;

      setConsoleLogs((prev) => [
        ...prev,
        'DATA TRANSPORT COMMAND DISPATCHED SUCCESSFULLY.',
        'Please complete and send the email via your opened client.'
      ]);
      setStatus('success');
      setFormData({ subject: '', message: '' });
    }, 1800);
  };

  return (
    <div className="section-view-container" style={{ borderBottom: 'none' }}>
      {/* Desktop Header */}
      <div className="section-header desktop-only">
        <h2 className="section-title">Contact Me</h2>
        <span className="section-subtitle">SYS_PORT_LOG: INBOUND_COMMUNICATION</span>
      </div>

      {/* Desktop Contact Terminal View */}
      <div className="contact-container desktop-only">
        <div className="contact-terminal">
          <div className="terminal-header">
            <Terminal size={14} style={{ color: 'var(--secondary)' }} />
            <span>msg_transmitter.sh</span>
            <span style={{ marginLeft: 'auto' }}>STATUS: {status.toUpperCase()}</span>
          </div>

          <form onSubmit={handleFormSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label" htmlFor="subject">// MESSAGE_SUBJECT</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Type transmission subject..."
                disabled={status === 'sending'}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">// MESSAGE_BODY</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-textarea"
                rows={5}
                placeholder="Type your transmission query here..."
                disabled={status === 'sending'}
                required
              />
            </div>

            <button type="submit" className="form-submit-btn" disabled={status === 'sending'}>
              <Send size={14} />
              <span>{status === 'sending' ? 'Transmitting...' : 'Execute message_transmit'}</span>
            </button>
          </form>

          {consoleLogs.length > 0 && (
            <div 
              className="terminal-body mono" 
              style={{ 
                borderTop: '1px solid var(--border-color)', 
                backgroundColor: 'var(--primary)', 
                color: '#00FF66',
                maxHeight: '180px',
                overflowY: 'auto'
              }}
            >
              {consoleLogs.map((log, idx) => (
                <div key={idx} style={{ marginBottom: '4px' }}>
                  &gt; {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Contact panel matching exact 5th screenshot */}
      <div 
        className="mobile-only" 
        style={{ 
          display: 'none', 
          flexDirection: 'column', 
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '40px 30px',
          fontFamily: 'var(--font-mono)'
        }}
      >
        {/* Header */}
        <h2 
          style={{ 
            fontFamily: 'var(--font-sans)', 
            fontWeight: 800, 
            fontSize: '1.8rem', 
            color: '#ffffff', 
            marginBottom: '40px',
            letterSpacing: '-0.05rem'
          }}
        >
          GET_IN_TOUCH
        </h2>

        {/* Vertical Arrow Link list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px' }}>
          <a 
            href="https://github.com/juliusramboy" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222222', paddingBottom: '15px' }}
          >
            <span>GITHUB</span>
            <span>➔</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/julius-ramboy" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222222', paddingBottom: '15px' }}
          >
            <span>LINKEDIN</span>
            <span>➔</span>
          </a>

          <a 
            href="mailto:jlb.ramboy@gmail.com" 
            style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222222', paddingBottom: '15px' }}
          >
            <span>EMAIL</span>
            <span>➔</span>
          </a>
        </div>

        {/* Separator line */}
        <div style={{ width: '100%', height: '1px', backgroundColor: '#333333', marginBottom: '20px' }}></div>

        {/* Bottom Metadata Info row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#666666' }}>
          <span>© 2025 jlb.ramboy@gmail.com</span>
          <span>V1.0.24</span>
        </div>
      </div>
    </div>
  );
};
