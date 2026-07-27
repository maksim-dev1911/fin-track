import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { register } from '@/features/auth/api/auth.api.ts';
import type { RegisterRequest, RegisterResponse } from '@/features/auth/types/auth.types.ts';
import type { ApiError } from '@/types/error.ts';

export const useRegisterMutation = () => {
  return useMutation<RegisterResponse, AxiosError<ApiError>, RegisterRequest>({
    mutationFn: register,
  });
};
