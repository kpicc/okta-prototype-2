import { sendPasswordResetEmail } from './sendPasswordResetEmail.mjs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendPasswordResetHandler(body) {
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  if (!EMAIL_PATTERN.test(email)) {
    return { status: 400, body: { error: 'invalid_email' } };
  }

  const delivery = await sendPasswordResetEmail({ email });
  return {
    status: delivery.delivered ? 200 : 502,
    body: delivery,
  };
}
