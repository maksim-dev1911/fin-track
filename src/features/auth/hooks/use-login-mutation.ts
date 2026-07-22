import { useMutation } from '@tanstack/react-query';

import { login } from '@/features/auth/api/auth.api.ts';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
