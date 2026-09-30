import React, { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import { accountsApi } from '@/features/accounts/api/accounts.api.ts';
import AccountsModal from '@/features/accounts/components/accounts-modal.tsx';
import CardsAccounts from '@/features/accounts/components/cards-accounts.tsx';
import { useAccountsQuery } from '@/features/accounts/hooks/use-accounts-query.ts';
import type {
  AccountsModalState,
  DeleteAccountState,
} from '@/features/accounts/types/accounts.types.ts';
import AlertModal from '@/shared/components/alert-modal.tsx';
import PageHeader from '@/shared/components/page-header.tsx';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';
import { useDelete } from '@/shared/lib/use-delete.ts';

const AccountsPage = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState<DeleteAccountState>(null);
  const [accountModal, setAccountModal] = useState<AccountsModalState>(null);
  const [transactionError, setTransactionError] = useState<string | null>(null);

  const { data: accounts = [], isLoading, isError } = useAccountsQuery();

  const handleDeleteAccount = useDelete({
    mutationFn: (id: string) => accountsApi.deleteAccount(id),
    invalidatedQueryKey: ['accounts'],
    successMessage: 'Account deleted successfully',
    errorMessage: 'Failed to delete the account',
    onSuccess: () => setOpenDeleteModal(null),
    onError: (error) => {
      if (error.response?.status === 409) {
        const message =
          error.response?.data?.error?.message ?? 'This account still has transactions.';
        setTransactionError(message);
        setOpenDeleteModal(null);
      }
    },
  });

  const handleCloseDeleteModal = (open: boolean) => setOpenDeleteModal({ open });

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
        setOpenModal={() => setAccountModal({ mode: 'create' })}
      />
      {transactionError && (
        <AlertModal
          variant="warning"
          open={!!transactionError}
          setClose={() => setTransactionError(null)}
          title="Can’t delete this account"
          description={transactionError}
        />
      )}
      {openDeleteModal?.open && (
        <AlertModal
          onDelete={(id) => {
            if (id) handleDeleteAccount.mutate(id);
          }}
          open={openDeleteModal.open}
          id={openDeleteModal.accountId}
          setClose={handleCloseDeleteModal}
          isPending={handleDeleteAccount.isPending}
          variant="delete"
          title="Delete account?"
          description="This action can’t be undone. Balances and analytics will be recalculated."
        />
      )}
      {accountModal && <AccountsModal setOpenModal={setAccountModal} stateModal={accountModal} />}
      <CardsAccounts
        accounts={accounts}
        onDelete={setOpenDeleteModal}
        setOnEdit={setAccountModal}
      />
    </div>
  );
};

export default React.memo(AccountsPage);
