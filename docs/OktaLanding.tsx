import { useState } from 'react';
import { Button } from '../src';
import { formatPhone, looksLikePhone } from './formatPhone.js';
import './OktaLanding.css';

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

interface OktaLandingProps {
  onUpdateAccount?: () => void;
  onSignIn: (email: string) => void;
}

export function OktaLanding({ onUpdateAccount, onSignIn }: OktaLandingProps) {
  const [toastVisible, setToastVisible] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [email, setEmail] = useState('');

  function handleUpdateAccount() {
    if (updateLoading) return;
    setUpdateLoading(true);
    const delay = 200 + Math.random() * 1300;
    window.setTimeout(() => {
      setUpdateLoading(false);
      onUpdateAccount?.();
    }, delay);
  }
  const [error, setError] = useState(false);

  function handleSubmit() {
    if (!email || !isValidEmail(email)) {
      setError(true);
    } else {
      setError(false);
      onSignIn(email);
    }
  }

  function onEnterSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') handleSubmit();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setEmail(looksLikePhone(raw) ? formatPhone(raw) : raw);
    if (error) setError(false);
  }

  function handleClear() {
    setEmail('');
    setError(false);
  }

  return (
    <div className="okta-landing">
      {/* Header */}
      <header className="okta-landing__header">
        <div className="okta-landing__header-inner">
          <img
            src="/okta/freedom-logo.svg"
            alt="Freedom Mobile"
            className="okta-landing__logo"
          />
        </div>
      </header>

      {/* Toast banner */}
      {toastVisible && (
        <div className="okta-landing__toast">
          <div className="okta-landing__toast-inner">
            <div className="okta-landing__toast-content">
              <img
                src="/okta/icon-info.svg"
                alt=""
                className="okta-landing__toast-icon"
                width={20}
                height={20}
              />
              <p className="okta-landing__toast-text">
                <strong>Action required.</strong>
                {' '}Phone number and username sign-in are retired. Update to an email + password login now.{' '}
                <a
                  href="#"
                  className="okta-landing__toast-link"
                  onClick={(event) => {
                    event.preventDefault();
                    onUpdateAccount?.();
                  }}
                >
                  Update my login
                </a>
              </p>
            </div>
            <button
              className="okta-landing__toast-close"
              onClick={() => setToastVisible(false)}
              aria-label="Dismiss"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Body */}
      <main className="okta-landing__body">
        <div className="okta-landing__card">
          {/* Left side */}
          <div className="okta-landing__left">
            <div className="okta-landing__illustration">
              <img
                src="/okta/hero-lifestyle-desktop.png"
                alt="Happy person looking at their phone"
                className="okta-landing__illustration-img"
              />
            </div>
            <div className="okta-landing__left-content">
              <div className="okta-landing__left-header">
                <span className="okta-landing__eyebrow">Create your account</span>
                <h1 className="okta-landing__left-title">
                  We've updated your login experience.
                </h1>
              </div>
              <p className="okta-landing__left-copy">
                Phone number and username sign-in are no longer available. To keep using My Account, create an email and password login. Your services, plan, and billing information will stay the same.
              </p>
              <Button size="large" className="okta-landing__left-cta" loading={updateLoading} onClick={handleUpdateAccount}>
                Update my account login
              </Button>
            </div>
          </div>

          {/* Right side */}
          <div className="okta-landing__right">
            <div className="okta-landing__form">
              <div className="okta-landing__form-header">
                <span className="okta-landing__eyebrow">Already updated?</span>
                <h2 className="okta-landing__form-title">
                  Sign in with your email and password.
                </h2>
              </div>
              <div className="okta-landing__form-fields">
                <div className={`okta-landing__float-field${error ? ' okta-landing__float-field--error' : ''}`}>
                  <input
                    id="okta-email"
                    type="text"
                    className="okta-landing__input"
                    placeholder=" "
                    value={email}
                    onChange={handleInputChange}
                   onKeyDown={onEnterSubmit} />
                  <label htmlFor="okta-email" className="okta-landing__float-label">
                    Email
                  </label>
                  {email && (
                    <button
                      type="button"
                      className="okta-landing__input-clear"
                      onClick={handleClear}
                      aria-label="Clear input"
                    >
                      &times;
                    </button>
                  )}
                </div>
                {error && (
                  <div className="okta-landing__error-box">
                    <div className="okta-landing__error-content">
                      <span className="okta-landing__error-icon" aria-hidden="true">⚠</span>
                      <p className="okta-landing__error-text">
                        Phone number and username login are no longer supported. Please sign in with your email address or update your login details.
                      </p>
                    </div>
                    <div className="okta-landing__error-links">
                      <a href="#" className="okta-landing__error-link" onClick={(e) => { e.preventDefault(); onUpdateAccount?.(); }}>Update login</a>
                      <a href="#" className="okta-landing__error-link">Learn more</a>
                    </div>
                  </div>
                )}
                <Button variant="outline" size="large" className="okta-landing__sign-in-btn" onClick={handleSubmit}>
                  Sign in to My Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
