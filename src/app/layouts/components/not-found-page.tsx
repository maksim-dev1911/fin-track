import React from 'react';

import { useNavigate } from 'react-router-dom';

import { routes } from '@/app/router/routes.ts';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_45%)]" />

      <div className="relative z-10 max-w-md">
        <h1 className="text-8xl font-extrabold tracking-tight text-zinc-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] sm:text-9xl">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-200 sm:text-3xl">
          Page not found
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or
          never existed.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate(routes.dashboard)}
            size="lg"
            className="bg-brand hover:bg-brand/90 shadow-brand/20 h-[42px] px-6 text-sm font-medium shadow-lg transition-colors"
          >
            Go back home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NotFoundPage);
