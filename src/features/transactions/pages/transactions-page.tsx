import React, { useState } from 'react';

import { Spinner } from '@/components/ui/spinner.tsx';
import TransactionsTable from '@/features/transactions/components/transactions-table.tsx';
import { useTransactionsQuery } from '@/features/transactions/hooks/use-transactions-query.ts';
import PageHeader from '@/shared/components/page-header.tsx';

import TransactionFilters from '../components/transaction-filters';

const TransactionsPage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useTransactionsQuery({ page, limit: 8 });

  if (isLoading) {
    return <Spinner className="size-10" />;
  }

  return (
    <div>
      <PageHeader title="Transactions" total="85" description="Total records" />
      <div className="grid gap-5">
        <TransactionFilters />
        <TransactionsTable transactions={data} setPage={setPage} page={page} />
      </div>
    </div>
  );
};

export default React.memo(TransactionsPage);
