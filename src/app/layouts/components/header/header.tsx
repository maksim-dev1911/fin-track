import React from 'react';

import { LogOut } from 'lucide-react';
import { useMatches } from 'react-router-dom';

import { useLogout } from '@/features/auth/hooks/use-logout.ts';
import AppLogo from '@/shared/components/logo/app-logo.tsx';

const Header = () => {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const { title, description } =
    (current?.handle as { title?: string; description?: string }) ?? {};

  const { logout, isPending } = useLogout();

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
          onClick={logout}
          disabled={isPending}
          className="border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    </header>
  );
};

export default React.memo(Header);
