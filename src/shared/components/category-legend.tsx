import React from 'react';

import { formatTransactionAmount } from '@/shared/lib/format-money.ts';

type CategoryLegendItem = {
  color: string;
  name: string;
  percent: string;
  amount: number;
};

type CategoryLegendProps = {
  items: CategoryLegendItem[];
};

const CategoryLegend = ({ items }: CategoryLegendProps) => {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        return (
          <div key={item.name} className="grid grid-cols-[1fr_48px_72px] items-center gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <span className="text-sm font-medium">{item.name}</span>
            </div>

            <span className="text-muted-foreground text-right text-sm">{item.percent}</span>

            <span className="text-right text-sm font-semibold">
              {formatTransactionAmount(item.amount, 'default')}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(CategoryLegend);
