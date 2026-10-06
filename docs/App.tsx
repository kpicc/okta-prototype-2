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
import { OktaForgotPassword } from './OktaForgotPassword.js';
import { OktaForgotPasswordMobile } from './OktaForgotPasswordMobile.js';
import { OktaForgotPasswordSuccess } from './OktaForgotPasswordSuccess.js';
import { OktaForgotPasswordSuccessMobile } from './OktaForgotPasswordSuccessMobile.js';
import { OktaPasswordReset } from './OktaPasswordReset.js';
import { OktaPasswordResetMobile } from './OktaPasswordResetMobile.js';
import { OktaPasswordResetSuccess } from './OktaPasswordResetSuccess.js';
import { OktaPasswordResetSuccessMobile } from './OktaPasswordResetSuccessMobile.js';
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
import { CaptchaModal } from './CaptchaModal.js';
import { requestVerificationCode, verifyRecaptchaToken, sendPinResetEmail, sendPasswordResetEmail } from './verificationApi.js';
import { executeRecaptcha } from './recaptchaApi.js';

const MOBILE_BREAKPOINT = 768;

type Screen = 'landing' | 'sign-in' | 'forgot-password' | 'forgot-password-success' | 'password-reset' | 'password-reset-success' | 'auth-verify' | 'auth-code' | 'update-account' | 'verify-email' | 'link-services' | 'link-verify' | 'link-otp' | 'link-code' | 'link-success' | 'mfa-setup' | 'mfa-verify' | 'mfa-complete' | 'my-account' | 'forgot-pin' | 'forgot-pin-check' | 'pin-reset' | 'pin-reset-success';

type PendingVisibleRecaptcha = {
  complete: (token: string) => Promise<void>;
  reject: (error: Error) => void;
};

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

  useEffect(() => {
    function handleGlobalClick(event: MouseEvent) {
      const target = event.target;
      if (
        target instanceof HTMLImageElement &&
        target.alt === 'Freedom Mobile' &&
        target.className.includes('logo')
      ) {
        event.stopPropagation();
        setScreen('landing');
        return;
      }
      let node: HTMLElement | null = target instanceof HTMLElement ? target : null;
      while (node && node !== document.body) {
        if (node instanceof HTMLButtonElement && node.textContent?.trim() === 'Back') {
          event.stopPropagation();
          setScreen('landing');
          return;
        }
        node = node.parentElement;
      }
    }
    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
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
  const [linkedPhone, setLinkedPhoneState] = useState(() => sessionStorage.getItem('oktaLinkedPhone') || '');
  const setLinkedPhone = (value: string) => {
    setLinkedPhoneState(value);
    if (value) {
      sessionStorage.setItem('oktaLinkedPhone', value);
    } else {
      sessionStorage.removeItem('oktaLinkedPhone');
    }
  };
  const linkedPhoneDigits = linkedPhone.replace(/\D/g, '');
  const maskedLinkedPhone = linkedPhoneDigits.length === 10 ? `(***) ***-**${linkedPhoneDigits.slice(-2)}` : '(***) ***-**90';
  const mfaPhoneOptions = [...new Set([linkedPhone, '(123) 456-7801', '(123) 456-7812'].filter(Boolean))];
  const [pendingVisibleRecaptcha, setPendingVisibleRecaptcha] = useState<PendingVisibleRecaptcha | null>(null);

  function requestVisibleRecaptcha(action: (token: string) => Promise<void>): Promise<void> {
    return new Promise((resolve, reject) => {
      setPendingVisibleRecaptcha({
        complete: async (token) => {
          await action(token);
          resolve();
        },
        reject,
      });
    });
  }

  async function handleVisibleRecaptchaVerified(token: string): Promise<boolean> {
    if (!pendingVisibleRecaptcha) return false;
    try {
      await pendingVisibleRecaptcha.complete(token);
      setPendingVisibleRecaptcha(null);
      return true;
    } catch {
      return false;
    }
  }

  function handleVisibleRecaptchaClose() {
    pendingVisibleRecaptcha?.reject(new Error('recaptcha_cancelled'));
    setPendingVisibleRecaptcha(null);
  }

  async function handleCreateAccount(email: string, password: string) {
    setUserEmail(email);
    setUserPassword(password);
    try {
      const code = await requestVerificationCode(email);
      setVerificationCode(code);
      setScreen('verify-email');
    } catch {
      return;
    }
  }

  async function handleLinkOtpMethod(method: 'email' | 'phone', destination: string) {
    setLinkCodeDestination(destination);
    if (!userEmail) {
      setLinkCode(method === 'phone' ? '222222' : '');
      return;
    }
    try {
      const code = await requestVerificationCode(userEmail);
      setLinkCode(code);
    } catch {
      return;
    }
  }

  async function handleMfaSetupContinue() {
    if (!userEmail) return;
    try {
      const code = await requestVerificationCode(userEmail);
      setMfaCode(code);
      setScreen('mfa-verify');
    } catch {
      return;
    }
  }

  async function handleAuthVerifyContinue(contact: string) {
    setAuthContact(contact);
    if (!userEmail) return;
    try {
      const code = await requestVerificationCode(userEmail);
      setAuthCode(code);
      setScreen('auth-code');
    } catch {
      return;
    }
  }

  async function handleCodeSecurityCheck() {
    await requestVisibleRecaptcha((recaptchaToken) => verifyRecaptchaToken(recaptchaToken, 'checkbox'));
  }

  async function resendCreateAccountCode() {
    await requestVisibleRecaptcha(async (recaptchaToken) => {
      if (!userEmail) throw new Error('missing_email');
      setVerificationCode(await requestVerificationCode(userEmail, recaptchaToken, 'checkbox'));
    });
  }

  async function resendLinkCode() {
    await requestVisibleRecaptcha(async (recaptchaToken) => {
      if (!userEmail) throw new Error('missing_email');
      setLinkCode(await requestVerificationCode(userEmail, recaptchaToken, 'checkbox'));
    });
  }

  async function resendMfaCode() {
    await requestVisibleRecaptcha(async (recaptchaToken) => {
      if (!userEmail) throw new Error('missing_email');
      setMfaCode(await requestVerificationCode(userEmail, recaptchaToken, 'checkbox'));
    });
  }

  async function resendAuthCode() {
    await requestVisibleRecaptcha(async (recaptchaToken) => {
      if (!userEmail) throw new Error('missing_email');
      setAuthCode(await requestVerificationCode(userEmail, recaptchaToken, 'checkbox'));
    });
  }

  function handleForgotPin() {
    if (userEmail) {
      void sendPinResetEmail(userEmail);
    }
    setScreen('forgot-pin-check');
  }

  function renderDesktop() {
    if (screen === 'sign-in') {
      return <OktaSignIn email={userEmail} expectedEmail={userEmail || undefined} expectedPassword={userPassword || undefined} onBack={() => setScreen('landing')} onSignIn={() => setScreen('auth-verify')} onForgotPassword={() => setScreen('forgot-password')} onEmailChange={setUserEmail} />;
    }
    if (screen === 'forgot-password') {
      return <OktaForgotPassword email={userEmail} onBack={() => setScreen('sign-in')} onCancel={() => setScreen('sign-in')} onContinue={async (email) => { setUserEmail(email); localStorage.setItem('oktaPasswordResetEmail', email); await sendPasswordResetEmail(email); setScreen('forgot-password-success'); }} />;
    }
    if (screen === 'forgot-password-success') {
      return <OktaForgotPasswordSuccess onBack={() => setScreen('forgot-password')} />;
    }
    if (screen === 'password-reset') {
      return <OktaPasswordReset email={userEmail} onBack={() => setScreen('sign-in')} onContinue={(password) => { setUserPassword(password); setScreen('password-reset-success'); }} onEmailChange={setUserEmail} />;
    }
    if (screen === 'password-reset-success') {
      return <OktaPasswordResetSuccess onBack={() => setScreen('password-reset')} onContinue={() => setScreen('sign-in')} />;
    }
    if (screen === 'auth-verify') {
      return (
        <OktaAuthVerify
          email={userEmail}
          phone={maskedLinkedPhone}
          onBack={() => setScreen('sign-in')}
          onLogoClick={() => setScreen('landing')}
          onContinue={handleAuthVerifyContinue}
        />
      );
    }
    if (screen === 'auth-code') {
      return (
        <OktaAuthCode
          contact={authContact}
          expectedCode={authCode || undefined}
          onBack={() => setScreen('landing')}
          onLogoClick={() => setScreen('landing')}
          onContinue={() => setScreen('my-account')}
          onResend={resendAuthCode}
          onSecurityCheck={handleCodeSecurityCheck}
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
          onResend={resendMfaCode}
          onSecurityCheck={handleCodeSecurityCheck}
        />
      );
    }
    if (screen === 'mfa-setup') {
      return (
        <OktaMfaSetup
          phones={mfaPhoneOptions}
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
          phone={linkedPhone || undefined}
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
          onResend={resendLinkCode}
          onSecurityCheck={handleCodeSecurityCheck}
        />
      );
    }
    if (screen === 'link-otp') {
      return (
        <OktaLinkOtp
          phone={maskedLinkedPhone}
          expectedPhoneDigits={linkedPhoneDigits || undefined}
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
          onContinue={(phone) => { setLinkedPhone(phone); setScreen('link-otp'); }}
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
          onResend={resendCreateAccountCode}
          onSecurityCheck={handleCodeSecurityCheck}
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
      return <OktaSignIn email={userEmail} expectedEmail={userEmail || undefined} expectedPassword={userPassword || undefined} onBack={() => setScreen('landing')} onSignIn={() => setScreen('auth-verify')} onForgotPassword={() => setScreen('forgot-password')} onEmailChange={setUserEmail} />;
    }
    if (screen === 'forgot-password') {
      return <OktaForgotPasswordMobile email={userEmail} onBack={() => setScreen('sign-in')} onCancel={() => setScreen('sign-in')} onContinue={async (email) => { setUserEmail(email); localStorage.setItem('oktaPasswordResetEmail', email); await sendPasswordResetEmail(email); setScreen('forgot-password-success'); }} />;
    }
    if (screen === 'forgot-password-success') {
      return <OktaForgotPasswordSuccessMobile onBack={() => setScreen('forgot-password')} />;
    }
    if (screen === 'password-reset') {
      return <OktaPasswordResetMobile email={userEmail} onBack={() => setScreen('sign-in')} onContinue={(password) => { setUserPassword(password); setScreen('password-reset-success'); }} onEmailChange={setUserEmail} />;
    }
    if (screen === 'password-reset-success') {
      return <OktaPasswordResetSuccessMobile onBack={() => setScreen('password-reset')} onContinue={() => setScreen('sign-in')} />;
    }
    if (screen === 'auth-verify') {
      return (
        <OktaAuthVerify
          email={userEmail}
          phone={maskedLinkedPhone}
          onBack={() => setScreen('sign-in')}
          onLogoClick={() => setScreen('landing')}
          onContinue={handleAuthVerifyContinue}
        />
      );
    }
    if (screen === 'auth-code') {
      return (
        <OktaAuthCode
          contact={authContact}
          expectedCode={authCode || undefined}
          onBack={() => setScreen('landing')}
          onLogoClick={() => setScreen('landing')}
          onContinue={() => setScreen('my-account')}
          onResend={resendAuthCode}
          onSecurityCheck={handleCodeSecurityCheck}
        />
      );
    }
    if (screen === 'link-success') {
      return (
        <OktaLinkSuccessMobile
          email={userEmail || 'email@address.com'}
          phone={linkedPhone || undefined}
          onBack={() => setScreen('landing')}
          onContinue={() => setScreen('mfa-setup')}
        />
      );
    }
    if (screen === 'mfa-setup') {
      return (
        <OktaMfaSetupMobile
          phones={mfaPhoneOptions}
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
          onResend={resendMfaCode}
          onSecurityCheck={handleCodeSecurityCheck}
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
          onResend={resendLinkCode}
          onSecurityCheck={handleCodeSecurityCheck}
        />
      );
    }
    if (screen === 'link-otp') {
      return (
        <OktaLinkOtpMobile
          phone={maskedLinkedPhone}
          expectedPhoneDigits={linkedPhoneDigits || undefined}
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
          onContinue={(phone) => { setLinkedPhone(phone); setScreen('link-otp'); }}
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
          onResend={resendCreateAccountCode}
          onSecurityCheck={handleCodeSecurityCheck}
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
      {pendingVisibleRecaptcha && (
        <CaptchaModal onClose={handleVisibleRecaptchaClose} onVerified={handleVisibleRecaptchaVerified} />
      )}
    </>
  );
}
