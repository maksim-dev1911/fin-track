import React from 'react';

import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';

const ItemActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">
        <Pencil className="text-muted-foreground" />
      </Button>

      <Button variant="ghost" size="sm">
        <Trash2 className="text-muted-foreground" />
      </Button>
    </div>
  );
};

export default React.memo(ItemActions);
