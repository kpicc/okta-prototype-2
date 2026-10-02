const BASE_URL = process.env.APP_BASE_URL || 'https://okta-user-test.vercel.app';
const LOGO_BASE64 = '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';

export async function sendVerificationEmail({ email, code }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { delivered: false, reason: 'missing_api_key' };
  }

  const from = process.env.RESEND_FROM || 'Freedom Mobile <onboarding@resend.dev>';
  const year = new Date().getFullYear();
  const logoUrl = 'cid:freedom-logo';
  const contactUrl = `${BASE_URL}/#landing`;

  const text = `Hi,

Do not share this code with anyone. A Freedom Mobile agent will never ask for it.

Use the verification code below to sign in to your My Account.

${code}

This code expires in 10 minutes.

If you did not request this code, reset your PIN in My Account, contact Customer Care immediately at 1 (877) 946-3184, or dial 611 from your Freedom Mobile phone.

Thank you,
Freedom Mobile

Freedom Mobile's address is PO Box 365 Stn. Adelaide Toronto, ON M5C 2J5. For additional contact methods, visit ${contactUrl}.

© ${year} Videotron Ltd., doing business as Freedom Mobile`;

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0; padding:0; background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; font-family:Arial, Helvetica, sans-serif; color:#191919;">
            <tr>
              <td align="center" style="background:#000000; padding:34px 24px;">
                <img src="${logoUrl}" alt="Freedom Mobile" width="190" style="display:block; width:190px; max-width:190px; height:auto; border:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:30px 40px 34px; font-size:16px; line-height:22px;">
                <p style="margin:0 0 22px;">Hi,</p>
                <p style="margin:0 0 22px;"><strong>Do not share this code with anyone.</strong> A Freedom Mobile agent will never ask for it.</p>
                <p style="margin:0 0 14px;">Use the verification code below to sign in to your My Account.</p>
                <p style="margin:0 0 18px;"><span style="display:inline-block; padding:6px 10px; background:#f4ead7; font-size:21px; line-height:24px; font-weight:700; letter-spacing:1px;">${code}</span></p>
                <p style="margin:0 0 22px;">This code expires in 10 minutes.</p>
                <p style="margin:0 0 22px;">If you did not request this code, reset your PIN in My Account, contact Customer Care immediately at <a href="tel:+18779463184" style="color:#db5c05; font-weight:700; text-decoration:underline;">1 (877) 946-3184</a>, or dial 611 from your Freedom Mobile phone.</p>
                <p style="margin:0 0 22px;">Thank you,</p>
                <p style="margin:0;">Freedom Mobile</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="background:#000000; padding:26px 34px 30px; color:#ffffff; font-size:14px; line-height:20px;">
                <p style="margin:0 0 18px;">Freedom Mobile's address is PO Box 365 Stn. Adelaide Toronto, ON M5C 2J5. For additional contact methods, <a href="${contactUrl}" style="color:#4da3ff; text-decoration:underline;">click here</a>.</p>
                <p style="margin:0;">© ${year} Videotron Ltd., doing business as Freedom Mobile</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: 'Freedom Mobile sign-in verification code',
      text,
      html,
      attachments: [
        {
          filename: 'freedom-logo.png',
          content: LOGO_BASE64,
          content_type: 'image/png',
          content_id: 'freedom-logo',
        },
      ],
    }),
  });

  if (!response.ok) {
    return { delivered: false, reason: 'send_failed', status: response.status };
  }

  return { delivered: true };
}
