import { useEffect, useRef } from 'react';

import { authApi } from '@/features/auth/api/auth.api.ts';
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
        const { accessToken } = await authApi.refreshSession();
        const user = await authApi.getMe(accessToken);

        setSession({ accessToken, user });
      } catch {
        setStatus('unauthenticated');
      } finally {
        initializing.current = false;
      }
    };

    restoreSession();
  }, [setSession, setStatus]);
};
