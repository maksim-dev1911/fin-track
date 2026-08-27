import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  type GetTransactionsParams,
  transactionsApi,
} from '@/features/transactions/api/transactions.api.ts';

export const useTransactionsQuery = (params: GetTransactionsParams) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionsApi.getTransactions(params),
    placeholderData: keepPreviousData,
  });
};
