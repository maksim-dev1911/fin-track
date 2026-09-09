import React from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog.tsx';
import { cn } from '@/shared/lib/utils.ts';

type PropsType = {
  open: boolean;
  setClose: (open: boolean) => void;
  onDelete: (id?: string) => void;
  id?: string;
  title: string;
  description: string;
  isPending: boolean;
  variant: 'delete' | 'warning';
};

const AlertModal: React.FC<PropsType> = ({
  open,
  setClose,
  onDelete,
  id,
  title,
  description,
  isPending,
  variant,
}) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && setClose(false)}>
      <DialogContent className="block min-w-[400px] p-6 sm:max-w-sm" showCloseButton={false}>
        <div
          className={cn(
            'mb-4 flex h-10 w-10 items-center justify-center rounded-lg',
            variant === 'delete' ? 'bg-rose-50' : 'bg-amber-50',
          )}
        >
          <span
            className={cn(
              'text-lg font-bold',
              variant === 'delete' ? 'text-rose-600' : 'text-amber-500',
            )}
          >
            !
          </span>
        </div>

        <DialogTitle className="mb-1 text-lg font-semibold text-neutral-900">{title}</DialogTitle>
        <DialogDescription className="mb-6 text-sm text-neutral-500">
          {description}
        </DialogDescription>

        <div className="flex justify-end gap-3">
          {variant === 'delete' ? (
            <>
              <Button variant="outline" className="px-4 py-2" onClick={() => setClose(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="px-4 py-2"
                disabled={isPending}
                onClick={() => onDelete(id)}
              >
                Delete
              </Button>
            </>
          ) : (
            <Button variant="outline" className="px-4 py-2" onClick={() => setClose(false)}>
              Got it
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(AlertModal);
