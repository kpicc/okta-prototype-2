import { useState } from 'react';
import { Button } from '../src';
import { CaptchaModal } from './CaptchaModal.js';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaUpdateAccount.css';

interface OktaUpdateAccountProps {
  onBack: () => void;
  onContinue?: (email: string) => void;
  onSignIn?: () => void;
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const meetsPasswordRequirements = (value: string) =>
  value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);

export function OktaUpdateAccount({ onBack, onContinue, onSignIn }: OktaUpdateAccountProps) {
  const { loading, trigger } = useDelayedAction();
  const [captchaOpen, setCaptchaOpen] = useState(false);
  const [pwReqsOpen, setPwReqsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailError = submitted && (!email ? 'Enter your email address.' : !isValidEmail(email) ? 'Email address must be in the form of an email address' : '');
  const passwordError = submitted && (!password ? 'Create a password.' : !meetsPasswordRequirements(password) ? 'Password requirements were not met.' : '');
  const confirmError = submitted && (!confirmPassword ? 'Confirm your password.' : confirmPassword !== password ? 'Passwords do not match' : '');
  const formInvalid = !isValidEmail(email) || !meetsPasswordRequirements(password) || confirmPassword !== password;
  const firstError = emailError || passwordError || confirmError || '';

  function handleContinue() {
    setSubmitted(true);
    if (!formInvalid) setCaptchaOpen(true);
  }

  function handleCaptchaVerified() {
    setCaptchaOpen(false);
    trigger(() => onContinue?.(email));
  }

  function onEnterSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') handleContinue();
  }

  return (
    <div className="okta-update">
      {/* Header */}
      <header className="okta-update__header">
        <div className="okta-update__header-inner">
          <img
            src="/okta/freedom-logo.svg"
            alt="Freedom Mobile"
            className="okta-update__logo"
            onClick={onBack}
            style={{ cursor: 'pointer' }}
          />
          <Button size="medium" className="okta-update__back-btn" onClick={onBack}>
            Back
          </Button>
        </div>
      </header>

      {/* Step tracker */}
      <div className="okta-update__steps">
        <div className="okta-update__step okta-update__step--active">
          <img src="/okta/step-active.svg" alt="" width={24} height={24} />
          <span className="okta-update__step-label okta-update__step-label--active">Update account login</span>
        </div>
        <div className="okta-update__step-line" />
        <div className="okta-update__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-update__step-label">Link services</span>
        </div>
        <div className="okta-update__step-line" />
        <div className="okta-update__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-update__step-label">Set up MFA</span>
        </div>
      </div>

      {/* Card */}
      <main className="okta-update__body">
        <div className="okta-update__card">
          <div className="okta-update__card-header">
            <h2 className="okta-update__card-title">Update your account login</h2>
            <div className="okta-update__card-subtitle">
              <p className="okta-update__card-subtitle-text">Please enter your email and password.</p>
            </div>
          </div>

          <div className="okta-update__fields">
            <div className="okta-update__field">
              <div className="okta-update__float-field">
                <input id="update-email" type="email" className={`okta-update__input okta-update__input--password${emailError ? ' okta-update__input--error' : ''}`} placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(emailError)} aria-describedby={emailError ? 'update-form-error' : undefined} onKeyDown={onEnterSubmit} />
                <label htmlFor="update-email" className="okta-update__float-label">Email</label>
                {email && (
                  <button type="button" className="okta-update__password-toggle" aria-label="Clear email" onClick={() => setEmail('')}>
                    <img src="/okta/icon-close.svg" alt="" width={24} height={24} />
                  </button>
                )}
              </div>
            </div>
            <div className="okta-update__field">
              <div className="okta-update__float-field">
                <input id="update-password" type={showPassword ? 'text' : 'password'} className={`okta-update__input okta-update__input--password${passwordError ? ' okta-update__input--error' : ''}`} placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={Boolean(passwordError)} aria-describedby={passwordError ? 'update-form-error' : undefined} onKeyDown={onEnterSubmit} />
                <label htmlFor="update-password" className="okta-update__float-label">Create password</label>
                <button
                  type="button"
                  className="okta-update__password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  <img src={showPassword ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
                </button>
              </div>
            </div>
            <div className="okta-update__field">
              <div className="okta-update__float-field">
                <input id="update-confirm" type={showConfirmPassword ? 'text' : 'password'} className={`okta-update__input okta-update__input--password${confirmError ? ' okta-update__input--error' : ''}`} placeholder=" " value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} aria-invalid={Boolean(confirmError)} aria-describedby={confirmError ? 'update-form-error' : undefined} onKeyDown={onEnterSubmit} />
                <label htmlFor="update-confirm" className="okta-update__float-label">Confirm password</label>
                <button
                  type="button"
                  className="okta-update__password-toggle"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((current) => !current)}
                >
                  <img src={showConfirmPassword ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
                </button>
              </div>
            </div>

            {firstError && (
              <div id="update-form-error" className="okta-update__form-error" role="alert">
                <img src="/okta/icon-urgent.svg" alt="" width={16} height={16} className="okta-update__form-error-icon" />
                <span>{firstError}</span>
              </div>
            )}

            <button
              className="okta-update__pw-reqs-toggle"
              onClick={() => setPwReqsOpen(!pwReqsOpen)}
              aria-expanded={pwReqsOpen}
            >
              <span className="okta-update__pw-reqs-text">Password requirements</span>
              <img
                src="/okta/icon-chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className={`okta-update__pw-reqs-icon${pwReqsOpen ? ' okta-update__pw-reqs-icon--open' : ''}`}
              />
            </button>

            {pwReqsOpen && (
              <ul className="okta-update__pw-reqs-list">
                <li>At least 8 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
                <li>At least one special character</li>
              </ul>
            )}
          </div>

          <div className="okta-update__actions">
            <Button size="large" className="okta-update__continue-btn" loading={loading} onClick={handleContinue}>
              Continue
            </Button>
            <a href="#" className="okta-update__account-link" onClick={(e) => { e.preventDefault(); (onSignIn ?? onBack)(); }}>
              <span><span className="okta-update__link-prefix">Already have an account?&nbsp;</span>Sign in</span>
              <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
            <a href="#" className="okta-update__account-link" onClick={(e) => e.preventDefault()}>
              <span><span className="okta-update__link-prefix">Need help?&nbsp;</span>Message an agent</span>
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
