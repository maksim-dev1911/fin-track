import React from 'react';

import SideBarItem from '@/app/layouts/components/sidebar/side-bar-item.tsx';
import SideBarUserMenu from '@/app/layouts/components/sidebar/side-bar-user-menu.tsx';
import AppLogo from '@/shared/components/logo/app-logo';

const Sidebar = () => {
  return (
    <aside className="flex w-64 flex-col justify-between border-r px-3 py-4">
      <div>
        <AppLogo />
        <SideBarItem />
      </div>
      <SideBarUserMenu />
    </aside>
  );
};

export default React.memo(Sidebar);
