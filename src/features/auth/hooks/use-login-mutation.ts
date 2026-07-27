import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { login } from '@/features/auth/api/auth.api.ts';
import type { LoginRequest, LoginResponse } from '@/features/auth/types/auth.types.ts';
import type { ApiError } from '@/types/error.ts';

export const useLoginMutation = () => {
  return useMutation<LoginResponse, AxiosError<ApiError>, LoginRequest>({
    mutationFn: login,
  });
};
