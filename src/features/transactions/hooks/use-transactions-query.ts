import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  getTransactions,
  type GetTransactionsParams,
} from '@/features/transactions/api/transactions.api.ts';

export const useTransactionsQuery = (params: GetTransactionsParams) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => getTransactions(params),
    placeholderData: keepPreviousData,
  });
};
