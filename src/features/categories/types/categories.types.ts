export type CategoryResponse = {
  type: 'income' | 'expense' | 'default';
  color: string;
  createdAt: string;
  id: string;
  name: string;
};
