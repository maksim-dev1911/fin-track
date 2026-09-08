import React, { useEffect } from 'react';

import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import CardsAccounts from '@/features/accounts/components/cards-accounts.tsx';
import { useAccountsQuery } from '@/features/accounts/hooks/use-accounts-query.ts';
import PageHeader from '@/shared/components/page-header.tsx';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';

const AccountsPage = () => {
  const { data: accounts = [], isLoading, isError } = useAccountsQuery();

  const totalBalance = accounts.reduce((sum, account) => sum + account.currentBalance, 0);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load accounts', {
        description: getApiErrorMessage(),
      });
    }
  }, [isError]);

  if (isLoading) {
    return <Spinner className="size-10" />;
  }

  return (
    <div>
      <PageHeader
        total={formatTransactionAmount(totalBalance, 'default')}
        title="Account"
        description="Total balance"
        setOpenModal={() => {}}
      />
      <CardsAccounts accounts={accounts} />
    </div>
  );
};

export default React.memo(AccountsPage);
