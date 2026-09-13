import React, { useEffect } from 'react';

import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner.tsx';
import CategoriesCard from '@/features/categories/components/categories-card.tsx';
import { useCategoriesQuery } from '@/features/categories/hooks/use-categories-query.ts';
import EmptyError from '@/shared/components/empty-error.tsx';
import PageHeader from '@/shared/components/page-header.tsx';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';

const CategoriesPage = () => {
  const { data: categories = [], isLoading, isError, refetch } = useCategoriesQuery();

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load categories', {
        description: getApiErrorMessage(),
      });
    }
  }, [isError]);

  if (isLoading) {
    return <Spinner className="size-10" />;
  }

  const renderError = () => {
    return (
      <EmptyError
        refetch={refetch}
        title="Failed to load categories"
        description="We couldn't load your categories right now. Please try again later."
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
        setOpenModal={() => {}}
      />
      {isError ? (
        renderError()
      ) : (
        <div className="grid grid-cols-2 items-start gap-5">
          <CategoriesCard variant="Income" categories={categories} />
          <CategoriesCard variant="Expense" categories={categories} />
        </div>
      )}
    </div>
  );
};

export default React.memo(CategoriesPage);
