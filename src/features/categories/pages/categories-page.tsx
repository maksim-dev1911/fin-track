import React, { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import CategoriesCard from '@/features/categories/components/categories-card.tsx';
import CategoriesModal from '@/features/categories/components/categories-modal.tsx';
import { useCategoriesQuery } from '@/features/categories/hooks/use-categories-query.ts';
import type { CategoryModalState } from '@/features/categories/types/categories.types.ts';
import { useAnalyticsQuery } from '@/features/dashboard/hooks/use-analytics-query.ts';
import EmptyError from '@/shared/components/empty-error.tsx';
import PageHeader from '@/shared/components/page-header.tsx';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';

const CategoriesPage = () => {
  const [categoryModal, setCategoryModal] = useState<CategoryModalState>(null);

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
      {isAnalyticsError || isCategoriesError ? (
        renderError()
      ) : (
        <div className="grid grid-cols-2 items-start gap-5">
          <CategoriesCard variant="Income" categories={incomeCategories} analytics={analytics} />
          <CategoriesCard variant="Expense" categories={expenseCategories} analytics={analytics} />
        </div>
      )}
    </div>
  );
};

export default React.memo(CategoriesPage);
