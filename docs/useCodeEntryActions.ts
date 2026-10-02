import { useCallback, useRef, useState } from 'react';

const MAX_INCORRECT_ATTEMPTS = 3;

export function useCodeEntryActions(
  onSecurityCheck?: () => void | Promise<void>,
  onResend?: () => void | Promise<void>,
) {
  const incorrectAttemptsRef = useRef(0);
  const [securityBlocked, setSecurityBlocked] = useState(false);
  const [securityChecking, setSecurityChecking] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const runSecurityCheck = useCallback(async () => {
    if (securityChecking) return false;
    setSecurityChecking(true);
    try {
      await onSecurityCheck?.();
      setSecurityBlocked(false);
      return true;
    } catch {
      setSecurityBlocked(true);
      return false;
    } finally {
      setSecurityChecking(false);
    }
  }, [onSecurityCheck, securityChecking]);

  const handleInvalidCode = useCallback(() => {
    incorrectAttemptsRef.current += 1;
    if (incorrectAttemptsRef.current >= MAX_INCORRECT_ATTEMPTS) {
      incorrectAttemptsRef.current = 0;
      setSecurityBlocked(true);
      void runSecurityCheck();
    }
  }, [runSecurityCheck]);

  const canValidateCode = useCallback(async () => {
    if (securityChecking) return false;
    if (securityBlocked) return runSecurityCheck();
    return true;
  }, [runSecurityCheck, securityBlocked, securityChecking]);

  const resetCodeSecurity = useCallback(() => {
    incorrectAttemptsRef.current = 0;
    setSecurityBlocked(false);
  }, []);

  const handleResend = useCallback(async () => {
    if (resendLoading || !onResend) return;
    setResendLoading(true);
    try {
      await onResend();
      resetCodeSecurity();
    } catch {
      return;
    } finally {
      setResendLoading(false);
    }
  }, [onResend, resendLoading, resetCodeSecurity]);

  return {
    canValidateCode,
    handleInvalidCode,
    handleResend,
    resendLoading,
    resetCodeSecurity,
    securityChecking,
  };
}
