import React from 'react';

const AppLogo = () => {
  return (
    <div className="flex items-center gap-3 px-2 pt-1 pb-0">
      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-base font-semibold text-white">
        F
      </div>

      <span className="text-lg font-semibold">FinTrack</span>
    </div>
  );
};

export default React.memo(AppLogo);
