import React, { type Dispatch, type SetStateAction } from 'react';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import TransactionRow from '@/features/transactions/components/table/transaction-row.tsx';
import type {
  TransactionDeleteState,
  TransactionModalState,
  TransactionsResponse,
} from '@/features/transactions/types/transaction.types.ts';
import TransactionsPagination from '@/shared/components/transactions-pagination.tsx';

type PropsType = {
  transactions?: TransactionsResponse;
  setPage: (page: number) => void;
  onEdit: Dispatch<SetStateAction<TransactionModalState>>;
  onOpenDeleteModal: Dispatch<SetStateAction<TransactionDeleteState>>;
  page: number;
};

const TransactionsTable: React.FC<PropsType> = ({
  transactions,
  page,
  setPage,
  onEdit,
  onOpenDeleteModal,
}) => {
  const data = transactions?.data ?? [];

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
          {data.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onOpenDeleteModal={onOpenDeleteModal}
            />
          ))}
        </TableBody>
      </Table>
      <div className="border-t px-3 py-4">
        <TransactionsPagination setPage={setPage} page={page} data={transactions?.pagination} />
      </div>
    </div>
  );
};

export default React.memo(TransactionsTable);
