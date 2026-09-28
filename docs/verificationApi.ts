export async function requestVerificationCode(email: string): Promise<string> {
  const response = await fetch('/api/send-verification-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = (await response.json().catch(() => null)) as { code?: string } | null;
  if (!data?.code) {
    throw new Error('verification_code_unavailable');
  }

  return data.code;
}

export async function sendPinResetEmail(email: string): Promise<void> {
  await fetch('/api/send-pin-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}
