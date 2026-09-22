import { useState } from 'react';
import { Button } from '../src';
import './OktaAuthCode.css';

interface OktaAuthCodeProps {
  contact: string;
  onBack: () => void;
  onLogoClick: () => void;
  onContinue: () => void;
}

export function OktaAuthCode({
  contact,
  onBack,
  onLogoClick,
  onContinue,
}: OktaAuthCodeProps) {
  const [code, setCode] = useState('');
  const [showError, setShowError] = useState(false);
  const codeError = showError && code !== '222222';

  function handleContinue() {
    setShowError(true);
    if (code === '222222') onContinue();
  }

  function onEnterSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') handleContinue();
  }

  return (
    <div className="okta-auth-code">
      <header className="okta-auth-code__header">
        <div className="okta-auth-code__header-inner">
          <img
            src="/okta/freedom-logo.svg"
            alt="Freedom Mobile"
            className="okta-auth-code__logo"
            onClick={onLogoClick}
          />
          <Button size="medium" className="okta-auth-code__back" onClick={onBack}>
            Back to sign in
          </Button>
        </div>
      </header>

      <main className="okta-auth-code__body">
        <div className="okta-auth-code__card">
          <div className="okta-auth-code__heading">
            <h1 className="okta-auth-code__title">Account verification</h1>
            <p className="okta-auth-code__subtitle">We sent a code to {contact}</p>
          </div>

          <div className="okta-auth-code__field">
            <input
              id="auth-code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(event) => {
                setCode(event.target.value.replace(/\D/g, ''));
                if (showError) setShowError(false);
              }}
              onBlur={() => {
                if (code !== '222222') setShowError(true);
              }}
              placeholder="Enter code"
              className={`okta-auth-code__input${
                codeError ? ' okta-auth-code__input--error' : ''
              }`}
              aria-invalid={codeError}
              aria-describedby={codeError ? 'auth-code-error' : undefined} onKeyDown={onEnterSubmit} />
            {codeError && (
              <span id="auth-code-error" className="okta-auth-code__error" role="alert">
                Enter the valid 6-digit security code.
              </span>
            )}
            <p className="okta-auth-code__resend">
              Didn’t get a code?{' '}
              <a
                href="#"
                className="okta-auth-code__resend-link"
                onClick={(event) => event.preventDefault()}
              >
                Resend
              </a>
            </p>
          </div>

          <div className="okta-auth-code__actions">
            <Button size="large" className="okta-auth-code__submit" onClick={handleContinue}>
              Continue
            </Button>
            <a
              href="#"
              className="okta-auth-code__link"
              onClick={(event) => event.preventDefault()}
            >
              <span className="okta-auth-code__link-prefix">Need help?&nbsp;</span>
              <span className="okta-auth-code__link-text">Message an agent</span>
              <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
