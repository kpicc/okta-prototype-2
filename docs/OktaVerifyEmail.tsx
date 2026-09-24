import { useState } from 'react';
import { Button } from '../src';
import { CaptchaModal } from './CaptchaModal.js';
import { useDelayedAction } from './useDelayedAction.js';

const CAPTCHA_THRESHOLD = 3;
import './OktaVerifyEmail.css';

interface OktaVerifyEmailProps {
  email?: string;
  onBack: () => void;
  onCancel: () => void;
  onSignIn?: () => void;
  onContinue?: () => void;
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const visible = local.slice(0, 1);
  return `${visible}***${local.slice(-1)}@${domain}`;
}

export function OktaVerifyEmail({ email = 'email@address.com', onBack, onCancel, onSignIn, onContinue }: OktaVerifyEmailProps) {
  const { loading, trigger } = useDelayedAction();
  const [code, setCode] = useState('');
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [captchaOpen, setCaptchaOpen] = useState(false);
  const codeError = showError && code !== '222222';
  const codeErrorMessage = codeError ? (code.trim() === '' ? 'This field cannot be left blank' : 'Invalid code. Please try again.') : '';

  function processCode() {
    setShowError(true);
    if (code === '222222') {
      trigger(() => onContinue?.());
    } else {
      setAttempts((n) => n + 1);
    }
  }

  function handleContinue() {
    console.log('[verify-email] handleContinue attempts=', attempts);
    if (attempts >= CAPTCHA_THRESHOLD) {
      const delay = 200 + Math.random() * 1300;
      console.log('[verify-email] triggering captcha in', delay, 'ms');
      window.setTimeout(() => setCaptchaOpen(true), delay);
      return;
    }
    processCode();
  }

  function handleCaptchaVerified() {
    setCaptchaOpen(false);
    setAttempts(0);
    processCode();
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
          <span className="okta-verify__step-label okta-verify__step-label--active">Create account</span>
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
            {codeError && (
              <p className="okta-verify__banner-error" role="alert">
                We found some errors. Please review the form and make the necessary corrections.
              </p>
            )}
            <div className="okta-verify__field">
              <div className="okta-verify__float-field">
                <input id="verify-code" type="text" inputMode="numeric" maxLength={6} className={`okta-verify__input okta-verify__input--clearable${codeError ? ' okta-verify__input--error' : ''}`} placeholder=" " value={code} onChange={(event) => { setCode(event.target.value); if (showError) setShowError(false); }} onBlur={() => { if (code !== '222222') setShowError(true); }} aria-invalid={codeError} aria-describedby={codeError ? 'verify-code-error' : undefined} onKeyDown={onEnterSubmit} />
                <label htmlFor="verify-code" className="okta-verify__float-label">Enter code</label>
                {code && (
                  <button type="button" className="okta-verify__clear" aria-label="Clear code" onClick={() => { setCode(''); setShowError(false); }}>
                    <img src="/okta/icon-close.svg" alt="" width={24} height={24} />
                  </button>
                )}
              </div>
              {codeError && (
                <div id="verify-code-error" className="okta-verify__field-error" role="alert">
                  <img src="/okta/icon-urgent.svg" alt="" width={16} height={16} className="okta-verify__field-error-icon" />
                  <span>{codeErrorMessage}</span>
                </div>
              )}
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
            <a href="#" className="okta-verify__account-link" onClick={(e) => { e.preventDefault(); (onSignIn ?? onCancel)(); }}>
              <span><span className="okta-verify__link-prefix">Already have an account?&nbsp;</span>Sign in</span>
              <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
            <a href="#" className="okta-verify__account-link" onClick={(e) => e.preventDefault()}>
              <span><span className="okta-verify__link-prefix">Need help?&nbsp;</span>Message an agent</span>
              <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
          </div>
        </div>
      </main>

      {captchaOpen && (
        <CaptchaModal onClose={() => setCaptchaOpen(false)} onVerified={handleCaptchaVerified} />
      )}
    </div>
  );
}
