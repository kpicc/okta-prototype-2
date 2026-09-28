import { useState } from 'react';
import { Button } from '../src';
import { formatPhone } from './formatPhone.js';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServicesMobile.css';
import './OktaForgotPinMobile.css';

interface OktaForgotPinMobileProps {
  onBack: () => void;
  onCancel: () => void;
  onContinue?: (phone: string) => void;
}

const footerLinks = [
  { label: 'CONTACT', items: ['Contact us', 'Find a store'] },
  { label: 'SUPPORT', items: ['All support', 'Account & billing', 'Network & coverage', 'Phones & devices', 'Plans & services', 'Home internet', 'Device repair', 'Device care'] },
  { label: 'ABOUT', items: ['Our story', 'News room', 'Careers', 'Accessibility'] },
  { label: 'MORE', items: ['Terms of service', 'Terms & conditions', 'Privacy policy', 'Wireless code of conduct', 'Internet code'] },
];

export function OktaForgotPinMobile({ onBack, onCancel, onContinue }: OktaForgotPinMobileProps) {
  const { loading, trigger } = useDelayedAction();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const phoneDigits = phone.replace(/\D/g, '');
  const phoneError = submitted && (!phone ? 'Enter your phone number.' : phoneDigits.length !== 10 ? 'Enter a valid 10-digit phone number.' : '');

  function handleContinue() {
    setSubmitted(true);
    if (phoneDigits.length === 10) trigger(() => onContinue?.(phoneDigits));
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

      {/* Card */}
      <main className="okta-link-mobile__body">
        <div className="okta-link-mobile__card okta-link-mobile__card--verify">
          <h2 className="okta-link-mobile__card-title">PIN Reset</h2>
          <div className="okta-link-mobile__card-subtitle">
            <p className="okta-link-mobile__card-subtitle-text">
              Forgot your PIN? No problem, let's get you a new one.
            </p>
          </div>

          <div className="okta-fpin-mobile__field">
            <input
              type="tel"
              maxLength={14}
              className={`okta-fpin-mobile__input${phoneError ? ' okta-fpin-mobile__input--error' : ''}`}
              placeholder="Phone number"
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
              aria-invalid={Boolean(phoneError)}
              aria-describedby={phoneError ? 'forgot-mobile-phone-error' : undefined}
              onKeyDown={onEnterSubmit}
            />
            {phoneError && <span id="forgot-mobile-phone-error" className="okta-fpin-mobile__field-error" role="alert">{phoneError}</span>}
          </div>

          <Button size="large" className="okta-fpin-mobile__continue-btn" loading={loading} onClick={handleContinue}>
            Continue
          </Button>
          <a href="#" className="okta-fpin-mobile__cancel-link" onClick={(e) => { e.preventDefault(); onCancel(); }}>
            Cancel
          </a>
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
