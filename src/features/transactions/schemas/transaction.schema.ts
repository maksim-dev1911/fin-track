import { z } from 'zod';

export const transactionSchema = z.object({
  type: z.enum(['expense', 'income']),
  amount: z.number(),
  date: z.string().min(1, 'Date is required'),
  categoryId: z.string(),
  accountId: z.string(),
  note: z.string(),
});

export type TransactionFormType = z.infer<typeof transactionSchema>;
