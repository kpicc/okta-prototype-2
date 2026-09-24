import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServices.css';
import './OktaMfaComplete.css';

interface OktaMfaCompleteProps {
  onBack: () => void;
  onLogoClick: () => void;
}

export function OktaMfaComplete({ onBack, onLogoClick }: OktaMfaCompleteProps) {
  const { loading, trigger } = useDelayedAction();
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
          <img src="/okta/freedom-logo.svg" alt="Freedom Mobile" className="okta-link__nav-logo" onClick={onLogoClick} style={{ cursor: 'pointer' }} />
          <div className="okta-link__nav-links">
            <span className="okta-link__nav-link">Mobile</span>
            <span className="okta-link__nav-link">TV+ Internet</span>
            <span className="okta-link__nav-link">Network</span>
            <span className="okta-link__nav-link">Special offers</span>
          </div>
          <span className="okta-link__nav-link okta-link__nav-link--right">My Freedom</span>
        </div>
      </nav>

      {/* Step tracker — all 3 steps completed */}
      <div className="okta-link__steps">
        <div className="okta-link__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--completed">Create account</span>
        </div>
        <div className="okta-link__step-line" />
        <div className="okta-link__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--completed">Link services</span>
        </div>
        <div className="okta-link__step-line" />
        <div className="okta-link__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--completed">Set up MFA</span>
        </div>
      </div>

      {/* Content */}
      <main className="okta-link__body">
        <div className="okta-complete__card">
          <div className="okta-complete__icon-wrap">
            <img src="/okta/icon-check-circle.svg" alt="" width={84} height={84} />
          </div>
          <h2 className="okta-complete__title">You're all set!</h2>
          <p className="okta-complete__text">
            Your services are linked to your new account and multi-factor authorization is now enabled.
          </p>
          <Button size="large" className="okta-complete__cta" loading={loading} onClick={() => trigger(onBack)}>
            Go to My Account
          </Button>
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
