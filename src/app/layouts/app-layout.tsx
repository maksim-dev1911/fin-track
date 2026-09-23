import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from '@/app/layouts/components/header/header.tsx';
import Sidebar from '@/app/layouts/components/sidebar/side-bar.tsx';

const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="mx-auto max-w-7xl p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default React.memo(AppLayout);
