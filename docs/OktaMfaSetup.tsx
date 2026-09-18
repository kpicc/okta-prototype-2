import { useState } from 'react';
import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServices.css';
import './OktaLinkOtp.css';
import './OktaMfaSetup.css';

interface OktaMfaSetupProps {
  phones?: string[];
  onBack: () => void;
  onCancel: () => void;
  onContinue?: () => void;
}

export function OktaMfaSetup({
  phones = ['+ X (XXX) XXX-XX90', '+ X (XXX) XXX-XX01', '+ X (XXX) XXX-XX12'],
  onBack,
  onCancel,
  onContinue,
}: OktaMfaSetupProps) {
  const { loading, trigger } = useDelayedAction();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState('');
  const [showSelectionError, setShowSelectionError] = useState(false);
  const [showConfirmationError, setShowConfirmationError] = useState(false);

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
    if (!confirmation.trim()) {
      setShowConfirmationError(true);
      return;
    }
    trigger(() => onContinue?.());
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

      {/* Step tracker — steps 1 & 2 completed, step 3 active */}
      <div className="okta-link__steps">
        <div className="okta-link__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--completed">Update account login</span>
        </div>
        <div className="okta-link__step-line" />
        <div className="okta-link__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--completed">Link services</span>
        </div>
        <div className="okta-link__step-line" />
        <div className="okta-link__step">
          <img src="/okta/step-current.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--active">Set up MFA</span>
        </div>
      </div>

      {/* Content */}
      <main className="okta-link__body">
        <div className="okta-link__card">
          <div className="okta-link__card-header">
            <h2 className="okta-link__card-title">Multi-factor authentication</h2>
            <div className="okta-link__card-subtitle">
              <p className="okta-link__card-subtitle-text">Set up multi-factor authentication</p>
            </div>
          </div>

          <div className="okta-otp__dropdown-wrap">
            <button
              className={`okta-otp__dropdown-trigger${selected ? ' okta-otp__dropdown-trigger--selected' : ''}${showSelectionError ? ' okta-otp__dropdown-trigger--error' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-invalid={showSelectionError}
              aria-describedby={showSelectionError ? 'mfa-selection-error' : undefined}
            >
              {selected ? (
                <span className="okta-otp__dropdown-selected">
                  <span className="okta-otp__dropdown-label">Select an authentication method</span>
                  <span className="okta-otp__dropdown-value">{selected}</span>
                </span>
              ) : (
                <span className="okta-otp__dropdown-value">Select a phone number</span>
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
                {phones.map((phone) => (
                  <button key={phone} className="okta-otp__dropdown-option" onClick={() => handleSelect(phone)}>
                    {phone}
                  </button>
                ))}
              </div>
            )}
            {showSelectionError && <span id="mfa-selection-error" className="okta-otp__field-error" role="alert">Select an authentication method.</span>}
          </div>

          {selected && (
            <div className="okta-otp__confirm-group">
              <div className="okta-otp__confirm-field">
                <input
                  id="mfa-confirm"
                  type="tel"
                  maxLength={10}
                  className={`okta-otp__confirm-input${showConfirmationError ? ' okta-otp__confirm-input--error' : ''}`}
                  placeholder=" "
                  value={confirmation}
                  onChange={(event) => { setConfirmation(event.target.value.replace(/\D/g, '').slice(0, 10)); setShowConfirmationError(false); }}
                  onBlur={() => { if (!confirmation.trim()) setShowConfirmationError(true); }}
                  aria-invalid={showConfirmationError}
                  aria-describedby={showConfirmationError ? 'mfa-confirm-error' : undefined}
                />
                <label htmlFor="mfa-confirm" className="okta-otp__confirm-label">Re-enter selected phone number</label>
              </div>
              {showConfirmationError && <span id="mfa-confirm-error" className="okta-otp__field-error" role="alert">Re-enter the selected phone number.</span>}
            </div>
          )}

          <div className="okta-mfa__actions">
            <Button size="large" className="okta-mfa__continue-btn" loading={loading} onClick={handleContinue}>
              Continue
            </Button>
            <a href="#" className="okta-mfa__cancel-link" onClick={(e) => { e.preventDefault(); onCancel(); }}>
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
