import { useState } from 'react';
import { Button } from '../src';
import './OktaForgotPasswordMobile.css';

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

interface OktaForgotPasswordMobileProps {
  email?: string;
  onBack: () => void;
  onContinue?: (email: string) => void;
  onCancel?: () => void;
}

export function OktaForgotPasswordMobile({ email: initialEmail = '', onBack, onContinue, onCancel }: OktaForgotPasswordMobileProps) {
  const [email, setEmail] = useState(initialEmail);
  const [showError, setShowError] = useState(false);

  function handleContinue() {
    if (!isValidEmail(email)) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onContinue?.(email);
  }

  return (
    <div className="okta-forgot-password-mobile">
      <header className="okta-forgot-password-mobile__header">
        <img src="/okta/freedom-logo-small.svg" alt="Freedom Mobile" className="okta-forgot-password-mobile__logo" onClick={onBack} />
        <button className="okta-forgot-password-mobile__menu-btn" aria-label="Menu">
          <span className="okta-forgot-password-mobile__menu-bar" />
          <span className="okta-forgot-password-mobile__menu-bar" />
          <span className="okta-forgot-password-mobile__menu-bar" />
        </button>
      </header>

      <main className="okta-forgot-password-mobile__body">
        <div className="okta-forgot-password-mobile__card">
          <h2 className="okta-forgot-password-mobile__title">Password reset</h2>
          <p className="okta-forgot-password-mobile__subtitle">Forgot your password? No problem, let’s get you a new one.</p>

          <div className="okta-forgot-password-mobile__field">
            <input
              type="email"
              className={`okta-forgot-password-mobile__input${showError ? ' okta-forgot-password-mobile__input--error' : ''}`}
              placeholder="Email"
              value={email}
              onChange={(event) => { setEmail(event.target.value); setShowError(false); }}
              onBlur={() => { if (!isValidEmail(email)) setShowError(true); }}
              aria-invalid={showError}
              aria-describedby={showError ? 'forgot-email-mobile-error' : undefined}
            />
            {showError && <span id="forgot-email-mobile-error" className="okta-forgot-password-mobile__error" role="alert">Email address must be in the form of an email address.</span>}
          </div>

          <Button size="large" className="okta-forgot-password-mobile__submit" onClick={handleContinue}>Continue</Button>
          <a href="#" className="okta-forgot-password-mobile__cancel" onClick={(event) => { event.preventDefault(); onCancel?.(); }}>Cancel</a>
        </div>
      </main>
    </div>
  );
}
