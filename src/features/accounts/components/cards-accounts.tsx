import React from 'react';

import type { AccountResponse } from '@/features/accounts/types/accounts.types.ts';

import CardAccount from './card-account';

type PropsType = {
  accounts: AccountResponse[];
};

const CardsAccounts: React.FC<PropsType> = ({ accounts }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {accounts.map((account) => (
        <CardAccount key={account.id} account={account} />
      ))}
    </div>
  );
};

export default React.memo(CardsAccounts);
