import { useNavigate } from 'react-router-dom';

import { routes } from '@/app/router/routes';
import { useLogoutMutation } from '@/features/auth/hooks/mutations/use-logout-mutation.ts';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearSession } = useAuthStore();
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Error while logging out:', error);
    } finally {
      clearSession();
      navigate(routes.login, { replace: true });
    }
  };

  return {
    logout: handleLogout,
    isPending: logoutMutation.isPending,
  };
};
