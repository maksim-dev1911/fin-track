import React, { type Dispatch, type SetStateAction } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog.tsx';
import TransactionForm from '@/features/transactions/components/transaction-form.tsx';
import type { TransactionModalState } from '@/features/transactions/types/transaction.types.ts';

type PropsType = {
  stateModal: TransactionModalState;
  setOpenModal: Dispatch<SetStateAction<TransactionModalState>>;
};

const TransactionModal: React.FC<PropsType> = ({ stateModal, setOpenModal }) => {
  return (
    <Dialog open onOpenChange={(open) => !open && setOpenModal(null)}>
      <DialogContent className="min-w-[468px] p-0 sm:max-w-sm" showCloseButton={false}>
        <TransactionForm setOpenModal={setOpenModal} stateModal={stateModal} />
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(TransactionModal);
