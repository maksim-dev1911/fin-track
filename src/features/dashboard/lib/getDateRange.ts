import { endOfMonth } from 'date-fns/endOfMonth';
import { format } from 'date-fns/format';
import { startOfMonth } from 'date-fns/startOfMonth';
import { subMonths } from 'date-fns/subMonths';

import type { DashboardPeriod } from '@/features/dashboard/types/analytics.types.ts';
import type { DateRange } from '@/shared/lib/get-period-description';

export const getDateRange = (period: DashboardPeriod, customRange?: DateRange): DateRange => {
  const today = new Date();

  switch (period) {
    case 'this-month':
      return {
        dateFrom: format(startOfMonth(today), 'yyyy-MM-dd'),
        dateTo: format(endOfMonth(today), 'yyyy-MM-dd'),
      };

    case 'last-month': {
      const lastMonth = subMonths(today, 1);

      return {
        dateFrom: format(startOfMonth(lastMonth), 'yyyy-MM-dd'),
        dateTo: format(endOfMonth(lastMonth), 'yyyy-MM-dd'),
      };
    }
    case 'custom':
      if (!customRange) {
        throw new Error('Custom date range is required');
      }

      return customRange;
  }
};
