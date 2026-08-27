import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/features/auth/api/auth.api.ts';

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApi.logout,
  });
};
