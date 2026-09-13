import React from 'react';

import type { CategoryResponse } from '@/features/categories/types/categories.types.ts';
import ItemActions from '@/shared/components/item-actions.tsx';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';

type PropsType = {
  category: CategoryResponse & {
    transactionsCount: number;
    totalAmount: number;
  };
};

const CategoriesRow: React.FC<PropsType> = ({ category }) => {
  return (
    <div className="hover:bg-muted-foreground/10 flex items-center justify-between border-t px-5 py-4">
      <div className="flex items-center justify-between gap-2">
        <div
          className="h-[12px] w-[12px] rounded-full"
          style={{ backgroundColor: category.color }}
        ></div>
        <div>
          <h2 className="text-sm font-medium">{category.name}</h2>
          <h2 className="text-muted-foreground text-xs">
            {category.transactionsCount} transactions
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-muted-foreground text-sm">
          {formatTransactionAmount(category.totalAmount, 'default')}
        </p>
        <ItemActions onEdit={() => {}} onDelete={() => {}} />
      </div>
    </div>
  );
};

export default React.memo(CategoriesRow);
