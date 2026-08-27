import type { AccountResponse } from '@/features/accounts/types/accounts.types.ts';
import { apiClient } from '@/shared/api/client';
import { endpoints } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/api/types.ts';

class AccountsApi {
  private readonly client: typeof apiClient;

  constructor(client: typeof apiClient) {
    this.client = client;
  }

  async getAccounts() {
    const response = await this.client.get<ApiResponse<AccountResponse[]>>(endpoints.ACCOUNT);

    return response.data.data;
  }
}

export const accountsApi = new AccountsApi(apiClient);

export const getAccounts = async () => {
  const response = await apiClient.get<ApiResponse<AccountResponse[]>>(endpoints.ACCOUNT);

  return response.data.data;
};
