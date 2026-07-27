import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email('Please enter a valid email address').trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long'),
  displayName: z
    .string()
    .trim()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be less than 50 characters'),
});

export type RegisterFormType = z.infer<typeof registerSchema>;
