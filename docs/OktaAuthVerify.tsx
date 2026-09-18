import { useState } from 'react';
import { Button } from '../src';
import './OktaAuthVerify.css';

interface OktaAuthVerifyProps {
  email: string;
  phone?: string;
  onBack: () => void;
  onLogoClick: () => void;
  onContinue: (contact: string) => void;
}

function maskEmail(value: string): string {
  const [local, domain] = value.split('@');
  if (!local || !domain || local.length < 2) return value;
  if (local.length === 2) return `${local[0]}*${local[1]}@${domain}`;
  return `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
}

export function OktaAuthVerify({
  email,
  phone = '(***) ***-**90',
  onBack,
  onLogoClick,
  onContinue,
}: OktaAuthVerifyProps) {
  const [selected, setSelected] = useState<'phone' | 'email' | null>('phone');
  const [showError, setShowError] = useState(false);

  function handleContinue() {
    if (!selected) {
      setShowError(true);
      return;
    }
    const contact =
      selected === 'phone' ? phone.replace(/[^*\d]/g, '') : maskEmail(email);
    onContinue(contact);
  }

  return (
    <div className="okta-auth">
      <header className="okta-auth__header">
        <div className="okta-auth__header-inner">
          <img
            src="/okta/freedom-logo.svg"
            alt="Freedom Mobile"
            className="okta-auth__logo"
            onClick={onLogoClick}
          />
          <Button size="medium" className="okta-auth__back" onClick={onBack}>Back</Button>
        </div>
      </header>

      <main className="okta-auth__body">
        <div className="okta-auth__card">
          <div className="okta-auth__heading">
            <h1 className="okta-auth__title">Account verification</h1>
            <p className="okta-auth__subtitle">How do you want to receive your security code?</p>
          </div>

          <div className="okta-auth__options" role="radiogroup" aria-label="Delivery method">
            <button
              type="button"
              role="radio"
              aria-checked={selected === 'phone'}
              className={`okta-auth__option${selected === 'phone' ? ' okta-auth__option--selected' : ''}`}
              onClick={() => { setSelected('phone'); setShowError(false); }}
            >
              <span className="okta-auth__option-label">Phone number</span>
              <span className="okta-auth__option-value">{phone}</span>
              <img
                src={selected === 'phone' ? '/okta/icon-radio-checked.svg' : '/okta/icon-radio-unchecked.svg'}
                alt=""
                className="okta-auth__option-icon"
                width={24}
                height={24}
              />
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={selected === 'email'}
              className={`okta-auth__option${selected === 'email' ? ' okta-auth__option--selected' : ''}`}
              onClick={() => { setSelected('email'); setShowError(false); }}
            >
              <span className="okta-auth__option-label">Email</span>
              <span className="okta-auth__option-value">{maskEmail(email)}</span>
              <img
                src={selected === 'email' ? '/okta/icon-radio-checked.svg' : '/okta/icon-radio-unchecked.svg'}
                alt=""
                className="okta-auth__option-icon"
                width={24}
                height={24}
              />
            </button>
          </div>

          {showError && (
            <span className="okta-auth__error" role="alert">Select a delivery method.</span>
          )}

          <div className="okta-auth__actions">
            <Button size="large" className="okta-auth__submit" onClick={handleContinue}>
              Continue
            </Button>
            <a href="#" className="okta-auth__link" onClick={(event) => event.preventDefault()}>
              <span className="okta-auth__link-prefix">Need help?&nbsp;</span>
              <span className="okta-auth__link-text">Message an agent</span>
              <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
