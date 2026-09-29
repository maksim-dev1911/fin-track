import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { categoriesApi } from '@/features/categories/api/categories.api.ts';
import type {
  CategoryRequest,
  CategoryResponse,
} from '@/features/categories/types/categories.types.ts';
import { queryClient } from '@/shared/api/client.ts';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';
import type { ApiError } from '@/shared/types/error.ts';

export const useCreateCategoryMutation = () => {
  return useMutation<CategoryResponse, AxiosError<ApiError>, CategoryRequest>({
    mutationFn: (data: CategoryRequest) => categoriesApi.createCategory(data),
    onSuccess: async () => {
      toast.success('Category created successfully');
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: AxiosError<{ error?: { message?: string } }>) => {
      toast.error('Failed to create category', {
        description: getApiErrorMessage(error.response?.data?.error?.message),
      });
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
      toast.success('Category updated successfully');
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: AxiosError<{ error?: { message?: string } }>) => {
      toast.error('Failed to updated category', {
        description: getApiErrorMessage(error.response?.data?.error?.message),
      });
    },
  });
};
