import { useQuery } from '@tanstack/react-query';

import { dashboardApi } from '@/features/dashboard/api/dashboard.api.ts';
import type {
  AnalyticByCategoryResponse,
  AnalyticSummary,
  DateRange,
} from '@/features/dashboard/types/analytics.types.ts';

export const useAnalyticsByCategoryQuery = () => {
  return useQuery<AnalyticByCategoryResponse[]>({
    queryKey: ['analyticsByCategory'],
    queryFn: () => dashboardApi.getAnalyticsByCategory(),
  });
};

export const useAnalyticsSummary = ({ dateFrom, dateTo }: DateRange) => {
  return useQuery<AnalyticSummary>({
    queryKey: ['analyticsSummary', dateFrom, dateTo],
    queryFn: () => dashboardApi.getAnalyticsSummary(dateFrom, dateTo),
  });
};
