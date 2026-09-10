import React, { type Dispatch, type SetStateAction } from 'react';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator.tsx';
import type {
  AccountResponse,
  DeleteAccountState,
} from '@/features/accounts/types/accounts.types.ts';
import ItemActions from '@/shared/components/item-actions';
import { formatTransactionAmount } from '@/shared/lib/format-money';
import { getInitials } from '@/shared/lib/get-initials.ts';

type PropsType = {
  account: AccountResponse;
  onDelete: Dispatch<SetStateAction<DeleteAccountState>>;
};

const CardAccount: React.FC<PropsType> = ({ account, onDelete }) => {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div className="bg-primary/10 flex h-[42px] w-[42px] items-center justify-center rounded-lg">
          <p className="text-primary text-base font-semibold">{getInitials(account.name)}</p>
        </div>
        <ItemActions onDelete={() => onDelete({ open: true, accountId: account.id })} />
      </div>
      <div>
        <h2 className="text-base font-semibold">{account.name}</h2>
        <p className="text-muted-foreground bg-muted-foreground/10 mt-1.5 w-fit rounded-md px-2 py-0.5 text-xs font-medium">
          {account.type}
        </p>
      </div>
      <p className="text-xl font-semibold">
        {formatTransactionAmount(account.currentBalance, 'default')}
      </p>
      <Separator className="h-px" />
      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <p>Starting: {formatTransactionAmount(account.startingBalance, 'default')}</p>
      </div>
    </Card>
  );
};

export default React.memo(CardAccount);
