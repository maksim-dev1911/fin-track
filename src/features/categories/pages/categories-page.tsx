import React from 'react';

import CategoriesCard from '@/features/categories/components/categories-card.tsx';
import type { Categories } from '@/features/categories/types/categories.types.ts';
import PageHeader from '@/shared/components/page-header.tsx';

const items: Categories[] = [
  { type: 'expense', title: 'Groceries', count: 43, balance: 323232 },
  {
    type: 'expense',
    title: 'Groceries',
    count: 43,
    balance: 323232,
  },
  { type: 'expense', title: 'Groceries', count: 43, balance: 323232 },
  {
    type: 'expense',
    title: 'Groceries',
    count: 43,
    balance: 323232,
  },
  { type: 'expense', title: 'Groceries', count: 43, balance: 323232 },
  {
    type: 'expense',
    title: 'Groceries',
    count: 43,
    balance: 323232,
  },
  { type: 'expense', title: 'Groceries', count: 43, balance: 323232 },
  {
    type: 'expense',
    title: 'Groceries',
    count: 43,
    balance: 323232,
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
