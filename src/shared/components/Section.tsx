import React, { type ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const Section: React.FC<PropsType> = ({ children }) => {
  return <div className="rounded-xl border-1 border-slate-200 bg-white px-5 py-4">{children}</div>;
};

export default React.memo(Section);
