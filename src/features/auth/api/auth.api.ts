import { apiClient } from '@/shared/api/client.ts';
import { endpoints } from '@/shared/api/endpoints.ts';

import type {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  RegisterRequest,
  User,
} from '../types/auth.types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(endpoints.LOGIN, data);

  return response.data;
};

export const refreshSession = async (): Promise<RefreshResponse> => {
  const response = await apiClient.post<RefreshResponse>(endpoints.REFRESH);

  return response.data;
};

export const register = async (data: RegisterRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(endpoints.REGISTER, data);

  return response.data;
};

export const logout = async () => {
  await apiClient.post(endpoints.LOGOUT);
};

export const getMe = async (accessToken: string) => {
  const response = await apiClient.get<User>(endpoints.ME, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
