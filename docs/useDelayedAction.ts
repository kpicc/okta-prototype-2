import { useState } from 'react';

/**
 * Adds a random 0.2-1.5s delay before executing `action`, with a `loading`
 * flag that consumers pass to `<Button loading={...} />` so a fading dot
 * animation shows during the wait.
 */
export function useDelayedAction() {
  const [loading, setLoading] = useState(false);

  function trigger(action?: () => void) {
    if (loading || !action) return;
    setLoading(true);
    const delay = 200 + Math.random() * 1300;
    window.setTimeout(() => {
      setLoading(false);
      action();
    }, delay);
  }

  return { loading, trigger };
}
