import { useState } from 'react';
import { Button } from '../src';
import { formatPhone } from './formatPhone.js';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServicesMobile.css';
import './OktaLinkOtpMobile.css';

interface OktaLinkOtpMobileProps {
  onBack: () => void;
  onContinue?: () => void;
}

const footerLinks = [
  { label: 'CONTACT', items: ['Contact us', 'Find a store'] },
  { label: 'SUPPORT', items: ['All support', 'Account & billing', 'Network & coverage', 'Phones & devices', 'Plans & services', 'Home internet', 'Device repair', 'Device care'] },
  { label: 'ABOUT', items: ['Our story', 'News room', 'Careers', 'Accessibility'] },
  { label: 'MORE', items: ['Terms of service', 'Terms & conditions', 'Privacy policy', 'Wireless code of conduct', 'Internet code'] },
];

export function OktaLinkOtpMobile({ onBack, onContinue }: OktaLinkOtpMobileProps) {
  const { loading, trigger } = useDelayedAction();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<{ label: string; value: string } | null>(null);
  const [confirmation, setConfirmation] = useState('');
  const [showSelectionError, setShowSelectionError] = useState(false);
  const [showConfirmationError, setShowConfirmationError] = useState(false);

  const options = [
    { label: '(***) ***-**90', value: '(***) ***-**90' },
    { label: 'e***l@address.com', value: 'e***l@address.com' },
  ];

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
        <div className="okta-link-mobile__step okta-link-mobile__step--active">
          <img src="/okta/step-current.svg" alt="" width={24} height={24} />
          <span className="okta-link-mobile__step-label okta-link-mobile__step-label--active">Link services</span>
        </div>
        <div className="okta-link-mobile__step-line okta-link-mobile__step-line--second" />
        <div className="okta-link-mobile__step">
          <img src="/okta/step-inactive.svg" alt="" width={24} height={24} />
          <span className="okta-link-mobile__step-label">Set up MFA</span>
        </div>
      </div>

      {/* Card */}
      <main className="okta-link-mobile__body">
        <div className="okta-link-mobile__card okta-link-mobile__card--otp">
          <h2 className="okta-link-mobile__card-title">Link your services</h2>
          <div className="okta-link-mobile__card-subtitle">
            <p className="okta-link-mobile__card-subtitle-text">
              Verify your phone number and PIN one last time to link your existing services.
            </p>
          </div>

          <div className="okta-otp-mobile__fields">
          <div className="okta-otp-mobile__dropdown-wrap">
            <button
              className={`okta-otp-mobile__dropdown-trigger${selected ? ' okta-otp-mobile__dropdown-trigger--selected' : ''}${showSelectionError ? ' okta-otp-mobile__dropdown-trigger--error' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-invalid={showSelectionError}
              aria-describedby={showSelectionError ? 'otp-mobile-selection-error' : undefined}
            >
              {selected ? (
                <span className="okta-otp-mobile__dropdown-selected">
                  <span className="okta-otp-mobile__dropdown-label">Select a delivery method</span>
                  <span className="okta-otp-mobile__dropdown-selected-value">{selected.value}</span>
                </span>
              ) : (
                <span className="okta-otp-mobile__dropdown-value">Select a delivery method</span>
              )}
              <img
                src="/okta/icon-chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className={`okta-otp-mobile__dropdown-chevron${dropdownOpen ? ' okta-otp-mobile__dropdown-chevron--open' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="okta-otp-mobile__dropdown-menu">
                {options.map((option) => (
                  <button
                    key={option.label}
                    className="okta-otp-mobile__dropdown-option"
                    onClick={() => { setSelected(option); setConfirmation(''); setDropdownOpen(false); setShowSelectionError(false); setShowConfirmationError(false); }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            {showSelectionError && <span id="otp-mobile-selection-error" className="okta-otp-mobile__field-error" role="alert">Select a delivery method.</span>}
          </div>

          {selected && (
            <div className="okta-otp-mobile__confirm-group">
              <input
                type={selected.value.includes('@') ? 'email' : 'tel'}
                maxLength={selected.value.includes('@') ? undefined : 14}
                className={`okta-otp-mobile__confirm-input${showConfirmationError ? ' okta-otp-mobile__confirm-input--error' : ''}`}
                placeholder={selected.value.includes('@') ? 'Re-enter selected email address' : 'Re-enter selected phone number'}
                value={confirmation}
                onChange={(event) => { setConfirmation(selected.value.includes('@') ? event.target.value : formatPhone(event.target.value)); setShowConfirmationError(false); }}
                onBlur={() => { if (!confirmation.trim()) setShowConfirmationError(true); }}
                aria-invalid={showConfirmationError}
                aria-describedby={showConfirmationError ? 'otp-mobile-confirm-error' : undefined} onKeyDown={onEnterSubmit} />
              {showConfirmationError && <span id="otp-mobile-confirm-error" className="okta-otp-mobile__field-error" role="alert">Re-enter the selected delivery method.</span>}
            </div>
          )}
          </div>

          <Button size="large" className="okta-link-mobile__continue-btn" loading={loading} onClick={handleContinue}>
            Continue
          </Button>
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
