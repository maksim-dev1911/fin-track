import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/router/router.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import { useSession } from '@/features/auth/hooks/use-session.ts';

export const App = () => {
  useSession();

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              'w-[360px] flex items-center gap-3 p-4 rounded-xl bg-popover border border-border shadow-2xl backdrop-blur-md',
            title: 'text-[14px] font-medium text-foreground font-sans tracking-tight',
            description: 'text-[12px] text-muted-foreground font-normal leading-normal font-sans',
          },
        }}
        icons={{
          success: (
            <svg
              xmlns="http://w3.org"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5 shrink-0 text-emerald-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          error: (
            <svg
              xmlns="http://w3.org"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5 shrink-0 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          ),
        }}
      />
    </>
  );
};
