import React, { type Dispatch, type SetStateAction } from 'react';

import type { AxiosError } from 'axios';

import { Button } from '@/components/ui/button.tsx';
import { Field, FieldError, FieldLabel } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { useAccountsForm } from '@/features/accounts/hooks/use-accounts-form.ts';
import { useAccountsMutation } from '@/features/accounts/hooks/use-accounts-mutation.ts';
import type { AccountsFormType } from '@/features/accounts/schemas/account.schema.ts';
import type { AccountsModalState } from '@/features/accounts/types/accounts.types.ts';
import { applyServerValidationErrors } from '@/shared/lib/apply-server-validation-errors.ts';
import { inputToCents } from '@/shared/lib/format-money.ts';
import type { ApiValidationError } from '@/shared/types/error.ts';

type PropsType = {
  stateModal: AccountsModalState;
  setOpenModal: Dispatch<SetStateAction<AccountsModalState>>;
};

const typeForm = [
  { label: 'Cash', value: 'cash' },
  { label: 'Card', value: 'card' },
  {
    label: 'Savings',
    value: 'savings',
  },
  { label: 'Other', value: 'other' },
];

const AccountsForm: React.FC<PropsType> = ({ stateModal, setOpenModal }) => {
  const form = useAccountsForm();

  const createAccount = useAccountsMutation();

  const onSubmit = async (values: AccountsFormType) => {
    try {
      await createAccount.mutateAsync({
        ...values,
        startingBalance: inputToCents(values.startingBalance),
      });

      form.reset();
      setOpenModal(null);
    } catch (error) {
      if (applyServerValidationErrors(form, error as AxiosError<ApiValidationError>)) return;
      throw error;
    }
  };

  const isEdit = stateModal?.mode === 'edit';

  return (
    <div>
      <div className="px-6 py-5">
        <h1 className="text-lg font-semibold">{isEdit ? 'Edit account' : 'New account'}</h1>
      </div>
      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-5 p-6">
        <div className="flex flex-col gap-5">
          <Field>
            <FieldLabel htmlFor="name" className="text-[13px]">
              Name
            </FieldLabel>
            <Input type="text" placeholder="e.g Checking account" {...form.register('name')} />
            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </Field>
          <div className="flex w-full gap-5">
            <div className="flex flex-1 flex-col gap-2">
              <FieldLabel htmlFor="type" className="text-[13px]">
                Type
              </FieldLabel>
              <Select
                value={form.watch('type')}
                onValueChange={(value) => {
                  if (value !== null) {
                    form.setValue('type', value, {
                      shouldValidate: true,
                    });
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a type">
                    {typeForm.find((t) => t.value === form.watch('type'))?.label}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {typeForm.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
                <FieldError>{form.formState.errors.type?.message}</FieldError>
              </Select>
            </div>
            <Field className="flex-1">
              <FieldLabel htmlFor="starting balance" className="text-[13px]">
                Starting balance
              </FieldLabel>
              <Input
                type="number"
                placeholder="0.00"
                className="w-full"
                aria-invalid={!!form.formState.errors.startingBalance}
                {...form.register('startingBalance', {
                  setValueAs: (value) => (value === '' ? undefined : Number(value)),
                })}
              />
              <FieldError>{form.formState.errors.startingBalance?.message}</FieldError>
            </Field>
          </div>
          <Separator />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              className="px-4 py-5"
              onClick={() => setOpenModal(null)}
            >
              Cancel
            </Button>
            <Button className="px-4 py-5" type="submit">
              {isEdit ? 'Save changes' : 'Save'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(AccountsForm);
