import React, { type Dispatch, type SetStateAction } from 'react';

import type {
  CategoryDeleteModalState,
  CategoryModalState,
  CategoryResponse,
} from '@/features/categories/types/categories.types.ts';
import type { AnalyticResponse } from '@/features/dashboard/types/analytics.types.ts';
import ItemActions from '@/shared/components/item-actions.tsx';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';

type PropsType = {
  category: CategoryResponse;
  analytics: AnalyticResponse[];
  onEdit: Dispatch<SetStateAction<CategoryModalState>>;
  onDelete: Dispatch<SetStateAction<CategoryDeleteModalState>>;
};

const CategoriesRow: React.FC<PropsType> = ({ category, analytics, onEdit, onDelete }) => {
  const currentAnalytic = analytics.find((a) => a.categoryId === category.id);
  const totalAmount = currentAnalytic ? currentAnalytic.total : 0;

  return (
    <div className="hover:bg-muted-foreground/10 flex items-center justify-between border-t px-5 py-4">
      <div className="flex items-center justify-between gap-2">
        <div
          className="h-[12px] w-[12px] rounded-full"
          style={{ backgroundColor: category.color }}
        ></div>
        <div>
          <h2 className="text-sm font-medium">{category.name}</h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-muted-foreground text-sm">
          {formatTransactionAmount(totalAmount, 'default')}
        </p>
        <ItemActions
          onEdit={() => onEdit({ mode: 'edit', category: category })}
          onDelete={() => onDelete({ open: true, id: category.id })}
        />
      </div>
    </div>
  );
};

export default React.memo(CategoriesRow);
