import { useState } from 'react';
import { Button } from '../src';
import { formatPhone } from './formatPhone.js';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServices.css';
import './OktaLinkOtp.css';

interface OktaLinkOtpProps {
  phone?: string;
  email?: string;
  onBack: () => void;
  onCancel: () => void;
  onContinue?: () => void;
}

const maskEmail = (value: string) => {
  const [local, domain] = value.split('@');
  if (!local || !domain) return value;
  return `${local[0]}***${local.length > 1 ? local.at(-1) : ''}@${domain}`;
};

export function OktaLinkOtp({
  phone = '(***) ***-**90',
  email = 'e***l@address.com',
  onBack,
  onCancel,
  onContinue,
}: OktaLinkOtpProps) {
  const { loading, trigger } = useDelayedAction();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState('');
  const [showSelectionError, setShowSelectionError] = useState(false);
  const [showConfirmationError, setShowConfirmationError] = useState(false);
  const maskedEmail = maskEmail(email);

  function handleSelect(value: string) {
    setSelected(value);
    setConfirmation('');
    setDropdownOpen(false);
    setShowSelectionError(false);
    setShowConfirmationError(false);
  }

  function handleContinue() {
    if (!selected) {
      setShowSelectionError(true);
      return;
    }
    if (selected === phone && confirmation.replace(/\D/g, '') !== '1234567890') {
      setShowConfirmationError(true);
      return;
    }
    if (selected !== phone && confirmation.trim() !== 'email@address.com') {
      setShowConfirmationError(true);
      return;
    }
    trigger(() => onContinue?.());
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

      {/* Step tracker */}
      <div className="okta-link__steps">
        <div className="okta-link__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--completed">Create account</span>
        </div>
        <div className="okta-link__step-line" />
        <div className="okta-link__step">
          <img src="/okta/step-current.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--active">Link services</span>
        </div>
        <div className="okta-link__step-line" />
        <div className="okta-link__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label">Set up MFA</span>
        </div>
      </div>

      {/* Content */}
      <main className="okta-link__body">
        <div className="okta-link__card">
          <div className="okta-link__card-header">
            <h2 className="okta-link__card-title">Link your services</h2>
            <div className="okta-link__card-subtitle">
              <p className="okta-link__card-subtitle-text">
                How would you like to receive your verification code?
              </p>
            </div>
          </div>

          <div className="okta-otp__dropdown-wrap">
            <button
              className={`okta-otp__dropdown-trigger${selected ? ' okta-otp__dropdown-trigger--selected' : ''}${showSelectionError ? ' okta-otp__dropdown-trigger--error' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-invalid={showSelectionError}
              aria-describedby={showSelectionError ? 'otp-selection-error' : undefined}
            >
              {selected ? (
                <span className="okta-otp__dropdown-selected">
                  <span className="okta-otp__dropdown-label">Select a delivery method</span>
                  <span className="okta-otp__dropdown-value">{selected}</span>
                </span>
              ) : (
                <span className="okta-otp__dropdown-value">Select a delivery method</span>
              )}
              <img
                src="/okta/icon-chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className={`okta-otp__dropdown-chevron${dropdownOpen ? ' okta-otp__dropdown-chevron--open' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="okta-otp__dropdown-menu">
                <button className="okta-otp__dropdown-option" onClick={() => handleSelect(phone)}>
                  {phone}
                </button>
                <button className="okta-otp__dropdown-option" onClick={() => handleSelect(maskedEmail)}>
                  {maskedEmail}
                </button>
              </div>
            )}
            {showSelectionError && <span id="otp-selection-error" className="okta-otp__field-error" role="alert">Select a delivery method.</span>}
          </div>

          {selected && (
            <div className="okta-otp__confirm-group">
              <div className="okta-otp__confirm-field">
                <input
                  id="otp-confirm"
                  type={selected === phone ? 'tel' : 'email'}
                  maxLength={selected === phone ? 14 : undefined}
                  className={`okta-otp__confirm-input${showConfirmationError ? ' okta-otp__confirm-input--error' : ''}`}
                  placeholder=" "
                  value={confirmation}
                  onChange={(event) => { setConfirmation(selected === phone ? formatPhone(event.target.value) : event.target.value); setShowConfirmationError(false); }}
                  onBlur={() => { if (!confirmation.trim()) setShowConfirmationError(true); }}
                  aria-invalid={showConfirmationError}
                  aria-describedby={showConfirmationError ? 'otp-confirm-error' : undefined} onKeyDown={onEnterSubmit} />
                <label htmlFor="otp-confirm" className="okta-otp__confirm-label">
                  {selected === phone ? 'Re-enter the selected phone number' : 'Re-enter the selected email address'}
                </label>
              </div>
              {showConfirmationError && <span id="otp-confirm-error" className="okta-otp__field-error" role="alert">{selected === phone ? 'Entered phone number did not match. Please try again.' : 'Entered email address does not match. Please try again.'}</span>}
            </div>
          )}

          <div className="okta-otp__actions">
            <Button size="large" className="okta-otp__continue-btn" loading={loading} onClick={handleContinue}>
              Continue
            </Button>
            <a href="#" className="okta-otp__cancel-link" onClick={(e) => { e.preventDefault(); onCancel(); }}>
              Cancel
            </a>
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
