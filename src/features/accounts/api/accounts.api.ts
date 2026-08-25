import type { AccountResponse } from '@/features/accounts/types/accounts.types.ts';
import { apiClient } from '@/shared/api/client';
import { endpoints } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/api/types.ts';

export const getAccounts = async () => {
  const response = await apiClient.get<ApiResponse<AccountResponse[]>>(endpoints.ACCOUNT);

  return response.data.data;
};
