import { executeRecaptcha } from './recaptchaApi.js';

type RecaptchaType = 'invisible' | 'checkbox';

export async function requestVerificationCode(email: string, existingRecaptchaToken = '', recaptchaType: RecaptchaType = 'invisible'): Promise<string> {
  const recaptchaToken = existingRecaptchaToken || await executeRecaptcha();
  const response = await fetch('/api/send-verification-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, recaptchaToken, recaptchaType }),
  });

  const data = (await response.json().catch(() => null)) as { code?: string } | null;
  if (!response.ok || !data?.code) {
    throw new Error('verification_code_unavailable');
  }

  return data.code;
}

export async function verifyRecaptchaToken(recaptchaToken: string, recaptchaType: RecaptchaType = 'invisible'): Promise<void> {
  const response = await fetch('/api/verify-recaptcha', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recaptchaToken, recaptchaType }),
  });

  if (!response.ok) {
    throw new Error('recaptcha_verification_failed');
  }
}

export async function sendPinResetEmail(email: string): Promise<void> {
  await fetch('/api/send-pin-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export async function sendPasswordResetEmail(email: string): Promise<void> {
  await fetch('/api/send-password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}
