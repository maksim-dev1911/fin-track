import React from 'react';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';
import { cn } from '@/shared/lib/utils.ts';

import type { Transaction } from '../../types/transaction.types';

type PropsType = {
  transaction: Transaction;
};

const TransactionRow: React.FC<PropsType> = ({ transaction }) => {
  return (
    <TableRow className="bg-white">
      <TableCell>
        <p className="font-semibold">{transaction.category.name}</p>
        <p className="text-muted-foreground text-xs">{transaction.note}</p>
      </TableCell>

      <TableCell>
        <p className="text-muted-foreground">{transaction.account.name}</p>
      </TableCell>

      <TableCell>
        <p className="text-muted-foreground">
          {new Date(`${transaction.date}T00:00:00`).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </TableCell>

      <TableCell>
        <span
          className={cn(
            'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
            transaction.type === 'income'
              ? 'bg-income/10 text-income'
              : 'bg-expense/10 text-expense',
          )}
        >
          {transaction.type}
        </span>
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-end gap-2">
          <p
            className={cn(
              'text-sm font-semibold',
              transaction.type === 'income' ? 'text-income' : 'text-expense',
            )}
          >
            {formatTransactionAmount(transaction.amount, transaction.type)}
          </p>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(TransactionRow);
