import { apiClient } from '@/shared/api/client';
import { endpoints } from '@/shared/api/endpoints.ts';

class DashboardApi {
  private readonly client: typeof apiClient;

  constructor(client: typeof apiClient) {
    this.client = client;
  }

  async getAnalytics() {
    const response = await this.client.get(endpoints.ANALYTICS);

    return response.data.data;
  }
}

export const dashboardApi = new DashboardApi(apiClient);
