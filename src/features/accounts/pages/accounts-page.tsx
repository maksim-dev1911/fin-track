import React, { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import AccountsModal from '@/features/accounts/components/accounts-modal.tsx';
import CardsAccounts from '@/features/accounts/components/cards-accounts.tsx';
import { useAccountsQuery } from '@/features/accounts/hooks/use-accounts-query.ts';
import type { AccountsModalState } from '@/features/accounts/types/accounts.types.ts';
import PageHeader from '@/shared/components/page-header.tsx';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';

const AccountsPage = () => {
  const [createModal, setCreateModal] = useState<AccountsModalState>(null);

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
      <AccountsModal setOpenModal={setCreateModal} stateModal={createModal} />
      <PageHeader
        total={formatTransactionAmount(totalBalance, 'default')}
        title="Account"
        description="Total balance"
        setOpenModal={() => setCreateModal({ mode: 'create' })}
      />
      <CardsAccounts accounts={accounts} />
    </div>
  );
};

export default React.memo(AccountsPage);
