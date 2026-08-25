import React from 'react';

import CategoriesCard from '@/features/categories/components/categories-card.tsx';
import PageHeader from '@/shared/components/page-header.tsx';

const CategoriesPage = () => {
  return (
    <div>
      <PageHeader total={323} title="Category" description="Categories" setOpenModal={() => {}} />
      <div className="grid grid-cols-2 gap-5">
        <CategoriesCard variant="Expense" />
        <CategoriesCard variant="Income" />
      </div>
    </div>
  );
};

export default React.memo(CategoriesPage);
