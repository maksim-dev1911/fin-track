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

        <main className="flex-1 bg-slate-50">
          <div className="mx-auto max-w-7xl p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default React.memo(AppLayout);
