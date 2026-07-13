import React, { type ReactNode } from 'react';

import AuthBanner from '@/features/auth/components/auth-banner.tsx';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="grid min-h-screen lg:grid-cols-[2.5fr_1fr]">
      <div>
        <AuthBanner />
      </div>

      <div className="flex w-full items-center justify-center p-[40px]">{children}</div>
    </div>
  );
};

export default React.memo(AuthLayout);
