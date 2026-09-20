import { useQuery } from '@tanstack/react-query';

import { dashboardApi } from '@/features/dashboard/api/dashboard.api.ts';
import type {
  AnalyticByCategoryResponse,
  AnalyticSummary,
  DateRange,
} from '@/features/dashboard/types/analytics.types.ts';

export const useAnalyticsByCategoryQuery = (params?: Partial<DateRange>) => {
  return useQuery<AnalyticByCategoryResponse[]>({
    queryKey: ['analyticsByCategory', params],
    queryFn: () => dashboardApi.getAnalyticsByCategory(params),
  });
};

export const useAnalyticsSummary = ({ dateFrom, dateTo }: DateRange) => {
  return useQuery<AnalyticSummary>({
    queryKey: ['analyticsSummary', dateFrom, dateTo],
    queryFn: () => dashboardApi.getAnalyticsSummary(dateFrom, dateTo),
  });
};
