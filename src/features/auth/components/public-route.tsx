import { Navigate, Outlet } from 'react-router-dom';

import { routes } from '@/app/router/routes.ts';
import { Spinner } from '@/components/ui/spinner';
import { useAuthStore } from '@/features/auth/store/auth.store';

export const PublicRoute = () => {
  const status = useAuthStore((state) => state.status);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-20" />
      </div>
    );
  }

  if (status === 'authenticated') {
    return <Navigate to={routes.home} replace />;
  }

  return <Outlet />;
};
