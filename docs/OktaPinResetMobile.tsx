import { useState } from 'react';
import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServicesMobile.css';
import './OktaForgotPinMobile.css';

interface OktaPinResetMobileProps {
  phone?: string;
  onBack: () => void;
  onContinue?: () => void;
}

const footerLinks = [
  { label: 'CONTACT', items: ['Contact us', 'Find a store'] },
  { label: 'SUPPORT', items: ['All support', 'Account & billing', 'Network & coverage', 'Phones & devices', 'Plans & services', 'Home internet', 'Device repair', 'Device care'] },
  { label: 'ABOUT', items: ['Our story', 'News room', 'Careers', 'Accessibility'] },
  { label: 'MORE', items: ['Terms of service', 'Terms & conditions', 'Privacy policy', 'Wireless code of conduct', 'Internet code'] },
];

const WEAK_PINS = new Set(['1111', '1234', '0000']);

export function OktaPinResetMobile({ phone = '', onBack, onContinue }: OktaPinResetMobileProps) {
  const { loading, trigger } = useDelayedAction();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const phoneDigits = phone.replace(/\D/g, '');
  const lastFour = phoneDigits.slice(-4);

  const pinError = submitted && (!pin
    ? 'Enter your PIN.'
    : !/^\d{4}$/.test(pin)
      ? 'Enter a 4-digit PIN.'
      : WEAK_PINS.has(pin) || pin === lastFour
        ? 'Choose a more secure PIN.'
        : '');
  const confirmError = submitted && (!confirm
    ? 'Confirm your PIN.'
    : confirm !== pin
      ? 'PINs do not match.'
      : '');

  function handleContinue() {
    setSubmitted(true);
    if (!pinError && !confirmError && pin && confirm) trigger(() => onContinue?.());
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
          <div className="okta-fpin-mobile__notice">
            <p className="okta-fpin-mobile__notice-text">
              Please updated to a more secure PIN. Avoid weak combinations such as 1111, 1234, or the last 4-digits of your phone number.
            </p>
          </div>

          <div className="okta-fpin-mobile__field">
            <div className="okta-link-mobile__password-field">
              <input
                type={showPin ? 'text' : 'password'}
                inputMode="numeric"
                maxLength={4}
                className={`okta-fpin-mobile__input${pinError ? ' okta-fpin-mobile__input--error' : ''}`}
                placeholder="New PIN"
                value={pin}
                onChange={(event) => setPin(event.target.value.replace(/\D/g, ''))}
                aria-invalid={Boolean(pinError)}
                aria-describedby={pinError ? 'pin-reset-mobile-new-error' : undefined}
                onKeyDown={onEnterSubmit}
              />
              <button type="button" className="okta-link-mobile__password-toggle" aria-label={showPin ? 'Hide PIN' : 'Show PIN'} onClick={() => setShowPin((current) => !current)}>
                <img src={showPin ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
              </button>
            </div>
            {pinError && <span id="pin-reset-mobile-new-error" className="okta-fpin-mobile__field-error" role="alert">{pinError}</span>}
          </div>

          <div className="okta-fpin-mobile__field">
            <div className="okta-link-mobile__password-field">
              <input
                type={showConfirm ? 'text' : 'password'}
                inputMode="numeric"
                maxLength={4}
                className={`okta-fpin-mobile__input${confirmError ? ' okta-fpin-mobile__input--error' : ''}`}
                placeholder="Confirm PIN"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value.replace(/\D/g, ''))}
                aria-invalid={Boolean(confirmError)}
                aria-describedby={confirmError ? 'pin-reset-mobile-confirm-error' : undefined}
                onKeyDown={onEnterSubmit}
              />
              <button type="button" className="okta-link-mobile__password-toggle" aria-label={showConfirm ? 'Hide PIN' : 'Show PIN'} onClick={() => setShowConfirm((current) => !current)}>
                <img src={showConfirm ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
              </button>
            </div>
            {confirmError && <span id="pin-reset-mobile-confirm-error" className="okta-fpin-mobile__field-error" role="alert">{confirmError}</span>}
          </div>

          <Button size="large" className="okta-fpin-mobile__continue-btn" loading={loading} onClick={handleContinue}>
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
