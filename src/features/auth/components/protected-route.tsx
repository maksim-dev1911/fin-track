import { Navigate, Outlet } from 'react-router-dom';

import { routes } from '@/app/router/routes.ts';
import { Spinner } from '@/components/ui/spinner';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';

export const ProtectedRoute = () => {
  const status = useAuthStore((state) => state.status);

  if (status === 'loading') {
    return <Spinner className="size-20" />;
  }

  if (status === 'unauthenticated') {
    return <Navigate to={routes.login} replace />;
  }

  return <Outlet />;
};
