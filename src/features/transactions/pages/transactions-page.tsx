import React, { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import TransactionsTable from '@/features/transactions/components/table/transactions-table.tsx';
import TransactionModal from '@/features/transactions/components/transaction-modal.tsx';
import { useTransactionsQuery } from '@/features/transactions/hooks/use-transactions-query.ts';
import type { TransactionModalState } from '@/features/transactions/types/transaction.types.ts';
import EmptyError from '@/shared/components/empty-error.tsx';
import PageHeader from '@/shared/components/page-header.tsx';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';

import TransactionFilters from '../components/transaction-filters';

const TransactionsPage = () => {
  const [page, setPage] = useState(1);
  const [transactionModal, setTransactionModal] = useState<TransactionModalState>(null);
  const {
    data: transactions,
    isLoading,
    isError,
    refetch,
  } = useTransactionsQuery({ page, limit: 8 });

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load transactions', {
        description: getApiErrorMessage(),
      });
    }
  }, [isError]);

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
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(TransactionsPage);
