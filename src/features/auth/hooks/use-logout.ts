import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { routes } from '@/app/router/routes';
import { useLogoutMutation } from '@/features/auth/hooks/mutations/use-logout-mutation.ts';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearSession } = useAuthStore();
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      if (error) {
        const axiosError = error as AxiosError<{ error?: { message?: string } }>;

        toast.error('Failed to sign out', {
          description: getApiErrorMessage(axiosError.response?.data?.error?.message),
        });
      }
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
