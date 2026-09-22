import { useState } from 'react';
import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaVerifyEmailMobile.css';

interface OktaVerifyEmailMobileProps {
  email?: string;
  onBack: () => void;
  onSignIn?: () => void;
  onContinue?: () => void;
}

export function OktaVerifyEmailMobile({ email = 'e***l@address.com', onBack, onSignIn, onContinue }: OktaVerifyEmailMobileProps) {
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
    <div className="okta-verify-mobile">
      {/* Header */}
      <header className="okta-verify-mobile__header">
        <img src="/okta/freedom-logo-small.svg" alt="Freedom Mobile" className="okta-verify-mobile__logo" onClick={onBack} style={{ cursor: 'pointer' }} />
        <button className="okta-verify-mobile__back-btn" onClick={onBack}>
          Back
        </button>
      </header>

      {/* Step tracker */}
      <div className="okta-verify-mobile__steps">
        <div className="okta-verify-mobile__step okta-verify-mobile__step--active">
          <img src="/okta/step-current.svg" alt="" width={24} height={24} />
          <span className="okta-verify-mobile__step-label okta-verify-mobile__step-label--active">Update login</span>
        </div>
        <div className="okta-verify-mobile__step-line okta-verify-mobile__step-line--first" />
        <div className="okta-verify-mobile__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-verify-mobile__step-label">Link services</span>
        </div>
        <div className="okta-verify-mobile__step-line okta-verify-mobile__step-line--second" />
        <div className="okta-verify-mobile__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-verify-mobile__step-label">Set up MFA</span>
        </div>
      </div>

      {/* Card */}
      <main className="okta-verify-mobile__body">
        <div className="okta-verify-mobile__card">
          <div className="okta-verify-mobile__card-header">
            <h2 className="okta-verify-mobile__card-title">Verify your email address</h2>
            <div className="okta-verify-mobile__card-subtitle">
              <p className="okta-verify-mobile__card-subtitle-text">We sent a verification code to {email}</p>
            </div>
          </div>

          <div className="okta-verify-mobile__fields">
            {codeError && (
              <p className="okta-verify-mobile__banner-error" role="alert">
                We found some errors. Please review the form and make the necessary corrections.
              </p>
            )}
            <div className="okta-verify-mobile__field">
              <div className="okta-verify-mobile__input-wrap">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  className={`okta-verify-mobile__input okta-verify-mobile__input--clearable${codeError ? ' okta-verify-mobile__input--error' : ''}`}
                  placeholder="Enter the code"
                  value={code}
                  onChange={(event) => { setCode(event.target.value); if (showError) setShowError(false); }}
                  onBlur={() => { if (code !== '222222') setShowError(true); }}
                  aria-invalid={codeError}
                  aria-describedby={codeError ? 'verify-mobile-code-error' : undefined} onKeyDown={onEnterSubmit} />
                {code && (
                  <button type="button" className="okta-verify-mobile__clear" aria-label="Clear code" onClick={() => { setCode(''); setShowError(false); }}>
                    <img src="/okta/icon-close.svg" alt="" width={24} height={24} />
                  </button>
                )}
              </div>
              {codeError && (
                <div id="verify-mobile-code-error" className="okta-verify-mobile__field-error" role="alert">
                  <img src="/okta/icon-urgent.svg" alt="" width={16} height={16} className="okta-verify-mobile__field-error-icon" />
                  <span>Invalid code. Please try again.</span>
                </div>
              )}
            </div>
            <a href="#" className="okta-verify-mobile__resend-row" onClick={(e) => e.preventDefault()}>
              <span className="okta-verify-mobile__resend-text">Didn't receive the code?</span>
              <span className="okta-verify-mobile__resend-link">Resend</span>
              <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
          </div>

          <div className="okta-verify-mobile__actions">
            <Button size="large" className="okta-verify-mobile__continue-btn" loading={loading} onClick={handleContinue}>
              Continue
            </Button>
            <a href="#" className="okta-verify-mobile__account-link" onClick={(e) => { e.preventDefault(); (onSignIn ?? onBack)(); }}>
              <span><span className="okta-verify-mobile__link-prefix">Already have an account?&nbsp;</span>Sign in</span>
              <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
            <a href="#" className="okta-verify-mobile__account-link" onClick={(e) => e.preventDefault()}>
              <span><span className="okta-verify-mobile__link-prefix">Need help?&nbsp;</span>Message an agent</span>
              <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
