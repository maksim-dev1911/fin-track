import type { AccountRequest, AccountResponse } from '@/features/accounts/types/accounts.types.ts';
import { BaseApi } from '@/shared/api/base.api.ts';
import { apiClient } from '@/shared/api/client';
import { endpoints } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/api/types.ts';

class AccountsApi extends BaseApi {
  constructor(client: typeof apiClient) {
    super(client);
  }

  async getAccounts() {
    const response = await this.client.get<ApiResponse<AccountResponse[]>>(endpoints.ACCOUNT);

    return response.data.data;
  }

  async createAccount(data: AccountRequest) {
    const response = await this.client.post<ApiResponse<AccountResponse>>(endpoints.ACCOUNT, data);

    return response.data.data;
  }

  async deleteAccount(id: string): Promise<void> {
    await this.client.delete(`${endpoints.ACCOUNT}/${id}`);
  }

  async updateAccount(id: string, value: AccountRequest) {
    const response = await this.client.patch<ApiResponse<AccountResponse>>(
      `${endpoints.ACCOUNT}/${id}`,
      value,
    );
    return response.data.data;
  }
}

export const accountsApi = new AccountsApi(apiClient);
