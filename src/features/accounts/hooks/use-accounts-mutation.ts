import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { accountsApi } from '@/features/accounts/api/accounts.api.ts';
import type { AccountRequest, AccountResponse } from '@/features/accounts/types/accounts.types.ts';
import { queryClient } from '@/shared/api/client.ts';
import type { ApiError } from '@/shared/types/error.ts';

export const useAccountsMutation = () => {
  return useMutation<AccountResponse, AxiosError<ApiError>, AccountRequest>({
    mutationFn: (data: AccountRequest) => accountsApi.createAccount(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

export const useDeleteAccountMutation = () => {
  return useMutation<void, AxiosError<ApiError>, string>({
    mutationFn: (id: string) => accountsApi.deleteAccount(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};
