import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-brand flex h-8 w-8 items-center justify-center rounded-lg">F</div>

      <span className="text-lg font-semibold text-white">FinTrack</span>
    </div>
  );
};

export default React.memo(Logo);
