import React from 'react';

import type { TransactionsResponse } from '@/features/transactions/types/transaction.types.ts';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';

type PropsType = {
  transactions?: TransactionsResponse;
};

const TransactionsSummary: React.FC<PropsType> = ({ transactions }) => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1 text-xs">
      <div className="text-muted-foreground">
        Income:{' '}
        <span className="font-semibold text-emerald-600">
          {formatTransactionAmount(transactions?.summary.income ?? 0, 'income')}
        </span>
      </div>
      <div className="text-muted-foreground">
        Expenses:{' '}
        <span className="font-semibold text-rose-500">
          {formatTransactionAmount(transactions?.summary.expense ?? 0, 'expense')}
        </span>
      </div>
      <div className="text-muted-foreground">
        Found:{' '}
        <span className="font-semibold text-slate-900 dark:text-white">
          {transactions?.data.length ?? 0}
        </span>
      </div>
    </div>
  );
};

export default React.memo(TransactionsSummary);
