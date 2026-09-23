import React from 'react';

type PropsType = {
  textLogo: boolean;
};

const AppLogo: React.FC<PropsType> = ({ textLogo }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-base font-semibold text-white">
        F
      </div>

      {textLogo && <span className="text-lg font-semibold">FinTrack</span>}
    </div>
  );
};

export default React.memo(AppLogo);
