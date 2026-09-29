import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { transactionsApi } from '@/features/transactions/api/transactions.api.ts';
import type {
  TransactionRequest,
  TransactionsResponse,
} from '@/features/transactions/types/transaction.types.ts';
import { queryClient } from '@/shared/api/client.ts';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';
import type { ApiError } from '@/shared/types/error.ts';

export const useTransactionsMutation = () => {
  return useMutation<TransactionsResponse, AxiosError<ApiError>, TransactionRequest>({
    mutationFn: (data: TransactionRequest) => transactionsApi.createTransaction(data),
    onSuccess: async () => {
      toast.success('Transaction created successfully');
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error: AxiosError<{ error?: { message?: string } }>) => {
      toast.error('Failed to create transaction', {
        description: getApiErrorMessage(error.response?.data?.error?.message),
      });
    },
  });
};

export const useUpdateTransactionMutation = () => {
  return useMutation<
    TransactionsResponse,
    AxiosError<ApiError>,
    { id: string; value: TransactionRequest }
  >({
    mutationFn: ({ id, value }) => transactionsApi.updateTransaction(id, value),
    onSuccess: async () => {
      toast.success('Transaction updated successfully');
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error: AxiosError<{ error?: { message?: string } }>) => {
      toast.error('Failed to updated transaction', {
        description: getApiErrorMessage(error.response?.data?.error?.message),
      });
    },
  });
};
