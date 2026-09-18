import { useState } from 'react';
import { Button } from '../src';
import './OktaLandingMobile.css';

interface OktaLandingMobileProps {
  onUpdateAccount: () => void;
  onSignIn: (email: string) => void;
}

export function OktaLandingMobile({ onUpdateAccount, onSignIn }: OktaLandingMobileProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  function handleUpdateAccount() {
    if (updateLoading) return;
    setUpdateLoading(true);
    const delay = 200 + Math.random() * 1300;
    window.setTimeout(() => {
      setUpdateLoading(false);
      onUpdateAccount();
    }, delay);
  }
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  function handleSignIn() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      return;
    }
    onSignIn(email);
  }

  return (
    <div className="okta-mobile">
      {/* Body */}
      <div className="okta-mobile__body">
        {/* Top section */}
        <div className="okta-mobile__top">
          {/* Logo */}
          <img
            src="/okta/freedom-logo-white.svg"
            alt="Freedom Mobile"
            className="okta-mobile__logo"
          />

          {/* Toast alert */}
          {toastVisible && (
            <div className="okta-mobile__toast">
              <div className="okta-mobile__toast-header">
                <svg
                  className="okta-mobile__toast-icon"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 5.83333V10.8333"
                    stroke="currentColor"
                    strokeWidth={1.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14.175L10.0083 14.1657"
                    stroke="currentColor"
                    strokeWidth={1.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
                    stroke="currentColor"
                    strokeWidth={1.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <strong className="okta-mobile__toast-title">Action required.</strong>
                <button
                  className="okta-mobile__toast-close"
                  onClick={() => setToastVisible(false)}
                  aria-label="Dismiss"
                >
                  &times;
                </button>
              </div>
              <p className="okta-mobile__toast-text">
                Phone number and username sign-in are retired. Update to an email + password login now.{" "}
                <a
                  href="#"
                  className="okta-mobile__toast-link"
                  onClick={(event) => {
                    event.preventDefault();
                    onUpdateAccount();
                  }}
                >
                  Update my login
                </a>
              </p>
            </div>
          )}

          {/* Hero illustration */}
          <div className="okta-mobile__illustration">
            <img
              src="/okta/hero-lifestyle-desktop.png"
              alt="Happy person looking at their phone"
              className="okta-mobile__illustration-img"
            />
          </div>

          {/* Content */}
          <div className="okta-mobile__content">
            <span className="okta-mobile__eyebrow">Update your account login</span>
            <h1 className="okta-mobile__title">
              We've updated your login experience.
            </h1>
            <p className="okta-mobile__description">
              Phone number and username sign-in are no longer available. To keep using My Account, create an email and password login. Your services, plan, and billing information will stay the same.
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="okta-mobile__bottom">
          <Button size="large" className="okta-mobile__cta" loading={updateLoading} onClick={handleUpdateAccount}>
            Update my account login
          </Button>

          <div className="okta-mobile__signin-sticky">
            <div className="okta-mobile__divider" />

            <div className="okta-mobile__signin-section">
              <p className="okta-mobile__signin-text">I've already updated my login</p>
              <Button
                variant="outline"
                size="large"
                className="okta-mobile__signin-btn"
                onClick={() => setDrawerOpen(true)}
              >
                Sign in to my account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom drawer overlay */}
      <div
        className={`okta-mobile__overlay${drawerOpen ? ' okta-mobile__overlay--open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Bottom drawer */}
      <div className={`okta-mobile__drawer${drawerOpen ? ' okta-mobile__drawer--open' : ''}`}>
        <button
          className="okta-mobile__drawer-close"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close"
        >
          &times;
        </button>

        <div className="okta-mobile__drawer-content">
          <span className="okta-mobile__drawer-eyebrow">ALREADY UPDATED YOUR LOGIN?</span>
          <h2 className="okta-mobile__drawer-title">
            Sign in with your email and password.
          </h2>

          <div className="okta-mobile__drawer-fields">
            <div className="okta-mobile__drawer-float-field">
              <input
                id="okta-mobile-email"
                type="text"
                className={`okta-mobile__drawer-input${emailError ? ' okta-mobile__drawer-input--error' : ''}`}
                placeholder=" "
                value={email}
                onChange={(event) => { setEmail(event.target.value); setEmailError(false); }}
                aria-invalid={emailError}
                aria-describedby={emailError ? 'mobile-signin-email-error' : undefined}
              />
              <label htmlFor="okta-mobile-email" className="okta-mobile__drawer-float-label">
                Enter your email
              </label>
            </div>
            {emailError && <span id="mobile-signin-email-error" className="okta-mobile__drawer-error" role="alert">Enter a valid email address.</span>}

            <Button size="large" className="okta-mobile__drawer-submit" onClick={handleSignIn}>
              Sign in to My Account
            </Button>
          </div>

          <a href="#" className="okta-mobile__drawer-link">
            Can't sign in? Update your login
            <span className="okta-mobile__drawer-link-arrow">&rsaquo;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
