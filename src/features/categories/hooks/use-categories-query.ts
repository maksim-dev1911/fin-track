import { useQuery } from '@tanstack/react-query';

import { categoriesApi } from '@/features/categories/api/categories.api.ts';
import type { CategoriesResponse } from '@/features/categories/types/categories.types.ts';

export const useCategoriesQuery = () => {
  return useQuery<CategoriesResponse[]>({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getCategories(),
  });
};
