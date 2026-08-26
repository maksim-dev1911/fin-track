import { z } from 'zod';

export const transactionSchema = z.object({
  type: z.enum(['expense', 'income']),
  amount: z.number().positive('Amount is required').int(),
  date: z.string().min(1, 'Date is required'),
  categoryId: z.string().min(1, 'Category is required'),
  accountId: z.string().min(1, 'Account is required'),
  note: z.string(),
});

export type TransactionFormType = z.infer<typeof transactionSchema>;
