import React from 'react';

import { LogOut } from 'lucide-react';
import { useMatches, useNavigate } from 'react-router-dom';

import { routes } from '@/app/router/routes.ts';
import { useLogoutMutation } from '@/features/auth/hooks/mutations/use-logout-mutation.ts';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';
import AppLogo from '@/shared/components/logo/app-logo.tsx';

const Header = () => {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const { title, description } =
    (current?.handle as { title?: string; description?: string }) ?? {};

  const { clearSession } = useAuthStore();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      clearSession();
      navigate(routes.login, { replace: true });
    }
  };

  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3 md:px-7 md:py-2">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <AppLogo textLogo={false} />
        </div>

        <div>
          <h1 className="text-base font-bold text-slate-900 md:text-lg md:font-semibold">
            {title}
          </h1>
          <p className="text-muted-foreground hidden text-sm md:block">{description}</p>
        </div>
      </div>
      <div className="block md:hidden">
        <button
          type="button"
          onClick={handleLogout}
          aria-label="LogOut"
          className="border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    </header>
  );
};

export default React.memo(Header);
