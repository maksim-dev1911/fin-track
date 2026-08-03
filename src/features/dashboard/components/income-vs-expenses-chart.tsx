import React from 'react';

import { Bar, BarChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart.tsx';

const chartData = [
  { month: 'Feb', income: 2210, expense: 1050 },
  { month: 'Mar', income: 2400, expense: 1080 },
  { month: 'Apr', income: 2180, expense: 1180 },
  { month: 'May', income: 2520, expense: 1030 },
  { month: 'Jun', income: 2200, expense: 1040 },
  { month: 'Jul', income: 2445, expense: 780 },
];

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

const ChartBarMultiple = () => {
  return (
    <Card className="flex h-full flex-col p-5">
      <CardHeader className="flex flex-row items-start justify-between p-0">
        <div>
          <CardTitle className="text-[15px] font-semibold">Income vs expenses</CardTitle>
          <CardDescription className="text-[14px]">last 6 months</CardDescription>
        </div>
        <Legend />
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <BarChart accessibilityLayer data={chartData} barGap={4}>
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
            <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} barSize={15} />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={[4, 4, 0, 0]} barSize={15} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default React.memo(ChartBarMultiple);
