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
import { OktaForgotPin } from './OktaForgotPin.js';
import { OktaForgotPinCheck } from './OktaForgotPinCheck.js';
import { OktaForgotPinMobile } from './OktaForgotPinMobile.js';
import { OktaForgotPinCheckMobile } from './OktaForgotPinCheckMobile.js';
import { OktaPinReset } from './OktaPinReset.js';
import { OktaPinResetSuccess } from './OktaPinResetSuccess.js';
import { OktaPinResetMobile } from './OktaPinResetMobile.js';
import { OktaPinResetSuccessMobile } from './OktaPinResetSuccessMobile.js';
import { requestVerificationCode, sendPinResetEmail } from './verificationApi.js';

const MOBILE_BREAKPOINT = 768;

type Screen = 'landing' | 'sign-in' | 'auth-verify' | 'auth-code' | 'update-account' | 'verify-email' | 'link-services' | 'link-verify' | 'link-otp' | 'link-code' | 'link-success' | 'mfa-setup' | 'mfa-verify' | 'mfa-complete' | 'my-account' | 'forgot-pin' | 'forgot-pin-check' | 'pin-reset' | 'pin-reset-success';

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
  const [userEmail, setUserEmailState] = useState(() => sessionStorage.getItem('oktaUserEmail') || '');
  const setUserEmail = (value: string) => {
    setUserEmailState(value);
    if (value) {
      sessionStorage.setItem('oktaUserEmail', value);
    } else {
      sessionStorage.removeItem('oktaUserEmail');
    }
  };
  const [userPassword, setUserPasswordState] = useState(() => sessionStorage.getItem('oktaUserPassword') || '');
  const setUserPassword = (value: string) => {
    setUserPasswordState(value);
    if (value) {
      sessionStorage.setItem('oktaUserPassword', value);
    } else {
      sessionStorage.removeItem('oktaUserPassword');
    }
  };
  const [verificationCode, setVerificationCode] = useState('');
  const [accountPin, setAccountPin] = useState('');
  const [authContact, setAuthContact] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [linkCode, setLinkCodeState] = useState(() => sessionStorage.getItem('oktaLinkCode') || '');
  const setLinkCode = (value: string) => {
    setLinkCodeState(value);
    if (value) {
      sessionStorage.setItem('oktaLinkCode', value);
    } else {
      sessionStorage.removeItem('oktaLinkCode');
    }
  };
  const [linkCodeDestination, setLinkCodeDestinationState] = useState(() => sessionStorage.getItem('oktaLinkCodeDestination') || '');
  const [mfaCode, setMfaCode] = useState('');
  const setLinkCodeDestination = (value: string) => {
    setLinkCodeDestinationState(value);
    if (value) {
      sessionStorage.setItem('oktaLinkCodeDestination', value);
    } else {
      sessionStorage.removeItem('oktaLinkCodeDestination');
    }
  };

  async function handleCreateAccount(email: string, password: string) {
    setUserEmail(email);
    setUserPassword(password);
    try {
      const code = await requestVerificationCode(email);
      setVerificationCode(code);
    } catch {
      setVerificationCode('222222');
    }
    setScreen('verify-email');
  }

  async function handleLinkOtpMethod(method: 'email' | 'phone', destination: string) {
    setLinkCodeDestination(destination);
    if (method === 'email' && userEmail) {
      try {
        const code = await requestVerificationCode(userEmail);
        setLinkCode(code);
      } catch {
        setLinkCode('222222');
      }
    } else {
      setLinkCode('222222');
    }
  }

  async function handleMfaSetupContinue() {
    if (userEmail) {
      try {
        const code = await requestVerificationCode(userEmail);
        setMfaCode(code);
      } catch {
        setMfaCode('222222');
      }
    } else {
      setMfaCode('222222');
    }
    setScreen('mfa-verify');
  }

  function handleForgotPin() {
    if (userEmail) {
      void sendPinResetEmail(userEmail);
    }
    setScreen('forgot-pin-check');
  }

  function renderDesktop() {
    if (screen === 'sign-in') {
      return <OktaSignIn email={userEmail} expectedEmail={userEmail || undefined} expectedPassword={userPassword || undefined} onBack={() => setScreen('landing')} onSignIn={() => setScreen('auth-verify')} onEmailChange={setUserEmail} />;
    }
    if (screen === 'auth-verify') {
      return (
        <OktaAuthVerify
          email={userEmail}
          phone="(***) ***-**90"
          onBack={() => setScreen('sign-in')}
          onLogoClick={() => setScreen('landing')}
          onSelect={async (method, contact) => {
            setAuthContact(contact);
            if (method === 'email' || !authCode) {
              if (userEmail) {
                try {
                  const code = await requestVerificationCode(userEmail);
                  setAuthCode(code);
                } catch {
                  setAuthCode('222222');
                }
              } else {
                setAuthCode('222222');
              }
            }
          }}
          onContinue={(contact) => {
            setAuthContact(contact);
            setScreen('auth-code');
          }}
        />
      );
    }
    if (screen === 'auth-code') {
      return (
        <OktaAuthCode
          contact={authContact}
          expectedCode={authCode || undefined}
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
          expectedCode={mfaCode || undefined}
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
          onContinue={() => { void handleMfaSetupContinue(); }}
        />
      );
    }
    if (screen === 'link-success') {
      return (
        <OktaLinkSuccess
          email={userEmail || 'email@address.com'}
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('link-code')}
          onContinue={() => setScreen('mfa-setup')}
        />
      );
    }
    if (screen === 'link-code') {
      return (
        <OktaLinkCode
          destination={linkCodeDestination || undefined}
          expectedCode={linkCode || undefined}
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
          onSelectMethod={(method, destination) => { void handleLinkOtpMethod(method, destination); }}
        />
      );
    }
    if (screen === 'forgot-pin') {
      return (
        <OktaForgotPin
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('link-verify')}
          onContinue={() => handleForgotPin()}
        />
      );
    }
    if (screen === 'forgot-pin-check') {
      return <OktaForgotPinCheck onBack={() => setScreen('landing')} />;
    }
    if (screen === 'pin-reset') {
      return (
        <OktaPinReset
          onBack={() => setScreen('landing')}
          onContinue={(pin) => { setAccountPin(pin); setScreen('pin-reset-success'); }}
        />
      );
    }
    if (screen === 'pin-reset-success') {
      return (
        <OktaPinResetSuccess
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('link-verify')}
        />
      );
    }
    if (screen === 'link-verify') {
      return (
        <OktaLinkVerify
          expectedPin={accountPin || undefined}
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('link-services')}
          onContinue={() => setScreen('link-otp')}
          onForgotPin={() => setScreen('forgot-pin')}
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
          expectedCode={verificationCode}
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('update-account')}
          onSignIn={() => setScreen('sign-in')}
          onContinue={() => setScreen('link-services')}
        />
      );
    }
    if (screen === 'update-account') {
      return (
        <OktaUpdateAccount
          onBack={() => setScreen('landing')}
          onContinue={(email, password) => { void handleCreateAccount(email, password); }}
          onSignIn={() => { setUserEmail(''); setScreen('sign-in'); }}
        />
      );
    }
    return <OktaLanding onUpdateAccount={() => setScreen('update-account')} onSignIn={(email) => { setUserEmail(email); setScreen('sign-in'); }} />;
  }

  function renderMobile() {
    if (screen === 'sign-in') {
      return <OktaSignIn email={userEmail} expectedEmail={userEmail || undefined} expectedPassword={userPassword || undefined} onBack={() => setScreen('landing')} onSignIn={() => setScreen('auth-verify')} onEmailChange={setUserEmail} />;
    }
    if (screen === 'auth-verify') {
      return (
        <OktaAuthVerify
          email={userEmail}
          phone="(***) ***-**90"
          onBack={() => setScreen('sign-in')}
          onLogoClick={() => setScreen('landing')}
          onSelect={async (method, contact) => {
            setAuthContact(contact);
            if (method === 'email' || !authCode) {
              if (userEmail) {
                try {
                  const code = await requestVerificationCode(userEmail);
                  setAuthCode(code);
                } catch {
                  setAuthCode('222222');
                }
              } else {
                setAuthCode('222222');
              }
            }
          }}
          onContinue={(contact) => {
            setAuthContact(contact);
            setScreen('auth-code');
          }}
        />
      );
    }
    if (screen === 'auth-code') {
      return (
        <OktaAuthCode
          contact={authContact}
          expectedCode={authCode || undefined}
          onBack={() => setScreen('sign-in')}
          onLogoClick={() => setScreen('landing')}
          onContinue={() => setScreen('my-account')}
        />
      );
    }
    if (screen === 'link-success') {
      return (
        <OktaLinkSuccessMobile
          email={userEmail || 'email@address.com'}
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
          onContinue={() => { void handleMfaSetupContinue(); }}
        />
      );
    }
    if (screen === 'mfa-verify') {
      return (
        <OktaMfaVerifyMobile
          expectedCode={mfaCode || undefined}
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
          destination={linkCodeDestination || undefined}
          expectedCode={linkCode || undefined}
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('link-success')}
        />
      );
    }
    if (screen === 'link-otp') {
      return (
        <OktaLinkOtpMobile
          email={userEmail || undefined}
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('link-code')}
          onSelectMethod={(method, destination) => { void handleLinkOtpMethod(method, destination); }}
        />
      );
    }
    if (screen === 'forgot-pin') {
      return (
        <OktaForgotPinMobile
          onBack={() => setScreen('landing')}
          onCancel={() => setScreen('link-verify')}
          onContinue={() => handleForgotPin()}
        />
      );
    }
    if (screen === 'forgot-pin-check') {
      return <OktaForgotPinCheckMobile onBack={() => setScreen('landing')} />;
    }
    if (screen === 'pin-reset') {
      return (
        <OktaPinResetMobile
          onBack={() => setScreen('landing')}
          onContinue={(pin) => { setAccountPin(pin); setScreen('pin-reset-success'); }}
        />
      );
    }
    if (screen === 'pin-reset-success') {
      return (
        <OktaPinResetSuccessMobile
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('link-verify')}
        />
      );
    }
    if (screen === 'link-verify') {
      return (
        <OktaLinkVerifyMobile
          expectedPin={accountPin || undefined}
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('link-otp')}
          onForgotPin={() => setScreen('forgot-pin')}
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
          expectedCode={verificationCode}
          onBack={() => setScreen('landing')}
          onSignIn={() => setScreen('sign-in')}
          onContinue={() => setScreen('link-services')}
        />
      );
    }
    if (screen === 'update-account') {
      return (
        <OktaUpdateAccountMobile
          onBack={() => setScreen('landing')}
          onContinue={(email, password) => { void handleCreateAccount(email, password); }}
          onSignIn={() => { setUserEmail(''); setScreen('sign-in'); }}
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
