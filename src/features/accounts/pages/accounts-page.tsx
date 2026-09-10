import React, { useEffect, useState } from 'react';

import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import AccountsModal from '@/features/accounts/components/accounts-modal.tsx';
import CardsAccounts from '@/features/accounts/components/cards-accounts.tsx';
import { useDeleteAccountMutation } from '@/features/accounts/hooks/use-accounts-mutation.ts';
import { useAccountsQuery } from '@/features/accounts/hooks/use-accounts-query.ts';
import type {
  AccountsModalState,
  DeleteAccountState,
} from '@/features/accounts/types/accounts.types.ts';
import AlertModal from '@/shared/components/alert-modal.tsx';
import PageHeader from '@/shared/components/page-header.tsx';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';
import type { ApiError } from '@/shared/types/error.ts';

const AccountsPage = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState<DeleteAccountState>(null);
  const [createModal, setCreateModal] = useState<AccountsModalState>(null);
  const [transactionError, setTransactionError] = useState<string | null>(null);

  const { data: accounts = [], isLoading, isError } = useAccountsQuery();
  const { mutateAsync: deleteAccount, isPending } = useDeleteAccountMutation();

  const handleDeleteAccount = async (id?: string) => {
    try {
      if (!id) return;
      await deleteAccount(id);

      setOpenDeleteModal(null);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      if (err.response?.status === 409) {
        const message =
          err.response?.data?.error?.message ?? 'This account still has transactions.';

        setOpenDeleteModal(null);

        setTransactionError(message);
        return;
      }

      const errorMessage = err.response?.data?.error?.message ?? 'Something went wrong.';
      toast.error(`Failed to delete the account: ${errorMessage}`);
      setOpenDeleteModal(null);
    }
  };

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
      <AccountsModal setOpenModal={setCreateModal} stateModal={createModal} />
      <PageHeader
        total={formatTransactionAmount(totalBalance, 'default')}
        title="Account"
        description="Total balance"
        setOpenModal={() => setCreateModal({ mode: 'create' })}
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
          onDelete={handleDeleteAccount}
          open={openDeleteModal.open}
          id={openDeleteModal.accountId}
          setClose={handleCloseDeleteModal}
          isPending={isPending}
          variant="delete"
          title="Delete account?"
          description="This action can’t be undone. Balances and analytics will be recalculated."
        />
      )}
      <CardsAccounts accounts={accounts} onDelete={setOpenDeleteModal} />
    </div>
  );
};

export default React.memo(AccountsPage);
