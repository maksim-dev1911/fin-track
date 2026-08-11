import React from 'react';

import TransactionsTable from '@/features/transactions/components/transactions-table.tsx';
import PageHeader from '@/shared/components/page-header.tsx';

import TransactionFilters from '../components/transaction-filters';

const TransactionsPage = () => {
  return (
    <div>
      <PageHeader title="Transactions" total="85" description="Total records" />
      <div className="grid gap-5">
        <TransactionFilters />
        <TransactionsTable />
      </div>
    </div>
  );
};

export default React.memo(TransactionsPage);
