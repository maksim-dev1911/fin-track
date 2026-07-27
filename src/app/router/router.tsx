import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/app/layouts/app-layout.tsx';
import { routes } from '@/app/router/routes.ts';
import { ProtectedRoute } from '@/features/auth/components/protected-route.tsx';
import { PublicRoute } from '@/features/auth/components/public-route.tsx';
import LoginPage from '@/features/auth/pages/login-page.tsx';
import RegisterPage from '@/features/auth/pages/register-page.tsx';
import DashboardPage from '@/features/dashboard/pages/dashboard-page.tsx';

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
