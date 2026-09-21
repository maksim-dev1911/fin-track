import React from 'react';

import { Link } from 'react-router-dom';

import { routes } from '@/app/router/routes.ts';
import RecentTransactionItem from '@/features/dashboard/components/recent-transaction-item.tsx';
import type { Transaction } from '@/features/transactions/types/transaction.types.ts';
import Section from '@/shared/components/Section.tsx';

type PropsType = {
  transactions?: Transaction[];
};

const RecentTransactionsCard: React.FC<PropsType> = ({ transactions }) => {
  return (
    <Section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold">Recent transactions</h2>
        <Link to={routes.transactions} className="text-primary cursor-pointer text-sm">
          View all -
        </Link>
      </div>
      {transactions?.slice(0, 6).map((transaction) => {
        return (
          <div key={transaction.id}>
            <RecentTransactionItem transaction={transaction} />
          </div>
        );
      })}
    </Section>
  );
};

export default React.memo(RecentTransactionsCard);
