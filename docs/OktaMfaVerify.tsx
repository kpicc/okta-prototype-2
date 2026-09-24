import { useState } from 'react';
import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServices.css';
import './OktaLinkCode.css';

interface OktaMfaVerifyProps {
  onBack: () => void;
  onCancel: () => void;
  onContinue?: () => void;
}

export function OktaMfaVerify({ onBack, onCancel, onContinue }: OktaMfaVerifyProps) {
  const { loading, trigger } = useDelayedAction();
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

      {/* Step tracker — steps 1 & 2 completed, step 3 active */}
      <div className="okta-link__steps">
        <div className="okta-link__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--completed">Create account</span>
        </div>
        <div className="okta-link__step-line" />
        <div className="okta-link__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--completed">Link services</span>
        </div>
        <div className="okta-link__step-line" />
        <div className="okta-link__step">
          <img src="/okta/step-current.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--active">Set up MFA</span>
        </div>
      </div>

      {/* Content */}
      <main className="okta-link__body">
        <div className="okta-link__card">
          <div className="okta-link__card-header">
            <h2 className="okta-link__card-title">Multi-factor authentication</h2>
            <div className="okta-link__card-subtitle">
              <p className="okta-link__card-subtitle-text">Set up multi-factor authentication</p>
            </div>
          </div>

          <div className="okta-lcode__fields">
            <div className="okta-lcode__field">
              <div className="okta-lcode__float-field">
                <input id="mfa-code" type="text" inputMode="numeric" maxLength={6} className={`okta-lcode__input${codeError ? ' okta-lcode__input--error' : ''}`} placeholder=" " value={code} onChange={(event) => { setCode(event.target.value.replace(/\D/g, '')); if (showError) setShowError(false); }} onBlur={() => { if (code !== '222222') setShowError(true); }} aria-invalid={codeError} aria-describedby={codeError ? 'mfa-code-error' : undefined} onKeyDown={onEnterSubmit} />
                <label htmlFor="mfa-code" className="okta-lcode__float-label">Enter security code</label>
              </div>
              {codeError && <span id="mfa-code-error" className="okta-lcode__field-error" role="alert">Enter the valid 6-digit security code.</span>}
            </div>
            <p className="okta-lcode__resend-text">
              Didn't receive the code?{' '}
              <a href="#" className="okta-lcode__resend-link" onClick={(e) => e.preventDefault()}>Resend</a>
            </p>
          </div>

          <div className="okta-lcode__actions">
            <Button size="large" className="okta-lcode__continue-btn" loading={loading} onClick={handleContinue}>
              Continue
            </Button>
            <a href="#" className="okta-lcode__cancel-link" onClick={(e) => { e.preventDefault(); onCancel(); }}>
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
