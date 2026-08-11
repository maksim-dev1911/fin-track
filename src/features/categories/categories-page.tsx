import React from 'react';

import PageHeader from '@/shared/components/page-header.tsx';

const CategoriesPage = () => {
  return (
    <div>
      <PageHeader total="11" title="Category" description="Categories" />
    </div>
  );
};

export default React.memo(CategoriesPage);
