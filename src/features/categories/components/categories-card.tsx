import React from 'react';

import { Card } from '@/components/ui/card.tsx';

type PropsType = {
  variant: 'Income' | 'Expense';
};

const CategoriesCard: React.FC<PropsType> = () => {
  return (
    <Card className="gap-0 p-0">
      {/*<div className="flex items-center gap-2 px-5 py-4">*/}
      {/*  <div*/}
      {/*    className={cn(*/}
      {/*      'h-[9px] w-[9px] rounded-full',*/}
      {/*      variant === 'Income' ? 'bg-income' : 'bg-expense',*/}
      {/*    )}*/}
      {/*  ></div>*/}
      {/*  <div className="flex items-center gap-2">*/}
      {/*    <h2 className="text-sm font-semibold">{variant}</h2>*/}
      {/*    <p className="text-muted-foreground text-xs">{categories.length}</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*{categories.map((category) => (*/}
      {/*  <CategoriesRow category={category} key={category.id} />*/}
      {/*))}*/}
    </Card>
  );
};

export default React.memo(CategoriesCard);
