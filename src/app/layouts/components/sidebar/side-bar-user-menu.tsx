import React from 'react';

import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/app/router/routes.ts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx';
import { useLogoutMutation } from '@/features/auth/hooks/mutations/use-logout-mutation.ts';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';
import { getInitials } from '@/shared/lib/get-initials.ts';

const SideBarUserMenu: React.FC = () => {
  const { clearSession, user } = useAuthStore();
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
    <div className="flex items-center justify-between border-t pt-3">
      <div className="flex gap-2">
        <Avatar>
          <AvatarFallback> {user ? getInitials(user.displayName) : ''}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm">{user?.displayName}</p>
          <p className="text-muted-foreground text-xs">{user?.email}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        aria-label="LogOut"
        className="border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
      >
        <LogOut className="size-4" />
      </button>
    </div>
  );
};

export default React.memo(SideBarUserMenu);
