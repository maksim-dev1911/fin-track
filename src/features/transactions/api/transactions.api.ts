import type {
  TransactionFiltersState,
  TransactionRequest,
  TransactionsResponse,
} from '@/features/transactions/types/transaction.types.ts';
import { apiClient } from '@/shared/api/client.ts';
import { endpoints } from '@/shared/api/endpoints';

class TransactionsApi {
  private readonly client: typeof apiClient;

  constructor(client: typeof apiClient) {
    this.client = client;
  }

  async getTransactions(params: TransactionFiltersState) {
    const response = await this.client.get<TransactionsResponse>(endpoints.TRANSACTION, { params });

    return response.data;
  }

  async createTransaction(value: TransactionRequest) {
    const response = await this.client.post<TransactionsResponse>(endpoints.TRANSACTION, value);

    return response.data;
  }

  async updateTransaction(id: string, value: TransactionRequest) {
    const response = await this.client.patch<TransactionsResponse>(
      `${endpoints.TRANSACTION}/${id}`,
      value,
    );

    return response.data;
  }

  async deleteTransaction(id: string) {
    const response = await this.client.delete(`${endpoints.TRANSACTION}/${id}`);

    return response.data;
  }
}

export const transactionsApi = new TransactionsApi(apiClient);
