import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  type: z.enum(['expense', 'income']),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, { message: 'Color must be a valid hex value' }),
});

export type CategoryFormType = z.infer<typeof categorySchema>;
