import React from 'react';

import BalancePreview from '@/features/auth/components/balance-preview.tsx';
import Logo from '@/shared/components/logo.tsx';

const AuthBanner = () => {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[rgb(11,10,18)] p-12 text-white">
      <Logo />

      <div className="absolute top-[-120px] right-[-120px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.35),_transparent_70%)]"></div>

      <div className="flex-1" />

      <div>
        <h1 className="max-w-xl text-[34px] leading-[1.15] font-bold">
          Where does my money go, and how much do I have — on one screen.
        </h1>

        <p className="mt-6 max-w-lg text-[15px] leading-[1.55] text-zinc-400">
          Track income and expenses, manage accounts and categories, and understand your money with
          clear analytics.
        </p>
      </div>

      <BalancePreview />

      <div className="flex-1" />

      <footer className="text-[12px] text-zinc-500">
        © {new Date().getFullYear()} FinTrack · Personal finance
      </footer>
    </div>
  );
};

export default React.memo(AuthBanner);
