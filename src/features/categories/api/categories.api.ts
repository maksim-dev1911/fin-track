import type { CategoryResponse } from '@/features/categories/types/categories.types.ts';
import { apiClient } from '@/shared/api/client.ts';
import { endpoints } from '@/shared/api/endpoints.ts';
import type { ApiResponse } from '@/shared/api/types.ts';

export const getCategories = async () => {
  const response = await apiClient.get<ApiResponse<CategoryResponse[]>>(endpoints.CATEGORIES);

  return response.data.data;
};
