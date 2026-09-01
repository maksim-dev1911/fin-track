import React, { useEffect, useState } from 'react';

import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import TransactionsTable from '@/features/transactions/components/table/transactions-table.tsx';
import TransactionModal from '@/features/transactions/components/transaction-modal.tsx';
import { useDeleteTransactionMutation } from '@/features/transactions/hooks/use-transactions-mutation.ts';
import { useTransactionsQuery } from '@/features/transactions/hooks/use-transactions-query.ts';
import type {
  TransactionDeleteState,
  TransactionModalState,
} from '@/features/transactions/types/transaction.types.ts';
import DeleteModal from '@/shared/components/delete-modal';
import EmptyError from '@/shared/components/empty-error.tsx';
import PageHeader from '@/shared/components/page-header.tsx';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';
import type { ApiError } from '@/shared/types/error.ts';

import TransactionFilters from '../components/transaction-filters';

const TransactionsPage = () => {
  const [page, setPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState<TransactionDeleteState>(null);
  const [transactionModal, setTransactionModal] = useState<TransactionModalState>(null);
  const {
    data: transactions,
    isLoading,
    isError,
    refetch,
  } = useTransactionsQuery({ page, limit: 8 });

  const { mutateAsync: deleteTransaction, isPending } = useDeleteTransactionMutation();

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load transactions', {
        description: getApiErrorMessage(),
      });
    }
  }, [isError]);

  const handleCloseModal = (open: boolean) => setOpenDeleteModal({ open });

  const handleDeleteTransaction = async (id?: string) => {
    if (!id) return;
    try {
      await deleteTransaction(id);
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      const errorMessage = err.response?.data?.error?.message ?? 'Something went wrong.';
      toast.error(`Failed to delete the transaction: ${errorMessage}`);
    } finally {
      setOpenDeleteModal(null);
    }
  };

  if (isLoading) {
    return <Spinner className="size-10" />;
  }

  const renderError = () => {
    return (
      <EmptyError
        refetch={refetch}
        title="Failed to load transactions"
        description="We couldn't load your transactions right now. Please try again later."
      />
    );
  };

  return (
    <div>
      <PageHeader
        title="Transactions"
        total={transactions?.pagination.total}
        description="Total records"
        setOpenModal={setTransactionModal}
      />
      {transactionModal && (
        <TransactionModal stateModal={transactionModal} setOpenModal={setTransactionModal} />
      )}
      {openDeleteModal && (
        <DeleteModal
          onDelete={handleDeleteTransaction}
          id={openDeleteModal.id}
          open={openDeleteModal.open}
          isPending={isPending}
          setClose={handleCloseModal}
          title="Delete transaction?"
          description="This action can’t be undone. Balances and analytics will be recalculated."
        />
      )}
      <div className="grid gap-5">
        <TransactionFilters />
        {isError ? (
          renderError()
        ) : (
          <TransactionsTable
            transactions={transactions}
            setPage={setPage}
            page={page}
            onEdit={setTransactionModal}
            onOpenDeleteModal={setOpenDeleteModal}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(TransactionsPage);
