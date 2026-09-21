import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';

import type { DateRange } from '@/features/dashboard/types/analytics.types.ts';

export const getPeriodDescription = (dateRange: DateRange) => {
  if (!dateRange?.dateFrom || !dateRange?.dateTo) return 'No period selected';

  const fromDate = parseISO(dateRange.dateFrom);
  const toDate = parseISO(dateRange.dateTo);

  if (format(fromDate, 'yyyy-MM') === format(toDate, 'yyyy-MM')) {
    return `In ${format(fromDate, 'MMMM yyyy')}`;
  }

  return `${format(fromDate, 'dd.MM.yyyy')} - ${format(toDate, 'dd.MM.yyyy')}`;
};
