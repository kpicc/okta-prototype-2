import { useState, useEffect } from 'react';
import { OktaLanding } from './OktaLanding.js';
import { OktaLandingMobile } from './OktaLandingMobile.js';
import { OktaUpdateAccount } from './OktaUpdateAccount.js';
import { OktaVerifyEmail } from './OktaVerifyEmail.js';
import { OktaLinkServices } from './OktaLinkServices.js';
import { OktaLinkVerify } from './OktaLinkVerify.js';
import { OktaLinkOtp } from './OktaLinkOtp.js';
import { OktaLinkCode } from './OktaLinkCode.js';
import { OktaLinkSuccess } from './OktaLinkSuccess.js';
import { OktaMfaSetup } from './OktaMfaSetup.js';
import { OktaMfaVerify } from './OktaMfaVerify.js';
import { OktaMfaComplete } from './OktaMfaComplete.js';
import { OktaMyAccount } from './OktaMyAccount.js';
import { OktaUpdateAccountMobile } from './OktaUpdateAccountMobile.js';
import { OktaVerifyEmailMobile } from './OktaVerifyEmailMobile.js';
import { OktaLinkServicesMobile } from './OktaLinkServicesMobile.js';
import { OktaLinkVerifyMobile } from './OktaLinkVerifyMobile.js';
import { OktaLinkOtpMobile } from './OktaLinkOtpMobile.js';
import { OktaLinkCodeMobile } from './OktaLinkCodeMobile.js';
import { OktaLinkSuccessMobile } from './OktaLinkSuccessMobile.js';
import { OktaMfaSetupMobile } from './OktaMfaSetupMobile.js';
import { OktaMfaVerifyMobile } from './OktaMfaVerifyMobile.js';
import { OktaMfaCompleteMobile } from './OktaMfaCompleteMobile.js';
import { OktaMyAccountMobile } from './OktaMyAccountMobile.js';
import { OktaSignIn } from './OktaSignIn.js';
import { OktaAuthVerify } from './OktaAuthVerify.js';
import { OktaAuthCode } from './OktaAuthCode.js';

const MOBILE_BREAKPOINT = 768;

type Screen = 'landing' | 'sign-in' | 'auth-verify' | 'auth-code' | 'update-account' | 'verify-email' | 'link-services' | 'link-verify' | 'link-otp' | 'link-code' | 'link-success' | 'mfa-setup' | 'mfa-verify' | 'mfa-complete' | 'my-account';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

export function App() {
  const isMobile = useIsMobile();
  const [screen, setScreenState] = useState<Screen>(() => {
    const initial = window.location.hash.replace('#', '') as Screen;
    return initial || 'landing';
  });
  const setScreen = (next: Screen) => {
    setScreenState(next);
    window.location.hash = next;
  };
  useEffect(() => {
    const onHashChange = () => {
      const next = (window.location.hash.replace('#', '') as Screen) || 'landing';
      setScreenState(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  const [userEmail, setUserEmail] = useState('');
  const [authContact, setAuthContact] = useState('');

  function renderDesktop() {
    if (screen === 'sign-in') {
      return <OktaSignIn email={userEmail} onBack={() => setScreen('landing')} onSignIn={() => setScreen('auth-verify')} />;
    }
    if (screen === 'auth-verify') {
      return (
        <OktaAuthVerify
          email={userEmail}
          phone="(***) ***-**90"
          onBack={() => setScreen('sign-in')}
          onLogoClick={() => setScreen('landing')}
          onContinue={(contact) => { setAuthContact(contact); setScreen('auth-code'); }}
        />
      );
    }
    if (screen === 'auth-code') {
      return (
        <OktaAuthCode
          contact={authContact}
          onBack={() => setScreen('sign-in')}
          onLogoClick={() => setScreen('landing')}
          onContinue={() => setScreen('my-account')}
        />
      );
    }
    if (screen === 'my-account') {
      return <OktaMyAccount onBack={() => setScreen('landing')} />;
    }
    if (screen === 'mfa-complete') {
      return <OktaMfaComplete onBack={() => setScreen('my-account')} onLogoClick={() => setScreen('landing')} />;
    }
    if (screen === 'mfa-verify') {
      return (
        <OktaMfaVerify
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('mfa-setup')}
          onContinue={() => setScreen('mfa-complete')}
        />
      );
    }
    if (screen === 'mfa-setup') {
      return (
        <OktaMfaSetup
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('link-success')}
          onContinue={() => setScreen('mfa-verify')}
        />
      );
    }
    if (screen === 'link-success') {
      return (
        <OktaLinkSuccess
          email="email@address.com"
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('link-code')}
          onContinue={() => setScreen('mfa-setup')}
        />
      );
    }
    if (screen === 'link-code') {
      return (
        <OktaLinkCode
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('link-otp')}
          onContinue={() => setScreen('link-success')}
        />
      );
    }
    if (screen === 'link-otp') {
      return (
        <OktaLinkOtp
          email={userEmail || undefined}
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('link-verify')}
          onContinue={() => setScreen('link-code')}
        />
      );
    }
    if (screen === 'link-verify') {
      return (
        <OktaLinkVerify
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('link-services')}
          onContinue={() => setScreen('link-otp')}
        />
      );
    }
    if (screen === 'link-services') {
      return (
        <OktaLinkServices
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('link-verify')}
        />
      );
    }
    if (screen === 'verify-email') {
      return (
        <OktaVerifyEmail
          email={userEmail}
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('update-account')}
          onContinue={() => setScreen('link-services')}
        />
      );
    }
    if (screen === 'update-account') {
      return (
        <OktaUpdateAccount
          onBack={() => setScreen('landing')}
          onContinue={(email) => { setUserEmail(email); setScreen('verify-email'); }}
          onSignIn={() => setScreen('sign-in')}
        />
      );
    }
    return <OktaLanding onUpdateAccount={() => setScreen('update-account')} onSignIn={(email) => { setUserEmail(email); setScreen('sign-in'); }} />;
  }

  function renderMobile() {
    if (screen === 'sign-in') {
      return <OktaSignIn email={userEmail} onBack={() => setScreen('landing')} onSignIn={() => setScreen('auth-verify')} />;
    }
    if (screen === 'auth-verify') {
      return (
        <OktaAuthVerify
          email={userEmail}
          phone="(***) ***-**90"
          onBack={() => setScreen('sign-in')}
          onLogoClick={() => setScreen('landing')}
          onContinue={(contact) => { setAuthContact(contact); setScreen('auth-code'); }}
        />
      );
    }
    if (screen === 'auth-code') {
      return (
        <OktaAuthCode
          contact={authContact}
          onBack={() => setScreen('sign-in')}
          onLogoClick={() => setScreen('landing')}
          onContinue={() => setScreen('my-account')}
        />
      );
    }
    if (screen === 'link-success') {
      return (
        <OktaLinkSuccessMobile
          email="email@address.com"
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('mfa-setup')}
        />
      );
    }
    if (screen === 'mfa-setup') {
      return (
        <OktaMfaSetupMobile
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('link-success')}
          onContinue={() => setScreen('mfa-verify')}
        />
      );
    }
    if (screen === 'mfa-verify') {
      return (
        <OktaMfaVerifyMobile
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('mfa-complete')}
        />
      );
    }
    if (screen === 'mfa-complete') {
      return (
        <OktaMfaCompleteMobile
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('my-account')}
        />
      );
    }
    if (screen === 'my-account') {
      return <OktaMyAccountMobile onBack={() => setScreen('landing')} />;
    }
    if (screen === 'link-code') {
      return (
        <OktaLinkCodeMobile
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('link-success')}
        />
      );
    }
    if (screen === 'link-otp') {
      return (
        <OktaLinkOtpMobile
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('link-code')}
        />
      );
    }
    if (screen === 'link-verify') {
      return (
        <OktaLinkVerifyMobile
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('link-otp')}
        />
      );
    }
    if (screen === 'link-services') {
      return (
        <OktaLinkServicesMobile
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('link-verify')}
        />
      );
    }
    if (screen === 'verify-email') {
      return (
        <OktaVerifyEmailMobile
          email={userEmail}
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('link-services')}
        />
      );
    }
    if (screen === 'update-account') {
      return (
        <OktaUpdateAccountMobile
          onBack={() => setScreen('landing')}
          onContinue={(email) => { setUserEmail(email); setScreen('verify-email'); }}
          onSignIn={() => setScreen('sign-in')}
        />
      );
    }
    return <OktaLandingMobile onUpdateAccount={() => { console.log('App onUpdateAccount called'); setScreen('update-account'); }} onSignIn={(email) => { setUserEmail(email); setScreen('sign-in'); }} />;
  }

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      {isMobile ? renderMobile() : renderDesktop()}
    </>
  );
}
