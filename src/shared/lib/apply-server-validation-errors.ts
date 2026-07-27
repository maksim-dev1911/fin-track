import type { AxiosError } from 'axios';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import type { ApiValidationError } from '@/shared/types/error.ts';

export const applyServerValidationErrors = <T extends FieldValues>(
  form: UseFormReturn<T>,
  error: AxiosError<ApiValidationError>,
): boolean => {
  const details = error.response?.data.error.details;

  if (!details) {
    return false;
  }

  Object.entries(details).forEach(([field, message]) => {
    form.setError(field as Path<T>, {
      message: String(message),
    });
  });

  return true;
};
