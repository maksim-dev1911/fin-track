import React from 'react';

import { Link } from 'react-router-dom';

import { routes } from '@/app/router/routes.ts';
import RecentTransactionItem from '@/features/dashboard/components/recent-transaction-item.tsx';
import Section from '@/shared/components/Section.tsx';

const RecentTransactionsCard = () => {
  return (
    <Section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold">Recent transactions</h2>
        <Link to={routes.transactions} className="text-primary cursor-pointer text-sm">
          View all -
        </Link>
      </div>
      <RecentTransactionItem type="income" />
      <RecentTransactionItem type="expenses" />
    </Section>
  );
};

export default React.memo(RecentTransactionsCard);
