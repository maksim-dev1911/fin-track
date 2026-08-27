import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { authApi } from '@/features/auth/api/auth.api.ts';
import type { LoginRequest, LoginResponse } from '@/features/auth/types/auth.types.ts';
import type { ApiError } from '@/shared/types/error.ts';

export const useLoginMutation = () => {
  return useMutation<LoginResponse, AxiosError<ApiError>, LoginRequest>({
    mutationFn: (data: LoginRequest) => authApi.login(data),
  });
};
