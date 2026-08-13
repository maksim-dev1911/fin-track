import React from 'react';

import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';

const ItemActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon">
        1
        <Pencil />
      </Button>

      <Button variant="outline" size="icon">
        <Trash2 />
      </Button>
    </div>
  );
};

export default React.memo(ItemActions);
