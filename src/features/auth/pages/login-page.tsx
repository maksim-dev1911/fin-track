import React from 'react';

import AuthLayout from '@/features/auth/components/auth.layout.tsx';
import LoginForm from '@/features/auth/components/login-form.tsx';

const LoginPage = () => {
  return (
    <div>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </div>
  );
};

export default React.memo(LoginPage);
