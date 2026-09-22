import { useState } from 'react';
import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaVerifyEmail.css';

interface OktaVerifyEmailProps {
  email?: string;
  onBack: () => void;
  onCancel: () => void;
  onContinue?: () => void;
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const visible = local.slice(0, 1);
  return `${visible}***${local.slice(-1)}@${domain}`;
}

export function OktaVerifyEmail({ email = 'email@address.com', onBack, onCancel, onContinue }: OktaVerifyEmailProps) {
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
    <div className="okta-verify">
      {/* Header */}
      <header className="okta-verify__header">
        <div className="okta-verify__header-inner">
          <img
            src="/okta/freedom-logo.svg"
            alt="Freedom Mobile"
            className="okta-verify__logo"
            onClick={onBack}
            style={{ cursor: 'pointer' }}
          />
          <Button size="medium" className="okta-verify__back-btn" onClick={onBack}>
            Back
          </Button>
        </div>
      </header>

      {/* Step tracker */}
      <div className="okta-verify__steps">
        <div className="okta-verify__step okta-verify__step--active">
          <img src="/okta/step-active.svg" alt="" width={24} height={24} />
          <span className="okta-verify__step-label okta-verify__step-label--active">Update account login</span>
        </div>
        <div className="okta-verify__step-line" />
        <div className="okta-verify__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-verify__step-label">Link services</span>
        </div>
        <div className="okta-verify__step-line" />
        <div className="okta-verify__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-verify__step-label">Set up MFA</span>
        </div>
      </div>

      {/* Card */}
      <main className="okta-verify__body">
        <div className="okta-verify__card">
          <div className="okta-verify__card-header">
            <h2 className="okta-verify__card-title">Verify your email address</h2>
            <div className="okta-verify__card-subtitle">
              <p className="okta-verify__card-subtitle-text">
                We sent a code to {maskEmail(email)}
              </p>
            </div>
          </div>

          <div className="okta-verify__fields">
            <div className="okta-verify__field">
              <div className="okta-verify__float-field">
                <input id="verify-code" type="text" inputMode="numeric" maxLength={6} className={`okta-verify__input${codeError ? ' okta-verify__input--error' : ''}`} placeholder=" " value={code} onChange={(event) => { setCode(event.target.value); if (showError) setShowError(false); }} onBlur={() => { if (code !== '222222') setShowError(true); }} aria-invalid={codeError} aria-describedby={codeError ? 'verify-code-error' : undefined} onKeyDown={onEnterSubmit} />
                <label htmlFor="verify-code" className="okta-verify__float-label">Enter code</label>
              </div>
              {codeError && <span id="verify-code-error" className="okta-verify__field-error" role="alert">Enter the valid 6-digit verification code.</span>}
            </div>
            <p className="okta-verify__resend-text">
              Didn't receive the code?{' '}
              <a href="#" className="okta-verify__resend-link" onClick={(e) => e.preventDefault()}>Resend</a>
            </p>
          </div>

          <div className="okta-verify__actions">
            <Button size="large" className="okta-verify__continue-btn" loading={loading} onClick={handleContinue}>
              Continue
            </Button>
            <a href="#" className="okta-verify__cancel-link" onClick={(e) => { e.preventDefault(); onCancel(); }}>
              Cancel
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
