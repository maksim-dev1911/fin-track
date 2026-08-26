import React, { type Dispatch, type SetStateAction } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import CreateTransactionForm from '@/features/transactions/components/create-transaction-form';

type PropsType = {
  isOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const CreateModal: React.FC<PropsType> = ({ isOpen, setOpenModal }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="min-w-[468px] p-0 sm:max-w-sm" showCloseButton={false}>
        <CreateTransactionForm setOpenModal={setOpenModal} />
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(CreateModal);
