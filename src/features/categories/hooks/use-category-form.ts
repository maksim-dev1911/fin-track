import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  type CategoryFormType,
  categorySchema,
} from '@/features/categories/schemas/category.schema.ts';

export const useCategoryForm = () => {
  const form = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      type: 'expense',
      color: '#eab308',
      name: '',
    },
  });

  return form;
};
