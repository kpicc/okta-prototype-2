import { useEffect, useRef, useState } from 'react';
import './CaptchaModal.css';

interface CaptchaModalProps {
  onClose: () => void;
  onVerified: (token: string) => Promise<boolean>;
}

interface RecaptchaApi {
  render: (container: HTMLElement, options: {
    sitekey: string;
    callback: (token: string) => void;
    'expired-callback': () => void;
    'error-callback': () => void;
  }) => number;
  reset: (widgetId?: number) => void;
}

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
    __oktaRecaptchaOnLoad?: () => void;
  }
}

const SITE_KEY = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_RECAPTCHA_SITE_KEY || '';
let recaptchaScriptPromise: Promise<RecaptchaApi> | null = null;

function loadRecaptcha(): Promise<RecaptchaApi> {
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);
  if (recaptchaScriptPromise) return recaptchaScriptPromise;

  recaptchaScriptPromise = new Promise((resolve, reject) => {
    window.__oktaRecaptchaOnLoad = () => {
      if (window.grecaptcha) resolve(window.grecaptcha);
      else reject(new Error('recaptcha_unavailable'));
    };

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=__oktaRecaptchaOnLoad&render=explicit';
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('recaptcha_script_failed'));
    document.head.appendChild(script);
  });

  return recaptchaScriptPromise;
}

export function CaptchaModal({ onClose, onVerified }: CaptchaModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const recaptchaRef = useRef<RecaptchaApi | null>(null);
  const onVerifiedRef = useRef(onVerified);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  onVerifiedRef.current = onVerified;

  useEffect(() => {
    if (!SITE_KEY) {
      setError('reCAPTCHA is not configured. Add VITE_RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY.');
      return;
    }

    let cancelled = false;
    loadRecaptcha()
      .then((recaptcha) => {
        if (cancelled || !containerRef.current) return;
        recaptchaRef.current = recaptcha;
        widgetIdRef.current = recaptcha.render(containerRef.current, {
          sitekey: SITE_KEY,
          callback: (token) => {
            setError('');
            setSubmitting(true);
            void onVerifiedRef.current(token)
              .then((verified) => {
                if (!verified) {
                  setSubmitting(false);
                  setError('Verification failed. Please try again.');
                  if (widgetIdRef.current !== null) recaptchaRef.current?.reset(widgetIdRef.current);
                }
              })
              .catch(() => {
                setSubmitting(false);
                setError('Verification failed. Please try again.');
                if (widgetIdRef.current !== null) recaptchaRef.current?.reset(widgetIdRef.current);
              });
          },
          'expired-callback': () => setError('reCAPTCHA expired. Please try again.'),
          'error-callback': () => setError('reCAPTCHA could not be verified. Please try again.'),
        });
      })
      .catch(() => setError('reCAPTCHA could not be loaded. Check your connection and try again.'));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="okta-captcha__overlay" role="dialog" aria-modal="true" aria-label="Security verification" onClick={() => { if (!submitting) onClose(); }}>
      <div className="okta-captcha__box" onClick={(event) => event.stopPropagation()}>
        <div className="okta-captcha__content">
          <h2 className="okta-captcha__title">Security check</h2>
          <p className="okta-captcha__subtitle">Complete the reCAPTCHA below to send your verification code.</p>
          {SITE_KEY ? <div ref={containerRef} className="okta-captcha__widget" /> : null}
          {submitting && <p className="okta-captcha__status">Sending verification code…</p>}
          {error && <p className="okta-captcha__error" role="alert">{error}</p>}
          <button type="button" className="okta-captcha__cancel" onClick={onClose} disabled={submitting}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
