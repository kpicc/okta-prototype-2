import { sendVerificationEmail } from './sendVerificationEmail.mjs';
import { getRecaptchaType, verifyRecaptcha } from './verifyRecaptcha.mjs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function createVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function sendVerificationCodeHandler(body) {
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const recaptchaToken = typeof body?.recaptchaToken === 'string' ? body.recaptchaToken : '';
  const recaptchaType = getRecaptchaType(body?.recaptchaType);

  if (!EMAIL_PATTERN.test(email)) {
    return { status: 400, body: { error: 'invalid_email' } };
  }
  if (!recaptchaToken) {
    return { status: 400, body: { error: 'recaptcha_required' } };
  }

  const recaptchaError = await verifyRecaptcha(recaptchaToken, recaptchaType);
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
