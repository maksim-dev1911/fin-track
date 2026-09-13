import React, { type Dispatch, type SetStateAction } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog.tsx';
import CategoriesForm from '@/features/categories/components/categories-form.tsx';
import type { CategoryModalState } from '@/features/categories/types/categories.types.ts';

type PropsType = {
  stateModal: CategoryModalState;
  setOpenModal: Dispatch<SetStateAction<CategoryModalState>>;
};

const CategoriesModal: React.FC<PropsType> = ({ stateModal, setOpenModal }) => {
  return (
    <Dialog open={!!stateModal} onOpenChange={(open) => !open && setOpenModal(null)}>
      <DialogContent className="min-w-[428px] p-0 sm:max-w-sm" showCloseButton={false}>
        <CategoriesForm setOpenModal={setOpenModal} stateModal={stateModal} />
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(CategoriesModal);
