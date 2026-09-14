import React, { type Dispatch, type SetStateAction } from 'react';

import type { AxiosError } from 'axios';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button.tsx';
import { Field, FieldError, FieldLabel } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx';
import { useCreateCategoryMutation } from '@/features/categories/hooks/use-categories-mutation.ts';
import { useCategoryForm } from '@/features/categories/hooks/use-category-form.ts';
import type { CategoryFormType } from '@/features/categories/schemas/category.schema.ts';
import type { CategoryModalState } from '@/features/categories/types/categories.types.ts';
import { applyServerValidationErrors } from '@/shared/lib/apply-server-validation-errors.ts';
import ColorPicker from '@/shared/lib/color-picker.tsx';
import type { ApiValidationError } from '@/shared/types/error.ts';

type PropsType = {
  stateModal: CategoryModalState;
  setOpenModal: Dispatch<SetStateAction<CategoryModalState>>;
};

const CategoriesForm: React.FC<PropsType> = ({ stateModal, setOpenModal }) => {
  const createCategory = useCreateCategoryMutation();

  const form = useCategoryForm();

  const isEdit = stateModal?.mode === 'edit';

  const onSubmit = async (values: CategoryFormType) => {
    try {
      await createCategory.mutateAsync(values);

      form.reset();
      setOpenModal(null);
    } catch (error) {
      if (applyServerValidationErrors(form, error as AxiosError<ApiValidationError>)) return;
      throw error;
    }
  };

  return (
    <div>
      <div className="px-6 py-5">
        <h1 className="text-lg font-semibold">{isEdit ? 'Edit category' : 'New category'}</h1>
      </div>
      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-5 p-6">
        <Field>
          <FieldLabel htmlFor="name" className="text-[13px]">
            Name
          </FieldLabel>
          <Input type="text" placeholder="Name" {...form.register('name')} />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>
        <ToggleGroup
          className="bg-muted-foreground/10 w-full p-1"
          value={form.watch('type') ? [form.watch('type')] : []}
          onValueChange={(value) => {
            form.setValue('type', value[0] as 'income' | 'expense', {
              shouldValidate: true,
              shouldDirty: true,
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
        <Controller
          control={form.control}
          name="color"
          render={({ field }) => <ColorPicker value={field.value} onChange={field.onChange} />}
        />
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
      </form>
    </div>
  );
};

export default React.memo(CategoriesForm);
