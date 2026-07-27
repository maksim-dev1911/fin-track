import { useEffect, useRef } from 'react';

import { refreshSession } from '@/features/auth/api/auth.api.ts';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';

export const useSession = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const setStatus = useAuthStore((state) => state.setStatus);

  const initializing = useRef(false);

  useEffect(() => {
    const restoreSession = async () => {
      if (initializing.current) {
        return;
      }

      setStatus('loading');

      try {
        initializing.current = true;
        const session = await refreshSession();

        setSession(session);
      } catch {
        setStatus('unauthenticated');
      } finally {
        initializing.current = false;
      }
    };

    restoreSession();
  }, [setSession, setStatus]);
};
