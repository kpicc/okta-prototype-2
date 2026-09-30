import { Button } from '../src';
import './OktaForgotPasswordSuccess.css';

interface OktaForgotPasswordSuccessProps {
  onBack: () => void;
}

export function OktaForgotPasswordSuccess({ onBack }: OktaForgotPasswordSuccessProps) {
  return (
    <div className="okta-forgot-password-success">
      <header className="okta-forgot-password-success__header">
        <div className="okta-forgot-password-success__header-inner">
          <img src="/okta/freedom-logo.svg" alt="Freedom Mobile" className="okta-forgot-password-success__logo" onClick={onBack} />
          <Button size="medium" className="okta-forgot-password-success__back" onClick={onBack}>Back</Button>
        </div>
      </header>

      <main className="okta-forgot-password-success__body">
        <div className="okta-forgot-password-success__card">
          <div className="okta-forgot-password-success__icon-wrap">
            <img src="/okta/icon-check-circle.svg" alt="" width={84} height={84} />
          </div>
          <h1 className="okta-forgot-password-success__title">Got it! Check your email</h1>
          <p className="okta-forgot-password-success__text">We sent you an email, follow the instructions to reset your password.</p>
        </div>
      </main>
    </div>
  );
}
