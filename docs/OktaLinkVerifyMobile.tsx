import { useState } from 'react';
import { Button } from '../src';
import { formatPhone } from './formatPhone.js';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServicesMobile.css';
import './OktaLinkVerifyMobile.css';

interface OktaLinkVerifyMobileProps {
  onBack: () => void;
  onContinue?: () => void;
}

const footerLinks = [
  { label: 'CONTACT', items: ['Contact us', 'Find a store'] },
  { label: 'SUPPORT', items: ['All support', 'Account & billing', 'Network & coverage', 'Phones & devices', 'Plans & services', 'Home internet', 'Device repair', 'Device care'] },
  { label: 'ABOUT', items: ['Our story', 'News room', 'Careers', 'Accessibility'] },
  { label: 'MORE', items: ['Terms of service', 'Terms & conditions', 'Privacy policy', 'Wireless code of conduct', 'Internet code'] },
];

export function OktaLinkVerifyMobile({ onBack, onContinue }: OktaLinkVerifyMobileProps) {
  const { loading, trigger } = useDelayedAction();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [touched, setTouched] = useState({ phone: false, pin: false });
  const [submitted, setSubmitted] = useState(false);
  const phoneDigits = phone.replace(/\D/g, '');
  const phoneError = (touched.phone || submitted) && (!phone ? 'Enter your phone number.' : phoneDigits.length !== 10 ? 'Enter a valid 10-digit phone number.' : '');
  const pinError = (touched.pin || submitted) && (!pin ? 'Enter your PIN.' : !/^\d{4}$/.test(pin) ? 'Enter your 4-digit PIN.' : '');

  function handleContinue() {
    setSubmitted(true);
    setTouched({ phone: true, pin: true });
    if (phoneDigits.length === 10 && /^\d{4}$/.test(pin)) trigger(() => onContinue?.());
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
        <div className="okta-link-mobile__step okta-link-mobile__step--active">
          <img src="/okta/step-current.svg" alt="" width={24} height={24} />
          <span className="okta-link-mobile__step-label okta-link-mobile__step-label--active">Link services</span>
        </div>
        <div className="okta-link-mobile__step-line okta-link-mobile__step-line--second" />
        <div className="okta-link-mobile__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-link-mobile__step-label">Set up MFA</span>
        </div>
      </div>

      {/* Card */}
      <main className="okta-link-mobile__body">
        <div className="okta-link-mobile__card okta-link-mobile__card--verify">
          <h2 className="okta-link-mobile__card-title">Link your services</h2>
          <div className="okta-link-mobile__card-subtitle">
            <p className="okta-link-mobile__card-subtitle-text">
              Verify your phone number and PIN one last time to link your existing services.
            </p>
          </div>

          <div className="okta-link-mobile__fields">
            <div className="okta-link-mobile__field">
              <input type="tel" maxLength={13} className={`okta-link-mobile__input${phoneError ? ' okta-link-mobile__input--error' : ''}`} placeholder="Phone number" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} onBlur={() => setTouched((current) => ({ ...current, phone: true }))} aria-invalid={Boolean(phoneError)} aria-describedby={phoneError ? 'link-mobile-phone-error' : undefined} onKeyDown={onEnterSubmit} />
              {phoneError && <span id="link-mobile-phone-error" className="okta-link-mobile__field-error" role="alert">{phoneError}</span>}
            </div>
            <div className="okta-link-mobile__field">
              <div className="okta-link-mobile__password-field">
                <input type={showPin ? 'text' : 'password'} inputMode="numeric" maxLength={4} className={`okta-link-mobile__input okta-link-mobile__input--toggle${pinError ? ' okta-link-mobile__input--error' : ''}`} placeholder="PIN" value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, ''))} onBlur={() => setTouched((current) => ({ ...current, pin: true }))} aria-invalid={Boolean(pinError)} aria-describedby={pinError ? 'link-mobile-pin-error' : undefined} onKeyDown={onEnterSubmit} />
                <button
                  type="button"
                  className="okta-link-mobile__password-toggle"
                  aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
                  aria-pressed={showPin}
                  onClick={() => setShowPin((current) => !current)}
                >
                  <img src={showPin ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
                </button>
              </div>
              {pinError && <span id="link-mobile-pin-error" className="okta-link-mobile__field-error" role="alert">{pinError}</span>}
            </div>
          </div>

          <div className="okta-link-mobile__links">
            <a href="#" className="okta-link-mobile__inline-link" onClick={(e) => e.preventDefault()}>
              <span>Forgot PIN?</span>
              <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
            <a href="#" className="okta-link-mobile__inline-link" onClick={(e) => e.preventDefault()}>
              <span>Sign in with username instead</span>
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
