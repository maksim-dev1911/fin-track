import { useQuery } from '@tanstack/react-query';

import { dashboardApi } from '@/features/dashboard/api/dashboard.api.ts';
import type { AnalyticResponse } from '@/features/dashboard/types/analytics.types.ts';

export const useAnalyticsQuery = () => {
  return useQuery<AnalyticResponse[]>({
    queryKey: ['analytics'],
    queryFn: () => dashboardApi.getAnalytics(),
  });
};
