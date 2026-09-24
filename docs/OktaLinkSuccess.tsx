import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServices.css';
import './OktaLinkSuccess.css';

interface OktaLinkSuccessProps {
  email?: string;
  phone?: string;
  onBack: () => void;
  onCancel: () => void;
  onContinue?: () => void;
}

export function OktaLinkSuccess({
  email = 'email@address.com',
  phone = '(123) 456-7890',
  onBack,
  onCancel,
  onContinue,
}: OktaLinkSuccessProps) {
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

      {/* Step tracker — steps 1 & 2 completed, step 3 active */}
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
          <img src="/okta/step-current.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--active">Set up MFA</span>
        </div>
      </div>

      {/* Content */}
      <main className="okta-link__body">
        <div className="okta-link__card">
          <div className="okta-link__card-header">
            <h2 className="okta-link__card-title">Link your services.</h2>
            <div className="okta-link__card-subtitle">
              <p className="okta-link__card-subtitle-text">
                Success! Your services are now linked to your new account.
              </p>
            </div>
          </div>

          <div className="okta-lsuccess__info-box">
            <p className="okta-lsuccess__info-line">Email: {email}</p>
            <p className="okta-lsuccess__info-line">Phone number: {phone}</p>
          </div>

          <div className="okta-lsuccess__actions">
            <Button size="large" className="okta-lsuccess__continue-btn" loading={loading} onClick={() => trigger(onContinue)}>
              Continue
            </Button>
            <a href="#" className="okta-lsuccess__cancel-link" onClick={(e) => { e.preventDefault(); onCancel(); }}>
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
