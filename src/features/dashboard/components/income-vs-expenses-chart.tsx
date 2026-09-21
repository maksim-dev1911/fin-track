import React from 'react';

import { format } from 'date-fns/format';
import { Bar, BarChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart.tsx';
import type { AnalyticsOverTimeType } from '@/features/dashboard/types/analytics.types.ts';

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--income)',
  },
  expense: {
    label: 'Expenses',
    color: 'var(--expense)',
  },
} satisfies ChartConfig;

type PropsType = {
  analyticsOverTime: AnalyticsOverTimeType[];
};

const Legend = () => (
  <div className="flex items-center gap-4">
    {Object.entries(chartConfig).map(([key, cfg]) => (
      <div key={key} className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: cfg.color }} />
        <span className="text-sm text-gray-600">{cfg.label}</span>
      </div>
    ))}
  </div>
);

const ChartBarMultiple: React.FC<PropsType> = ({ analyticsOverTime }) => {
  const formatChartMonth = (value: string | undefined | null): string => {
    if (!value) return '';

    if (/^[A-Za-zА-Яа-я]{3,4}$/.test(value)) {
      return value;
    }

    const safeValue = value.includes('-') ? value.replace(/-/g, '/') : value;
    const date = new Date(safeValue);

    if (isNaN(date.getTime())) {
      return value;
    }

    return format(date, 'MMM');
  };

  const isEmpty = !analyticsOverTime || analyticsOverTime.length === 0;

  return (
    <Card className="flex h-full flex-col p-5">
      <CardHeader className="flex flex-row items-start justify-between p-0">
        <div>
          <CardTitle className="text-[15px] font-semibold">Income vs expenses</CardTitle>
          <CardDescription className="text-[14px]">last 6 months</CardDescription>
        </div>
        {!isEmpty && <Legend />}
      </CardHeader>
      <CardContent className="p-0 pt-4">
        {isEmpty ? (
          <div className="flex h-[240px] w-full flex-col items-center justify-center gap-2 text-center">
            <span className="text-3xl">📊</span>
            <p className="text-sm font-medium text-gray-500">
              Data for this period is not yet available.
            </p>
            <p className="max-w-[240px] text-xs text-gray-400">
              New transactions will automatically appear on this chart.
            </p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[240px] w-full">
            <BarChart accessibilityLayer data={analyticsOverTime} barGap={4}>
              <XAxis
                dataKey="month"
                tickLine={false}
                tickFormatter={(value) => formatChartMonth(value)}
                tickMargin={10}
                axisLine={false}
              />
              <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} barSize={15} />
              <Bar
                dataKey="expense"
                fill="var(--color-expense)"
                radius={[4, 4, 0, 0]}
                barSize={15}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(ChartBarMultiple);
