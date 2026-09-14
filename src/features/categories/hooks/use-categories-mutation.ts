import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { categoriesApi } from '@/features/categories/api/categories.api.ts';
import type {
  CategoryRequest,
  CategoryResponse,
} from '@/features/categories/types/categories.types.ts';
import { queryClient } from '@/shared/api/client.ts';
import type { ApiError } from '@/shared/types/error.ts';

export const useCreateCategoryMutation = () => {
  return useMutation<CategoryResponse, AxiosError<ApiError>, CategoryRequest>({
    mutationFn: (data: CategoryRequest) => categoriesApi.createCategory(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategoryMutation = () => {
  return useMutation<
    CategoryResponse,
    AxiosError<ApiError>,
    { id: string; value: CategoryRequest }
  >({
    mutationFn: ({ id, value }) => categoriesApi.updateCategory(id, value),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation<void, AxiosError<ApiError>, string>({
    mutationFn: (id: string) => categoriesApi.deleteCategory(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
