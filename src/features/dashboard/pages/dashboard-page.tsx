import React from 'react';

import DashboardStats from '@/features/dashboard/components/dashboard-stats.tsx';
import ExpensesByCategoryCard from '@/features/dashboard/components/expenses-by-category-card.tsx';
import IncomeVsExpensesChart from '@/features/dashboard/components/income-vs-expenses-chart.tsx';
import RecentTransactionsCard from '@/features/dashboard/components/recent-transactions-card.tsx';

const DashboardPage = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <DashboardStats />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ExpensesByCategoryCard />
        <IncomeVsExpensesChart />
      </div>
      <RecentTransactionsCard />
    </div>
  );
};

export default React.memo(DashboardPage);
