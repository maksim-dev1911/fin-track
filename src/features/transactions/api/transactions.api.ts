import type {
  TransactionRequest,
  TransactionsResponse,
} from '@/features/transactions/types/transaction.types.ts';
import { apiClient } from '@/shared/api/client.ts';
import { endpoints } from '@/shared/api/endpoints';

export interface GetTransactionsParams {
  page?: number;
  limit?: number;
  type?: 'income' | 'expense';
  categoryId?: string;
  accountId?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: string;
}

export const getTransactions = async (params: GetTransactionsParams) => {
  const response = await apiClient.get<TransactionsResponse>(endpoints.TRANSACTION, { params });

  return response.data;
};

export const createTransaction = async (value: TransactionRequest) => {
  const response = await apiClient.post<TransactionsResponse>(endpoints.TRANSACTION, value);

  return response.data;
};
