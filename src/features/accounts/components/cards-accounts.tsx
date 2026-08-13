import React from 'react';

import CardAccount from '@/features/accounts/components/card-account.tsx';
import type { Account } from '@/features/accounts/types/accounts.types.ts';

const dataCards: Account[] = [
  {
    title: 'Checking account',
    wallet: 'CardAccount',
    amount: 27134,
    startCount: 2300,
    transactions: 63,
    type: 'default',
  },
  {
    title: 'Checking account',
    wallet: 'Cash',
    amount: 32333,
    startCount: 2300,
    transactions: 63,
    type: 'income',
  },
  {
    title: 'Checking account',
    wallet: 'Savings',
    amount: 14435,
    startCount: 2300,
    transactions: 63,
    type: 'expense',
  },
];

const CardsAccounts = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {dataCards.map((account, index) => (
        <CardAccount key={index} account={account} />
      ))}
    </div>
  );
};

export default React.memo(CardsAccounts);
