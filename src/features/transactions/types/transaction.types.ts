export type TransactionType = 'income' | 'expense';

export interface TransactionAccount {
  id: string;
  name: string;
  amount: number;
}

export interface TransactionCategory {
  id: string;
  name: string;
  color: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  note: string;
  createdAt: string;
  account: TransactionAccount;
  category: TransactionCategory;
}

export interface TransactionsPaginationType {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TransactionsSummary {
  income: number;
  expense: number;
  net: number;
}

export interface TransactionsResponse {
  data: Transaction[];
  pagination: TransactionsPaginationType;
  summary: TransactionsSummary;
}

export interface TransactionRequest {
  id?: string;
  type: TransactionType;
  amount: number;
  date: string;
  note: string;
  accountId: string;
  categoryId: string;
}

export type TransactionModalState =
  { mode: 'create' } | { mode: 'edit'; transaction: Transaction } | null;

export type TransactionDeleteState = {
  open: boolean;
  id?: string;
} | null;
