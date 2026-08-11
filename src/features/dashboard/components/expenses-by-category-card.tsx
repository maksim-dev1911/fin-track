'use client';

import * as React from 'react';

import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import CategoryLegend from '@/shared/components/category-legend.tsx';

const categories = [
  { key: 'rent', name: 'Rent', amount: 1850, color: '#7C6FEA' },
  { key: 'shopping', name: 'Shopping', amount: 350, color: '#F2994A' },
  { key: 'groceries', name: 'Groceries', amount: 127, color: '#F2C94C' },
  { key: 'transport', name: 'Transport', amount: 50, color: '#2FD5C8' },
  { key: 'entertainment', name: 'Entertainment', amount: 41, color: '#B084F5' },
  { key: 'dining', name: 'Dining out', amount: 27, color: '#EF5DA8' },
];

const chartConfig = categories.reduce((config, cat) => {
  config[cat.key] = {
    label: cat.name,
    color: cat.color,
  };

  return config;
}, {} as ChartConfig);

const PieChartDonut = () => {
  const total = React.useMemo(() => categories.reduce((acc, curr) => acc + curr.amount, 0), []);

  const chartData = categories.map((cat) => ({
    category: cat.key,
    amount: cat.amount,
    fill: cat.color,
  }));

  const legendItems = categories.map((cat) => ({
    name: cat.name,
    percent: `${Math.round((cat.amount / total) * 100)}%`,
    amount: `$${cat.amount.toLocaleString()}`,
    color: cat.color,
  }));

  return (
    <Card className="flex h-full flex-col p-5">
      <CardHeader className="space-y-1 p-0">
        <CardTitle className="text-[15px] font-semibold">Expenses by category</CardTitle>
        <CardDescription className="text-sm">July 2026</CardDescription>
      </CardHeader>

      <CardContent className="mt-4 grid grid-cols-1 gap-6 p-0 lg:grid-cols-[210px_auto]">
        <ChartContainer config={chartConfig} className="mx-auto size-[190px] shrink-0">
          <PieChart width={190} height={190}>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              outerRadius={95}
              innerRadius={58}
              strokeWidth={4}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) {
                    return null;
                  }

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy - 10}
                        className="text-muted-foreground text-xs"
                      >
                        Spent
                      </tspan>

                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 18}
                        className="fill-foreground text-[19px] font-semibold"
                      >
                        ${total.toLocaleString()}
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="min-w-0">
          <CategoryLegend items={legendItems} />
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(PieChartDonut);
