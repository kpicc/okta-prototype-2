import { useEffect, useState } from 'react';
import { Button } from '../src';
import './OktaPasswordResetMobile.css';

const meetsPasswordRequirements = (value: string) =>
  value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);

interface OktaPasswordResetMobileProps {
  email?: string;
  onBack: () => void;
  onContinue?: (password: string) => void;
  onEmailChange?: (email: string) => void;
}

export function OktaPasswordResetMobile({ email: initialEmail = '', onBack, onContinue, onEmailChange }: OktaPasswordResetMobileProps) {
  useEffect(() => {
    if (!initialEmail) {
      const stored = localStorage.getItem('oktaPasswordResetEmail');
      if (stored) onEmailChange?.(stored);
    }
  }, [initialEmail, onEmailChange]);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwReqsOpen, setPwReqsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const passwordError = submitted && !meetsPasswordRequirements(password) ? 'Password requirements were not met.' : '';
  const confirmError = submitted && (!confirm ? 'This field cannot be left blank' : confirm !== password ? 'Passwords do not match.' : '');

  function handleContinue() {
    setSubmitted(true);
    if (meetsPasswordRequirements(password) && confirm && confirm === password) {
      localStorage.removeItem('oktaPasswordResetEmail');
      onContinue?.(password);
    }
  }

  return (
    <div className="okta-password-reset-mobile">
      <header className="okta-password-reset-mobile__header">
        <img src="/okta/freedom-logo-small.svg" alt="Freedom Mobile" className="okta-password-reset-mobile__logo" onClick={onBack} />
        <button className="okta-password-reset-mobile__menu-btn" aria-label="Menu">
          <span className="okta-password-reset-mobile__menu-bar" />
          <span className="okta-password-reset-mobile__menu-bar" />
          <span className="okta-password-reset-mobile__menu-bar" />
        </button>
      </header>

      <main className="okta-password-reset-mobile__body">
        <div className="okta-password-reset-mobile__card">
          <h2 className="okta-password-reset-mobile__title">Password reset</h2>
          <p className="okta-password-reset-mobile__subtitle">Please update to a more secure password.</p>

          <div className="okta-password-reset-mobile__fields">
            <div className="okta-password-reset-mobile__field">
              <input
                id="reset-password-mobile"
                type={showPassword ? 'text' : 'password'}
                className={`okta-password-reset-mobile__input${passwordError ? ' okta-password-reset-mobile__input--error' : ''}`}
                placeholder="New password"
                value={password}
                onChange={(event) => { setPassword(event.target.value); setSubmitted(false); }}
                aria-invalid={Boolean(passwordError)}
                aria-describedby={passwordError ? 'reset-password-mobile-error' : undefined}
              />
              {passwordError && <span id="reset-password-mobile-error" className="okta-password-reset-mobile__error" role="alert">{passwordError}</span>}
              <button
                type="button"
                className="okta-password-reset-mobile__toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              >
                <img src={showPassword ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
              </button>
            </div>

            <div className="okta-password-reset-mobile__field">
              <input
                id="reset-confirm-mobile"
                type={showConfirm ? 'text' : 'password'}
                className={`okta-password-reset-mobile__input${confirmError ? ' okta-password-reset-mobile__input--error' : ''}`}
                placeholder="Confirm password"
                value={confirm}
                onChange={(event) => { setConfirm(event.target.value); setSubmitted(false); }}
                aria-invalid={Boolean(confirmError)}
                aria-describedby={confirmError ? 'reset-confirm-mobile-error' : undefined}
              />
              {confirmError && <span id="reset-confirm-mobile-error" className="okta-password-reset-mobile__error" role="alert">{confirmError}</span>}
              <button
                type="button"
                className="okta-password-reset-mobile__toggle"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                aria-pressed={showConfirm}
                onClick={() => setShowConfirm((current) => !current)}
              >
                <img src={showConfirm ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
              </button>
            </div>

            <button
              type="button"
              className="okta-password-reset-mobile__pw-reqs-toggle"
              onClick={() => setPwReqsOpen(!pwReqsOpen)}
              aria-expanded={pwReqsOpen}
            >
              <span className="okta-password-reset-mobile__pw-reqs-text">Password requirements</span>
              <img
                src="/okta/icon-chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className={`okta-password-reset-mobile__pw-reqs-icon${pwReqsOpen ? ' okta-password-reset-mobile__pw-reqs-icon--open' : ''}`}
              />
            </button>
            {pwReqsOpen && (
              <ul className="okta-password-reset-mobile__pw-reqs-list">
                <li>At least 8 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
                <li>At least one special character</li>
              </ul>
            )}
          </div>

          <Button size="large" className="okta-password-reset-mobile__submit" onClick={handleContinue}>Continue</Button>
          <a href="#" className="okta-password-reset-mobile__cancel" onClick={(event) => { event.preventDefault(); onBack?.(); }}>Cancel</a>
        </div>
      </main>
    </div>
  );
}
