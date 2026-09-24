import { useState } from 'react';
import { Button } from '../src';
import { formatPhone } from './formatPhone.js';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServicesMobile.css';
import './OktaMfaSetupMobile.css';

interface OktaMfaSetupMobileProps {
  phones?: string[];
  onBack: () => void;
  onCancel?: () => void;
  onContinue?: () => void;
}

const footerLinks = [
  { label: 'CONTACT', items: ['Contact us', 'Find a store'] },
  { label: 'SUPPORT', items: ['All support', 'Account & billing', 'Network & coverage', 'Phones & devices', 'Plans & services', 'Home internet', 'Device repair', 'Device care'] },
  { label: 'ABOUT', items: ['Our story', 'News room', 'Careers', 'Accessibility'] },
  { label: 'MORE', items: ['Terms of service', 'Terms & conditions', 'Privacy policy', 'Wireless code of conduct', 'Internet code'] },
];

export function OktaMfaSetupMobile({
  phones = ['(***) ***-**90', '(***) ***-**01'],
  onBack,
  onCancel,
  onContinue,
}: OktaMfaSetupMobileProps) {
  const { loading, trigger } = useDelayedAction();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState('');
  const [showSelectionError, setShowSelectionError] = useState(false);
  const [showConfirmationError, setShowConfirmationError] = useState(false);

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

  function onEnterSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') handleContinue();
  }

  return (
    <div className="okta-link-mobile">
      {/* Header */}
      <header className="okta-link-mobile__header">
        <img src="/okta/freedom-logo-small.svg" alt="Freedom Mobile" className="okta-link-mobile__logo" onClick={onBack} style={{ cursor: 'pointer' }} />
        <button className="okta-link-mobile__menu-btn" aria-label="Menu">
          <span className="okta-link-mobile__menu-bar" />
          <span className="okta-link-mobile__menu-bar" />
          <span className="okta-link-mobile__menu-bar" />
        </button>
      </header>

      {/* Step tracker */}
      <div className="okta-link-mobile__steps">
        <div className="okta-link-mobile__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link-mobile__step-label okta-link-mobile__step-label--completed">Create account</span>
        </div>
        <div className="okta-link-mobile__step-line okta-link-mobile__step-line--first" />
        <div className="okta-link-mobile__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link-mobile__step-label okta-link-mobile__step-label--completed">Link services</span>
        </div>
        <div className="okta-link-mobile__step-line okta-link-mobile__step-line--second" />
        <div className="okta-link-mobile__step okta-link-mobile__step--active">
          <img src="/okta/step-current.svg" alt="" width={24} height={24} />
          <span className="okta-link-mobile__step-label okta-link-mobile__step-label--active">Set up MFA</span>
        </div>
      </div>

      {/* Card */}
      <main className="okta-link-mobile__body">
        <div className="okta-link-mobile__card okta-link-mobile__card--mfa">
          <h2 className="okta-link-mobile__card-title">Set up multi-factor authentication</h2>
          <div className="okta-link-mobile__card-subtitle">
            <p className="okta-link-mobile__card-subtitle-text">
              Multi-factor authentication is required to add an additional layer of security when signing in to your account.
            </p>
          </div>

          <div className="okta-mfa-mobile__fields">
          <div className="okta-mfa-mobile__dropdown-wrap">
            <button
              className={`okta-mfa-mobile__dropdown-trigger${selected ? ' okta-mfa-mobile__dropdown-trigger--selected' : ''}${showSelectionError ? ' okta-mfa-mobile__dropdown-trigger--error' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-invalid={showSelectionError}
              aria-describedby={showSelectionError ? 'mfa-mobile-selection-error' : undefined}
            >
              {selected ? (
                <span className="okta-mfa-mobile__dropdown-selected">
                  <span className="okta-mfa-mobile__dropdown-label">Select a phone number</span>
                  <span className="okta-mfa-mobile__dropdown-selected-value">{selected}</span>
                </span>
              ) : (
                <span className="okta-mfa-mobile__dropdown-value">Select a phone number</span>
              )}
              <img
                src="/okta/icon-chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className={`okta-mfa-mobile__dropdown-chevron${dropdownOpen ? ' okta-mfa-mobile__dropdown-chevron--open' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="okta-mfa-mobile__dropdown-menu">
                {phones.map((phone) => (
                  <button
                    key={phone}
                    className="okta-mfa-mobile__dropdown-option"
                    onClick={() => { setSelected(phone); setConfirmation(''); setDropdownOpen(false); setShowSelectionError(false); setShowConfirmationError(false); }}
                  >
                    {phone}
                  </button>
                ))}
              </div>
            )}
            {showSelectionError && <span id="mfa-mobile-selection-error" className="okta-mfa-mobile__field-error" role="alert">Select a phone number.</span>}
          </div>

          {selected && (
            <div className="okta-mfa-mobile__confirm-group">
              <input
                type="tel"
                maxLength={14}
                className={`okta-mfa-mobile__confirm-input${showConfirmationError ? ' okta-mfa-mobile__confirm-input--error' : ''}`}
                placeholder="Re-enter selected phone number"
                value={confirmation}
                onChange={(event) => { setConfirmation(formatPhone(event.target.value)); setShowConfirmationError(false); }}
                onBlur={() => { if (!confirmation.trim()) setShowConfirmationError(true); }}
                aria-invalid={showConfirmationError}
                aria-describedby={showConfirmationError ? 'mfa-mobile-confirm-error' : undefined} onKeyDown={onEnterSubmit} />
              {showConfirmationError && <span id="mfa-mobile-confirm-error" className="okta-mfa-mobile__field-error" role="alert">Re-enter the selected phone number.</span>}
            </div>
          )}
          </div>

          <div className="okta-mfa-mobile__actions">
            <Button size="large" className="okta-link-mobile__continue-btn" loading={loading} onClick={handleContinue}>
              Continue
            </Button>
            <a href="#" className="okta-mfa-mobile__cancel-link" onClick={(e) => { e.preventDefault(); (onCancel ?? onBack)(); }}>
              Cancel
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="okta-link-mobile__footer">
        {footerLinks.map((section) => (
          <div key={section.label} className="okta-link-mobile__footer-section">
            <button
              className="okta-link-mobile__footer-header"
              onClick={() => setOpenSection(openSection === section.label ? null : section.label)}
              aria-expanded={openSection === section.label}
            >
              <span>{section.label}</span>
              <img
                src="/okta/icon-chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className={`okta-link-mobile__footer-chevron${openSection === section.label ? ' okta-link-mobile__footer-chevron--open' : ''}`}
              />
            </button>
            {openSection === section.label && (
              <div className="okta-link-mobile__footer-content">
                {section.items.map((item) => (
                  <a key={item} href="#" className="okta-link-mobile__footer-link" onClick={(e) => e.preventDefault()}>{item}</a>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="okta-link-mobile__footer-bottom">
          <button className="okta-link-mobile__feedback-btn">Provide Feedback</button>
          <div className="okta-link-mobile__socials">
            <span className="okta-link-mobile__social-icon">f</span>
            <span className="okta-link-mobile__social-icon">t</span>
            <span className="okta-link-mobile__social-icon">ig</span>
          </div>
        </div>

        <p className="okta-link-mobile__copyright">&copy; 2019 Freedom Mobile Inc.</p>
      </footer>
    </div>
  );
}
