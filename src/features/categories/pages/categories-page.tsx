import React from 'react';

import CategoriesCard from '@/features/categories/components/categories-card.tsx';
import type { Category } from '@/features/categories/types/categories.types.ts';
import PageHeader from '@/shared/components/page-header.tsx';

const items: Category[] = [
  { type: 'expense', title: 'Groceries', count: 43, balance: 323232, id: 7 },
  {
    type: 'expense',
    title: 'Groceries',
    count: 43,
    balance: 323232,
    id: 6,
  },
  { type: 'expense', title: 'Groceries', count: 43, balance: 323232, id: 5 },
  {
    type: 'expense',
    title: 'Groceries',
    count: 43,
    balance: 323232,
    id: 4,
  },
  { type: 'expense', title: 'Groceries', count: 43, balance: 323232, id: 1 },
  {
    type: 'expense',
    title: 'Groceries',
    count: 43,
    balance: 323232,
    id: 8,
  },
  { type: 'expense', title: 'Groceries', count: 43, balance: 323232, id: 2 },
  {
    type: 'expense',
    title: 'Groceries',
    count: 43,
    balance: 323232,
    id: 3,
  },
];

const CategoriesPage = () => {
  return (
    <div>
      <PageHeader total="11" title="Category" description="Categories" />
      <div className="grid grid-cols-2 gap-5">
        <CategoriesCard categories={items} variant="Expense" />
        <CategoriesCard categories={items} variant="Income" />
      </div>
    </div>
  );
};

export default React.memo(CategoriesPage);
