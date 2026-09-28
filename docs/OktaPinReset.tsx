import { useState } from 'react';
import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServices.css';
import './OktaForgotPin.css';
import './OktaPinReset.css';

interface OktaPinResetProps {
  phone?: string;
  onBack: () => void;
  onContinue?: () => void;
}

const WEAK_PINS = new Set(['1111', '1234', '0000']);

export function OktaPinReset({ phone = '', onBack, onContinue }: OktaPinResetProps) {
  const { loading, trigger } = useDelayedAction();
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const phoneDigits = phone.replace(/\D/g, '');
  const lastFour = phoneDigits.slice(-4);

  const pinError = submitted && (!pin
    ? 'Enter your PIN.'
    : !/^\d{4}$/.test(pin)
      ? 'Enter a 4-digit PIN.'
      : WEAK_PINS.has(pin) || pin === lastFour
        ? 'Choose a more secure PIN.'
        : '');
  const confirmError = submitted && (!confirm
    ? 'Confirm your PIN.'
    : confirm !== pin
      ? 'PINs do not match.'
      : '');

  function handleContinue() {
    setSubmitted(true);
    if (!pinError && !confirmError && pin && confirm) trigger(() => onContinue?.());
  }

  function onEnterSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') handleContinue();
  }

  return (
    <div className="okta-link">
      {/* Top bar */}
      <div className="okta-link__topbar">
        <div className="okta-link__topbar-inner">
          <span className="okta-link__topbar-item">ON</span>
          <span className="okta-link__topbar-item">Find a store</span>
          <span className="okta-link__topbar-item">Contact us</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="okta-link__nav">
        <div className="okta-link__nav-inner">
          <img src="/okta/freedom-logo.svg" alt="Freedom Mobile" className="okta-link__nav-logo" onClick={onBack} style={{ cursor: 'pointer' }} />
          <div className="okta-link__nav-links">
            <span className="okta-link__nav-link">Mobile</span>
            <span className="okta-link__nav-link">TV+ Internet</span>
            <span className="okta-link__nav-link">Network</span>
            <span className="okta-link__nav-link">Special offers</span>
          </div>
          <span className="okta-link__nav-link okta-link__nav-link--right">My Freedom</span>
        </div>
      </nav>

      {/* Content */}
      <main className="okta-link__body">
        <div className="okta-link__card">
          <div className="okta-link__card-header">
            <h2 className="okta-link__card-title">PIN Reset</h2>
            <div className="okta-pinreset__notice">
              <p className="okta-pinreset__notice-text">Please updated to a more secure PIN. Avoid weak combinations such as 1111, 1234, or the last 4-digits of your phone number.</p>
            </div>
          </div>

          <div className="okta-fpin__fields">
            <div className="okta-fpin__field">
              <div className="okta-fpin__float-field">
                <input
                  id="pin-reset-new"
                  type={showPin ? 'text' : 'password'}
                  inputMode="numeric"
                  maxLength={4}
                  className={`okta-fpin__input${pinError ? ' okta-fpin__input--error' : ''}`}
                  placeholder=" "
                  value={pin}
                  onChange={(event) => setPin(event.target.value.replace(/\D/g, ''))}
                  aria-invalid={Boolean(pinError)}
                  aria-describedby={pinError ? 'pin-reset-new-error' : undefined}
                  onKeyDown={onEnterSubmit}
                />
                <label htmlFor="pin-reset-new" className="okta-fpin__float-label">New PIN</label>
                <button type="button" className="okta-fpin__clear" aria-label={showPin ? 'Hide PIN' : 'Show PIN'} onClick={() => setShowPin((current) => !current)}>
                  <img src={showPin ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
                </button>
              </div>
              {pinError && <span id="pin-reset-new-error" className="okta-fpin__field-error" role="alert">{pinError}</span>}
            </div>

            <div className="okta-fpin__field">
              <div className="okta-fpin__float-field">
                <input
                  id="pin-reset-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  inputMode="numeric"
                  maxLength={4}
                  className={`okta-fpin__input${confirmError ? ' okta-fpin__input--error' : ''}`}
                  placeholder=" "
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value.replace(/\D/g, ''))}
                  aria-invalid={Boolean(confirmError)}
                  aria-describedby={confirmError ? 'pin-reset-confirm-error' : undefined}
                  onKeyDown={onEnterSubmit}
                />
                <label htmlFor="pin-reset-confirm" className="okta-fpin__float-label">Confirm PIN</label>
                <button type="button" className="okta-fpin__clear" aria-label={showConfirm ? 'Hide PIN' : 'Show PIN'} onClick={() => setShowConfirm((current) => !current)}>
                  <img src={showConfirm ? '/okta/icon-eye-off.svg' : '/okta/icon-eye.svg'} alt="" width={24} height={24} />
                </button>
              </div>
              {confirmError && <span id="pin-reset-confirm-error" className="okta-fpin__field-error" role="alert">{confirmError}</span>}
            </div>
          </div>

          <div className="okta-fpin__actions">
            <Button size="large" className="okta-fpin__continue-btn" loading={loading} onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="okta-link__footer">
        <div className="okta-link__footer-terms">
          <span className="okta-link__footer-terms-text">View Terms & Conditions</span>
          <img src="/okta/icon-chevron-down.svg" alt="" width={24} height={24} />
        </div>
        <div className="okta-link__footer-bottom">
          <p className="okta-link__footer-copyright">
            &copy; 2026 Videotron Ltd., doing business as Freedom Mobile
          </p>
        </div>
      </footer>
    </div>
  );
}
