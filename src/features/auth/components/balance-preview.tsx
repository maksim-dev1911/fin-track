import React from 'react';

const BalancePreview = () => {
  return (
    <div className="mt-[34px] max-w-[370px] rounded-2xl border border-white/9 bg-[rgba(255,255,255,0.04)] p-[22px]">
      <p className="color text-xs text-zinc-400">Total balance</p>
      <p className="mt-[5px] text-3xl font-semibold">$24,180</p>
      <div className="mt-[18px] flex items-center gap-[28px]">
        <div>
          <p className="color text-xs text-zinc-400">Income · month</p>
          <p className="font-semibold text-emerald-400">+$7,400</p>
        </div>
        <div>
          <p className="color text-xs text-zinc-400">Expenses · month</p>
          <p className="font-semibold text-rose-400">−$4,260</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BalancePreview);
