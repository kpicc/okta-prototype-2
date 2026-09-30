import { Button } from '../src';
import './OktaPasswordResetSuccessMobile.css';

interface OktaPasswordResetSuccessMobileProps {
  onBack: () => void;
  onContinue: () => void;
}

export function OktaPasswordResetSuccessMobile({ onBack, onContinue }: OktaPasswordResetSuccessMobileProps) {
  return (
    <div className="okta-password-reset-success-mobile">
      <header className="okta-password-reset-success-mobile__header">
        <img src="/okta/freedom-logo-small.svg" alt="Freedom Mobile" className="okta-password-reset-success-mobile__logo" onClick={onBack} />
        <button className="okta-password-reset-success-mobile__menu-btn" aria-label="Menu">
          <span className="okta-password-reset-success-mobile__menu-bar" />
          <span className="okta-password-reset-success-mobile__menu-bar" />
          <span className="okta-password-reset-success-mobile__menu-bar" />
        </button>
      </header>

      <main className="okta-password-reset-success-mobile__body">
        <div className="okta-password-reset-success-mobile__card">
          <div className="okta-password-reset-success-mobile__icon-wrap">
            <img src="/okta/icon-check-circle.svg" alt="" width={84} height={84} />
          </div>
          <h2 className="okta-password-reset-success-mobile__title">You’re all set!</h2>
          <p className="okta-password-reset-success-mobile__text">Your password has been reset.</p>
          <Button size="large" className="okta-password-reset-success-mobile__cta" onClick={onContinue}>Continue</Button>
        </div>
      </main>
    </div>
  );
}
