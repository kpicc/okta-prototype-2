import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServices.css';
import './OktaForgotPin.css';

interface OktaPinResetSuccessProps {
  onBack: () => void;
  onContinue?: () => void;
}

export function OktaPinResetSuccess({ onBack, onContinue }: OktaPinResetSuccessProps) {
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
        <div className="okta-fpin__check-card">
          <div className="okta-fpin__check-icon-wrap">
            <img src="/okta/icon-check-circle.svg" alt="" width={84} height={84} />
          </div>
          <h2 className="okta-fpin__check-title">You're all set!</h2>
          <p className="okta-fpin__check-text">Success! Your PIN has been reset.</p>
          <Button size="large" className="okta-fpin__continue-btn" loading={loading} onClick={() => trigger(onContinue)}>
            Continue
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
