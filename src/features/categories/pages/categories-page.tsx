import React, { useEffect, useMemo, useState } from 'react';

import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import CategoriesCard from '@/features/categories/components/categories-card.tsx';
import CategoriesModal from '@/features/categories/components/categories-modal.tsx';
import { useCategoriesQuery } from '@/features/categories/hooks/use-categories-query.ts';
import type { CategoryModalState } from '@/features/categories/types/categories.types.ts';
import { useTransactionsQuery } from '@/features/transactions/hooks/use-transactions-query.ts';
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
    data: transactionsResponse,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
    refetch: refetchTransactions,
  } = useTransactionsQuery();

  const transactions = transactionsResponse?.data ?? [];

  useEffect(() => {
    if (isCategoriesError || isTransactionsError) {
      toast.error('Failed to load data', {
        description: getApiErrorMessage(),
      });
    }
  }, [isCategoriesError, isTransactionsError]);

  const enrichedCategories = useMemo(() => {
    return categories.map((category) => {
      const categoryTransactions = transactions.filter((t) => t.category.id === category.id);

      const totalAmount = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);

      return {
        ...category,
        transactionsCount: categoryTransactions.length,
        totalAmount,
      };
    });
  }, [categories, transactions]);

  const handleRefetchAll = async () => {
    await Promise.all([refetchCategories(), refetchTransactions()]);
  };

  const expenseCategories = enrichedCategories.filter((c) => c.type === 'expense');
  const incomeCategories = enrichedCategories.filter((c) => c.type === 'income');

  if (isCategoriesLoading || isTransactionsLoading) {
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
      {isTransactionsError || isCategoriesError ? (
        renderError()
      ) : (
        <div className="grid grid-cols-2 items-start gap-5">
          <CategoriesCard variant="Income" categories={incomeCategories} />
          <CategoriesCard variant="Expense" categories={expenseCategories} />
        </div>
      )}
    </div>
  );
};

export default React.memo(CategoriesPage);
