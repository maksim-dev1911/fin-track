import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store/auth.store.ts';

export const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
