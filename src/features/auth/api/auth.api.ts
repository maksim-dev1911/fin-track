import { apiClient } from '@/shared/api/client.ts';
import { endpoints } from '@/shared/api/endpoints.ts';

import type {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  RegisterRequest,
  User,
} from '../types/auth.types';

class AuthApi {
  private readonly client: typeof apiClient;

  constructor(client: typeof apiClient) {
    this.client = client;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>(endpoints.LOGIN, data);

    return response.data;
  }

  async refreshSession(): Promise<RefreshResponse> {
    const response = await this.client.post<RefreshResponse>(endpoints.REFRESH);

    return response.data;
  }

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>(endpoints.REGISTER, data);

    return response.data;
  }

  async logout(): Promise<void> {
    await this.client.post(endpoints.LOGOUT);
  }

  async getMe(accessToken: string): Promise<User> {
    const response = await this.client.get<User>(endpoints.ME, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }
}

export const authApi = new AuthApi(apiClient);
