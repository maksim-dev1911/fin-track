import React from 'react';

import { cn } from '@/shared/lib/utils.ts';

type PropsType = {
  type: 'income' | 'expenses';
};

const RecentTransactionItem: React.FC<PropsType> = ({ type }) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 py-2">
      <div className="flex items-center gap-4">
        <div className="bg-primary h-2.5 w-2.5 rounded-[5px]"></div>
        <div>
          <h2 className="text-sm font-medium">Freelance</h2>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-xs">Checking account</p>
            <p className="text-muted-foreground text-xs">Jul 4, 2026</p>
          </div>
        </div>
      </div>
      <p
        className={cn('text-sm font-semibold', type === 'income' ? 'text-income' : 'text-expense')}
      >
        {type === 'income' ? '+' : '-'}$1,230
      </p>
    </div>
  );
};

export default React.memo(RecentTransactionItem);
