import { useQuery } from '@tanstack/react-query';

import { categoriesApi } from '@/features/categories/api/categories.api.ts';
import type { CategoryResponse } from '@/features/categories/types/categories.types.ts';

export const useCategoriesQuery = () => {
  return useQuery<CategoryResponse[]>({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getCategories(),
  });
};
