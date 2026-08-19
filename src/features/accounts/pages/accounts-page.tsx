import React from 'react';

import CardsAccounts from '@/features/accounts/components/cards-accounts.tsx';
import PageHeader from '@/shared/components/page-header.tsx';

const AccountsPage = () => {
  return (
    <div>
      <PageHeader total={323} title="Account" description="Total balance" />
      <CardsAccounts />
    </div>
  );
};

export default React.memo(AccountsPage);
