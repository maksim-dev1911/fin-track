import { useQuery } from '@tanstack/react-query';

import { getAccounts } from '@/features/accounts/api/accounts.api';
import type { AccountResponse } from '@/features/accounts/types/accounts.types.ts';

export const useAccountsQuery = () => {
  return useQuery<AccountResponse[]>({
    queryKey: ['account'],
    queryFn: getAccounts,
  });
};
