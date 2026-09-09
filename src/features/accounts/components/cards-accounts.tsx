import React, { type Dispatch, type SetStateAction } from 'react';

import type {
  AccountResponse,
  DeleteAccountState,
} from '@/features/accounts/types/accounts.types.ts';
import EmptyError from '@/shared/components/empty-error.tsx';

import CardAccount from './card-account';

type PropsType = {
  accounts: AccountResponse[];
  onDelete: Dispatch<SetStateAction<DeleteAccountState>>;
};

const CardsAccounts: React.FC<PropsType> = ({ accounts, onDelete }) => {
  if (!accounts?.length) {
    return (
      <EmptyError
        title="No accounts yet"
        description="You don't have any accounts yet."
        variant="empty"
      />
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {accounts.map((account) => (
        <CardAccount key={account.id} account={account} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default React.memo(CardsAccounts);
