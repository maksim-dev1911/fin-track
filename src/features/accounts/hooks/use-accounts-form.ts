import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  accountSchema,
  type AccountsFormType,
} from '@/features/accounts/schemas/account.schema.ts';

export const useAccountsForm = () => {
  const form = useForm<AccountsFormType>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      type: undefined,
      name: '',
      startingBalance: 0,
    },
  });

  return form;
};
