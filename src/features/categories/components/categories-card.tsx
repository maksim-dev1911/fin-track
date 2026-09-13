import React from 'react';

import { Card } from '@/components/ui/card.tsx';
import type { CategoriesResponse } from '@/features/categories/types/categories.types.ts';
import { cn } from '@/shared/lib/utils';

import CategoriesRow from './categories-row';

type PropsType = {
  variant: 'Income' | 'Expense';
  categories: CategoriesResponse[];
};

const CategoriesCard: React.FC<PropsType> = ({ categories, variant }) => {
  const categoryLength = categories.filter((c) => c.type === variant.toLowerCase());

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
          <p className="text-muted-foreground text-xs">{categoryLength.length}</p>
        </div>
      </div>
      {categories
        .filter((category) => category.type === variant.toLowerCase())
        .map((category) => (
          <CategoriesRow category={category} key={category.id} />
        ))}
    </Card>
  );
};

export default React.memo(CategoriesCard);
