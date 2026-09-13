export type CategoryResponse = {
  type: 'income' | 'expense';
  color: string;
  createdAt: string;
  id: string;
  name: string;
};

export type CategoryRequest = {
  name: string;
  type: 'income' | 'expense';
  color: string;
};

export type CategoryModalState =
  { mode: 'create' } | { mode: 'edit'; category: CategoryResponse } | null;
