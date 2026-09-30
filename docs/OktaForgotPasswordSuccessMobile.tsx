import { Button } from '../src';
import './OktaForgotPasswordSuccessMobile.css';

interface OktaForgotPasswordSuccessMobileProps {
  onBack: () => void;
  onContinue: () => void;
}

export function OktaForgotPasswordSuccessMobile({ onBack, onContinue }: OktaForgotPasswordSuccessMobileProps) {
  return (
    <div className="okta-forgot-password-success-mobile">
      <header className="okta-forgot-password-success-mobile__header">
        <img src="/okta/freedom-logo-small.svg" alt="Freedom Mobile" className="okta-forgot-password-success-mobile__logo" onClick={onBack} />
        <button className="okta-forgot-password-success-mobile__menu-btn" aria-label="Menu">
          <span className="okta-forgot-password-success-mobile__menu-bar" />
          <span className="okta-forgot-password-success-mobile__menu-bar" />
          <span className="okta-forgot-password-success-mobile__menu-bar" />
        </button>
      </header>

      <main className="okta-forgot-password-success-mobile__body">
        <div className="okta-forgot-password-success-mobile__card">
          <div className="okta-forgot-password-success-mobile__icon-wrap">
            <img src="/okta/icon-check.svg" alt="" width={48} height={48} />
          </div>
          <h2 className="okta-forgot-password-success-mobile__title">Got it! Check your email</h2>
          <p className="okta-forgot-password-success-mobile__text">We sent you an email, follow the instructions to reset your password.</p>
          <Button size="large" className="okta-forgot-password-success-mobile__cta" onClick={onContinue}>Continue</Button>
        </div>
      </main>
    </div>
  );
}
