import * as React from 'react';

import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import type { AnalyticByCategoryResponse } from '@/features/dashboard/types/analytics.types.ts';
import CategoryLegend from '@/shared/components/category-legend.tsx';
import { formatTransactionAmount } from '@/shared/lib/format-money.ts';
import { getPeriodDescription, type DateRange } from '@/shared/lib/get-period-description.ts';

type PropsType = {
  analyticsByCategory: AnalyticByCategoryResponse[];
  dateRange: DateRange;
};

const PieChartDonut: React.FC<PropsType> = ({ analyticsByCategory, dateRange }) => {
  const total = React.useMemo(
    () => analyticsByCategory.reduce((acc, curr) => acc + curr.total, 0),
    [analyticsByCategory],
  );

  const chartConfig = analyticsByCategory.reduce((config, analytic) => {
    config[analytic.categoryId] = {
      label: analytic.name,
      color: analytic.color,
    };

    return config;
  }, {} as ChartConfig);

  const chartData = analyticsByCategory.map((analytic) => ({
    category: analytic.name,
    total: analytic.total,
    fill: analytic.color,
  }));

  const legendItems = analyticsByCategory.map((analytic) => ({
    name: analytic.name,
    percent: `${total > 0 ? Math.round((analytic.total / total) * 100) : 0}%`,
    amount: analytic.total,
    color: analytic.color,
  }));

  return (
    <Card className="flex h-full flex-col p-5">
      <CardHeader className="space-y-1 p-0">
        <CardTitle className="text-[15px] font-semibold">Expenses by category</CardTitle>
        <CardDescription className="text-sm">{getPeriodDescription(dateRange)}</CardDescription>
      </CardHeader>

      {analyticsByCategory.length > 0 && (
        <CardContent className="mt-4 grid grid-cols-1 items-center justify-items-center gap-6 p-0 lg:grid-cols-[210px_auto] lg:justify-items-stretch">
          <ChartContainer config={chartConfig} className="mx-auto size-[190px] shrink-0">
            <PieChart width={190} height={190}>
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="category"
                outerRadius={95}
                innerRadius={65}
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
                          {formatTransactionAmount(total, 'default')}
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="w-full min-w-0">
            <CategoryLegend items={legendItems} />
          </div>
        </CardContent>
      )}
      {!analyticsByCategory.length && (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="border-muted-foreground/20 mb-5 size-16 rounded-full border-2 border-dashed" />

          <p className="text-foreground mb-2 text-[15px] font-semibold tracking-tight">
            No expenses this period
          </p>

          <p className="text-muted-foreground max-w-[280px] text-sm leading-normal">
            Add a transaction or pick another period <br /> to see the breakdown.
          </p>
        </div>
      )}
    </Card>
  );
};

export default React.memo(PieChartDonut);
