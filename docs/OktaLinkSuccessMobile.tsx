import { useState } from 'react';
import { Button } from '../src';
import { useDelayedAction } from './useDelayedAction.js';
import './OktaLinkServicesMobile.css';
import './OktaLinkSuccessMobile.css';

interface OktaLinkSuccessMobileProps {
  email?: string;
  phone?: string;
  onBack: () => void;
  onContinue?: () => void;
}

const footerLinks = [
  { label: 'CONTACT', items: ['Contact us', 'Find a store'] },
  { label: 'SUPPORT', items: ['All support', 'Account & billing', 'Network & coverage', 'Phones & devices', 'Plans & services', 'Home internet', 'Device repair', 'Device care'] },
  { label: 'ABOUT', items: ['Our story', 'News room', 'Careers', 'Accessibility'] },
  { label: 'MORE', items: ['Terms of service', 'Terms & conditions', 'Privacy policy', 'Wireless code of conduct', 'Internet code'] },
];

export function OktaLinkSuccessMobile({
  email = 'email@address.com',
  phone = '(***)***-**90',
  onBack,
  onContinue,
}: OktaLinkSuccessMobileProps) {
  const { loading, trigger } = useDelayedAction();
  const [openSection, setOpenSection] = useState<string | null>(null);

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
          <span className="okta-link-mobile__step-label okta-link-mobile__step-label--completed">Update login</span>
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
        <div className="okta-link-mobile__card okta-link-mobile__card--success">
          <h2 className="okta-link-mobile__card-title">Link your services</h2>
          <div className="okta-link-mobile__card-subtitle">
            <p className="okta-link-mobile__card-subtitle-text">
              Success! Your existing services are now linked.
            </p>
          </div>

          <div className="okta-success-mobile__info-box">
            <p className="okta-success-mobile__info-line"><strong>Email:</strong> {email}</p>
            <p className="okta-success-mobile__info-line"><strong>Phone number:</strong> {phone}</p>
          </div>

          <Button size="large" className="okta-link-mobile__continue-btn" loading={loading} onClick={() => trigger(onContinue)}>
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
