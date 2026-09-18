import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServices.css';

interface OktaLinkServicesProps {
  onBack: () => void;
  onContinue?: () => void;
}

export function OktaLinkServices({ onBack, onContinue }: OktaLinkServicesProps) {
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

      {/* Step tracker */}
      <div className="okta-link__steps">
        <div className="okta-link__step">
          <img src="/okta/step-completed.svg" alt="" width={24} height={24} />
          <span className="okta-link__step-label okta-link__step-label--completed">Update account login</span>
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
        {/* Success banner */}
        <div className="okta-link__success">
          <img src="/okta/icon-success.svg" alt="" width={20} height={20} />
          <span className="okta-link__success-text">Your account login has been updated.</span>
        </div>

        {/* Card */}
        <div className="okta-link__card">
          <div className="okta-link__card-header">
            <h2 className="okta-link__card-title">Next, link your current services</h2>
            <div className="okta-link__card-subtitle">
              <p className="okta-link__card-subtitle-text">
                You're almost done! Verify your phone number and PIN one last time to link your existing services.
              </p>
            </div>
          </div>
          <Button size="large" className="okta-link__cta" loading={loading} onClick={() => trigger(onContinue)}>
            Link your services
          </Button>
        </div>

        {/* Promo section */}
        <div className="okta-link__promo">
          <p className="okta-link__promo-text">Not yet a Freedom customer?</p>
          <a href="#" className="okta-link__promo-link" onClick={(e) => e.preventDefault()}>
            Shop our special offers
            <img src="/okta/icon-chevron-right.svg" alt="" width={24} height={24} />
          </a>
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
