const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const BASE_URL = process.env.APP_BASE_URL || 'https://okta-user-test.vercel.app';
const RESET_LINK = `${BASE_URL}/#pin-reset`;

function formatDate(date = new Date()) {
  return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export async function sendPinResetEmail({ email }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { delivered: false, reason: 'missing_api_key' };
  }

  const from = process.env.RESEND_FROM || 'Freedom Mobile <onboarding@resend.dev>';
  const date = formatDate();
  const bodyText = `Date: ${date}\nYou've requested a PIN reset for your Freedom Mobile My Account login. Click the link below, answer a couple of security questions, and you'll be able to create a new PIN.\n\n${RESET_LINK}\n\nNote: this is a one-time-use link, and it will expire after a few hours.\nIf you have not authorized this change, please contact Freedom Mobile with the information in this e-mail.\n\nTHANK YOU!\nFreedom Mobile`;
  const bodyHtml = `<p>Date: ${date}</p><p>You've requested a PIN reset for your Freedom Mobile My Account login. Click the link below, answer a couple of security questions, and you'll be able to create a new PIN.</p><p><a href="${RESET_LINK}">Click here</a></p><p>Note: this is a one-time-use link, and it will expire after a few hours.<br/>If you have not authorized this change, please contact Freedom Mobile with the information in this e-mail.</p><p>THANK YOU!<br/>Freedom Mobile</p>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: 'Freedom Mobile PIN reset',
      text: bodyText,
      html: bodyHtml,
    }),
  });

  if (!response.ok) {
    return { delivered: false, reason: 'send_failed', status: response.status };
  }

  return { delivered: true };
}
