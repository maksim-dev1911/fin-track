import React from 'react';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator.tsx';
import type { Account } from '@/features/accounts/types/accounts.types.ts';
import ItemActions from '@/shared/components/item-actions';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';
import { cn } from '@/shared/lib/utils.ts';

type PropsType = {
  account: Account;
};

const CardAccount: React.FC<PropsType> = ({ account }) => {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div className="bg-primary/10 flex h-[42px] w-[42px] items-center justify-center rounded-lg">
          <p className="text-primary text-base font-semibold">C</p>
        </div>
        <ItemActions />
      </div>
      <div>
        <h2 className="text-base font-semibold">{account.title}</h2>
        <p className="text-muted-foreground bg-muted-foreground/10 mt-1.5 w-fit rounded-md px-2 py-0.5 text-xs font-medium">
          {account.wallet}
        </p>
      </div>
      <p
        className={cn(
          'text-xl font-semibold',
          account.type === 'income' && 'text-income',
          account.type === 'expense' && 'text-expense',
        )}
      >
        {formatTransactionAmount(account.amount, account.type)}
      </p>
      <Separator className="h-px" />
      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <p>Starting: {formatTransactionAmount(account.startCount, 'default')}</p>
        <p>{account.transactions} transactions</p>
      </div>
    </Card>
  );
};

export default React.memo(CardAccount);
