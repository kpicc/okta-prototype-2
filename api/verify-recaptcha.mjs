import { verifyRecaptchaHandler } from './lib/verifyRecaptchaHandler.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }

  const result = await verifyRecaptchaHandler(body);
  return res.status(result.status).json(result.body);
}
