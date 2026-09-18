import { useState } from 'react';
import { Button } from '../src';
import './OktaSignIn.css';

interface OktaSignInProps {
  email: string;
  onBack: () => void;
  onSignIn: () => void;
}

export function OktaSignIn({ email, onBack, onSignIn }: OktaSignInProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  function handleSignIn() {
    if (!password) {
      setShowError(true);
      return;
    }
    onSignIn();
  }

  return (
    <div className="okta-signin">
      <header className="okta-signin__header">
        <div className="okta-signin__header-inner">
          <img src="/okta/freedom-logo.svg" alt="Freedom Mobile" className="okta-signin__logo" onClick={onBack} />
          <Button size="medium" className="okta-signin__back" onClick={onBack}>Back</Button>
        </div>
      </header>

      <main className="okta-signin__body">
        <div className="okta-signin__card">
          <div className="okta-signin__heading">
            <h1 className="okta-signin__title">Sign in</h1>
            <p className="okta-signin__subtitle">Please enter your email and password.</p>
          </div>

          <div className="okta-signin__fields">
            <div className="okta-signin__input okta-signin__input--populated">
              <span className="okta-signin__input-label">Email</span>
              <span className="okta-signin__input-value">{email}</span>
              <button className="okta-signin__input-action" type="button" aria-label="Change email" onClick={onBack}>
                <img src="/okta/icon-password-visibility.svg" alt="" width={24} height={24} />
              </button>
            </div>

            <div className="okta-signin__password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`okta-signin__password${showError ? ' okta-signin__password--error' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(event) => { setPassword(event.target.value); setShowError(false); }}
                onBlur={() => { if (!password) setShowError(true); }}
                aria-invalid={showError}
                aria-describedby={showError ? 'signin-password-error' : undefined}
              />
              <button
                type="button"
                className="okta-signin__password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              >
                <img
                  src={showPassword ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'}
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              {showError && <span id="signin-password-error" className="okta-signin__error" role="alert">Enter your password.</span>}
            </div>

            <a href="#" className="okta-signin__link okta-signin__link--start" onClick={(event) => event.preventDefault()}>
              Forgot password?<img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
          </div>

          <div className="okta-signin__actions">
            <Button size="large" className="okta-signin__submit" onClick={handleSignIn}>Sign in to My Account</Button>
            <a href="#" className="okta-signin__link" onClick={(event) => event.preventDefault()}>
              <span><span className="okta-signin__link-prefix">Need help?&nbsp;</span>Message an agent</span><img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
