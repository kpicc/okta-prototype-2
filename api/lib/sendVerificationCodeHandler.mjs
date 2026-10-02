import { sendVerificationEmail } from './sendVerificationEmail.mjs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

export function createVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { status: 503, body: { error: 'recaptcha_not_configured' } };
  }

  const response = await fetch(RECAPTCHA_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    return { status: 403, body: { error: 'recaptcha_failed' } };
  }

  return null;
}

export async function sendVerificationCodeHandler(body) {
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const recaptchaToken = typeof body?.recaptchaToken === 'string' ? body.recaptchaToken : '';

  if (!EMAIL_PATTERN.test(email)) {
    return { status: 400, body: { error: 'invalid_email' } };
  }
  if (!recaptchaToken) {
    return { status: 400, body: { error: 'recaptcha_required' } };
  }

  const recaptchaError = await verifyRecaptcha(recaptchaToken);
  if (recaptchaError) return recaptchaError;

  const code = createVerificationCode();
  const delivery = await sendVerificationEmail({ email, code });

  if (!delivery.delivered) {
    return { status: 502, body: { error: 'email_delivery_failed' } };
  }

  return {
    status: 200,
    body: { code, delivered: true },
  };
}
