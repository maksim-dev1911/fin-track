import React, { type Dispatch, type SetStateAction } from 'react';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import type {
  Transaction,
  TransactionDeleteState,
  TransactionModalState,
} from '@/features/transactions/types/transaction.types.ts';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';
import { cn } from '@/shared/lib/utils.ts';

type PropsType = {
  transaction: Transaction;
  onEdit: Dispatch<SetStateAction<TransactionModalState>>;
  onOpenDeleteModal: Dispatch<SetStateAction<TransactionDeleteState>>;
};

const TransactionMobileRow: React.FC<PropsType> = ({ transaction, onEdit, onOpenDeleteModal }) => {
  const transactionType = transaction.type[0].toUpperCase() + transaction.type.slice(1);

  return (
    <div
      onClick={() => onEdit({ mode: 'edit', transaction: transaction })}
      className="border-border/50 bg-card active:bg-muted/50 flex cursor-pointer items-center justify-between border-b p-4 transition-colors last:border-b-0"
    >
      <div className="flex items-center gap-3">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: transaction.category.color }}
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{transaction.category.name}</p>
            <span
              className={cn(
                'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
                transaction.type === 'income'
                  ? 'bg-income/10 text-income'
                  : 'bg-expense/10 text-expense',
              )}
            >
              {transactionType}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <p className="text-muted-foreground text-xs">{transaction.account.name}</p> -
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

      <div className="flex items-center justify-end gap-2">
        <p
          className={cn(
            'text-sm font-semibold',
            transaction.type === 'income' ? 'text-income' : 'text-expense',
          )}
        >
          {formatTransactionAmount(transaction.amount, transaction.type)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDeleteModal({ open: true, id: transaction.id });
          }}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(TransactionMobileRow);
