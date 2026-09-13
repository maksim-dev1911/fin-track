export type CategoriesResponse = {
  type: 'income' | 'expense' | 'default';
  color: string;
  createdAt: string;
  id: string;
  name: string;
};
