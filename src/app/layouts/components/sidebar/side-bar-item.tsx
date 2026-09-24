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
    <div className="w-full">
      <div className="flex w-full flex-row items-center justify-around md:mt-6 md:flex-col md:items-stretch md:justify-start md:gap-1">
        {navigation.map((n) => {
          return (
            <NavLink
              key={n.title}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1 rounded-xl bg-transparent p-1.5 transition-colors md:w-full md:flex-row md:justify-start md:gap-3 md:px-3 md:py-2',
                  isActive
                    ? 'text-primary md:bg-primary-muted'
                    : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              <n.icon className="size-5 shrink-0" />
              <p className="text-[11px] font-medium tracking-tight md:text-sm md:font-semibold">
                {n.title}
              </p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(SideBarItem);
