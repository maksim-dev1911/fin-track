import React from 'react';

import DashboardStatsCard, {
  type DashboardStatCardVariant,
} from '@/features/dashboard/components/dashboard-stats-card.tsx';
import type { AnalyticSummary } from '@/features/dashboard/types/analytics.types.ts';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';
import { type DateRange, getPeriodDescription } from '@/shared/lib/get-period-description.ts';

type DashboardStatsItem = {
  title: string;
  amount: string;
  description: string;
  variant: DashboardStatCardVariant;
};

type PropsType = {
  summaryData: AnalyticSummary;
  dateRange: DateRange;
};

const DashboardStats: React.FC<PropsType> = ({ summaryData, dateRange }) => {
  const cardStats: DashboardStatsItem[] = [
    {
      title: 'Total balance',
      amount: `${formatTransactionAmount(summaryData.totalBalance, 'default')}`,
      description: 'across all accounts',
      variant: 'default',
    },
    {
      title: 'Income',
      amount: `${formatTransactionAmount(summaryData.periodIncome, 'income')}`,
      description: getPeriodDescription(dateRange),
      variant: 'income',
    },
    {
      title: 'Expenses',
      amount: `${formatTransactionAmount(summaryData.periodExpense, 'expense')}`,
      description: getPeriodDescription(dateRange),
      variant: 'expense',
    },
    {
      title: 'Net',
      amount: `${formatTransactionAmount(summaryData.periodNet, 'income')}`,
      description: 'Income − expenses',
      variant: 'income',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {cardStats.map((card) => (
        <div key={card.title}>
          <DashboardStatsCard
            title={card.title}
            value={card.amount}
            description={card.description}
            variant={card.variant}
            analyticSummary={summaryData}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(DashboardStats);
