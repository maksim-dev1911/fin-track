export type Category = {
  type: 'income' | 'expense' | 'default';
  title: string;
  count: number;
  balance: number;
  id: number;
};
