import { useState } from 'react';
import { Button } from '../src';
import './OktaPasswordReset.css';

const meetsPasswordRequirements = (value: string) =>
  value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);

interface OktaPasswordResetProps {
  onBack: () => void;
  onContinue?: (password: string) => void;
}

export function OktaPasswordReset({ onBack, onContinue }: OktaPasswordResetProps) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const passwordError = submitted && !meetsPasswordRequirements(password) ? 'Password requirements were not met.' : '';
  const confirmError = submitted && (!confirm ? 'This field cannot be left blank' : confirm !== password ? 'Passwords do not match.' : '');

  function handleContinue() {
    setSubmitted(true);
    if (meetsPasswordRequirements(password) && confirm && confirm === password) {
      onContinue?.(password);
    }
  }

  return (
    <div className="okta-password-reset">
      <header className="okta-password-reset__header">
        <div className="okta-password-reset__header-inner">
          <img src="/okta/freedom-logo.svg" alt="Freedom Mobile" className="okta-password-reset__logo" onClick={onBack} />
          <Button size="medium" className="okta-password-reset__back" onClick={onBack}>Back</Button>
        </div>
      </header>

      <main className="okta-password-reset__body">
        <div className="okta-password-reset__card">
          <h1 className="okta-password-reset__title">Password reset</h1>
          <p className="okta-password-reset__subtitle">Please update to a more secure password.</p>

          <div className="okta-password-reset__fields">
            <div className="okta-password-reset__field">
              <input
                id="reset-password"
                type={showPassword ? 'text' : 'password'}
                className={`okta-password-reset__input${passwordError ? ' okta-password-reset__input--error' : ''}`}
                placeholder=" "
                value={password}
                onChange={(event) => { setPassword(event.target.value); setSubmitted(false); }}
                aria-invalid={Boolean(passwordError)}
                aria-describedby={passwordError ? 'reset-password-error' : undefined}
              />
              <label htmlFor="reset-password" className="okta-password-reset__label">New password</label>
              <button
                type="button"
                className="okta-password-reset__toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              >
                <img src={showPassword ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
              </button>
              {passwordError && <span id="reset-password-error" className="okta-password-reset__error" role="alert">{passwordError}</span>}
            </div>

            <div className="okta-password-reset__field">
              <input
                id="reset-confirm"
                type={showConfirm ? 'text' : 'password'}
                className={`okta-password-reset__input${confirmError ? ' okta-password-reset__input--error' : ''}`}
                placeholder=" "
                value={confirm}
                onChange={(event) => { setConfirm(event.target.value); setSubmitted(false); }}
                aria-invalid={Boolean(confirmError)}
                aria-describedby={confirmError ? 'reset-confirm-error' : undefined}
              />
              <label htmlFor="reset-confirm" className="okta-password-reset__label">Confirm password</label>
              <button
                type="button"
                className="okta-password-reset__toggle"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                aria-pressed={showConfirm}
                onClick={() => setShowConfirm((current) => !current)}
              >
                <img src={showConfirm ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
              </button>
              {confirmError && <span id="reset-confirm-error" className="okta-password-reset__error" role="alert">{confirmError}</span>}
            </div>
          </div>

          <div className="okta-password-reset__actions">
            <Button size="large" className="okta-password-reset__submit" onClick={handleContinue}>Continue</Button>
            <a href="#" className="okta-password-reset__cancel" onClick={(event) => { event.preventDefault(); onBack?.(); }}>Cancel</a>
          </div>
        </div>
      </main>
    </div>
  );
}
