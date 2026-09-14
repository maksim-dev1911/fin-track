import type {
  CategoryRequest,
  CategoryResponse,
} from '@/features/categories/types/categories.types.ts';
import { apiClient } from '@/shared/api/client.ts';
import { endpoints } from '@/shared/api/endpoints.ts';
import type { ApiResponse } from '@/shared/api/types.ts';

class CategoriesApi {
  private readonly client: typeof apiClient;

  constructor(client: typeof apiClient) {
    this.client = client;
  }

  async getCategories() {
    const response = await this.client.get<ApiResponse<CategoryResponse[]>>(endpoints.CATEGORIES);

    return response.data.data;
  }

  async createCategory(data: CategoryRequest) {
    const response = await this.client.post(endpoints.CATEGORIES, data);

    return response.data.data;
  }

  async updateCategory(id: string, data: CategoryRequest) {
    const response = await this.client.patch(`${endpoints.CATEGORIES}/${id}`, data);

    return response.data.data;
  }
}

export const categoriesApi = new CategoriesApi(apiClient);
