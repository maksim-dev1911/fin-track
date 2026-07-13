import React, { type ReactNode } from 'react';

import AuthBanner from '@/features/auth/components/auth-banner.tsx';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col min-[820px]:flex-row">
      <aside className="hidden min-w-0 min-[820px]:block min-[820px]:flex-1">
        <AuthBanner />
      </aside>

      <main className="flex w-full min-w-0 flex-1 items-center justify-center p-6 min-[820px]:flex-1 min-[1280px]:max-w-[540px] min-[1280px]:flex-none sm:p-10">
        <div className="w-full max-w-[360px]">{children}</div>
      </main>
    </div>
  );
};

export default React.memo(AuthLayout);
