import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { TransactionFiltersState } from '@/features/transactions/types/transaction.types.ts';

import { transactionsApi } from '../api/transactions.api';

export const useTransactionsQuery = (params: TransactionFiltersState) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionsApi.getTransactions(params),
    placeholderData: keepPreviousData,
  });
};
