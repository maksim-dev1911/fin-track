export type Transaction = {
  description: string;
  type: 'income' | 'expense';
  categoryId: string;
  categoryName: string;
  accountId: string;
  occurredAt: string;
  accountName: string;
  amount: number;
};
