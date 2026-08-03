import React from 'react';

import RecentTransactionItem from '@/features/dashboard/components/recent-transaction-item.tsx';
import Section from '@/shared/components/Section.tsx';

const RecentTransactionsCard = () => {
  return (
    <Section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold">Recent transactions</h2>
        <a className="text-primary cursor-pointer text-sm">View all -</a>
      </div>
      <RecentTransactionItem type="income" />
      <RecentTransactionItem type="expenses" />
    </Section>
  );
};

export default React.memo(RecentTransactionsCard);
