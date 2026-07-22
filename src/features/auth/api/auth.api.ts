import { apiClient } from '@/shared/api/client.ts';

import type { LoginRequest, LoginResponse } from '../types/auth.types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', data);

  return response.data;
};
