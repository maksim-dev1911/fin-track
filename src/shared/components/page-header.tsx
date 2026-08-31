import React, { type Dispatch, type SetStateAction } from 'react';

import { Button } from '@/components/ui/button.tsx';
import type { TransactionModalState } from '@/features/transactions/types/transaction.types.ts';

type PropsType = {
  title: string;
  description: string;
  total?: number | 0;
  setOpenModal: Dispatch<SetStateAction<TransactionModalState>>;
};

const PageHeader: React.FC<PropsType> = ({ description, title, total, setOpenModal }) => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="flex items-center gap-1 text-sm">
        <p className="text-muted-foreground">{description}:</p>
        <p>{total}</p>
      </div>
      <Button className="px-4 py-5" onClick={() => setOpenModal({ mode: 'create' })}>
        + {title}
      </Button>
    </div>
  );
};

export default React.memo(PageHeader);
