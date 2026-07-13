import React, { type ReactNode } from 'react';

import AuthBanner from '@/features/auth/components/auth-banner.tsx';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen lg:flex">
      <div className="flex-1">
        <AuthBanner />
      </div>

      <div className="flex w-full basis-[540px] items-center justify-center p-[40px]">
        {children}
      </div>
    </div>
  );
};

export default React.memo(AuthLayout);
