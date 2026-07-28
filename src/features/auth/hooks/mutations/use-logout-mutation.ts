import { useMutation } from '@tanstack/react-query';

import { logout } from '@/features/auth/api/auth.api.ts';

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
  });
};
