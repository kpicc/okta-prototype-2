import { useState } from 'react';
import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServicesMobile.css';
import './OktaMfaVerifyMobile.css';

interface OktaMfaVerifyMobileProps {
  onBack: () => void;
  onContinue?: () => void;
}

const footerLinks = [
  { label: 'CONTACT', items: ['Contact us', 'Find a store'] },
  { label: 'SUPPORT', items: ['All support', 'Account & billing', 'Network & coverage', 'Phones & devices', 'Plans & services', 'Home internet', 'Device repair', 'Device care'] },
  { label: 'ABOUT', items: ['Our story', 'News room', 'Careers', 'Accessibility'] },
  { label: 'MORE', items: ['Terms of service', 'Terms & conditions', 'Privacy policy', 'Wireless code of conduct', 'Internet code'] },
];

export function OktaMfaVerifyMobile({ onBack, onContinue }: OktaMfaVerifyMobileProps) {
  const { loading, trigger } = useDelayedAction();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [showError, setShowError] = useState(false);
  const codeError = showError && code !== '222222';

  function handleContinue() {
    setShowError(true);
    if (code === '222222') trigger(() => onContinue?.());
  }

  function onEnterSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') handleContinue();
  }

  return (
    <div className="okta-link-mobile">
      {/* Header */}
      <header className="okta-link-mobile__header">
        <img src="/okta/freedom-logo-small.svg" alt="Freedom Mobile" className="okta-link-mobile__logo" onClick={onBack} style={{ cursor: 'pointer' }} />
        <button className="okta-link-mobile__menu-btn" aria-label="Menu">
          <span className="okta-link-mobile__menu-bar" />
          <span className="okta-link-mobile__menu-bar" />
          <span className="okta-link-mobile__menu-bar" />
        </button>
      </header>

      {/* Step tracker */}
      <div className="okta-link-mobile__steps">
        <div className="okta-link-mobile__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link-mobile__step-label okta-link-mobile__step-label--completed">Update login</span>
        </div>
        <div className="okta-link-mobile__step-line okta-link-mobile__step-line--first" />
        <div className="okta-link-mobile__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link-mobile__step-label okta-link-mobile__step-label--completed">Link services</span>
        </div>
        <div className="okta-link-mobile__step-line okta-link-mobile__step-line--second" />
        <div className="okta-link-mobile__step okta-link-mobile__step--active">
          <img src="/okta/step-current.svg" alt="" width={24} height={24} />
          <span className="okta-link-mobile__step-label okta-link-mobile__step-label--active">Set up MFA</span>
        </div>
      </div>

      {/* Card */}
      <main className="okta-link-mobile__body">
        <div className="okta-link-mobile__card okta-link-mobile__card--mfa-verify">
          <h2 className="okta-link-mobile__card-title">Multi-factor authentication</h2>
          <div className="okta-link-mobile__card-subtitle">
            <p className="okta-link-mobile__card-subtitle-text">
              Verify your phone number and PIN one last time to link your existing services.
            </p>
          </div>

          <div className="okta-mfa-verify-mobile__fields">
            <div className="okta-mfa-verify-mobile__field">
              <input type="text" inputMode="numeric" maxLength={6} className={`okta-mfa-verify-mobile__input${codeError ? ' okta-mfa-verify-mobile__input--error' : ''}`} placeholder="Enter the code" value={code} onChange={(event) => { setCode(event.target.value.replace(/\D/g, '')); if (showError) setShowError(false); }} onBlur={() => { if (code !== '222222') setShowError(true); }} aria-invalid={codeError} aria-describedby={codeError ? 'mfa-mobile-code-error' : undefined} onKeyDown={onEnterSubmit} />
              {codeError && <span id="mfa-mobile-code-error" className="okta-mfa-verify-mobile__field-error" role="alert">Enter the valid 6-digit security code.</span>}
            </div>
            <a href="#" className="okta-mfa-verify-mobile__resend-row" onClick={(e) => e.preventDefault()}>
              <span className="okta-mfa-verify-mobile__resend-text">Didn't receive the code?</span>
              <span className="okta-mfa-verify-mobile__resend-link">Resend</span>
              <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
          </div>

          <Button size="large" className="okta-link-mobile__continue-btn" loading={loading} onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="okta-link-mobile__footer">
        {footerLinks.map((section) => (
          <div key={section.label} className="okta-link-mobile__footer-section">
            <button
              className="okta-link-mobile__footer-header"
              onClick={() => setOpenSection(openSection === section.label ? null : section.label)}
              aria-expanded={openSection === section.label}
            >
              <span>{section.label}</span>
              <img
                src="/okta/icon-chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className={`okta-link-mobile__footer-chevron${openSection === section.label ? ' okta-link-mobile__footer-chevron--open' : ''}`}
              />
            </button>
            {openSection === section.label && (
              <div className="okta-link-mobile__footer-content">
                {section.items.map((item) => (
                  <a key={item} href="#" className="okta-link-mobile__footer-link" onClick={(e) => e.preventDefault()}>{item}</a>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="okta-link-mobile__footer-bottom">
          <button className="okta-link-mobile__feedback-btn">Provide Feedback</button>
          <div className="okta-link-mobile__socials">
            <span className="okta-link-mobile__social-icon">f</span>
            <span className="okta-link-mobile__social-icon">t</span>
            <span className="okta-link-mobile__social-icon">ig</span>
          </div>
        </div>

        <p className="okta-link-mobile__copyright">&copy; 2019 Freedom Mobile Inc.</p>
      </footer>
    </div>
  );
}
