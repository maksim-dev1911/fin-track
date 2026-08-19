import React, { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import TransactionsTable from '@/features/transactions/components/transactions-table.tsx';
import { useTransactionsQuery } from '@/features/transactions/hooks/use-transactions-query.ts';
import EmptyError from '@/shared/components/empty-error.tsx';
import PageHeader from '@/shared/components/page-header.tsx';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';

import TransactionFilters from '../components/transaction-filters';

const TransactionsPage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useTransactionsQuery({ page, limit: 8 });

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
      <PageHeader title="Transactions" total={data?.data.length} description="Total records" />
      <div className="grid gap-5">
        <TransactionFilters />
        {isError ? (
          renderError()
        ) : (
          <TransactionsTable transactions={data} setPage={setPage} page={page} />
        )}
      </div>
    </div>
  );
};

export default React.memo(TransactionsPage);
