import React from 'react';

import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';

type PropsType = {
  onDelete: () => void;
  onEdit: () => void;
};

const ItemActions: React.FC<PropsType> = ({ onDelete, onEdit }) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onEdit}>
        <Pencil className="text-muted-foreground" />
      </Button>

      <Button variant="ghost" size="sm" onClick={onDelete}>
        <Trash2 className="text-muted-foreground" />
      </Button>
    </div>
  );
};

export default React.memo(ItemActions);
