import type { TransactionType } from '@/features/transactions/types/transaction.types.ts';

export type AccountResponse = {
  id: string;
  name: string;
  startingBalance: number;
  type: TransactionType;
  currentBalance: number;
  createdAt: string;
};
