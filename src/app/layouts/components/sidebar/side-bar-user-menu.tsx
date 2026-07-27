import React from 'react';

import { LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';

const SideBarUserMenu = () => {
  return (
    <div className="flex items-center justify-between border-t pt-3">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="grayscale" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm">Alex Morgan</p>
          <p className="text-muted-foreground text-xs">demo@fintrack.app</p>
        </div>
      </div>
      <button
        type="button"
        aria-label="Выйти"
        className="border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 cursor-pointer items-center justify-center rounded-lg border transition-colors"
      >
        <LogOut className="size-4" />
      </button>
    </div>
  );
};

export default React.memo(SideBarUserMenu);
