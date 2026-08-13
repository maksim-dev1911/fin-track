import React from 'react';

import { Card } from '@/components/ui/card.tsx';
import CategoriesRow from '@/features/categories/components/categories-row.tsx';
import type { Categories } from '@/features/categories/types/categories.types.ts';
import { cn } from '@/shared/lib/utils.ts';

type PropsType = {
  categories: Categories[];
  variant: 'Income' | 'Expense';
};

const CategoriesCard: React.FC<PropsType> = ({ categories, variant }) => {
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
          <p className="text-muted-foreground text-xs">{categories.length}</p>
        </div>
      </div>
      {categories.map((category, index) => (
        <CategoriesRow category={category} key={index} />
      ))}
    </Card>
  );
};

export default React.memo(CategoriesCard);
