import React from 'react';

const BalancePreview = () => {
    return (
        <div className="mt-[34px] bg-[rgba(255,255,255,0.04)] max-w-[370px] p-[22px] rounded-2xl border border-white/9">
            <p className="text-xs color text-zinc-400">Total balance</p>
            <p className="text-3xl mt-[5px] font-semibold">$24,180</p>
            <div className='flex items-center mt-[18px] gap-[28px]'>
                <div>
                    <p className="text-xs color text-zinc-400">Income · month</p>
                    <p className="font-semibold text-emerald-400">+$7,400</p>
                </div>
                <div>
                    <p className="text-xs color text-zinc-400">Income · month</p>
                    <p className="font-semibold text-rose-400">−$4,260</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(BalancePreview);