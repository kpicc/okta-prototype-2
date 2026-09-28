export async function sendVerificationEmail({ email, code }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { delivered: false, reason: 'missing_api_key' };
  }

  const from = process.env.RESEND_FROM || 'Freedom Mobile <onboarding@resend.dev>';
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: 'Your verification code',
      text: `Your verification code is ${code}.`,
      html: `<p>Your verification code is <strong>${code}</strong>.</p>`,
    }),
  });

  if (!response.ok) {
    return { delivered: false, reason: 'send_failed', status: response.status };
  }

  return { delivered: true };
}
