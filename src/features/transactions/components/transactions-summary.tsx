import React from 'react';

import type { TransactionsResponse } from '@/features/transactions/types/transaction.types.ts';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';

type PropsType = {
  transactions: TransactionsResponse;
};

const TransactionsSummary: React.FC<PropsType> = ({ transactions }) => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1 text-xs">
      <div className="text-muted-foreground">
        Income:{' '}
        <span className="text-income font-semibold">
          {formatTransactionAmount(transactions?.summary.income, 'income')}
        </span>
      </div>
      <div className="text-muted-foreground">
        Expenses:{' '}
        <span className="text-expense font-semibold">
          {formatTransactionAmount(transactions?.summary.expense, 'expense')}
        </span>
      </div>
      <div className="text-muted-foreground">
        Found:{' '}
        <span className="font-semibold text-slate-900 dark:text-white">
          {transactions?.pagination.total}
        </span>
      </div>
    </div>
  );
};

export default React.memo(TransactionsSummary);
