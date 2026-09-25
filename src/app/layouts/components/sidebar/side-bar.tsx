import React from 'react';

import SideBarItem from '@/app/layouts/components/sidebar/side-bar-item.tsx';
import SideBarUserMenu from '@/app/layouts/components/sidebar/side-bar-user-menu.tsx';
import AppLogo from '@/shared/components/logo/app-logo';

const Sidebar = () => {
  return (
    <aside className="fixed right-0 bottom-0 left-0 z-50 flex h-16 flex-row items-center justify-around border-t bg-white px-2 py-1 md:right-auto md:bottom-auto md:left-auto md:z-0 md:h-screen md:w-64 md:flex-col md:justify-between md:border-t-0 md:border-r md:px-3 md:py-4 lg:relative">
      <div className="contents md:flex md:w-full md:flex-col md:gap-2">
        <div className="hidden px-2 pt-1 pb-0 md:block md:w-full">
          <AppLogo textLogo />
        </div>
        <div className="flex flex-1 justify-around md:w-full md:flex-none md:flex-col">
          <SideBarItem />
        </div>
      </div>
      <div className="hidden md:block md:w-full">
        <SideBarUserMenu />
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
