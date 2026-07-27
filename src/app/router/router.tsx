import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/app/layouts/app-layout.tsx';
import { routes } from '@/app/router/routes.ts';
import AccountsPage from '@/features/accounts/accounts-page.tsx';
import { ProtectedRoute } from '@/features/auth/components/protected-route.tsx';
import { PublicRoute } from '@/features/auth/components/public-route.tsx';
import LoginPage from '@/features/auth/pages/login-page.tsx';
import RegisterPage from '@/features/auth/pages/register-page.tsx';
import CategoriesPage from '@/features/categories/categories-page.tsx';
import DashboardPage from '@/features/dashboard/pages/dashboard-page.tsx';
import TransactionsPage from '@/features/transactions/transactions-page.tsx';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: `${routes.dashboard}`,
            element: <DashboardPage />,
            handle: { title: 'Dashboard', description: 'Your financial overview' },
          },
          {
            path: `${routes.transactions}`,
            element: <TransactionsPage />,
            handle: { title: 'Transactions', description: 'All your money movements' },
          },
          {
            path: `${routes.accounts}`,
            element: <AccountsPage />,
            handle: { title: 'Accounts', description: 'Your wallets and cards' },
          },
          {
            path: `${routes.categories}`,
            element: <CategoriesPage />,
            handle: { title: 'Categories', description: 'Organize your transactions' },
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      { path: `${routes.login}`, element: <LoginPage /> },
      { path: `${routes.register}`, element: <RegisterPage /> },
    ],
  },
]);
