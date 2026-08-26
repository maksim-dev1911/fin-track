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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useAccountsQuery } from '@/features/accounts/hooks/use-accounts-query.ts';
import { useCategoriesQuery } from '@/features/categories/hooks/use-categories-query';
import type { CategoryResponse } from '@/features/categories/types/categories.types.ts';
import { useTransactionsMutation } from '@/features/transactions/hooks/use-transactions-mutation.ts';
import type { TransactionFormType } from '@/features/transactions/schemas/transaction.schema.ts';
import { applyServerValidationErrors } from '@/shared/lib/apply-server-validation-errors.ts';
import type { ApiValidationError } from '@/shared/types/error.ts';

import { useTransactionForm } from '../hooks/use-transaction-form';

type PropsType = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const CreateTransactionForm: React.FC<PropsType> = ({ setOpenModal }) => {
  const { data: accounts = [] } = useAccountsQuery();
  const { data: categories = [] } = useCategoriesQuery();

  const createTransaction = useTransactionsMutation();

  const form = useTransactionForm();

  const filteredCategories = categories.filter(
    (category: CategoryResponse) => category.type === form.watch('type'),
  );

  const onSubmit = (values: TransactionFormType) => {
    const amountInCents = Math.round(values.amount * 100);

    try {
      createTransaction.mutateAsync({
        ...values,
        amount: amountInCents,
      });

      form.reset();
      setOpenModal(false);
    } catch (error) {
      if (applyServerValidationErrors(form, error as AxiosError<ApiValidationError>)) {
        return;
      }

      throw error;
    }
  };
  return (
    <div>
      <div className="px-6 py-5">
        <h1 className="text-lg font-semibold">New transaction</h1>
        <p className="text-muted-foreground text-sm">Fill in the transaction details</p>
      </div>
      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-5 p-6">
        <ToggleGroup
          className="bg-muted-foreground/10 w-full p-1"
          value={form.watch('type') ? [form.watch('type')] : []}
          onValueChange={(value) => {
            form.setValue('type', value[0] as 'income' | 'expense', {
              shouldValidate: true,
              shouldDirty: true,
            });
            form.setValue('categoryId', '', {
              shouldValidate: true,
            });
          }}
        >
          <ToggleGroupItem value="expense" className="text-expense flex-1 data-[pressed]:bg-white">
            Expense
          </ToggleGroupItem>

          <ToggleGroupItem value="income" className="text-income flex-1 data-[pressed]:bg-white">
            Income
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="flex gap-5">
          <Field>
            <FieldLabel htmlFor="amount" className="text-[13px]">
              Amount
            </FieldLabel>
            <Input
              type="number"
              placeholder="0.00"
              aria-invalid={!!form.formState.errors.amount}
              {...form.register('amount', {
                setValueAs: (value) => (value === '' ? undefined : Number(value)),
              })}
            />
            <FieldError>{form.formState.errors.amount?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="date" className="text-[13px]">
              Date
            </FieldLabel>
            <Input
              type="date"
              aria-invalid={!!form.formState.errors.date}
              {...form.register('date')}
            />
            <FieldError>{form.formState.errors.date?.message}</FieldError>
          </Field>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor="category" className="text-[13px]">
            Category
          </FieldLabel>
          <Select
            value={form.watch('categoryId')}
            onValueChange={(value) => {
              if (value !== null) {
                form.setValue('categoryId', value, {
                  shouldValidate: true,
                });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category">
                {filteredCategories.find(
                  (category) => String(category.id) === form.watch('categoryId'),
                )?.name || 'Select an category'}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {filteredCategories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
            <FieldError>{form.formState.errors.categoryId?.message}</FieldError>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor="account" className="text-[13px]">
            Account
          </FieldLabel>
          <Select
            value={form.watch('accountId')}
            onValueChange={(value) => {
              if (value !== null) {
                form.setValue('accountId', value, {
                  shouldValidate: true,
                });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an account">
                {accounts.find((acc) => String(acc.id) === form.watch('accountId'))?.name ||
                  'Select an account'}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
            <FieldError>{form.formState.errors.accountId?.message}</FieldError>
          </Select>
        </div>
        <Field>
          <FieldLabel htmlFor="note" className="text-[13px]">
            Note — optional
          </FieldLabel>
          <Input
            type="text"
            placeholder="e.g Groceries at Whole Foods"
            {...form.register('note')}
          />
          <FieldError>{form.formState.errors.note?.message}</FieldError>
        </Field>
        <Separator />
        <div className="flex justify-end gap-2">
          <Button className="px-4 py-5" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button className="px-4 py-5" type="submit">
            Create Transaction
          </Button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(CreateTransactionForm);
