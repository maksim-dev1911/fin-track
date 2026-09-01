import React from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogContent } from '@/components/ui/dialog.tsx';

type PropsType = {
  open: boolean;
  setClose: (open: boolean) => void;
  onDelete: (id?: string) => void;
  id?: string;
  title: string;
  description: string;
};

const DeleteModal: React.FC<PropsType> = ({ open, setClose, onDelete, id, title, description }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="block min-w-[400px] p-0 p-6 sm:max-w-sm" showCloseButton={false}>
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50">
          <span className="text-lg font-bold text-rose-600">!</span>
        </div>

        <h2 className="mb-1 text-lg font-semibold text-neutral-900">{title}</h2>
        <p className="mb-6 text-sm text-neutral-500">{description}</p>

        <div className="flex justify-end gap-3">
          <Button variant="outline" className="px-4 py-5" onClick={() => setClose(false)}>
            Cancel
          </Button>
          <Button variant="destructive" className="px-4 py-5" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(DeleteModal);
