import React, { type Dispatch, type SetStateAction } from 'react';

import type {
  AccountResponse,
  AccountsModalState,
  DeleteAccountState,
} from '@/features/accounts/types/accounts.types.ts';
import EmptyError from '@/shared/components/empty-error.tsx';

import CardAccount from './card-account';

type PropsType = {
  accounts: AccountResponse[];
  onDelete: Dispatch<SetStateAction<DeleteAccountState>>;
  setOnEdit: Dispatch<SetStateAction<AccountsModalState>>;
};

const CardsAccounts: React.FC<PropsType> = ({ accounts, onDelete, setOnEdit }) => {
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
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {accounts.map((account) => (
        <CardAccount key={account.id} account={account} onDelete={onDelete} setOnEdit={setOnEdit} />
      ))}
    </div>
  );
};

export default React.memo(CardsAccounts);
