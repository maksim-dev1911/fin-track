import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { authApi } from '@/features/auth/api/auth.api.ts';
import type { RegisterRequest, RegisterResponse } from '@/features/auth/types/auth.types.ts';
import type { ApiError } from '@/shared/types/error.ts';

export const useRegisterMutation = () => {
  return useMutation<RegisterResponse, AxiosError<ApiError>, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
  });
};
