import { createBrowserRouter } from 'react-router-dom';

import { routes } from '@/app/router/routes.ts';
import { ProtectedRoute } from '@/features/auth/components/protected-route.tsx';
import { PublicRoute } from '@/features/auth/components/public-route.tsx';
import LoginPage from '@/features/auth/pages/login-page.tsx';
import RegisterPage from '@/features/auth/pages/register-page.tsx';
import DashboardPage from '@/features/dashboard/pages/dashboard-page.tsx';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [{ path: `${routes.home}`, element: <DashboardPage /> }],
  },
  {
    element: <PublicRoute />,
    children: [
      { path: `${routes.login}`, element: <LoginPage /> },
      { path: `${routes.register}`, element: <RegisterPage /> },
    ],
  },
]);
