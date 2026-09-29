import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';

interface UseDeleteOptions {
  mutationFn: (id: string) => Promise<unknown>;
  invalidatedQueryKey: unknown[];
  successMessage?: string;
  errorMessage?: string;
  onSuccess: () => void;
  onError?: (error: AxiosError<{ error?: { message?: string } }>) => void;
}

export const useDelete = ({
  mutationFn,
  successMessage,
  errorMessage,
  invalidatedQueryKey,
  onSuccess,
  onError,
}: UseDeleteOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success(successMessage);
      queryClient.invalidateQueries({ queryKey: invalidatedQueryKey });
      onSuccess();
    },
    onError: (error: AxiosError<{ error?: { message?: string } }>) => {
      if (onError) {
        onError(error);

        if (error.response?.status !== 409) {
          toast.error(errorMessage, {
            description: getApiErrorMessage(error.response?.data?.error?.message),
          });
        }
        return;
      }

      toast.error(errorMessage, {
        description: getApiErrorMessage(error.response?.data?.error?.message),
      });
    },
  });
};
