const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

export function getRecaptchaType(value) {
  return value === 'checkbox' ? 'checkbox' : 'invisible';
}

export async function verifyRecaptcha(token, type = 'invisible') {
  const secret = type === 'checkbox'
    ? process.env.RECAPTCHA_CHECKBOX_SECRET_KEY
    : process.env.RECAPTCHA_SECRET_KEY;

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
