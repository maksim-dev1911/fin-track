import React from 'react';

import { AlignLeft, LayoutGrid, Tags, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { routes } from '@/app/router/routes.ts';
import { cn } from '@/shared/lib/utils.ts';

const navigation = [
  {
    title: 'Dashboard',
    to: routes.dashboard,
    icon: LayoutGrid,
  },
  {
    title: 'Transactions',
    to: routes.transactions,
    icon: AlignLeft,
  },
  {
    title: 'Accounts',
    to: routes.accounts,
    icon: Wallet,
  },
  {
    title: 'Categories',
    to: routes.categories,
    icon: Tags,
  },
];

const SideBarItem = () => {
  return (
    <div>
      <div className="mt-6 flex flex-col gap-1">
        {navigation.map((n) => {
          return (
            <NavLink
              key={n.title}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                  isActive ? 'bg-primary-muted text-primary' : 'text-muted-foreground',
                )
              }
            >
              <n.icon className="size-5" />
              <p className="text-sm font-semibold">{n.title}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(SideBarItem);
