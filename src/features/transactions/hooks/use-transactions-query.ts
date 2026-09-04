import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { transactionsApi } from '@/features/transactions/api/transactions.api.ts';
import type { TransactionFiltersState } from '@/features/transactions/types/transaction.types.ts';

export const useTransactionsQuery = (params: TransactionFiltersState) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionsApi.getTransactions(params),
    placeholderData: keepPreviousData,
  });
};
