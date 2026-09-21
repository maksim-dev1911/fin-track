import type {
  AnalyticByCategoryResponse,
  AnalyticSummary,
} from '@/features/dashboard/types/analytics.types.ts';
import { apiClient } from '@/shared/api/client';
import { endpoints } from '@/shared/api/endpoints.ts';
import type { ApiResponse } from '@/shared/api/types.ts';
import type { DateRange } from '@/shared/lib/get-period-description.ts';

class DashboardApi {
  private readonly client: typeof apiClient;

  constructor(client: typeof apiClient) {
    this.client = client;
  }

  async getAnalyticsByCategory(params?: Partial<DateRange>) {
    const response = await this.client.get<ApiResponse<AnalyticByCategoryResponse[]>>(
      endpoints.ANALYTICS_BY_CATEGORY,
      { params: params },
    );

    return response.data.data;
  }

  async getAnalyticsSummary(dateFrom: string, dateTo: string) {
    const response = await this.client.get<AnalyticSummary>(endpoints.ANALYTICS_SUMMARY, {
      params: {
        dateFrom,
        dateTo,
      },
    });

    return response.data;
  }
}

export const dashboardApi = new DashboardApi(apiClient);
