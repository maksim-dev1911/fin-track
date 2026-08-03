import React from 'react';

import { cva } from 'class-variance-authority';

import Section from '@/shared/components/Section.tsx';
import { cn } from '@/shared/lib/utils.ts';

export type DashboardStatCardVariant = 'default' | 'income' | 'expense';

export type PropsType = {
  title: string;
  value: string;
  description: string;
  variant: DashboardStatCardVariant;
};

const valueVariants = cva('text-4xl font-bold', {
  variants: {
    variant: {
      default: 'text-foreground',
      income: 'text-income',
      expense: 'text-expense',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const DashboardStatsCard: React.FC<PropsType> = ({ variant, description, title, value }) => {
  return (
    <Section>
      <div className="flex w-full flex-col gap-1">
        <p className="text-[13px] font-medium text-slate-500">{title}</p>
        <h2 className={cn(valueVariants({ variant }), 'font-mono text-[26px] font-semibold')}>
          {value}
        </h2>
        <p className="text-[13px] font-medium text-slate-500">{description}</p>
      </div>
    </Section>
  );
};

export default React.memo(DashboardStatsCard);
