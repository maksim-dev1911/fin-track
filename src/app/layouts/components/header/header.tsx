import React from 'react';

import { useMatches } from 'react-router-dom';

const Header = () => {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const { title, description } =
    (current?.handle as { title?: string; description?: string }) ?? {};

  return (
    <header className="flex items-center justify-between border-b px-7 py-2">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </header>
  );
};

export default React.memo(Header);
