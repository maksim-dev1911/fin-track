import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from '@/app/layouts/components/header/header.tsx';
import Sidebar from '@/app/layouts/components/sidebar/side-bar.tsx';

const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default React.memo(AppLayout);
