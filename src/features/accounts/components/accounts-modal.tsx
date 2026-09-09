import React, { type Dispatch, type SetStateAction } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog.tsx';
import AccountsForm from '@/features/accounts/components/accounts-form.tsx';
import type { AccountsModalState } from '@/features/accounts/types/accounts.types.ts';

type PropsType = {
  stateModal: AccountsModalState;
  setOpenModal: Dispatch<SetStateAction<AccountsModalState>>;
};

const AccountsModal: React.FC<PropsType> = ({ stateModal, setOpenModal }) => {
  return (
    <Dialog open={!!stateModal} onOpenChange={(open) => !open && setOpenModal(null)}>
      <DialogContent className="min-w-[468px] p-0 sm:max-w-sm" showCloseButton={false}>
        <AccountsForm setOpenModal={setOpenModal} stateModal={stateModal} />
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(AccountsModal);
