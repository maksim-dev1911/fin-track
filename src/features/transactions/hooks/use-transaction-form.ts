import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  type TransactionFormType,
  transactionSchema,
} from '@/features/transactions/schemas/transaction.schema.ts';

export const useTransactionForm = () => {
  const form = useForm<TransactionFormType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      categoryId: '',
      accountId: '',
      date: '',
      amount: 0,
      note: '',
    },
  });

  return form;
};
