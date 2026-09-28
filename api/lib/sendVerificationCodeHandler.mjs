import { sendVerificationEmail } from './sendVerificationEmail.mjs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function createVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function sendVerificationCodeHandler(body) {
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  if (!EMAIL_PATTERN.test(email)) {
    return { status: 400, body: { error: 'invalid_email' } };
  }

  const code = createVerificationCode();
  const delivery = await sendVerificationEmail({ email, code });

  return {
    status: delivery.delivered ? 200 : 502,
    body: { code, ...delivery },
  };
}
