import React from 'react';

import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';

import DashboardStatsCard, {
  type DashboardStatCardVariant,
} from '@/features/dashboard/components/dashboard-stats-card.tsx';
import type { AnalyticSummary, DateRange } from '@/features/dashboard/types/analytics.types.ts';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';

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
  const getPeriodDescription = () => {
    if (!dateRange?.dateFrom || !dateRange?.dateTo) return 'No period selected';

    const fromDate = parseISO(dateRange.dateFrom);
    const toDate = parseISO(dateRange.dateTo);

    if (format(fromDate, 'yyyy-MM') === format(toDate, 'yyyy-MM')) {
      return `In ${format(fromDate, 'MMMM yyyy')}`;
    }

    return `${format(fromDate, 'dd.MM.yyyy')} - ${format(toDate, 'dd.MM.yyyy')}`;
  };

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
      description: getPeriodDescription(),
      variant: 'income',
    },
    {
      title: 'Expenses',
      amount: `${formatTransactionAmount(summaryData.periodExpense, 'expense')}`,
      description: getPeriodDescription(),
      variant: 'expense',
    },
    {
      title: 'Net',
      amount: `${formatTransactionAmount(summaryData.periodNet, 'income')}`,
      description: 'income − expenses',
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
