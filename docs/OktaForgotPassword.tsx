import { useState } from 'react';
import { Button } from '../src';
import './OktaForgotPassword.css';

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

interface OktaForgotPasswordProps {
  email?: string;
  onBack: () => void;
  onContinue?: (email: string) => void;
  onCancel?: () => void;
}

export function OktaForgotPassword({ email: initialEmail = '', onBack, onContinue, onCancel }: OktaForgotPasswordProps) {
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

  function onEnterSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') handleContinue();
  }

  return (
    <div className="okta-forgot-password">
      <header className="okta-forgot-password__header">
        <div className="okta-forgot-password__header-inner">
          <img src="/okta/freedom-logo.svg" alt="Freedom Mobile" className="okta-forgot-password__logo" onClick={onBack} />
          <Button size="medium" className="okta-forgot-password__back" onClick={onBack}>Back</Button>
        </div>
      </header>

      <main className="okta-forgot-password__body">
        <div className="okta-forgot-password__card">
          <div className="okta-forgot-password__heading">
            <h1 className="okta-forgot-password__title">Password reset</h1>
            <p className="okta-forgot-password__subtitle">Forgot your password? No problem, let’s get you a new one.</p>
          </div>

          <div className="okta-forgot-password__fields">
            <div className={`okta-forgot-password__field${showError ? ' okta-forgot-password__field--error' : ''}`}>
              <input
                id="forgot-email"
                type="email"
                className="okta-forgot-password__input"
                placeholder=" "
                value={email}
                onChange={(event) => { setEmail(event.target.value); setShowError(false); }}
                onBlur={() => { if (!isValidEmail(email)) setShowError(true); }}
                onKeyDown={onEnterSubmit}
                aria-invalid={showError}
                aria-describedby={showError ? 'forgot-email-error' : undefined}
              />
              <label htmlFor="forgot-email" className="okta-forgot-password__label">Email</label>
              {email && (
                <button
                  type="button"
                  className="okta-forgot-password__clear"
                  onClick={() => { setEmail(''); setShowError(false); }}
                  aria-label="Clear email"
                >
                  &times;
                </button>
              )}
            </div>
            {showError && <span id="forgot-email-error" className="okta-forgot-password__error" role="alert">Email address must be in the form of an email address.</span>}
          </div>

          <div className="okta-forgot-password__actions">
            <Button size="large" className="okta-forgot-password__submit" onClick={handleContinue}>Continue</Button>
            <a href="#" className="okta-forgot-password__cancel" onClick={(event) => { event.preventDefault(); onCancel?.(); }}>
              Cancel
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
