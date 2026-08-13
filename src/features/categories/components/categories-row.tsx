import React from 'react';

import type { Category } from '@/features/categories/types/categories.types.ts';
import ItemActions from '@/shared/components/item-actions.tsx';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';

type PropsType = {
  category: Category;
};

const CategoriesRow: React.FC<PropsType> = ({ category }) => {
  return (
    <div className="hover:bg-muted-foreground/10 flex items-center justify-between border-t px-5 py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="h-[12px] w-[12px] rounded-full bg-amber-700"></div>
        <div>
          <h2 className="text-sm font-medium">{category.title}</h2>
          <h2 className="text-muted-foreground text-xs">{category.count} transactions</h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-muted-foreground text-sm">
          {formatTransactionAmount(category.balance, 'default')}
        </p>
        <ItemActions />
      </div>
    </div>
  );
};

export default React.memo(CategoriesRow);
