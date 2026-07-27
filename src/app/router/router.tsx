import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/features/auth/components/protected-route.tsx';
import LoginPage from '@/features/auth/pages/login-page.tsx';
import DashboardPage from '@/features/dashboard/pages/dashboard-page.tsx';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/main', element: <DashboardPage /> },
      { path: '/home', element: <div>Hello world</div> },
    ],
  },
  { path: 'login', element: <LoginPage /> },
  { path: 'register', element: <div>register</div> },
]);
