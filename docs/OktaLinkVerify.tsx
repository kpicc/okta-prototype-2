import { useState } from 'react';
import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServices.css';
import './OktaLinkVerify.css';

interface OktaLinkVerifyProps {
  onBack: () => void;
  onCancel: () => void;
  onContinue?: () => void;
}

export function OktaLinkVerify({ onBack, onCancel, onContinue }: OktaLinkVerifyProps) {
  const { loading, trigger } = useDelayedAction();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
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

  return (
    <div className="okta-link">
      {/* Top bar */}
      <div className="okta-link__topbar">
        <div className="okta-link__topbar-inner">
          <span className="okta-link__topbar-item">ON</span>
          <span className="okta-link__topbar-item">Find a store</span>
          <span className="okta-link__topbar-item">Contact us</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="okta-link__nav">
        <div className="okta-link__nav-inner">
          <img src="/okta/freedom-logo.svg" alt="Freedom Mobile" className="okta-link__nav-logo" onClick={onBack} style={{ cursor: 'pointer' }} />
          <div className="okta-link__nav-links">
            <span className="okta-link__nav-link">Mobile</span>
            <span className="okta-link__nav-link">TV+ Internet</span>
            <span className="okta-link__nav-link">Network</span>
            <span className="okta-link__nav-link">Special offers</span>
          </div>
          <span className="okta-link__nav-link okta-link__nav-link--right">My Freedom</span>
        </div>
      </nav>

      {/* Step tracker */}
      <div className="okta-link__steps">
        <div className="okta-link__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--completed">Update account login</span>
        </div>
        <div className="okta-link__step-line" />
        <div className="okta-link__step">
          <img src="/okta/step-current.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--active">Link services</span>
        </div>
        <div className="okta-link__step-line" />
        <div className="okta-link__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label">Set up MFA</span>
        </div>
      </div>

      {/* Content */}
      <main className="okta-link__body">
        <div className="okta-link__card">
          <div className="okta-link__card-header">
            <h2 className="okta-link__card-title">Link your services</h2>
            <div className="okta-link__card-subtitle">
              <p className="okta-link__card-subtitle-text">Verify your phone number and PIN one last time to link your existing services.</p>
            </div>
          </div>

          <div className="okta-linkv__fields">
            <div className="okta-linkv__field">
              <div className="okta-linkv__float-field">
                <input id="link-phone" type="tel" maxLength={10} className={`okta-linkv__input${phoneError ? ' okta-linkv__input--error' : ''}`} placeholder=" " value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))} onBlur={() => setTouched((current) => ({ ...current, phone: true }))} aria-invalid={Boolean(phoneError)} aria-describedby={phoneError ? 'link-phone-error' : undefined} />
                <label htmlFor="link-phone" className="okta-linkv__float-label">Phone number</label>
              </div>
              {phoneError && <span id="link-phone-error" className="okta-linkv__field-error" role="alert">{phoneError}</span>}
            </div>
            <div className="okta-linkv__field">
              <div className="okta-linkv__float-field">
                <input id="link-pin" type="password" inputMode="numeric" maxLength={4} className={`okta-linkv__input${pinError ? ' okta-linkv__input--error' : ''}`} placeholder=" " value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, ''))} onBlur={() => setTouched((current) => ({ ...current, pin: true }))} aria-invalid={Boolean(pinError)} aria-describedby={pinError ? 'link-pin-error' : undefined} />
                <label htmlFor="link-pin" className="okta-linkv__float-label">PIN</label>
              </div>
              {pinError && <span id="link-pin-error" className="okta-linkv__field-error" role="alert">{pinError}</span>}
            </div>
            <div className="okta-linkv__link-row">
              <a href="#" className="okta-linkv__link" onClick={(e) => e.preventDefault()}>
                <span>Forgot PIN?</span>
                <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
              </a>
              <a href="#" className="okta-linkv__link" onClick={(e) => e.preventDefault()}>
                <span>Sign in with username instead</span>
                <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
              </a>
            </div>
          </div>

          <div className="okta-linkv__actions">
            <Button size="large" className="okta-linkv__continue-btn" loading={loading} onClick={handleContinue}>
              Continue
            </Button>
            <a href="#" className="okta-linkv__cancel-link" onClick={(e) => { e.preventDefault(); onCancel(); }}>
              Cancel
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="okta-link__footer">
        <div className="okta-link__footer-terms">
          <span className="okta-link__footer-terms-text">View Terms & Conditions</span>
          <img src="/okta/icon-chevron-down.svg" alt="" width={24} height={24} />
        </div>
        <div className="okta-link__footer-bottom">
          <p className="okta-link__footer-copyright">
            &copy; 2026 Videotron Ltd., doing business as Freedom Mobile
          </p>
        </div>
      </footer>
    </div>
  );
}
