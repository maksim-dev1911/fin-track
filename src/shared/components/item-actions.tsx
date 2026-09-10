import React from 'react';

import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';

type PropsType = {
  onDelete: () => void;
};

const ItemActions: React.FC<PropsType> = ({ onDelete }) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">
        <Pencil className="text-muted-foreground" />
      </Button>

      <Button variant="ghost" size="sm" onClick={() => onDelete()}>
        <Trash2 className="text-muted-foreground" />
      </Button>
    </div>
  );
};

export default React.memo(ItemActions);
