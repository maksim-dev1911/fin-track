import { useQuery } from '@tanstack/react-query';

import { accountsApi } from '@/features/accounts/api/accounts.api.ts';
import type { AccountResponse } from '@/features/accounts/types/accounts.types.ts';

export const useAccountsQuery = () => {
  return useQuery<AccountResponse[]>({
    queryKey: ['account'],
    queryFn: () => accountsApi.getAccounts(),
  });
};
