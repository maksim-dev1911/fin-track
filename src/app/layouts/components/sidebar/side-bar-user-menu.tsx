import React from 'react';

import { LogOut } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';
import { getInitials } from '@/shared/lib/get-initials.ts';

const SideBarUserMenu: React.FC = () => {
  const { user } = useAuthStore();
  const { logout, isPending } = useLogout();

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
        onClick={logout}
        disabled={isPending}
        aria-label="Logout"
        className="border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
      >
        <LogOut className="size-4" />
      </button>
    </div>
  );
};

export default React.memo(SideBarUserMenu);
