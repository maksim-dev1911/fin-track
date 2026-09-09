import z from 'zod';

export const accountSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['cash', 'card', 'savings', 'other'], {
    message: 'Please select an account type',
  }),
  startingBalance: z.number().nonnegative('Balance cannot be negative'),
});

export type AccountsFormType = z.infer<typeof accountSchema>;
