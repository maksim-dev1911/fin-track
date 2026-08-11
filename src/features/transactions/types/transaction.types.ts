export type Transaction = {
  description?: string;
  type?: 'Income' | 'Expense';
  categoryId?: string;
  categoryName?: string;
  accountId?: string;
  dateFrom?: string;
  dateTo?: string;
  accountName?: string;
  amount?: number;
};
