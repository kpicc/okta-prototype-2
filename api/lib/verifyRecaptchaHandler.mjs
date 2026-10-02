import { getRecaptchaType, verifyRecaptcha } from './verifyRecaptcha.mjs';

export async function verifyRecaptchaHandler(body) {
  const recaptchaToken = typeof body?.recaptchaToken === 'string' ? body.recaptchaToken : '';
  const recaptchaType = getRecaptchaType(body?.recaptchaType);

  if (!recaptchaToken) {
    return { status: 400, body: { error: 'recaptcha_required' } };
  }

  const recaptchaError = await verifyRecaptcha(recaptchaToken, recaptchaType);
  if (recaptchaError) return recaptchaError;

  return { status: 200, body: { verified: true } };
}
