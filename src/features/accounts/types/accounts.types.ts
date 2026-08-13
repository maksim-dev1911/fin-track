export type Account = {
  title: string;
  wallet: string;
  startCount: number;
  transactions: number;
  amount: number;
  type: 'income' | 'expense' | 'default';
};
