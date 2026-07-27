import React from 'react';

import AuthLayout from '@/features/auth/components/auth.layout.tsx';
import RegisterForm from '@/features/auth/components/register-form.tsx';

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default React.memo(RegisterPage);
