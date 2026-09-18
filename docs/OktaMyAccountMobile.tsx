import { useState } from 'react';
import './OktaMyAccountMobile.css';

interface OktaMyAccountMobileProps {
  onBack?: () => void;
}

export function OktaMyAccountMobile({ onBack }: OktaMyAccountMobileProps) {
  const [tabOpen, setTabOpen] = useState(false);
  const tabs = ['Overview', 'Addons & passes', 'Usage details', 'Plan & device', 'My profile'];

  return (
    <div className="okta-myaccount-mobile">
      {/* Header */}
      <header className="okta-myaccount-mobile__header">
        <img src="/okta/freedom-logo-small.svg" alt="Freedom Mobile" className="okta-myaccount-mobile__logo" onClick={() => onBack?.()} style={{ cursor: 'pointer' }} />
        <button className="okta-myaccount-mobile__menu-btn" aria-label="Menu">
          <span className="okta-myaccount-mobile__menu-bar" />
          <span className="okta-myaccount-mobile__menu-bar" />
          <span className="okta-myaccount-mobile__menu-bar" />
        </button>
      </header>

      {/* Tab selector */}
      <div className="okta-myaccount-mobile__tab-bar">
        <button
          className="okta-myaccount-mobile__tab-trigger"
          onClick={() => setTabOpen(!tabOpen)}
          aria-expanded={tabOpen}
        >
          <span className="okta-myaccount-mobile__tab-label">Overview</span>
          <img
            src="/okta/icon-chevron-down.svg"
            alt=""
            width={24}
            height={24}
            className={`okta-myaccount-mobile__tab-chevron${tabOpen ? ' okta-myaccount-mobile__tab-chevron--open' : ''}`}
          />
        </button>
        {tabOpen && (
          <div className="okta-myaccount-mobile__tab-menu">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`okta-myaccount-mobile__tab-option${tab === 'Overview' ? ' okta-myaccount-mobile__tab-option--active' : ''}`}
                onClick={() => setTabOpen(false)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Account header */}
      <div className="okta-myaccount-mobile__account-header">
        <h1 className="okta-myaccount-mobile__greeting">Hi, John</h1>
        <p className="okta-myaccount-mobile__account-num">Account Number: DBC00182195305</p>
        <div className="okta-myaccount-mobile__phone-select">
          <span className="okta-myaccount-mobile__phone-value">(416) 721-8594</span>
          <img src="/okta/icon-double-chevron.svg" alt="" width={24} height={24} className="okta-myaccount-mobile__phone-icon" />
        </div>
      </div>

      {/* Billing card */}
      <div className="okta-myaccount-mobile__billing-card">
        <span className="okta-myaccount-mobile__billing-label">AMOUNT DUE</span>
        <span className="okta-myaccount-mobile__billing-value">$117.52</span>

        <div className="okta-myaccount-mobile__billing-row">
          <span className="okta-myaccount-mobile__billing-key">Payment Due Date:</span>
          <span className="okta-myaccount-mobile__billing-val">Mar. 10, 2020</span>
        </div>
        <div className="okta-myaccount-mobile__billing-row">
          <span className="okta-myaccount-mobile__billing-key">Billing Period:</span>
          <span className="okta-myaccount-mobile__billing-val">Feb. 25 - Mar 24 2020</span>
        </div>
        <div className="okta-myaccount-mobile__billing-row">
          <span className="okta-myaccount-mobile__billing-key">Auto Payment:</span>
          <a href="#" className="okta-myaccount-mobile__billing-link" onClick={(e) => e.preventDefault()}>Activate Now and Save $5/mo.</a>
        </div>

        <button className="okta-myaccount-mobile__pay-btn">Pay now</button>
        <button className="okta-myaccount-mobile__download-btn">Download bill</button>
      </div>

      {/* Freedom Data */}
      <section className="okta-myaccount-mobile__data-section">
        <h2 className="okta-myaccount-mobile__data-title">Freedom Data</h2>
        <p className="okta-myaccount-mobile__data-desc">Optional copy dolor sit amet, consectetur adipiscing elit.</p>
        <div className="okta-myaccount-mobile__data-card">
          <div className="okta-myaccount-mobile__data-usage">
            <span className="okta-myaccount-mobile__data-amount">5.6GB</span>
            <span className="okta-myaccount-mobile__data-total">used /25GB total</span>
          </div>
          <p className="okta-myaccount-mobile__data-note">
            <span className="okta-myaccount-mobile__data-note-bold">High Speed Data </span>
            <span>| Reduced speeds after 100% of data is reached.</span>
          </p>
          <div className="okta-myaccount-mobile__progress-bar">
            <div className="okta-myaccount-mobile__progress-fill" style={{ width: '22%' }} />
          </div>
          <p className="okta-myaccount-mobile__data-pct">12% of total data used</p>
          <a href="#" className="okta-myaccount-mobile__data-link" onClick={(e) => e.preventDefault()}>View Usage Details</a>
          <a href="#" className="okta-myaccount-mobile__data-link" onClick={(e) => e.preventDefault()}>Buy a One-Time Pass</a>
        </div>
      </section>

      {/* Nationwide Data */}
      <section className="okta-myaccount-mobile__data-section">
        <h2 className="okta-myaccount-mobile__data-title">Nationwide Data</h2>
        <p className="okta-myaccount-mobile__data-desc">Optional copy dolor sit amet, consectetur adipiscing elit.</p>
        <div className="okta-myaccount-mobile__data-card">
          <div className="okta-myaccount-mobile__data-usage">
            <span className="okta-myaccount-mobile__data-amount">1.6GB</span>
            <span className="okta-myaccount-mobile__data-total">used /3GB total</span>
          </div>
          <p className="okta-myaccount-mobile__data-note">
            <span className="okta-myaccount-mobile__data-note-bold">High Speed Data </span>
            <span>| Reduced speeds after 100% of data is reached.</span>
          </p>
          <div className="okta-myaccount-mobile__progress-bar">
            <div className="okta-myaccount-mobile__progress-fill" style={{ width: '53%' }} />
          </div>
          <p className="okta-myaccount-mobile__data-pct">58% of total data used</p>
          <a href="#" className="okta-myaccount-mobile__data-link" onClick={(e) => e.preventDefault()}>View Usage Details</a>
          <a href="#" className="okta-myaccount-mobile__data-link" onClick={(e) => e.preventDefault()}>Buy a One-Time Pass</a>
        </div>
      </section>
    </div>
  );
}
