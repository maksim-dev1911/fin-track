import type { LoginRequest } from '@/features/auth/api/auth.types.ts';
import { apiClient } from '@/shared/api/client.ts';

export const login = async (data: LoginRequest) => {
  const response = await apiClient.post('/auth/login', data);

  return response.data;
};
