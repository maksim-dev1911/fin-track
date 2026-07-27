import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/router/router.tsx';
import { useSession } from '@/features/auth/hooks/use-session.ts';

export const App = () => {
  useSession();

  return <RouterProvider router={router} />;
};
