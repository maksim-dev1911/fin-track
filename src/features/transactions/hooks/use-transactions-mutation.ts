import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { transactionsApi } from '@/features/transactions/api/transactions.api.ts';
import type {
  TransactionRequest,
  TransactionsResponse,
} from '@/features/transactions/types/transaction.types.ts';
import { queryClient } from '@/shared/api/client.ts';
import type { ApiError } from '@/shared/types/error.ts';

export const useTransactionsMutation = () => {
  return useMutation<TransactionsResponse, AxiosError<ApiError>, TransactionRequest>({
    mutationFn: transactionsApi.createTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};
