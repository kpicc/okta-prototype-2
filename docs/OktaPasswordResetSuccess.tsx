import { Button } from '../src';
import './OktaPasswordResetSuccess.css';

interface OktaPasswordResetSuccessProps {
  onBack: () => void;
  onContinue: () => void;
}

export function OktaPasswordResetSuccess({ onBack, onContinue }: OktaPasswordResetSuccessProps) {
  return (
    <div className="okta-password-reset-success">
      <header className="okta-password-reset-success__header">
        <div className="okta-password-reset-success__header-inner">
          <img src="/okta/freedom-logo.svg" alt="Freedom Mobile" className="okta-password-reset-success__logo" onClick={onBack} />
          <Button size="medium" className="okta-password-reset-success__back" onClick={onBack}>Back</Button>
        </div>
      </header>

      <main className="okta-password-reset-success__body">
        <div className="okta-password-reset-success__card">
          <div className="okta-password-reset-success__icon-wrap">
            <img src="/okta/icon-check-circle.svg" alt="" width={84} height={84} />
          </div>
          <h1 className="okta-password-reset-success__title">You’re all set!</h1>
          <p className="okta-password-reset-success__text">Your password has been reset.</p>
          <Button size="large" className="okta-password-reset-success__cta" onClick={onContinue}>Continue</Button>
        </div>
      </main>
    </div>
  );
}
