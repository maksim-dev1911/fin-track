import React from 'react';

import type { Transaction } from '@/features/transactions/types/transaction.types';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';
import { cn } from '@/shared/lib/utils.ts';

type PropsType = {
  transaction: Transaction;
};

const RecentTransactionItem: React.FC<PropsType> = ({ transaction }) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 py-2">
      <div className="flex items-center gap-4">
        <div
          className="h-2.5 w-2.5 rounded-[5px]"
          style={{ backgroundColor: transaction.category.color }}
        ></div>
        <div>
          <h2 className="text-sm font-medium">{transaction.category.name}</h2>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-xs">{transaction.account.name}</p>
            <p className="text-muted-foreground text-xs">
              {new Date(`${transaction.date}T00:00:00`).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
      <p
        className={cn(
          'text-sm font-semibold',
          transaction.type === 'income' ? 'text-income' : 'text-expense',
        )}
      >
        {formatTransactionAmount(transaction.amount, transaction.type)}
      </p>
    </div>
  );
};

export default React.memo(RecentTransactionItem);
