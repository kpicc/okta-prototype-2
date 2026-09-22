/**
 * Formats a string as a North American phone number: (123)456-7890.
 * Non-digits are stripped and the value is capped at 10 digits.
 * Partial input is formatted progressively (e.g. "12" → "(12", "123456" → "(123)456").
 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** True if the value looks like the user is entering a phone number. */
export function looksLikePhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  // Starts with a digit, "(", "+", or "-": treat as phone.
  return /^[\d(+\-\s]/.test(trimmed) && !/[a-zA-Z@]/.test(trimmed);
}
