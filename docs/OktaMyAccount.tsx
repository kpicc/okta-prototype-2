import { useState } from 'react';
import './OktaLinkServices.css';
import './OktaMyAccount.css';

interface OktaMyAccountProps {
  onBack?: () => void;
}

export function OktaMyAccount({ onBack }: OktaMyAccountProps) {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Addons & passes', 'Usage details', 'Plan & device', 'My profile'];

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
            <span className="okta-link__nav-link">Back to school offers</span>
          </div>
          <span className="okta-link__nav-link okta-link__nav-link--right">My Freedom</span>
        </div>
      </nav>

      {/* Content */}
      <main className="okta-acct__content">
        {/* Header */}
        <div className="okta-acct__header">
          <div className="okta-acct__header-left">
            <h1 className="okta-acct__greeting">Hi, John</h1>
            <p className="okta-acct__account-num">Account Number: LINKED ACCOUNT</p>
          </div>
          <div className="okta-acct__phone-select">
            <span className="okta-acct__phone-value">(416) 721-8594</span>
            <img src="/okta/icon-double-chevron.svg" alt="" width={40} height={40} className="okta-acct__phone-icon" />
            <div className="okta-acct__phone-underline" />
          </div>
        </div>

        {/* Tabs */}
        <div className="okta-acct__tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`okta-acct__tab${activeTab === tab ? ' okta-acct__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="okta-acct__tab-label">{tab}</span>
              <div className="okta-acct__tab-bar" />
            </button>
          ))}
        </div>

        {/* Billing card */}
        <div className="okta-acct__billing-card">
          <div className="okta-acct__billing-amount">
            <span className="okta-acct__billing-label">AMOUNT DUE</span>
            <span className="okta-acct__billing-value">$117.52</span>
          </div>
          <div className="okta-acct__billing-details">
            <div className="okta-acct__billing-row">
              <span className="okta-acct__billing-key">Payment Due Date:</span>
              <span className="okta-acct__billing-val">Mar. 10, 2020</span>
            </div>
            <div className="okta-acct__billing-divider" />
            <div className="okta-acct__billing-row">
              <span className="okta-acct__billing-key">Billing Period:</span>
              <span className="okta-acct__billing-val">Feb. 25 - Mar 24 2020</span>
            </div>
            <div className="okta-acct__billing-divider" />
            <div className="okta-acct__billing-row">
              <span className="okta-acct__billing-key">Auto Payment:</span>
              <span className="okta-acct__billing-val okta-acct__billing-val--bold">Activate Now and Save $5/mo.</span>
            </div>
          </div>
          <div className="okta-acct__billing-actions">
            <button className="okta-acct__pay-btn">Pay Now</button>
            <button className="okta-acct__download-btn">Download Bill</button>
          </div>
        </div>

        {/* Freedom Data */}
        <section className="okta-acct__data-section">
          <div className="okta-acct__data-header">
            <h2 className="okta-acct__data-title">Freedom Data</h2>
            <p className="okta-acct__data-desc">Optional copy dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="okta-acct__data-card">
            <div className="okta-acct__data-info">
              <div className="okta-acct__data-top">
                <div className="okta-acct__data-usage">
                  <span className="okta-acct__data-amount">5.6GB</span>
                  <span className="okta-acct__data-total">used /25GB total</span>
                </div>
                <p className="okta-acct__data-note">
                  <span className="okta-acct__data-note-bold">High Speed Data </span>
                  <span>| Reduced speeds after 100% of data is reached.</span>
                </p>
              </div>
              <div className="okta-acct__progress-bar">
                <div className="okta-acct__progress-fill" style={{ width: '30%' }} />
              </div>
              <p className="okta-acct__data-pct">12% of total data used</p>
            </div>
            <div className="okta-acct__data-divider" />
            <div className="okta-acct__data-links">
              <a href="#" className="okta-acct__data-link" onClick={(e) => e.preventDefault()}>View Usage Details</a>
              <a href="#" className="okta-acct__data-link" onClick={(e) => e.preventDefault()}>Buy a One-Time Pass</a>
            </div>
          </div>
        </section>

        {/* Nationwide Data */}
        <section className="okta-acct__data-section">
          <div className="okta-acct__data-header">
            <h2 className="okta-acct__data-title">Nationwide Data</h2>
            <p className="okta-acct__data-desc">Optional copy dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="okta-acct__data-card">
            <div className="okta-acct__data-info">
              <div className="okta-acct__data-top">
                <div className="okta-acct__data-usage">
                  <span className="okta-acct__data-amount">1.6GB</span>
                  <span className="okta-acct__data-total">used /25GB total</span>
                </div>
                <p className="okta-acct__data-note">
                  <span className="okta-acct__data-note-bold">High Speed Data </span>
                  <span>| Reduced speeds after 100% of data is reached.</span>
                </p>
              </div>
              <div className="okta-acct__progress-bar">
                <div className="okta-acct__progress-fill" style={{ width: '30%' }} />
              </div>
              <p className="okta-acct__data-pct">58% of total data used</p>
            </div>
            <div className="okta-acct__data-divider" />
            <div className="okta-acct__data-links">
              <a href="#" className="okta-acct__data-link" onClick={(e) => e.preventDefault()}>View Usage Details</a>
              <a href="#" className="okta-acct__data-link" onClick={(e) => e.preventDefault()}>Buy a One-Time Pass</a>
            </div>
          </div>
        </section>

        {/* My Plan and Devices */}
        <section className="okta-acct__data-section">
          <div className="okta-acct__data-header">
            <h2 className="okta-acct__data-title">My Plan and Devices</h2>
            <p className="okta-acct__data-desc">Optional copy dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="okta-acct__plan-row">
            {/* My Plan card */}
            <div className="okta-acct__plan-card">
              <div className="okta-acct__plan-top">
                <span className="okta-acct__plan-label">MY PLAN</span>
                <h3 className="okta-acct__plan-name">Promo Big Gig Unlimited + Talk 20GB</h3>
                <div className="okta-acct__plan-price">
                  <span className="okta-acct__plan-price-value">$85</span>
                  <span className="okta-acct__plan-price-unit">/mo</span>
                </div>
                <span className="okta-acct__plan-date">Activated on September 5, 2019</span>
              </div>
              <div className="okta-acct__plan-divider" />
              <div className="okta-acct__plan-features">
                <div className="okta-acct__plan-feature-group">
                  <span className="okta-acct__plan-feature-label">DATA</span>
                  <div className="okta-acct__plan-feature-item">
                    <img src="/okta/icon-checkmark.svg" alt="" width={40} height={40} />
                    <span>20GB of Fast LTE (Freedom Network)</span>
                  </div>
                  <div className="okta-acct__plan-feature-item">
                    <img src="/okta/icon-checkmark.svg" alt="" width={40} height={40} />
                    <span>2GB of Fast LTE (Freedom Nationwide)</span>
                  </div>
                </div>
                <div className="okta-acct__plan-feature-group">
                  <span className="okta-acct__plan-feature-label">TALK</span>
                  <div className="okta-acct__plan-feature-item">
                    <img src="/okta/icon-checkmark.svg" alt="" width={40} height={40} />
                    <span>Unlimited calls to Canada</span>
                  </div>
                  <div className="okta-acct__plan-feature-item">
                    <img src="/okta/icon-checkmark.svg" alt="" width={40} height={40} />
                    <span>Unlimited incoming calls</span>
                  </div>
                </div>
                <div className="okta-acct__plan-feature-group">
                  <span className="okta-acct__plan-feature-label">TEXT</span>
                  <div className="okta-acct__plan-feature-item">
                    <img src="/okta/icon-checkmark.svg" alt="" width={40} height={40} />
                    <span>Unlimited global text, picture, and video messaging</span>
                  </div>
                </div>
              </div>
              <div className="okta-acct__plan-bottom">
                <p className="okta-acct__plan-upgrade-text">You may be eligible for a hardware upgrade.</p>
                <button className="okta-acct__plan-cta">Change My Plan</button>
              </div>
            </div>

            {/* My Tab card */}
            <div className="okta-acct__plan-card">
              <div className="okta-acct__plan-top">
                <span className="okta-acct__plan-label">MY TAB</span>
                <h3 className="okta-acct__plan-name">Apple<br />iPhone 11 Pro Max</h3>
                <div className="okta-acct__plan-price">
                  <span className="okta-acct__plan-price-value">$49</span>
                  <span className="okta-acct__plan-price-unit">/mo</span>
                </div>
                <span className="okta-acct__plan-date">Commitment end date: Sep. 5, 2021 (19 months)</span>
              </div>
              <div className="okta-acct__plan-divider" />
              <div className="okta-acct__plan-features">
                <div className="okta-acct__plan-feature-group">
                  <span className="okta-acct__plan-feature-label">FREEDOM PAYS</span>
                  <div className="okta-acct__plan-feature-item">
                    <img src="/okta/icon-checkmark.svg" alt="" width={40} height={40} />
                    <span>$14.29/mo.</span>
                  </div>
                </div>
                <div className="okta-acct__plan-feature-group">
                  <span className="okta-acct__plan-feature-label">REMAINING BALANCE</span>
                  <div className="okta-acct__plan-feature-item">
                    <img src="/okta/icon-checkmark.svg" alt="" width={40} height={40} />
                    <span>$1,329.13</span>
                  </div>
                </div>
              </div>
              <div className="okta-acct__plan-bottom">
                <p className="okta-acct__plan-upgrade-text">You may be eligible for a hardware upgrade.</p>
                <button className="okta-acct__plan-cta">Upgrade My Phone</button>
              </div>
            </div>
          </div>
        </section>
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
