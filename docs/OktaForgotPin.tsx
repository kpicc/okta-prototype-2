import { useState } from 'react';
import { Button } from '../src';
import { formatPhone } from './formatPhone.js';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServices.css';
import './OktaForgotPin.css';

interface OktaForgotPinProps {
  onBack: () => void;
  onCancel: () => void;
  onContinue?: (phone: string) => void;
}

export function OktaForgotPin({ onBack, onCancel, onContinue }: OktaForgotPinProps) {
  const { loading, trigger } = useDelayedAction();
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

      {/* Content */}
      <main className="okta-link__body">
        <div className="okta-link__card">
          <div className="okta-link__card-header">
            <h2 className="okta-link__card-title">PIN Reset</h2>
            <div className="okta-link__card-subtitle">
              <p className="okta-link__card-subtitle-text">Forgot your PIN? No problem, let's get you a new one.</p>
            </div>
          </div>

          <div className="okta-fpin__fields">
            <div className="okta-fpin__field">
              <div className="okta-fpin__float-field">
                <input
                  id="forgot-phone"
                  type="tel"
                  maxLength={14}
                  className={`okta-fpin__input${phoneError ? ' okta-fpin__input--error' : ''}`}
                  placeholder=" "
                  value={phone}
                  onChange={(event) => setPhone(formatPhone(event.target.value))}
                  aria-invalid={Boolean(phoneError)}
                  aria-describedby={phoneError ? 'forgot-phone-error' : undefined}
                  onKeyDown={onEnterSubmit}
                />
                <label htmlFor="forgot-phone" className="okta-fpin__float-label">Phone number</label>
                {phone && (
                  <button type="button" className="okta-fpin__clear" aria-label="Clear phone number" onClick={() => setPhone('')}>
                    <img src="/okta/icon-close.svg" alt="" width={24} height={24} />
                  </button>
                )}
              </div>
              {phoneError && <span id="forgot-phone-error" className="okta-fpin__field-error" role="alert">{phoneError}</span>}
            </div>
          </div>

          <div className="okta-fpin__actions">
            <Button size="large" className="okta-fpin__continue-btn" loading={loading} onClick={handleContinue}>
              Continue
            </Button>
            <a href="#" className="okta-fpin__cancel-link" onClick={(e) => { e.preventDefault(); onCancel(); }}>
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
