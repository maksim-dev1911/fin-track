import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';

interface MutationErrorOptions {
  error: AxiosError<{ error?: { message?: string } }>;
  fallbackTitle: string;
  skipStatuses?: number[];
}

export const handleMutationError = ({
  error,
  fallbackTitle,
  skipStatuses = [409, 422],
}: MutationErrorOptions) => {
  const status = error.response?.status;

  if (status && skipStatuses?.includes(status)) {
    return;
  }

  const serverMessage = error.response?.data?.error?.message;

  toast.error(fallbackTitle, {
    description: getApiErrorMessage(serverMessage),
  });
};
