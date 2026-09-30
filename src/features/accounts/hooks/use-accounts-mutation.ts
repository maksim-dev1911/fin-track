import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { accountsApi } from '@/features/accounts/api/accounts.api.ts';
import type { AccountRequest, AccountResponse } from '@/features/accounts/types/accounts.types.ts';
import { queryClient } from '@/shared/api/client.ts';
import { handleMutationError } from '@/shared/lib/handle-mutation-error.ts';
import type { ApiError } from '@/shared/types/error.ts';

export const useAccountsMutation = () => {
  return useMutation<AccountResponse, AxiosError<ApiError>, AccountRequest>({
    mutationFn: (data: AccountRequest) => accountsApi.createAccount(data),
    onSuccess: async () => {
      toast.success('Account created successfully');
      await queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: (error: AxiosError<{ error?: { message?: string } }>) => {
      handleMutationError({ error, fallbackTitle: 'Failed to create account' });
    },
  });
};

export const useUpdateAccountMutation = () => {
  return useMutation<AccountResponse, AxiosError<ApiError>, { id: string; value: AccountRequest }>({
    mutationFn: ({ id, value }) => accountsApi.updateAccount(id, value),
    onSuccess: async () => {
      toast.success('Account updated successfully');
      await queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: (error: AxiosError<{ error?: { message?: string } }>) => {
      handleMutationError({ error, fallbackTitle: 'Failed to updated account' });
    },
  });
};
