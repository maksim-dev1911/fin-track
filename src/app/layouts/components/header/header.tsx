import React from 'react';

import { LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useMatches } from 'react-router-dom';

import { useLogout } from '@/features/auth/hooks/use-logout.ts';
import AppLogo from '@/shared/components/logo/app-logo.tsx';

const Header = () => {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const { title, description } =
    (current?.handle as { title?: string; description?: string }) ?? {};

  const { logout, isPending } = useLogout();

  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <header className="bg-sidebar flex items-center justify-between border-b px-4 py-3 md:px-7 md:py-2">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <AppLogo textLogo={false} />
        </div>

        <div>
          <h1 className="text-base font-bold md:text-lg md:font-semibold">{title}</h1>
          <p className="text-muted-foreground hidden text-sm md:block">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          className="flex size-8 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-medium text-[var(--color-foreground)] shadow-sm transition-all hover:bg-[var(--color-muted)] md:size-auto md:px-3 md:py-1.5"
        >
          <div
            className={`h-3 w-3 rounded-full transition-colors ${
              isDark ? 'bg-amber-400' : 'bg-slate-500'
            }`}
          />

          <span className="hidden md:block">{isDark ? 'Light' : 'Dark'}</span>
        </button>
        <div className="block md:hidden">
          <button
            type="button"
            onClick={logout}
            aria-label="Logout"
            disabled={isPending}
            className="border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
