import React, { type Dispatch, type SetStateAction } from 'react';

import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import type { DeleteAccountState } from '@/features/accounts/types/accounts.types.ts';

type PropsType = {
  onDelete: Dispatch<SetStateAction<DeleteAccountState>>;
  id: string;
};

const ItemActions: React.FC<PropsType> = ({ onDelete, id }) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">
        <Pencil className="text-muted-foreground" />
      </Button>

      <Button variant="ghost" size="sm" onClick={() => onDelete({ open: true, accountId: id })}>
        <Trash2 className="text-muted-foreground" />
      </Button>
    </div>
  );
};

export default React.memo(ItemActions);
