import { Badge, Button, Card, Stack } from '../src';
import './BusinessLanding.css';

const plans = [
  { name: 'Business Starter', price: '$35', data: '35GB', detail: 'per line / month' },
  { name: 'Business Pro', price: '$50', data: '60GB', detail: 'per line / month', featured: true },
  { name: 'Business Unlimited', price: '$65', data: 'Unlimited', detail: 'per line / month' },
];

const features = [
  { title: 'Shared data pools', body: 'Pool data across every line so nothing goes to waste.' },
  { title: 'Easy onboarding', body: 'Add lines, swap devices, and manage bills from one dashboard.' },
  { title: '5G coverage', body: 'Nationwide coverage across 99% of the Canadian population.' },
  { title: 'No hidden fees', body: 'Transparent pricing with no surprise charges on your bill.' },
];

export function BusinessLanding() {
  return (
    <div className="business-landing">
      {/* Navigation */}
      <header className="business-landing__nav">
        <div className="business-landing__container business-landing__nav-inner">
          <span className="business-landing__logo">Freedom Mobile</span>
          <nav className="business-landing__nav-links">
            <a href="#plans" className="business-landing__nav-link">Plans</a>
            <a href="#features" className="business-landing__nav-link">Features</a>
            <a href="#support" className="business-landing__nav-link">Support</a>
            <Button size="small">Sign in</Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="business-landing__hero">
        <div className="business-landing__hero-image-wrapper">
          <img
            src="/hero-business.jpg"
            alt="Small business team staying connected on the go"
            className="business-landing__hero-image"
          />
        </div>
        <div className="business-landing__container business-landing__hero-inner">
          <Stack gap="4" align="flex-start" className="business-landing__hero-content">
            <Badge variant="outline-inverse">New for small business</Badge>
            <h1 className="business-landing__hero-title">
              Business plans built for teams
            </h1>
            <p className="business-landing__hero-subtitle">
              Flexible data, shared savings, and coast-to-coast coverage.
            </p>
            <p className="business-landing__hero-body">
              Get affordable 5G plans designed for Canadian small businesses, with no hidden fees and predictable monthly bills.
            </p>
            <div className="business-landing__hero-actions">
              <Button size="large">Get a business quote</Button>
              <Button variant="outline" size="large" style={{ borderColor: 'var(--color-neutral-0)', color: 'var(--color-neutral-0)' }}>
                View plans
              </Button>
            </div>
          </Stack>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="business-landing__plans">
        <div className="business-landing__container">
          <div className="business-landing__section-header">
            <h2 className="business-landing__section-title">Simple business plans</h2>
            <p className="business-landing__section-body">
              Share data across your team with no hidden fees and predictable monthly bills.
            </p>
          </div>
          <div className="business-landing__plans-grid">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                variant={plan.featured ? 'elevated' : 'default'}
                padding="large"
                className="business-landing__plan"
                style={plan.featured ? { borderTop: '4px solid var(--color-brand-primary)' } : undefined}
              >
                <h3 className="business-landing__plan-title">{plan.name}</h3>
                <Badge variant="outline">{plan.data} data</Badge>
                <div>
                  <span className="business-landing__plan-price">{plan.price}</span>
                  <span className="business-landing__plan-period">/mo</span>
                </div>
                <ul className="business-landing__plan-features">
                  <li>5G/5G+ speeds</li>
                  <li>Unlimited Canada-wide talk & text</li>
                  <li>Shareable data across lines</li>
                  <li>Dedicated business support</li>
                </ul>
                <Button className="business-landing__plan-button">
                  Choose {plan.name}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="business-landing__features">
        <div className="business-landing__container">
          <h2 className="business-landing__features-title">Built for how you work</h2>
          <div className="business-landing__features-grid">
            {features.map((feature) => (
              <Card key={feature.title} variant="filled" padding="medium">
                <h4 className="business-landing__feature-title">{feature.title}</h4>
                <p className="business-landing__feature-body">{feature.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="business-landing__cta">
        <div className="business-landing__cta-inner">
          <h2 className="business-landing__cta-title">Ready to connect your team?</h2>
          <p className="business-landing__cta-body">
            Get a tailored quote for your small business in minutes.
          </p>
          <Button variant="outline" size="large" style={{ borderColor: 'var(--color-neutral-0)', color: 'var(--color-neutral-0)' }}>
            Request a quote
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="business-landing__footer">
        <div className="business-landing__container business-landing__footer-inner">
          <span style={{ fontWeight: 'var(--font-weight-bold)' }}>Freedom Mobile</span>
          <span style={{ opacity: 0.8 }}>© 2026 Freedom Mobile. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
