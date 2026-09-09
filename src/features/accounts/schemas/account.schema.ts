import z from 'zod';

export const accountSchema = z.object({
  name: z.string(),
  type: z.string(),
  startingBalance: z.number(),
});

export type AccountsFormType = z.infer<typeof accountSchema>;
