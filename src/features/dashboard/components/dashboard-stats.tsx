import React from 'react';

import DashboardStatsCard, {
  type DashboardStatCardVariant,
} from '@/features/dashboard/components/dashboard-stats-card.tsx';

type DashboardStatsItem = {
  title: string;
  value: string;
  description: string;
  variant: DashboardStatCardVariant;
};

const cardStats: DashboardStatsItem[] = [
  {
    title: 'Total balance',
    value: '$40,335',
    description: 'across all accounts',
    variant: 'default',
  },
  {
    title: 'Income',
    value: '+$7,430',
    description: 'in July 2026',
    variant: 'income',
  },
  {
    title: 'Expenses',
    value: '−$2,445',
    description: 'in July 2026',
    variant: 'expense',
  },
  {
    title: 'Net',
    value: '+$4,985',
    description: 'income − expenses',
    variant: 'income',
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {cardStats.map((card) => (
        <div key={card.title}>
          <DashboardStatsCard
            title={card.title}
            value={card.value}
            description={card.description}
            variant={card.variant}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(DashboardStats);
