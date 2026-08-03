import React, { type ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const Section: React.FC<PropsType> = ({ children }) => {
  return <div className="border-border bg-card rounded-xl border-1 px-5 py-4">{children}</div>;
};

export default React.memo(Section);
