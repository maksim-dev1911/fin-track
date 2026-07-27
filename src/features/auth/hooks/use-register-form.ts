import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { type RegisterFormType, registerSchema } from '@/features/auth/schemas/register.schema.ts';

export const useRegisterForm = () => {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
    },
  });

  return form;
};
