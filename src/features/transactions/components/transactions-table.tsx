import React from 'react';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TransactionRow from '@/features/transactions/components/table/transaction-row.tsx';
import type { Transaction } from '@/features/transactions/types/transaction.types.ts';
import TransactionsPagination from '@/shared/components/transactions-pagination.tsx';

const transactions: Transaction[] = [
  {
    type: 'Income',
    accountId: '312',
    categoryId: '33',
    dateFrom: '2019-06-01',
    dateTo: '2026-05-01',
    accountName: 'John Doe',
    categoryName: 'Freelance',
    description: 'Freelance project',
    amount: 4544,
  },
  {
    type: 'Expense',
    accountId: '312',
    categoryId: '33',
    dateFrom: '2019-06-01',
    dateTo: '2026-05-01',
    accountName: 'John Doe',
    categoryName: 'Freelance',
    description: 'Freelance project',
    amount: 4544,
  },
  {
    type: 'Income',
    accountId: '312',
    categoryId: '33',
    dateFrom: '2019-06-01',
    dateTo: '2026-05-01',
    accountName: 'John Doe',
    categoryName: 'Freelance',
    description: 'Freelance project',
    amount: 4544,
  },
];

const TransactionsTable = () => {
  return (
    <div className="border-border bg-card mt-5 overflow-hidden rounded-2xl border">
      <Table>
        <TableHeader className="bg-muted-foreground/10">
          <TableRow>
            <TableHead className="text-xs">CATEGORY</TableHead>
            <TableHead className="text-xs">ACCOUNT</TableHead>
            <TableHead className="text-xs">DATE</TableHead>
            <TableHead className="text-xs">TYPE</TableHead>
            <TableHead className="text-right text-xs">AMOUNT</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.categoryId} transaction={transaction} />
          ))}
        </TableBody>
      </Table>
      <div className="border-t px-3 py-4">
        <TransactionsPagination />
      </div>
    </div>
  );
};

export default React.memo(TransactionsTable);
