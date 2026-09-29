import React, { useState } from 'react';

import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import CategoriesCard from '@/features/categories/components/categories-card.tsx';
import CategoriesModal from '@/features/categories/components/categories-modal.tsx';
import { useCategoriesQuery } from '@/features/categories/hooks/use-categories-query.ts';
import type {
  CategoryDeleteModalState,
  CategoryModalState,
} from '@/features/categories/types/categories.types.ts';
import { useAnalyticsByCategoryQuery } from '@/features/dashboard/hooks/use-analytics-query.ts';
import { apiClient } from '@/shared/api/client.ts';
import { endpoints } from '@/shared/api/endpoints.ts';
import AlertModal from '@/shared/components/alert-modal.tsx';
import EmptyError from '@/shared/components/empty-error.tsx';
import PageHeader from '@/shared/components/page-header.tsx';
import { useDelete } from '@/shared/lib/use-delete.ts';

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
  } = useAnalyticsByCategoryQuery();

  const handleRefetchAll = async () => {
    await Promise.all([refetchCategories(), refetchAnalytics()]);
  };

  const handleDeleteCategory = useDelete({
    mutationFn: (id: string) => apiClient.delete(`${endpoints.CATEGORIES}/${id}`),
    invalidatedQueryKey: ['categories'],
    successMessage: 'Category deleted successfully',
    errorMessage: 'Failed to delete the category',
    onSuccess: () => setOpenDeleteModal(null),
    onError: (error) => {
      if (error.response?.status === 409) {
        const message =
          error.response?.data?.error?.message ??
          'This category is in use. Reassign or clear its transactions first.';
        toast.warning(message);
        setOpenDeleteModal(null);
      }
    },
  });

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
          onDelete={(id) => {
            if (id) handleDeleteCategory.mutate(id);
          }}
          id={openDeleteModal.id}
          open={openDeleteModal.open}
          isPending={handleDeleteCategory.isPending}
          setClose={handleCloseModal}
          variant="delete"
          title="Delete category?"
          description="This action cannot be undone. Categories with active transactions cannot be deleted."
        />
      )}
      {isAnalyticsError || isCategoriesError ? (
        renderError()
      ) : (
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
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
