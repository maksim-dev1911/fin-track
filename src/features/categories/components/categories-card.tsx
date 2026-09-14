import React, { type Dispatch, type SetStateAction } from 'react';

import { Card } from '@/components/ui/card.tsx';
import type {
  CategoryDeleteModalState,
  CategoryModalState,
  CategoryResponse,
} from '@/features/categories/types/categories.types.ts';
import type { AnalyticResponse } from '@/features/dashboard/types/analytics.types.ts';
import { cn } from '@/shared/lib/utils';

import CategoriesRow from './categories-row';

type PropsType = {
  variant: 'Income' | 'Expense';
  categories: CategoryResponse[];
  analytics: AnalyticResponse[];
  onEdit: Dispatch<SetStateAction<CategoryModalState>>;
  onDelete: Dispatch<SetStateAction<CategoryDeleteModalState>>;
};

const CategoriesCard: React.FC<PropsType> = ({
  categories,
  variant,
  analytics,
  onEdit,
  onDelete,
}) => {
  const visibleCategories = categories.filter((c) => c.type === variant.toLowerCase());

  return (
    <Card className="gap-0 p-0">
      <div className="flex items-center gap-2 px-5 py-4">
        <div
          className={cn(
            'h-[9px] w-[9px] rounded-full',
            variant === 'Income' ? 'bg-income' : 'bg-expense',
          )}
        ></div>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">{variant}</h2>
          <p className="text-muted-foreground text-xs">{visibleCategories.length}</p>
        </div>
      </div>
      {visibleCategories.map((category) => (
        <CategoriesRow
          category={category}
          key={category.id}
          analytics={analytics}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Card>
  );
};

export default React.memo(CategoriesCard);
