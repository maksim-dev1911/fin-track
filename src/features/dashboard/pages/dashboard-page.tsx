import React, { useEffect, useState } from 'react';

import { format } from 'date-fns/format';
import { startOfMonth } from 'date-fns/startOfMonth';
import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import DashboardStats from '@/features/dashboard/components/dashboard-stats.tsx';
import DateFilter from '@/features/dashboard/components/date-filter.tsx';
import ExpensesByCategoryCard from '@/features/dashboard/components/expenses-by-category-card.tsx';
import IncomeVsExpensesChart from '@/features/dashboard/components/income-vs-expenses-chart.tsx';
import RecentTransactionsCard from '@/features/dashboard/components/recent-transactions-card.tsx';
import {
  useAnalyticsByCategoryQuery,
  useAnalyticsSummary,
} from '@/features/dashboard/hooks/use-analytics-query.ts';
import { getDateRange } from '@/features/dashboard/lib/getDateRange.ts';
import type { DashboardPeriod, RangeType } from '@/features/dashboard/types/analytics.types.ts';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';

const DashboardPage = () => {
  const [period, setPeriod] = useState<DashboardPeriod>('this-month');
  const [customRange, setCustomRange] = useState<RangeType>({
    dateFrom: startOfMonth(new Date()),
    dateTo: new Date(),
  });

  const formattedCustomRange = {
    dateFrom: format(customRange.dateFrom, 'yyyy-MM-dd'),
    dateTo: format(customRange.dateTo, 'yyyy-MM-dd'),
  };

  const dateRange = getDateRange(period, formattedCustomRange);

  const {
    data: analyticsSummary,
    isLoading: isLoadingSummary,
    isError: isErrorSummary,
  } = useAnalyticsSummary(dateRange);

  const {
    data: analyticsByCategory,
    isLoading: isLoadingByCategory,
    isError: isErrorByCategory,
  } = useAnalyticsByCategoryQuery(dateRange);

  useEffect(() => {
    if (isErrorSummary || isErrorByCategory) {
      toast.error('Failed to load data', {
        description: getApiErrorMessage(),
      });
    }
  }, [isErrorSummary, isErrorByCategory]);

  if (isLoadingSummary || isLoadingByCategory) {
    return <Spinner className="size-10" />;
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <DateFilter
        value={period}
        onChange={setPeriod}
        customRange={customRange}
        setCustomRange={setCustomRange}
      />
      {analyticsSummary && <DashboardStats summaryData={analyticsSummary} dateRange={dateRange} />}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {analyticsByCategory && (
          <ExpensesByCategoryCard analyticsByCategory={analyticsByCategory} dateRange={dateRange} />
        )}
        <IncomeVsExpensesChart />
      </div>
      <RecentTransactionsCard />
    </div>
  );
};

export default React.memo(DashboardPage);
