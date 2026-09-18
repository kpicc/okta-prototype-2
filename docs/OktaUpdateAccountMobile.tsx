import { useState } from 'react';
import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaUpdateAccountMobile.css';

interface OktaUpdateAccountMobileProps {
  onBack: () => void;
  onContinue?: (email: string) => void;
  onSignIn?: () => void;
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const meetsPasswordRequirements = (value: string) =>
  value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);

export function OktaUpdateAccountMobile({ onBack, onContinue, onSignIn }: OktaUpdateAccountMobileProps) {
  const { loading, trigger } = useDelayedAction();
  const [pwReqsOpen, setPwReqsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailError = submitted && (!email ? 'Enter your email address.' : !isValidEmail(email) ? 'Enter a valid email address.' : '');
  const passwordError = submitted && (!password ? 'Create a password.' : !meetsPasswordRequirements(password) ? 'Your password must meet all password requirements.' : '');
  const confirmError = submitted && (!confirmPassword ? 'Confirm your password.' : confirmPassword !== password ? 'Passwords must match.' : '');
  const formInvalid = !isValidEmail(email) || !meetsPasswordRequirements(password) || confirmPassword !== password;

  function handleContinue() {
    setSubmitted(true);
    if (!formInvalid) trigger(() => onContinue?.(email));
  }

  return (
    <div className="okta-update-mobile">
      {/* Header */}
      <header className="okta-update-mobile__header">
        <img src="/okta/freedom-logo-small.svg" alt="Freedom Mobile" className="okta-update-mobile__logo" onClick={onBack} style={{ cursor: 'pointer' }} />
        <button className="okta-update-mobile__back-btn" onClick={onBack}>
          Back
        </button>
      </header>

      {/* Step tracker */}
      <div className="okta-update-mobile__steps">
        <div className="okta-update-mobile__step okta-update-mobile__step--active">
          <img src="/okta/step-current.svg" alt="" width={24} height={24} />
          <span className="okta-update-mobile__step-label okta-update-mobile__step-label--active">Update login</span>
        </div>
        <div className="okta-update-mobile__step-line okta-update-mobile__step-line--first" />
        <div className="okta-update-mobile__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-update-mobile__step-label">Link services</span>
        </div>
        <div className="okta-update-mobile__step-line okta-update-mobile__step-line--second" />
        <div className="okta-update-mobile__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-update-mobile__step-label">Set up MFA</span>
        </div>
      </div>

      {/* Card */}
      <main className="okta-update-mobile__body">
        <div className="okta-update-mobile__card">
          <div className="okta-update-mobile__card-header">
            <h2 className="okta-update-mobile__card-title">Update my account login</h2>
            <div className="okta-update-mobile__card-subtitle">
              <p className="okta-update-mobile__card-subtitle-text">Please enter your email & password below.</p>
            </div>
          </div>

          {submitted && formInvalid && (
            <div className="okta-update-mobile__form-error" role="alert">
              Please correct the errors below before continuing.
            </div>
          )}

          <div className="okta-update-mobile__fields">
            <div className="okta-update-mobile__field">
              <input
                type="email"
                className={`okta-update-mobile__input${emailError ? ' okta-update-mobile__input--error' : ''}`}
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? 'update-mobile-email-error' : undefined}
              />
              {emailError && <span id="update-mobile-email-error" className="okta-update-mobile__field-error">{emailError}</span>}
            </div>
            <div className="okta-update-mobile__field">
              <div className="okta-update-mobile__password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`okta-update-mobile__input okta-update-mobile__input--toggle${passwordError ? ' okta-update-mobile__input--error' : ''}`}
                  placeholder="Create your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={Boolean(passwordError)}
                  aria-describedby={passwordError ? 'update-mobile-password-error' : undefined}
                />
                <button
                  type="button"
                  className="okta-update-mobile__password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  <img src={showPassword ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
                </button>
              </div>
              {passwordError && <span id="update-mobile-password-error" className="okta-update-mobile__field-error">{passwordError}</span>}
            </div>
            <div className="okta-update-mobile__field">
              <div className="okta-update-mobile__password-field">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`okta-update-mobile__input okta-update-mobile__input--toggle${confirmError ? ' okta-update-mobile__input--error' : ''}`}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-invalid={Boolean(confirmError)}
                  aria-describedby={confirmError ? 'update-mobile-confirm-error' : undefined}
                />
                <button
                  type="button"
                  className="okta-update-mobile__password-toggle"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((current) => !current)}
                >
                  <img src={showConfirmPassword ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
                </button>
              </div>
              {confirmError && <span id="update-mobile-confirm-error" className="okta-update-mobile__field-error">{confirmError}</span>}
            </div>

            <button
              className="okta-update-mobile__pw-reqs-toggle"
              onClick={() => setPwReqsOpen(!pwReqsOpen)}
              aria-expanded={pwReqsOpen}
            >
              <span className="okta-update-mobile__pw-reqs-text">Password requirements</span>
              <img
                src="/okta/icon-chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className={`okta-update-mobile__pw-reqs-icon${pwReqsOpen ? ' okta-update-mobile__pw-reqs-icon--open' : ''}`}
              />
            </button>

            {pwReqsOpen && (
              <ul className="okta-update-mobile__pw-reqs-list">
                <li>Min 8 characters</li>
                <li>1 symbol</li>
                <li>1 uppercase letter</li>
                <li>1 number</li>
                <li>1 lowercase letter</li>
                <li>No parts of your username</li>
                <li>Does not include your first name</li>
              </ul>
            )}
          </div>

          <div className="okta-update-mobile__actions">
            <Button size="large" className="okta-update-mobile__continue-btn" loading={loading} onClick={handleContinue}>
              Continue
            </Button>
            <a href="#" className="okta-update-mobile__account-link" onClick={(e) => { e.preventDefault(); (onSignIn ?? onBack)(); }}>
              <span>Already have an account? Sign in</span>
              <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
