import React from 'react';

import PageHeader from '@/shared/components/page-header';

const AccountsPage = () => {
  return (
    <div>
      <PageHeader total="$40,335" title="Account" description="Total balance" />
    </div>
  );
};

export default React.memo(AccountsPage);
