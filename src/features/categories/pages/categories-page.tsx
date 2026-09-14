import React, { useEffect, useState } from 'react';

import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import CategoriesCard from '@/features/categories/components/categories-card.tsx';
import CategoriesModal from '@/features/categories/components/categories-modal.tsx';
import { useDeleteCategoryMutation } from '@/features/categories/hooks/use-categories-mutation.ts';
import { useCategoriesQuery } from '@/features/categories/hooks/use-categories-query.ts';
import type {
  CategoryDeleteModalState,
  CategoryModalState,
} from '@/features/categories/types/categories.types.ts';
import { useAnalyticsQuery } from '@/features/dashboard/hooks/use-analytics-query.ts';
import AlertModal from '@/shared/components/alert-modal.tsx';
import EmptyError from '@/shared/components/empty-error.tsx';
import PageHeader from '@/shared/components/page-header.tsx';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';
import type { ApiError } from '@/shared/types/error.ts';

const CategoriesPage = () => {
  const [categoryModal, setCategoryModal] = useState<CategoryModalState>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<CategoryDeleteModalState>(null);

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch: refetchCategories,
  } = useCategoriesQuery();
  const {
    data: analytics = [],
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
    refetch: refetchAnalytics,
  } = useAnalyticsQuery();
  const { mutateAsync: deleteCategory, isPending } = useDeleteCategoryMutation();

  useEffect(() => {
    if (isCategoriesError || isAnalyticsError) {
      toast.error('Failed to load data', {
        description: getApiErrorMessage(),
      });
    }
  }, [isCategoriesError, isAnalyticsError]);

  const handleRefetchAll = async () => {
    await Promise.all([refetchCategories(), refetchAnalytics()]);
  };

  const handleDeleteCategory = async (id?: string) => {
    if (!id) return;
    try {
      await deleteCategory(id);
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      const status = err.response?.status;
      const errorMessage = err.response?.data?.error.message || err.response?.data?.error?.message;

      if (status === 409) {
        toast.warning(
          errorMessage || 'This category is in use. Reassign or clear its transactions first.',
        );
        return;
      }

      toast.error(`Failed to delete the category: ${errorMessage || 'Something went wrong'}`);
    } finally {
      setOpenDeleteModal(null);
    }
  };

  const handleCloseModal = (open: boolean) => setOpenDeleteModal({ open });

  const expenseCategories = categories.filter((c) => c.type === 'expense');
  const incomeCategories = categories.filter((c) => c.type === 'income');

  if (isCategoriesLoading || isAnalyticsLoading) {
    return <Spinner className="size-10" />;
  }

  const renderError = () => {
    return (
      <EmptyError
        refetch={handleRefetchAll}
        title="Failed to load data"
        description="We couldn't load your data right now. Please try again later."
        variant="error"
      />
    );
  };

  return (
    <div>
      <PageHeader
        total={categories.length}
        title="Category"
        description="Categories"
        setOpenModal={() => setCategoryModal({ mode: 'create' })}
      />
      {categoryModal && (
        <CategoriesModal stateModal={categoryModal} setOpenModal={setCategoryModal} />
      )}
      {openDeleteModal && (
        <AlertModal
          onDelete={handleDeleteCategory}
          id={openDeleteModal.id}
          open={openDeleteModal.open}
          isPending={isPending}
          setClose={handleCloseModal}
          variant="delete"
          title="Delete category?"
          description="This action cannot be undone. Categories with active transactions cannot be deleted."
        />
      )}
      {isAnalyticsError || isCategoriesError ? (
        renderError()
      ) : (
        <div className="grid grid-cols-2 items-start gap-5">
          <CategoriesCard
            variant="Expense"
            categories={expenseCategories}
            analytics={analytics}
            onEdit={setCategoryModal}
            onDelete={setOpenDeleteModal}
          />
          <CategoriesCard
            variant="Income"
            categories={incomeCategories}
            analytics={analytics}
            onEdit={setCategoryModal}
            onDelete={setOpenDeleteModal}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(CategoriesPage);
