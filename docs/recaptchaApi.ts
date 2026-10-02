interface RecaptchaApi {
  render: (container: HTMLElement, options: {
    sitekey: string;
    size: 'invisible';
    callback: (token: string) => void;
    'expired-callback': () => void;
    'error-callback': () => void;
  }) => number;
  execute: (widgetId?: number) => void;
  ready: (callback: () => void) => void;
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
let widgetId: number | null = null;
let widgetContainer: HTMLDivElement | null = null;
let pendingResolve: ((token: string) => void) | null = null;
let pendingReject: ((error: Error) => void) | null = null;
let executeQueue: Promise<string> | null = null;
let hasExecuted = false;

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

function settlePending(error?: Error, token?: string) {
  const resolve = pendingResolve;
  const reject = pendingReject;
  pendingResolve = null;
  pendingReject = null;
  if (error) reject?.(error);
  else if (token) resolve?.(token);
}

async function renderInvisibleWidget(): Promise<number> {
  if (widgetId !== null) return widgetId;
  const recaptcha = await loadRecaptcha();

  widgetContainer = document.createElement('div');
  widgetContainer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(widgetContainer);

  widgetId = recaptcha.render(widgetContainer, {
    sitekey: SITE_KEY,
    size: 'invisible',
    callback: (token) => settlePending(undefined, token),
    'expired-callback': () => settlePending(new Error('recaptcha_expired')),
    'error-callback': () => settlePending(new Error('recaptcha_failed')),
  });

  return widgetId;
}

async function executeInvisibleRecaptcha(): Promise<string> {
  if (!SITE_KEY) throw new Error('recaptcha_not_configured');

  const id = await renderInvisibleWidget();
  const recaptcha = await loadRecaptcha();

  return new Promise((resolve, reject) => {
    pendingResolve = resolve;
    pendingReject = reject;
    recaptcha.ready(() => {
      if (hasExecuted) recaptcha.reset(id);
      hasExecuted = true;
      recaptcha.execute(id);
    });
  });
}

export function executeRecaptcha(): Promise<string> {
  executeQueue = (executeQueue || Promise.resolve('')).catch(() => undefined).then(() => executeInvisibleRecaptcha());
  return executeQueue;
}
