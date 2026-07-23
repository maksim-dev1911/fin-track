import { useEffect } from 'react';

import { refreshSession } from '@/features/auth/api/auth.api.ts';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';

export const useSession = () => {
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const session = await refreshSession();

        setSession(session);
      } catch {
        // User is not authenticated.
      }
    };

    restoreSession();
  }, [setSession]);
};
